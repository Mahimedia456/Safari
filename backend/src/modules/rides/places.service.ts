import { env } from "../../config/env.js";

type RidePlace = {
  id: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function titleFromAddress(address: string) {
  return address.split(",")[0]?.trim() || "Selected location";
}

async function googleSearch(query: string): Promise<RidePlace[]> {
  if (!env.GOOGLE_MAPS_API_KEY) return [];

  const params = new URLSearchParams({
    query: `${query}, Pakistan`,
    region: "pk",
    language: "en",
    key: env.GOOGLE_MAPS_API_KEY,
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?${params.toString()}`,
  );

  const data = (await response.json()) as any;

  if (!response.ok || !["OK", "ZERO_RESULTS"].includes(data.status ?? "")) {
    throw new Error(
      data.error_message ??
        `Google Places status ${data.status ?? response.status}.`,
    );
  }

  return (data.results ?? [])
    .map((row: any, index: number) => {
      const latitude = Number(row.geometry?.location?.lat);
      const longitude = Number(row.geometry?.location?.lng);

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return null;
      }

      const address =
        clean(row.formatted_address) ||
        clean(row.name);

      return {
        id: clean(row.place_id) || `google-${index}`,
        title: clean(row.name) || titleFromAddress(address),
        address,
        latitude,
        longitude,
      };
    })
    .filter(Boolean)
    .slice(0, 10) as RidePlace[];
}

async function photonSearch(
  query: string,
  latitude?: number,
  longitude?: number,
): Promise<RidePlace[]> {
  const params = new URLSearchParams({
    q: query,
    limit: "10",
    lang: "en",
  });

  if (latitude !== undefined) params.set("lat", String(latitude));
  if (longitude !== undefined) params.set("lon", String(longitude));

  const response = await fetch(
    `https://photon.komoot.io/api/?${params.toString()}`,
    {
      headers: {
        "User-Agent": "SafariPakistan/1.0",
        "Accept-Language": "en",
      },
    },
  );

  if (!response.ok) return [];

  const data = (await response.json()) as any;

  return (data.features ?? [])
    .map((feature: any, index: number) => {
      const props = feature.properties ?? {};
      const coords = feature.geometry?.coordinates ?? [];
      const longitude = Number(coords[0]);
      const latitude = Number(coords[1]);

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return null;
      }

      const country = clean(props.countrycode).toLowerCase();
      if (country && country !== "pk") return null;

      const parts = [
        clean(props.name),
        clean(props.street),
        clean(props.district),
        clean(props.city),
        clean(props.state),
        "Pakistan",
      ].filter(Boolean);

      const address = [...new Set(parts)].join(", ");

      return {
        id: `photon-${clean(props.osm_id) || index}`,
        title: clean(props.name) || titleFromAddress(address),
        address,
        latitude,
        longitude,
      };
    })
    .filter(Boolean)
    .slice(0, 10) as RidePlace[];
}

async function nominatimSearch(
  query: string,
  latitude?: number,
  longitude?: number,
): Promise<RidePlace[]> {
  const params = new URLSearchParams({
    q: query,
    format: "jsonv2",
    addressdetails: "1",
    countrycodes: "pk",
    "accept-language": "en",
    limit: "10",
    dedupe: "1",
  });

  if (latitude !== undefined && longitude !== undefined) {
    params.set(
      "viewbox",
      `${longitude - 2},${latitude + 2},${longitude + 2},${latitude - 2}`,
    );
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      headers: {
        "User-Agent": "SafariPakistan/1.0 support@safari.app",
        "Accept-Language": "en",
      },
    },
  );

  if (!response.ok) return [];

  const rows = (await response.json()) as any[];

  return rows
    .map((row, index) => {
      const latitude = Number(row.lat);
      const longitude = Number(row.lon);

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return null;
      }

      const address = clean(row.display_name);

      return {
        id: String(row.place_id ?? `osm-${index}`),
        title: clean(row.name) || titleFromAddress(address),
        address,
        latitude,
        longitude,
      };
    })
    .filter(Boolean)
    .slice(0, 10) as RidePlace[];
}

