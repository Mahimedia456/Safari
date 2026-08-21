import "dotenv/config";
import { env } from "../src/config/env.js";
import { supabaseAdmin } from "../src/lib/supabase.js";

const DEMO_PASSWORD = "safarimobile";

type SeedUser = {
  email: string;
  phone?: string;
  fullName: string;
  accountType: "administration" | "merchant" | "passenger" | "driver";
  adminRole?: string;
  merchantType?: string;
  countryCode?: "PK" | "DE";
};

const users: SeedUser[] = [
  {
    email: env.SEED_ADMIN_EMAIL,
    fullName: "Safari Super Admin",
    accountType: "administration",
    adminRole: "super_admin",
    countryCode: "PK",
  },

  {
    email: "food@safari.com",
    fullName: "Safari Food Merchant",
    accountType: "merchant",
    merchantType: "food",
    countryCode: "PK",
  },
  {
    email: "grocery@safari.com",
    fullName: "Safari Grocery Merchant",
    accountType: "merchant",
    merchantType: "grocery",
    countryCode: "PK",
  },
  {
    email: "pharmacy@safari.com",
    fullName: "Safari Pharmacy Merchant",
    accountType: "merchant",
    merchantType: "pharmacy",
    countryCode: "PK",
  },
  {
    email: "services@safari.com",
    fullName: "Safari Services Merchant",
    accountType: "merchant",
    merchantType: "services",
    countryCode: "PK",
  },

  {
    email: "passenger1@safari.com",
    phone: "+923001111111",
    fullName: "Ayesha Khan",
    accountType: "passenger",
    countryCode: "PK",
  },
  {
    email: "passenger2@safari.com",
    phone: "+923002222222",
    fullName: "Ali Raza",
    accountType: "passenger",
    countryCode: "PK",
  },
  {
    email: "passenger3@safari.com",
    phone: "+923003333333",
    fullName: "Sara Ahmed",
    accountType: "passenger",
    countryCode: "PK",
  },

  {
    email: "driver1@safari.com",
    phone: "+923101111111",
    fullName: "Hamza Siddiqui",
    accountType: "driver",
    countryCode: "PK",
  },
  {
    email: "driver2@safari.com",
    phone: "+923102222222",
    fullName: "Bilal Khan",
    accountType: "driver",
    countryCode: "PK",
  },
  {
    email: "driver3@safari.com",
    phone: "+923103333333",
    fullName: "Usman Tariq",
    accountType: "driver",
    countryCode: "PK",
  }
];

async function findUser(email: string) {
  let page = 1;

  while (page <= 10) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 100,
    });

    if (error) throw error;

    const found = data.users.find(
      (user) => user.email?.toLowerCase() === email.toLowerCase(),
    );

    if (found) return found;
    if (data.users.length < 100) return null;

    page += 1;
  }

  return null;
}

async function upsertAuthUser(item: SeedUser) {
  const metadata = {
    full_name: item.fullName,
    account_type: item.accountType,
    app_mode:
      item.accountType === "passenger" || item.accountType === "driver"
        ? item.accountType
        : null,
    admin_role: item.adminRole ?? null,
    merchant_type: item.merchantType ?? null,
    country_code: item.countryCode ?? "PK",
  };

  const existing = await findUser(item.email);

  if (existing) {
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      existing.id,
      {
        password: DEMO_PASSWORD,
        email_confirm: true,
        phone: item.phone,
        phone_confirm: Boolean(item.phone),
        user_metadata: metadata,
      },
    );

    if (error) throw error;
    console.log(`updated ${item.email}`);
    return data.user;
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: item.email,
    phone: item.phone,
    password: DEMO_PASSWORD,
    email_confirm: true,
    phone_confirm: Boolean(item.phone),
    user_metadata: metadata,
  });

  if (error) throw error;
  console.log(`created ${item.email}`);
  return data.user;
}

