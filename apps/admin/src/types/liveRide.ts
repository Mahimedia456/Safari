export type AdminLiveRide = {
  id: string;
  ride_number: string;
  ride_status: string;
  pickup_address: string;
  dropoff_address: string;
  passenger_id: string;
  driver_id: string | null;
  estimated_fare: number | string;
  currency_code: string;
  created_at: string;
  driver_location?: {
    latitude: number;
    longitude: number;
    heading: number | string | null;
    speed_kph: number | string | null;
    updated_at: string;
  } | null;
  ride_categories?: {
    code: string;
    name: string;
  };
  service_cities?: {
    name: string;
    city_code: string;
  };
};