function uniquePlaces(places: RidePlace[]) {
  const seen = new Set<string>();

  return places.filter((place) => {
    const key = `${place.latitude.toFixed(5)}:${place.longitude.toFixed(5)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function searchRidePlaces(
  query: string,
  latitude?: number,
  longitude?: number,
) {
  const normalized = query.trim();

  if (normalized.length < 2) return [];

  try {
    const google = await googleSearch(normalized);
    if (google.length > 0) return google;
  } catch (error) {
    console.error("[Safari Places] Google fallback:", error);
  }

  const [photon, nominatim] = await Promise.allSettled([
    photonSearch(normalized, latitude, longitude),
    nominatimSearch(normalized, latitude, longitude),
  ]);

  const combined = [
    ...(photon.status === "fulfilled" ? photon.value : []),
    ...(nominatim.status === "fulfilled" ? nominatim.value : []),
  ];

  return uniquePlaces(combined).slice(0, 10);
}

export async function reverseRidePlace(
  latitude: number,
  longitude: number,
): Promise<RidePlace> {
  if (env.GOOGLE_MAPS_API_KEY) {
    try {
      const params = new URLSearchParams({
        latlng: `${latitude},${longitude}`,
        language: "en",
        region: "pk",
        key: env.GOOGLE_MAPS_API_KEY,
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`,
      );

      const data = (await response.json()) as any;
      const first = data.results?.[0];

      if (response.ok && data.status === "OK" && first) {
        const address = clean(first.formatted_address);

        return {
          id: clean(first.place_id) || `google-${latitude}-${longitude}`,
          title: titleFromAddress(address),
          address,
          latitude,
          longitude,
        };
      }
    } catch (error) {
      console.error("[Safari Places] Google reverse fallback:", error);
    }
  }

  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: "jsonv2",
    zoom: "18",
    addressdetails: "1",
    "accept-language": "en",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params.toString()}`,
    {
      headers: {
        "User-Agent": "SafariPakistan/1.0 support@safari.app",
        "Accept-Language": "en",
      },
    },
  );

  if (response.ok) {
    const data = (await response.json()) as any;
    const address =
      clean(data.display_name) ||
      `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

    return {
      id: String(data.place_id ?? `reverse-${latitude}-${longitude}`),
      title: clean(data.name) || titleFromAddress(address),
      address,
      latitude,
      longitude,
    };
  }

  return {
    id: `coordinate-${latitude}-${longitude}`,
    title: "Selected location",
    address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
    latitude,
    longitude,
  };
}

function decodeGooglePolyline(encoded: string) {
  const points: Array<{ latitude: number; longitude: number }> = [];
  let index = 0;
  let latitude = 0;
  let longitude = 0;

  while (index < encoded.length) {
    let result = 0;
    let shift = 0;
    let byte = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20 && index < encoded.length);

    const latitudeDelta =
      result & 1 ? ~(result >> 1) : result >> 1;
    latitude += latitudeDelta;

    result = 0;
    shift = 0;

    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20 && index < encoded.length);

    const longitudeDelta =
      result & 1 ? ~(result >> 1) : result >> 1;
    longitude += longitudeDelta;

    points.push({
      latitude: latitude / 1e5,
      longitude: longitude / 1e5,
    });
  }

  return points;
}

async function googleRoadRoute(
  pickup: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
) {
  if (!env.GOOGLE_MAPS_API_KEY) return null;

  const params = new URLSearchParams({
    origin: `${pickup.latitude},${pickup.longitude}`,
    destination: `${destination.latitude},${destination.longitude}`,
    mode: "driving",
    region: "pk",
    language: "en",
    units: "metric",
    key: env.GOOGLE_MAPS_API_KEY,
  });

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}`,
  );

  const data = (await response.json()) as any;

  if (data.status === "ZERO_RESULTS") return null;

  if (!response.ok || data.status !== "OK") {
    throw new Error(
      data.error_message ??
        `Google Directions status ${data.status ?? response.status}.`,
    );
  }

  const route = data.routes?.[0];
  const leg = route?.legs?.[0];

  if (!route || !leg) return null;

  const encoded = clean(route.overview_polyline?.points);

  return {
    provider: "google" as const,
    distanceKm: Number((Number(leg.distance?.value ?? 0) / 1000).toFixed(2)),
    durationMinutes: Math.max(
      1,
      Math.round(Number(leg.duration?.value ?? 0) / 60),
    ),
    coordinates: encoded ? decodeGooglePolyline(encoded) : [],
  };
}

export async function getRoadRoute(
  pickup: { latitude: number; longitude: number },
  destination: { latitude: number; longitude: number },
) {
  if (env.GOOGLE_MAPS_API_KEY) {
    try {
      const googleRoute = await googleRoadRoute(pickup, destination);
      if (googleRoute) return googleRoute;
    } catch (error) {
      console.error("[Safari Directions] Google fallback:", error);
    }
  }

  const url =
    "https://router.project-osrm.org/route/v1/driving/" +
    `${pickup.longitude},${pickup.latitude};${destination.longitude},${destination.latitude}` +
    "?overview=full&geometries=geojson&steps=false";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Road routing failed with HTTP ${response.status}.`);
  }

  const data = (await response.json()) as any;
  const route = data.routes?.[0];

  if (data.code !== "Ok" || !route) {
    throw new Error("No drivable route was found.");
  }

  return {
    provider: "osrm" as const,
    distanceKm: Number((Number(route.distance ?? 0) / 1000).toFixed(2)),
    durationMinutes: Math.max(
      1,
      Math.round(Number(route.duration ?? 0) / 60),
    ),
    coordinates: (route.geometry?.coordinates ?? []).map(
      ([longitude, latitude]: [number, number]) => ({
        latitude,
        longitude,
      }),
    ),
  };
}
