import type {
  ServiceArea,
  ServiceAvailability,
  ServiceBooking,
  ServiceCatalogItem,
  ServiceCategory,
  ServicePromotion,
  ServiceRefund,
  ServiceReview,
  ServiceStaff,
} from "../types/services";

export const dummyServiceBookings: ServiceBooking[] = [
  {
    id: "SB-10001",

    businessId: "ST-1005",
    businessName:
      "Sparkle Home Services",

    serviceId: "SV-1",
    serviceName:
      "Deep Home Cleaning",

    customerName:
      "Areeba Khan",

    customerPhone:
      "+92 300 1112233",

    staffId: "SSF-1",
    staffName:
      "Imran Shah",

    status: "assigned",

    scheduledDate:
      "2026-07-25",

    scheduledTime:
      "11:00",

    durationMinutes: 180,

    address:
      "Bahria Town Phase 8, Rawalpindi",

    price: 4500,

    discount: 500,

    serviceFee: 150,

    total: 4150,

    paymentMethod: "card",

    notes:
      "Customer requested eco-friendly cleaning products.",

    createdAt:
      "2026-07-24T10:20:00",
  },

  {
    id: "SB-10002",

    businessId: "ST-1005",
    businessName:
      "Sparkle Home Services",

    serviceId: "SV-2",
    serviceName:
      "AC Service",

    customerName:
      "Hamza Ali",

    customerPhone:
      "+92 321 7776655",

    status: "pending",

    scheduledDate:
      "2026-07-25",

    scheduledTime:
      "15:30",

    durationMinutes: 90,

    address:
      "DHA Phase 2, Islamabad",

    price: 2500,

    discount: 0,

    serviceFee: 100,

    total: 2600,

    paymentMethod: "cash",

    createdAt:
      "2026-07-24T12:10:00",
  },

  {
    id: "SB-10003",

    businessId: "ST-1005",
    businessName:
      "Sparkle Home Services",

    serviceId: "SV-3",
    serviceName:
      "Electrician Visit",

    customerName:
      "Sara Ahmed",

    customerPhone:
      "+92 333 8899122",

    staffId: "SSF-2",
    staffName:
      "Usman Tariq",

    status: "completed",

    scheduledDate:
      "2026-07-24",

    scheduledTime:
      "09:00",

    durationMinutes: 60,

    address:
      "PWD, Islamabad",

    price: 1800,

    discount: 0,

    serviceFee: 100,

    total: 1900,

    paymentMethod: "wallet",

    createdAt:
      "2026-07-23T18:20:00",
  },
];

export const dummyServiceCategories: ServiceCategory[] = [
  {
    id: "SC-1",
    businessId: "ST-1005",
    name: "Cleaning",
    active: true,
    sortOrder: 1,
  },
  {
    id: "SC-2",
    businessId: "ST-1005",
    name: "AC & Cooling",
    active: true,
    sortOrder: 2,
  },
  {
    id: "SC-3",
    businessId: "ST-1005",
    name: "Electrical",
    active: true,
    sortOrder: 3,
  },
  {
    id: "SC-4",
    businessId: "ST-1005",
    name: "Plumbing",
    active: true,
    sortOrder: 4,
  },
];

export const dummyServices: ServiceCatalogItem[] = [
  {
    id: "SV-1",

    businessId: "ST-1005",
    categoryId: "SC-1",

    name:
      "Deep Home Cleaning",

    description:
      "Complete home deep cleaning service.",

    price: 4500,

    durationMinutes: 180,

    active: true,

    homeService: true,
  },

  {
    id: "SV-2",

    businessId: "ST-1005",
    categoryId: "SC-2",

    name:
      "AC Service",

    description:
      "Standard AC inspection, cleaning and service.",

    price: 2500,

    durationMinutes: 90,

    active: true,

    homeService: true,
  },

  {
    id: "SV-3",

    businessId: "ST-1005",
    categoryId: "SC-3",

    name:
      "Electrician Visit",

    description:
      "General electrical repair and diagnosis visit.",

    price: 1800,

    durationMinutes: 60,

    active: true,

    homeService: true,
  },

  {
    id: "SV-4",

    businessId: "ST-1005",
    categoryId: "SC-4",

    name:
      "Emergency Plumbing",

    description:
      "Emergency plumbing inspection and minor repair.",

    price: 2200,

    durationMinutes: 75,

    active: false,

    homeService: true,
  },
];