async function seedPassengerData(userId: string, email: string) {
  const demo =
    email === "passenger1@safari.com"
      ? {
          gender: "female",
          home: {
            label: "Home",
            address_line: "DHA Phase 6",
            city: "Karachi",
            area: "DHA",
            latitude: 24.8012,
            longitude: 67.0716,
          },
          work: {
            label: "Work",
            address_line: "Shahrah-e-Faisal",
            city: "Karachi",
            area: "PECHS",
            latitude: 24.8615,
            longitude: 67.0707,
          },
          contact: {
            name: "Ahmed Khan",
            phone: "+923009999999",
            relationship: "Brother",
          },
        }
      : email === "passenger2@safari.com"
        ? {
            gender: "male",
            home: {
              label: "Home",
              address_line: "Gulberg III",
              city: "Lahore",
              area: "Gulberg",
              latitude: 31.5092,
              longitude: 74.3496,
            },
            work: {
              label: "Office",
              address_line: "Main Boulevard Gulberg",
              city: "Lahore",
              area: "Gulberg",
              latitude: 31.5204,
              longitude: 74.3587,
            },
            contact: {
              name: "Usman Raza",
              phone: "+923008888888",
              relationship: "Brother",
            },
          }
        : {
            gender: "female",
            home: {
              label: "Home",
              address_line: "F-10",
              city: "Islamabad",
              area: "F-10",
              latitude: 33.6938,
              longitude: 73.0062,
            },
            work: {
              label: "University",
              address_line: "H-12",
              city: "Islamabad",
              area: "H-12",
              latitude: 33.6428,
              longitude: 72.9905,
            },
            contact: {
              name: "Hina Ahmed",
              phone: "+923007777777",
              relationship: "Sister",
            },
          };

  await supabaseAdmin
    .from("profiles")
    .update({
      gender: demo.gender,
      preferred_language: "en",
      marketing_opt_in: true,
      is_onboarded: true,
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  await supabaseAdmin
    .from("user_preferences")
    .upsert(
      {
        user_id: userId,
        theme: "system",
        language: "en",
        ride_updates: true,
        order_updates: true,
        promotion_notifications: true,
        email_notifications: true,
        sms_notifications: true,
        location_permission: "allowed",
        analytics_opt_in: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

  await supabaseAdmin.from("saved_addresses").delete().eq("user_id", userId);

  await supabaseAdmin.from("saved_addresses").insert([
    {
      user_id: userId,
      ...demo.home,
      country_code: "PK",
      instructions: "Call when outside.",
      is_default: true,
    },
    {
      user_id: userId,
      ...demo.work,
      country_code: "PK",
      is_default: false,
    },
  ]);

  await supabaseAdmin.from("emergency_contacts").delete().eq("user_id", userId);

  await supabaseAdmin.from("emergency_contacts").insert({
    user_id: userId,
    ...demo.contact,
    is_primary: true,
  });
}

async function seedDriverData(userId: string, email: string) {
  const isOne = email === "driver1@safari.com";
  const isTwo = email === "driver2@safari.com";

  const demo = isOne
    ? {
        city: "Karachi",
        license: "KHI-DL-100001",
        cnic: "42101-1111111-1",
        experience: 6,
        onboarding: "approved",
        verification: "verified",
        make: "Toyota",
        model: "Corolla",
        year: 2022,
        color: "White",
        plate: "BKR-101",
        category: "comfort",
        status: "verified",
      }
    : isTwo
      ? {
          city: "Lahore",
          license: "LHR-DL-200002",
          cnic: "35202-2222222-2",
          experience: 4,
          onboarding: "under_review",
          verification: "in_review",
          make: "Honda",
          model: "City",
          year: 2021,
          color: "Silver",
          plate: "LEA-202",
          category: "economy",
          status: "in_review",
        }
      : {
          city: "Islamabad",
          license: "ISB-DL-300003",
          cnic: "61101-3333333-3",
          experience: 3,
          onboarding: "submitted",
          verification: "pending",
          make: "Suzuki",
          model: "Swift",
          year: 2023,
          color: "Black",
          plate: "ICT-303",
          category: "economy",
          status: "pending",
        };

  await supabaseAdmin
    .from("profiles")
    .update({
      is_onboarded: demo.onboarding === "approved",
      status: "active",
      app_mode: "driver",
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  await supabaseAdmin
    .from("driver_profiles")
    .upsert(
      {
        user_id: userId,
        onboarding_status: demo.onboarding,
        verification_status: demo.verification,
        driving_experience_years: demo.experience,
        cnic_number: demo.cnic,
        driving_license_number: demo.license,
        driving_license_expiry: "2029-12-31",
        home_city: demo.city,
        operating_city: demo.city,
        service_region: `${demo.city} Metro`,
        emergency_contact_name: "Safari Demo Contact",
        emergency_contact_phone: "+923009000000",
        is_online: isOne,
        is_available: isOne,
        approved_at: isOne ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

  await supabaseAdmin.from("driver_vehicles").delete().eq("driver_id", userId);

  const { data: vehicle, error: vehicleError } = await supabaseAdmin
    .from("driver_vehicles")
    .insert({
      driver_id: userId,
      make: demo.make,
      model: demo.model,
      year: demo.year,
      color: demo.color,
      plate_number: demo.plate,
      vehicle_type: "car",
      ride_category: demo.category,
      seats: 4,
      registration_number: `REG-${demo.plate}`,
      registration_expiry: "2028-12-31",
      insurance_number: `INS-${demo.plate}`,
      insurance_expiry: "2028-06-30",
      verification_status: demo.status,
      is_primary: true,
      is_active: true,
    })
    .select("id")
    .single();

  if (vehicleError) throw vehicleError;

  await supabaseAdmin.from("driver_documents").delete().eq("driver_id", userId);

  const docStatus =
    demo.verification === "verified"
      ? "verified"
      : demo.verification === "in_review"
        ? "in_review"
        : "pending";

  await supabaseAdmin.from("driver_documents").insert([
    {
      driver_id: userId,
      document_type: "cnic_front",
      storage_path: `seed/${userId}/cnic-front-demo.jpg`,
      status: docStatus,
    },
    {
      driver_id: userId,
      document_type: "driving_license_front",
      storage_path: `seed/${userId}/license-front-demo.jpg`,
      expiry_date: "2029-12-31",
      status: docStatus,
    },
    {
      driver_id: userId,
      vehicle_id: vehicle.id,
      document_type: "vehicle_registration_front",
      storage_path: `seed/${userId}/vehicle-registration-demo.jpg`,
      expiry_date: "2028-12-31",
      status: docStatus,
    },
    {
      driver_id: userId,
      vehicle_id: vehicle.id,
      document_type: "vehicle_photo_front",
      storage_path: `seed/${userId}/vehicle-front-demo.jpg`,
      status: docStatus,
    },
  ]);

  await supabaseAdmin
    .from("driver_verification_events")
    .delete()
    .eq("driver_id", userId);

  await supabaseAdmin.from("driver_verification_events").insert({
    driver_id: userId,
    vehicle_id: vehicle.id,
    event_type:
      demo.onboarding === "approved"
        ? "driver_approved"
        : demo.onboarding === "under_review"
          ? "moved_to_review"
          : "submitted",
    note: "Safari seeded verification event.",
  });
}

async function seedRideCatalog() {
  const cities = [
    {
      country_code: "PK",
      city_code: "KHI",
      name: "Karachi",
      currency_code: "PKR",
      timezone: "Asia/Karachi",
      center_latitude: 24.8607,
      center_longitude: 67.0011,
    },
    {
      country_code: "PK",
      city_code: "LHE",
      name: "Lahore",
      currency_code: "PKR",
      timezone: "Asia/Karachi",
      center_latitude: 31.5204,
      center_longitude: 74.3587,
    },
    {
      country_code: "PK",
      city_code: "ISB",
      name: "Islamabad",
      currency_code: "PKR",
      timezone: "Asia/Karachi",
      center_latitude: 33.6844,
      center_longitude: 73.0479,
    },
  ];

  for (const city of cities) {
    const { data, error } = await supabaseAdmin
      .from("service_cities")
      .upsert(city, {
        onConflict: "country_code,city_code",
      })
      .select("*")
      .single();

    if (error) throw error;

    const bounds =
      city.city_code === "KHI"
        ? {
            min_latitude: 24.72,
            max_latitude: 25.15,
            min_longitude: 66.80,
            max_longitude: 67.35,
          }
        : city.city_code === "LHE"
          ? {
              min_latitude: 31.35,
              max_latitude: 31.70,
              min_longitude: 74.15,
              max_longitude: 74.55,
            }
          : {
              min_latitude: 33.52,
              max_latitude: 33.82,
              min_longitude: 72.80,
              max_longitude: 73.25,
            };

    await supabaseAdmin.from("service_zones").upsert(
      {
        city_id: data.id,
        name: `${city.name} Core`,
        code: "CORE",
        zone_type: "standard",
        is_active: true,
        ...bounds,
        pickup_allowed: true,
        dropoff_allowed: true,
      },
      {
        onConflict: "city_id,code",
      },
    );

    await supabaseAdmin.from("ride_service_settings").upsert(
      {
        city_id: data.id,
        max_pickup_radius_km: 20,
        max_trip_distance_km: city.city_code === "KHI" ? 100 : 80,
        max_quote_age_seconds: 300,
        allow_scheduled_rides: true,
        minimum_schedule_lead_minutes: 30,
        maximum_schedule_days: 7,
        allow_cash: true,
        allow_wallet: true,
        allow_card: false,
      },
      { onConflict: "city_id" },
    );
  }

  const categories = [
    {
      code: "economy",
      name: "Safari Go",
      description: "Affordable everyday rides.",
      passenger_capacity: 4,
      vehicle_type: "car",
      sort_order: 1,
      icon_key: "car",
      color_key: "green",
    },
    {
      code: "comfort",
      name: "Safari Comfort",
      description: "More comfort for everyday journeys.",
      passenger_capacity: 4,
      vehicle_type: "car",
      sort_order: 2,
      icon_key: "car-sport",
      color_key: "teal",
    },
    {
      code: "premium",
      name: "Safari Premium",
      description: "Premium vehicles and a refined ride experience.",
      passenger_capacity: 4,
      vehicle_type: "car",
      sort_order: 3,
      icon_key: "diamond",
      color_key: "black",
    },
    {
      code: "bike",
      name: "Safari Bike",
      description: "Quick solo rides for short city trips.",
      passenger_capacity: 1,
      vehicle_type: "bike",
      sort_order: 4,
      icon_key: "bicycle",
      color_key: "orange",
    },
    {
      code: "rickshaw",
      name: "Safari Rickshaw",
      description: "Convenient three-wheel city mobility.",
      passenger_capacity: 3,
      vehicle_type: "rickshaw",
      sort_order: 5,
      icon_key: "navigate",
      color_key: "yellow",
    },
    {
      code: "xl",
      name: "Safari XL",
      description: "More seats for groups and families.",
      passenger_capacity: 6,
      vehicle_type: "van",
      sort_order: 6,
      icon_key: "people",
      color_key: "blue",
    },
  ];

  for (const category of categories) {
    await supabaseAdmin.from("ride_categories").upsert(category, {
      onConflict: "code",
    });
  }

  const { data: cityRows, error: cityError } = await supabaseAdmin
    .from("service_cities")
    .select("*")
    .eq("country_code", "PK");

  if (cityError) throw cityError;

  const { data: categoryRows, error: categoryError } = await supabaseAdmin
    .from("ride_categories")
    .select("*");

  if (categoryError) throw categoryError;

  const priceTemplate: Record<string, any> = {
    economy: {
      base_fare: 120,
      minimum_fare: 180,
      per_km_rate: 42,
      per_minute_rate: 6,
      booking_fee: 20,
      cancellation_fee: 100,
      waiting_per_minute_rate: 8,
    },
    comfort: {
      base_fare: 180,
      minimum_fare: 260,
      per_km_rate: 55,
      per_minute_rate: 8,
      booking_fee: 30,
      cancellation_fee: 130,
      waiting_per_minute_rate: 10,
    },
    premium: {
      base_fare: 300,
      minimum_fare: 450,
      per_km_rate: 90,
      per_minute_rate: 12,
      booking_fee: 50,
      cancellation_fee: 200,
      waiting_per_minute_rate: 15,
    },
    bike: {
      base_fare: 60,
      minimum_fare: 100,
      per_km_rate: 24,
      per_minute_rate: 3,
      booking_fee: 10,
      cancellation_fee: 50,
      waiting_per_minute_rate: 4,
    },
    rickshaw: {
      base_fare: 80,
      minimum_fare: 130,
      per_km_rate: 30,
      per_minute_rate: 4,
      booking_fee: 10,
      cancellation_fee: 60,
      waiting_per_minute_rate: 5,
    },
    xl: {
      base_fare: 260,
      minimum_fare: 380,
      per_km_rate: 75,
      per_minute_rate: 10,
      booking_fee: 40,
      cancellation_fee: 180,
      waiting_per_minute_rate: 13,
    },
  };

  for (const city of cityRows) {
    for (const category of categoryRows) {
      const existing = await supabaseAdmin
        .from("ride_pricing_rules")
        .select("id")
        .eq("city_id", city.id)
        .eq("ride_category_id", category.id)
        .eq("is_active", true)
        .limit(1)
        .maybeSingle();

      if (existing.error) throw existing.error;

      if (!existing.data) {
        const template = priceTemplate[category.code];

        await supabaseAdmin.from("ride_pricing_rules").insert({
          city_id: city.id,
          ride_category_id: category.id,
          currency_code: "PKR",
          ...template,
          surge_enabled: true,
          default_surge_multiplier: 1,
          free_waiting_minutes: 3,
          is_active: true,
        });
      }
    }
  }
}

async function seedDemoRide(passengerId: string) {
  const { data: city, error: cityError } = await supabaseAdmin
    .from("service_cities")
    .select("*")
    .eq("city_code", "KHI")
    .single();

  if (cityError) throw cityError;

  const { data: category, error: categoryError } = await supabaseAdmin
    .from("ride_categories")
    .select("*")
    .eq("code", "economy")
    .single();

  if (categoryError) throw categoryError;

  const existing = await supabaseAdmin
    .from("rides")
    .select("id")
    .eq("passenger_id", passengerId)
    .eq("pickup_address", "DHA Phase 6, Karachi")
    .eq("dropoff_address", "Dolmen Mall Clifton, Karachi")
    .limit(1)
    .maybeSingle();

  if (existing.error) throw existing.error;

  if (existing.data) return;

  const { data: rideNumber, error: rideNumberError } =
    await supabaseAdmin.rpc("generate_safari_ride_number");

  if (rideNumberError) throw rideNumberError;

  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .insert({
      passenger_id: passengerId,
      city_id: city.id,
      ride_category_id: category.id,
      ride_number: rideNumber,
      ride_status: "completed",
      booking_type: "now",

      pickup_address: "DHA Phase 6, Karachi",
      pickup_latitude: 24.8012,
      pickup_longitude: 67.0716,

      dropoff_address: "Dolmen Mall Clifton, Karachi",
      dropoff_latitude: 24.8026,
      dropoff_longitude: 67.0287,

      estimated_distance_km: 7.3,
      estimated_duration_minutes: 22,

      currency_code: "PKR",
      estimated_fare: 560,
      final_fare: 540,

      payment_method: "cash",
      payment_status: "paid",

      requested_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      started_at: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
      completed_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    })
    .select("*")
    .single();

  if (rideError) throw rideError;

  await supabaseAdmin.from("ride_status_events").insert([
    {
      ride_id: ride.id,
      from_status: null,
      to_status: "requested",
      actor_type: "passenger",
      actor_user_id: passengerId,
      note: "Seed ride requested.",
    },
    {
      ride_id: ride.id,
      from_status: "requested",
      to_status: "in_progress",
      actor_type: "system",
      note: "Seed ride started.",
    },
    {
      ride_id: ride.id,
      from_status: "in_progress",
      to_status: "completed",
      actor_type: "system",
      note: "Seed ride completed.",
    },
  ]);
}


async function seedDriverLocations() {
  const driverSeeds = [
    {
      email: "driver1@safari.com",
      latitude: 24.8172,
      longitude: 67.0764,
      heading: 250,
      speed_kph: 0,
    },
    {
      email: "driver2@safari.com",
      latitude: 31.5254,
      longitude: 74.3500,
      heading: 90,
      speed_kph: 0,
    },
    {
      email: "driver3@safari.com",
      latitude: 33.6900,
      longitude: 73.0400,
      heading: 180,
      speed_kph: 0,
    },
  ];

  for (const item of driverSeeds) {
    const user = await findUser(item.email);

    if (!user) continue;

    await supabaseAdmin.from("driver_locations").upsert(
      {
        driver_id: user.id,
        ride_id: null,
        latitude: item.latitude,
        longitude: item.longitude,
        heading: item.heading,
        speed_kph: item.speed_kph,
        accuracy_meters: 10,
        is_online: true,
        recorded_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "driver_id",
      },
    );

    await supabaseAdmin.from("driver_match_preferences").upsert(
      {
        driver_id: user.id,
        max_pickup_distance_km: 12,
        auto_accept: false,
        accepts_economy: true,
        accepts_comfort: true,
        accepts_premium: true,
        accepts_bike: true,
        accepts_rickshaw: true,
        accepts_xl: true,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "driver_id",
      },
    );
  }
}


async function seedFoodModule() {
  const foodMerchant = await findUser("food@safari.com");
  if (!foodMerchant) return;

  const { data: karachi, error: cityError } = await supabaseAdmin
    .from("service_cities")
    .select("*")
    .eq("city_code", "KHI")
    .single();

  if (cityError) throw cityError;

  const restaurants = [
    {
      name: "Safari Kitchen",
      slug: "safari-kitchen-karachi",
      cuisine: "Pakistani · BBQ",
      description: "Fresh Pakistani favourites, grills and comfort meals.",
      address: "DHA Phase 6, Karachi",
      latitude: 24.8012,
      longitude: 67.0716,
      minimum_order: 350,
      delivery_fee: 99,
      estimated_delivery_min: 25,
      estimated_delivery_max: 40,
      is_featured: true,
    },
    {
      name: "Urban Burger Lab",
      slug: "urban-burger-lab-karachi",
      cuisine: "Burgers · Fast Food",
      description: "Smash burgers, loaded fries and shakes.",
      address: "Clifton, Karachi",
      latitude: 24.8138,
      longitude: 67.0303,
      minimum_order: 450,
      delivery_fee: 129,
      estimated_delivery_min: 30,
      estimated_delivery_max: 45,
      is_featured: true,
    },
    {
      name: "Green Bowl",
      slug: "green-bowl-karachi",
      cuisine: "Healthy · Salads",
      description: "Balanced bowls, wraps and lighter everyday meals.",
      address: "PECHS, Karachi",
      latitude: 24.8723,
      longitude: 67.0615,
      minimum_order: 300,
      delivery_fee: 89,
      estimated_delivery_min: 20,
      estimated_delivery_max: 35,
      is_featured: false,
    },
  ];

  for (const restaurantSeed of restaurants) {
    const { data: restaurant, error } = await supabaseAdmin
      .from("food_restaurants")
      .upsert(
        {
          merchant_user_id: foodMerchant.id,
          city_id: karachi.id,
          ...restaurantSeed,
          rating: 4.7,
          rating_count: 120,
          is_open: true,
          is_active: true,
        },
        {
          onConflict: "slug",
        },
      )
      .select("*")
      .single();

    if (error) throw error;

    const sectionNames =
      restaurantSeed.slug.includes("burger")
        ? ["Burgers", "Sides", "Drinks"]
        : restaurantSeed.slug.includes("green")
          ? ["Bowls", "Wraps", "Drinks"]
          : ["Popular", "BBQ", "Rice & Curry"];

    const sections: Record<string, string> = {};

    for (let index = 0; index < sectionNames.length; index += 1) {
      const name = sectionNames[index];

      const { data: section, error: sectionError } = await supabaseAdmin
        .from("food_menu_sections")
        .upsert(
          {
            restaurant_id: restaurant.id,
            name,
            sort_order: index + 1,
            is_active: true,
          },
          {
            onConflict: "restaurant_id,name",
          },
        )
        .select("*")
        .single();

      if (sectionError) throw sectionError;
      sections[name] = section.id;
    }

    await supabaseAdmin
      .from("food_menu_items")
      .delete()
      .eq("restaurant_id", restaurant.id);

    const menu =
      restaurantSeed.slug.includes("burger")
        ? [
            ["Classic Smash", "Beef smash burger with house sauce.", 690, "Burgers", true, false],
            ["Spicy Chicken Burger", "Crispy chicken, pickles and spicy mayo.", 620, "Burgers", true, false],
            ["Loaded Fries", "Fries with cheese sauce and jalapeños.", 390, "Sides", false, true],
            ["Chocolate Shake", "Rich chocolate shake.", 350, "Drinks", false, true],
          ]
        : restaurantSeed.slug.includes("green")
          ? [
              ["Chicken Power Bowl", "Grilled chicken, rice, greens and tahini.", 720, "Bowls", true, false],
              ["Falafel Bowl", "Falafel, hummus, greens and pickles.", 620, "Bowls", true, true],
              ["Chicken Wrap", "Grilled chicken wrap with fresh vegetables.", 590, "Wraps", false, false],
              ["Fresh Lemonade", "Fresh lemon and mint.", 250, "Drinks", false, true],
            ]
          : [
              ["Chicken Biryani", "Fragrant basmati rice with spiced chicken.", 480, "Popular", true, false],
              ["Chicken Tikka", "Char-grilled chicken tikka with chutney.", 560, "BBQ", true, false],
              ["Beef Seekh Kebab", "Smoky seekh kebabs with naan.", 620, "BBQ", false, false],
              ["Daal Chawal", "Comforting lentils with steamed rice.", 390, "Rice & Curry", false, true],
            ];

    for (const item of menu) {
      await supabaseAdmin.from("food_menu_items").insert({
        restaurant_id: restaurant.id,
        section_id: sections[item[3] as string],
        name: item[0],
        description: item[1],
        price: item[2],
        is_popular: item[4],
        is_vegetarian: item[5],
        is_available: true,
        preparation_minutes: 15,
      });
    }
  }
}

async function seedPhaseNine() {
  const passenger = await findUser("passenger1@safari.com");
  const driver = await findUser("driver1@safari.com");

  if (!passenger || !driver) return;

  const { data: ride, error: rideError } = await supabaseAdmin
    .from("rides")
    .select("*")
    .eq("passenger_id", passenger.id)
    .eq("ride_status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (rideError) throw rideError;
  if (!ride) return;

  await supabaseAdmin.from("ride_receipts").upsert(
    {
      ride_id: ride.id,
      passenger_id: passenger.id,
      driver_id: ride.driver_id ?? driver.id,
      currency_code: ride.currency_code,
      base_fare: 120,
      distance_fare: 300,
      time_fare: 80,
      booking_fee: 20,
      waiting_fee: 0,
      surge_amount: 20,
      discount_amount: 0,
      tip_amount: 0,
      subtotal: 520,
      total: Number(ride.final_fare ?? 540),
      payment_method: ride.payment_method,
      payment_status: ride.payment_status,
    },
    {
      onConflict: "ride_id",
    },
  );

  await supabaseAdmin.from("ride_ratings").upsert(
    {
      ride_id: ride.id,
      reviewer_id: passenger.id,
      reviewee_id: ride.driver_id ?? driver.id,
      reviewer_type: "passenger",
      rating: 5,
      comment: "Smooth demo ride.",
      tags: ["clean_car", "safe_driving", "professional"],
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "ride_id,reviewer_id",
    },
  );
}


async function seedCommerceModules() {
  const groceryMerchant = await findUser("grocery@safari.com");
  const pharmacyMerchant = await findUser("pharmacy@safari.com");

  const { data: karachi, error: cityError } = await supabaseAdmin
    .from("service_cities")
    .select("*")
    .eq("city_code", "KHI")
    .single();

  if (cityError) throw cityError;

  const categorySeeds = [
    ["grocery", "Fresh Produce", "fresh-produce", "leaf", 1],
    ["grocery", "Dairy & Eggs", "dairy-eggs", "basket", 2],
    ["grocery", "Pantry", "pantry", "cube", 3],
    ["grocery", "Beverages", "beverages", "water", 4],

    ["pharmacy", "Pain Relief", "pain-relief", "medical", 1],
    ["pharmacy", "Cold & Flu", "cold-flu", "thermometer", 2],
    ["pharmacy", "Vitamins", "vitamins", "fitness", 3],
    ["pharmacy", "Personal Care", "personal-care", "sparkles", 4],
  ];

  for (const row of categorySeeds) {
    await supabaseAdmin.from("commerce_categories").upsert(
      {
        store_type: row[0],
        name: row[1],
        slug: row[2],
        icon_key: row[3],
        sort_order: row[4],
        is_active: true,
      },
      {
        onConflict: "store_type,slug",
      },
    );
  }

  if (groceryMerchant) {
    const groceryStores = [
      {
        name: "Safari Mart",
        slug: "safari-mart-karachi",
        description: "Fresh groceries and everyday essentials.",
        address: "DHA Phase 6, Karachi",
        latitude: 24.8012,
        longitude: 67.0716,
        minimum_order: 500,
        delivery_fee: 99,
        estimated_delivery_min: 25,
        estimated_delivery_max: 40,
        is_featured: true,
      },
      {
        name: "Daily Basket",
        slug: "daily-basket-karachi",
        description: "Daily essentials, fresh produce and beverages.",
        address: "Clifton, Karachi",
        latitude: 24.8138,
        longitude: 67.0303,
        minimum_order: 400,
        delivery_fee: 79,
        estimated_delivery_min: 20,
        estimated_delivery_max: 35,
        is_featured: true,
      },
    ];

    for (const storeSeed of groceryStores) {
      const { data: store, error } = await supabaseAdmin
        .from("commerce_stores")
        .upsert(
          {
            merchant_user_id: groceryMerchant.id,
            city_id: karachi.id,
            store_type: "grocery",
            ...storeSeed,
            rating: 4.8,
            rating_count: 180,
            is_open: true,
            is_active: true,
          },
          {
            onConflict: "slug",
          },
        )
        .select("*")
        .single();

      if (error) throw error;

      await supabaseAdmin
        .from("commerce_products")
        .delete()
        .eq("store_id", store.id);

      const { data: cats } = await supabaseAdmin
        .from("commerce_categories")
        .select("*")
        .eq("store_type", "grocery");

      const catMap = new Map(cats?.map((c) => [c.slug, c.id]) ?? []);

      const products = [
        ["Fresh Bananas", "fresh-produce", "1 kg", 280, 80, false],
        ["Red Apples", "fresh-produce", "1 kg", 520, 60, false],
        ["Fresh Milk", "dairy-eggs", "1 litre", 310, 100, false],
        ["Farm Eggs", "dairy-eggs", "12 eggs", 420, 70, false],
        ["Basmati Rice", "pantry", "5 kg", 1650, 45, false],
        ["Mineral Water", "beverages", "1.5 litre", 120, 150, false],
      ];

      for (const item of products) {
        await supabaseAdmin.from("commerce_products").insert({
          store_id: store.id,
          category_id: catMap.get(item[1] as string) ?? null,
          name: item[0],
          unit_label: item[2],
          price: item[3],
          stock_quantity: item[4],
          requires_prescription: item[5],
          is_featured: true,
          is_available: true,
        });
      }
    }
  }

  if (pharmacyMerchant) {
    const { data: store, error } = await supabaseAdmin
      .from("commerce_stores")
      .upsert(
        {
          merchant_user_id: pharmacyMerchant.id,
          city_id: karachi.id,
          store_type: "pharmacy",
          name: "Safari Pharmacy",
          slug: "safari-pharmacy-karachi",
          description: "Health, wellness and pharmacy essentials.",
          address: "Clifton, Karachi",
          latitude: 24.8138,
          longitude: 67.0303,
          minimum_order: 300,
          delivery_fee: 89,
          estimated_delivery_min: 25,
          estimated_delivery_max: 45,
          rating: 4.9,
          rating_count: 96,
          is_featured: true,
          is_open: true,
          is_active: true,
        },
        {
          onConflict: "slug",
        },
      )
      .select("*")
      .single();

    if (error) throw error;

    await supabaseAdmin
      .from("commerce_products")
      .delete()
      .eq("store_id", store.id);

    const { data: cats } = await supabaseAdmin
      .from("commerce_categories")
      .select("*")
      .eq("store_type", "pharmacy");

    const catMap = new Map(cats?.map((c) => [c.slug, c.id]) ?? []);

    const products = [
      ["Paracetamol 500mg", "pain-relief", "20 tablets", 180, 120, false],
      ["Cold Relief Syrup", "cold-flu", "120 ml", 350, 50, false],
      ["Vitamin C", "vitamins", "30 tablets", 650, 60, false],
      ["Multivitamin Daily", "vitamins", "30 tablets", 920, 40, false],
      ["Prescription Medicine Demo", "pain-relief", "10 tablets", 850, 20, true],
      ["Hand Sanitizer", "personal-care", "250 ml", 390, 80, false],
    ];

    for (const item of products) {
      await supabaseAdmin.from("commerce_products").insert({
        store_id: store.id,
        category_id: catMap.get(item[1] as string) ?? null,
        name: item[0],
        unit_label: item[2],
        price: item[3],
        stock_quantity: item[4],
        requires_prescription: item[5],
        is_featured: true,
        is_available: true,
      });
    }
  }
}

async function seedServicesModule() {
  const servicesMerchant = await findUser("services@safari.com");
  if (!servicesMerchant) return;

  const { data: karachi, error: cityError } = await supabaseAdmin
    .from("service_cities")
    .select("*")
    .eq("city_code", "KHI")
    .single();

  if (cityError) throw cityError;

  const categories = [
    ["Home Cleaning", "home-cleaning", "Professional home cleaning.", "sparkles", 1],
    ["Car Care", "car-care", "At-home and workshop car care.", "car-sport", 2],
    ["AC & Electrical", "ac-electrical", "AC and electrical maintenance.", "flash", 3],
    ["Plumbing", "plumbing", "Home plumbing and repair.", "water", 4],
    ["Beauty at Home", "beauty-home", "Personal care at your location.", "person", 5],
  ];

  for (const category of categories) {
    await supabaseAdmin.from("service_categories").upsert(
      {
        name: category[0],
        slug: category[1],
        description: category[2],
        icon_key: category[3],
        sort_order: category[4],
        is_active: true,
      },
      {
        onConflict: "slug",
      },
    );
  }

  const providers = [
    {
      business_name: "Safari HomeCare",
      slug: "safari-homecare-karachi",
      description: "Trusted home cleaning and maintenance professionals.",
      phone: "+922111111111",
      address: "DHA, Karachi",
      rating: 4.8,
      rating_count: 142,
      is_featured: true,
    },
    {
      business_name: "Safari AutoCare",
      slug: "safari-autocare-karachi",
      description: "Professional car wash, detailing and maintenance.",
      phone: "+922122222222",
      address: "Clifton, Karachi",
      rating: 4.9,
      rating_count: 98,
      is_featured: true,
    },
  ];

  for (const providerSeed of providers) {
    const { data: provider, error } = await supabaseAdmin
      .from("service_providers")
      .upsert(
        {
          merchant_user_id: servicesMerchant.id,
          city_id: karachi.id,
          ...providerSeed,
          verification_status: "verified",
          is_active: true,
        },
        {
          onConflict: "slug",
        },
      )
      .select("*")
      .single();

    if (error) throw error;

    await supabaseAdmin
      .from("provider_services")
      .delete()
      .eq("provider_id", provider.id);

    const { data: cats } = await supabaseAdmin
      .from("service_categories")
      .select("*");

    const catMap = new Map(cats?.map((c) => [c.slug, c.id]) ?? []);

    const services =
      providerSeed.slug.includes("autocare")
        ? [
            ["Car Wash", "car-care", "Complete exterior wash.", "fixed", 1200, 45],
            ["Interior Detailing", "car-care", "Deep interior cleaning.", "starting_from", 2500, 90],
            ["Full Detailing", "car-care", "Complete interior and exterior detail.", "starting_from", 4500, 180],
          ]
        : [
            ["Standard Home Cleaning", "home-cleaning", "General home cleaning.", "starting_from", 1800, 120],
            ["Deep Home Cleaning", "home-cleaning", "Detailed deep cleaning.", "starting_from", 4500, 240],
            ["AC Service", "ac-electrical", "Standard split AC maintenance.", "fixed", 1800, 60],
            ["Electrician Visit", "ac-electrical", "Professional electrician visit.", "starting_from", 1000, 60],
            ["Plumber Visit", "plumbing", "Professional plumbing inspection.", "starting_from", 1000, 60],
          ];

    for (const service of services) {
      await supabaseAdmin.from("provider_services").insert({
        provider_id: provider.id,
        category_id: catMap.get(service[1] as string),
        name: service[0],
        description: service[2],
        pricing_type: service[3],
        price: service[4],
        currency_code: "PKR",
        duration_minutes: service[5],
        is_featured: true,
        is_available: true,
      });
    }
  }
}


async function seedPhase1315() {
  const seededUsers = [
    "passenger1@safari.com",
    "passenger2@safari.com",
    "passenger3@safari.com",
    "driver1@safari.com",
    "driver2@safari.com",
    "driver3@safari.com",
    "food@safari.com",
    "grocery@safari.com",
    "pharmacy@safari.com",
    "services@safari.com",
  ];

  for (const email of seededUsers) {
    const user = await findUser(email);
    if (!user) continue;

    await supabaseAdmin.from("wallet_accounts").upsert(
      {
        user_id: user.id,
        currency_code: "PKR",
        available_balance:
          email.startsWith("passenger") ? 2500 : 0,
        pending_balance: 0,
        status: "active",
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    );
  }

  const merchantSeeds = [
    ["food@safari.com", "food", "Safari Food Merchant"],
    ["grocery@safari.com", "grocery", "Safari Grocery Merchant"],
    ["pharmacy@safari.com", "pharmacy", "Safari Pharmacy Merchant"],
    ["services@safari.com", "services", "Safari Services Merchant"],
  ];

  for (const [email, merchantType, businessName] of merchantSeeds) {
    const user = await findUser(email);
    if (!user) continue;

    await supabaseAdmin.from("merchant_profiles").upsert(
      {
        user_id: user.id,
        merchant_type: merchantType,
        business_name: businessName,
        verification_status: "verified",
        commission_percent: 15,
        payout_status: "enabled",
        approved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    );
  }

  const passenger1 = await findUser("passenger1@safari.com");

  if (passenger1) {
    const { data: wallet } = await supabaseAdmin
      .from("wallet_accounts")
      .select("*")
      .eq("user_id", passenger1.id)
      .single();

    const hasTx = await supabaseAdmin
      .from("wallet_transactions")
      .select("id")
      .eq("wallet_user_id", passenger1.id)
      .eq("description", "Safari Phase 14 opening balance.")
      .limit(1)
      .maybeSingle();

    if (!hasTx.error && !hasTx.data) {
      await supabaseAdmin.from("wallet_transactions").insert({
        wallet_user_id: passenger1.id,
        transaction_type: "credit",
        source_type: "topup",
        amount: Number(wallet?.available_balance ?? 2500),
        currency_code: "PKR",
        status: "completed",
        description: "Safari Phase 14 opening balance.",
        balance_after: Number(wallet?.available_balance ?? 2500),
      });
    }

    await supabaseAdmin.from("notifications").delete().eq("user_id", passenger1.id);

    await supabaseAdmin.from("notifications").insert([
      {
        user_id: passenger1.id,
        notification_type: "ride",
        title: "Your Safari account is ready",
        body: "Ride, order and book services from one Safari account.",
        priority: "normal",
        data: {
          screen: "home",
        },
      },
      {
        user_id: passenger1.id,
        notification_type: "wallet",
        title: "Demo wallet added",
        body: "PKR 2,500 demo balance is available for Phase 14 testing.",
        priority: "normal",
        data: {
          screen: "wallet",
        },
      },
    ]);
  }
}


async function seedPhase1618() {
  const admin = await findUser(env.SEED_ADMIN_EMAIL);
  const passenger1 = await findUser("passenger1@safari.com");

  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);

  const [
    passengerCount,
    driverCount,
    merchantCount,
    rideRows,
    foodRows,
    commerceRows,
    serviceRows,
  ] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("account_type", "passenger"),

    supabaseAdmin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("account_type", "driver"),

    supabaseAdmin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("account_type", "merchant"),

    supabaseAdmin
      .from("rides")
      .select("ride_status,final_fare,estimated_fare,created_at")
      .gte("created_at", `${todayDate}T00:00:00.000Z`),

    supabaseAdmin
      .from("food_orders")
      .select("status,total,created_at")
      .gte("created_at", `${todayDate}T00:00:00.000Z`),

    supabaseAdmin
      .from("commerce_orders")
      .select("order_type,status,total,created_at")
      .gte("created_at", `${todayDate}T00:00:00.000Z`),

    supabaseAdmin
      .from("service_bookings")
      .select("booking_status,estimated_total,final_total,created_at")
      .gte("created_at", `${todayDate}T00:00:00.000Z`),
  ]);

  for (const result of [
    passengerCount,
    driverCount,
    merchantCount,
    rideRows,
    foodRows,
    commerceRows,
    serviceRows,
  ]) {
    if (result.error) throw result.error;
  }

  const rideData = rideRows.data ?? [];
  const foodData = foodRows.data ?? [];
  const commerceData = commerceRows.data ?? [];
  const serviceData = serviceRows.data ?? [];

  const ridesCreated = rideData.length;
  const ridesCompleted = rideData.filter(
    (ride) => ride.ride_status === "completed",
  ).length;

  const ridesCancelled = rideData.filter(
    (ride) => String(ride.ride_status).startsWith("cancelled"),
  ).length;

  const rideGmv = rideData
    .filter((ride) => ride.ride_status === "completed")
    .reduce(
      (sum, ride) =>
        sum + Number(ride.final_fare ?? ride.estimated_fare ?? 0),
      0,
    );

  const foodOrders = foodData.length;
  const foodGmv = foodData
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + Number(order.total ?? 0), 0);

  const groceryOrders = commerceData.filter(
    (order) => order.order_type === "grocery",
  ).length;

  const pharmacyOrders = commerceData.filter(
    (order) => order.order_type === "pharmacy",
  ).length;

  const commerceGmv = commerceData
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + Number(order.total ?? 0), 0);

  const serviceBookings = serviceData.length;

  const servicesGmv = serviceData
    .filter((booking) => booking.booking_status === "completed")
    .reduce(
      (sum, booking) =>
        sum +
        Number(
          booking.final_total ??
            booking.estimated_total ??
            0,
        ),
      0,
    );

  await supabaseAdmin
    .from("platform_daily_metrics")
    .upsert(
      {
        metric_date: todayDate,

        passenger_count: passengerCount.count ?? 0,
        driver_count: driverCount.count ?? 0,
        merchant_count: merchantCount.count ?? 0,

        rides_created: ridesCreated,
        rides_completed: ridesCompleted,
        rides_cancelled: ridesCancelled,

        food_orders: foodOrders,
        grocery_orders: groceryOrders,
        pharmacy_orders: pharmacyOrders,
        service_bookings: serviceBookings,

        gross_order_value:
          rideGmv +
          foodGmv +
          commerceGmv +
          servicesGmv,

        ride_gmv: rideGmv,
        commerce_gmv: foodGmv + commerceGmv,
        services_gmv: servicesGmv,

        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "metric_date",
      },
    );

  const existingIncident = await supabaseAdmin
    .from("operations_incidents")
    .select("id")
    .eq("title", "Phase 18 QA verification")
    .limit(1)
    .maybeSingle();

  if (!existingIncident.error && !existingIncident.data) {
    await supabaseAdmin
      .from("operations_incidents")
      .insert({
        incident_type: "system",
        severity: "low",
        title: "Phase 18 QA verification",
        description:
          "Seeded operations incident for admin workflow testing.",
        status: "open",
        assigned_admin_id: admin?.id ?? null,
      });
  }

  if (admin) {
    const auditExists = await supabaseAdmin
      .from("admin_audit_logs")
      .select("id")
      .eq("actor_user_id", admin.id)
      .eq("action", "phase18.seed")
      .limit(1)
      .maybeSingle();

    if (!auditExists.error && !auditExists.data) {
      await supabaseAdmin
        .from("admin_audit_logs")
        .insert({
          actor_user_id: admin.id,
          action: "phase18.seed",
          entity_type: "system",
          metadata: {
            message: "Safari Phase 16-18 QA seed completed.",
          },
        });
    }
  }

  if (passenger1) {
    const notificationExists = await supabaseAdmin
      .from("notifications")
      .select("id")
      .eq("user_id", passenger1.id)
      .eq("title", "Safari integration ready")
      .limit(1)
      .maybeSingle();

    if (!notificationExists.error && !notificationExists.data) {
      await supabaseAdmin
        .from("notifications")
        .insert({
          user_id: passenger1.id,
          notification_type: "system",
          title: "Safari integration ready",
          body:
            "Storage, operations analytics and final backend hardening are enabled.",
          priority: "normal",
          data: {
            phase: "16-18",
          },
        });
    }
  }
}

async function main() {
  await seedRideCatalog();

  let passenger1Id: string | null = null;

  for (const item of users) {
    const user = await upsertAuthUser(item);

    if (item.accountType === "passenger") {
      await seedPassengerData(user.id, item.email);

      if (item.email === "passenger1@safari.com") {
        passenger1Id = user.id;
      }
    }

    if (item.accountType === "driver") {
      await seedDriverData(user.id, item.email);
    }
  }

  if (passenger1Id) {
    await seedDemoRide(passenger1Id);
  }

  await seedDriverLocations();
  await seedFoodModule();
  await seedPhaseNine();
  await seedCommerceModules();
  await seedServicesModule();
  await seedPhase1315();
  await seedPhase1618();

  console.log("");
  console.log("Safari Phase 16-18 seed complete.");
  console.log("Demo password for ALL seeded accounts: safarimobile");
  console.log("");
  console.log("Ride catalog seeded for Karachi, Lahore and Islamabad.");
  console.log("Passenger 1 includes one completed demo ride.");
  console.log("Driver locations and matching preferences seeded.");
  console.log("Ride receipt/rating and Safari Food demo catalog seeded.");
  console.log("Grocery, Pharmacy and Services Marketplace demo catalogs seeded.");
  console.log("Merchants, wallets and demo notifications seeded.");
  console.log("Storage metadata, analytics metrics and QA operations seed completed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
