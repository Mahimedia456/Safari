export type DashboardAnalytics = {
  users: {
    passengers: number;
    drivers: number;
    merchants: number;
  };
  operations: {
    activeRides: number;
    openIncidents: number;
  };
  gmv: {
    rides: number;
    food: number;
    commerce: number;
    services: number;
    total: number;
  };
  incidents: OperationsIncident[];
};

export type DailyMetric = {
  metric_date: string;
  passenger_count: number;
  driver_count: number;
  merchant_count: number;
  rides_created: number;
  rides_completed: number;
  rides_cancelled: number;
  food_orders: number;
  grocery_orders: number;
  pharmacy_orders: number;
  service_bookings: number;
  gross_order_value: number | string;
  ride_gmv: number | string;
  commerce_gmv: number | string;
  services_gmv: number | string;
};

export type OperationsIncident = {
  id: string;
  incident_type: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  description: string | null;
  entity_type: string | null;
  entity_id: string | null;
  status: "open" | "investigating" | "resolved" | "dismissed";
  assigned_admin_id: string | null;
  resolved_at: string | null;
  created_at: string;
};