export const dummyServiceStaff: ServiceStaff[] = [
  {
    id: "SSF-1",

    businessId: "ST-1005",

    name:
      "Imran Shah",

    phone:
      "+92 300 7722110",

    role:
      "Cleaning Specialist",

    active: true,

    rating: 4.8,

    completedBookings: 128,
  },

  {
    id: "SSF-2",

    businessId: "ST-1005",

    name:
      "Usman Tariq",

    phone:
      "+92 321 5511882",

    role:
      "Electrician",

    active: true,

    rating: 4.7,

    completedBookings: 94,
  },

  {
    id: "SSF-3",

    businessId: "ST-1005",

    name:
      "Ahmed Raza",

    phone:
      "+92 333 2219911",

    role:
      "AC Technician",

    active: true,

    rating: 4.9,

    completedBookings: 143,
  },
];

export const dummyServiceAvailability: ServiceAvailability[] = [
  {
    id: "SA-1",
    businessId: "ST-1005",
    day: "Monday",
    enabled: true,
    startTime: "09:00",
    endTime: "20:00",
  },
  {
    id: "SA-2",
    businessId: "ST-1005",
    day: "Tuesday",
    enabled: true,
    startTime: "09:00",
    endTime: "20:00",
  },
  {
    id: "SA-3",
    businessId: "ST-1005",
    day: "Wednesday",
    enabled: true,
    startTime: "09:00",
    endTime: "20:00",
  },
  {
    id: "SA-4",
    businessId: "ST-1005",
    day: "Thursday",
    enabled: true,
    startTime: "09:00",
    endTime: "20:00",
  },
  {
    id: "SA-5",
    businessId: "ST-1005",
    day: "Friday",
    enabled: true,
    startTime: "14:00",
    endTime: "21:00",
  },
  {
    id: "SA-6",
    businessId: "ST-1005",
    day: "Saturday",
    enabled: true,
    startTime: "10:00",
    endTime: "21:00",
  },
  {
    id: "SA-7",
    businessId: "ST-1005",
    day: "Sunday",
    enabled: false,
    startTime: "10:00",
    endTime: "18:00",
  },
];

export const dummyServiceAreas: ServiceArea[] = [
  {
    id: "SAR-1",
    businessId: "ST-1005",
    name: "Bahria Town",
    city: "Rawalpindi",
    radiusKm: 15,
    active: true,
  },
  {
    id: "SAR-2",
    businessId: "ST-1005",
    name: "DHA Islamabad",
    city: "Islamabad",
    radiusKm: 12,
    active: true,
  },
  {
    id: "SAR-3",
    businessId: "ST-1005",
    name: "PWD",
    city: "Islamabad",
    radiusKm: 8,
    active: true,
  },
];

export const dummyServiceReviews: ServiceReview[] = [
  {
    id: "SR-1",

    businessId: "ST-1005",

    customerName:
      "Maryam Ali",

    staffName:
      "Imran Shah",

    rating: 5,

    comment:
      "Very professional and the house looked excellent afterwards.",

    createdAt:
      "2026-07-23T18:30:00",
  },

  {
    id: "SR-2",

    businessId: "ST-1005",

    customerName:
      "Saad Khan",

    staffName:
      "Usman Tariq",

    rating: 4,

    comment:
      "Good service and arrived on time.",

    createdAt:
      "2026-07-22T12:10:00",
  },
];

export const dummyServicePromotions: ServicePromotion[] = [
  {
    id: "SPR-1",

    businessId: "ST-1005",

    title:
      "Home Care 15% Off",

    code:
      "HOME15",

    discountType:
      "percentage",

    discountValue: 15,

    active: true,

    startDate:
      "2026-07-01",

    endDate:
      "2026-07-31",
  },

  {
    id: "SPR-2",

    businessId: "ST-1005",

    title:
      "Rs 500 Service Discount",

    code:
      "SAVE500",

    discountType:
      "fixed",

    discountValue: 500,

    active: false,

    startDate:
      "2026-06-01",

    endDate:
      "2026-06-30",
  },
];

export const dummyServiceRefunds: ServiceRefund[] = [
  {
    id: "SREF-1",

    bookingId:
      "SB-10003",

    businessId:
      "ST-1005",

    amount: 500,

    reason:
      "Partial service issue",

    status:
      "pending",

    createdAt:
      "2026-07-24T11:30:00",
  },
];