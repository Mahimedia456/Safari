import type {
  PharmacyCategory,
  PharmacyLicense,
  PharmacyOrder,
  PharmacyPrescription,
  PharmacyProduct,
  PharmacyPromotion,
  PharmacyRefund,
} from "../types/pharmacy";

export const dummyPharmacyOrders: PharmacyOrder[] = [
  {
    id: "PO-10001",
    pharmacyId: "ST-1004",
    pharmacyName: "HealthFirst Clifton",
    customerName: "Sara Khan",
    customerPhone: "+92 300 1112233",
    status: "processing",

    items: [
      {
        id: "PI-1",
        productId: "PP-1",
        name: "Panadol Extra",
        quantity: 2,
        unitPrice: 180,
        prescriptionRequired: false,
      },
      {
        id: "PI-2",
        productId: "PP-2",
        name: "Augmentin 625mg",
        quantity: 1,
        unitPrice: 950,
        prescriptionRequired: true,
      },
    ],

    subtotal: 1310,
    deliveryFee: 160,
    serviceFee: 40,
    discount: 100,
    total: 1410,

    paymentMethod: "card",
    deliveryAddress: "Clifton Block 2, Karachi",

    prescriptionId: "PR-1001",

    createdAt: "2026-07-24T11:10:00",
  },

  {
    id: "PO-10002",
    pharmacyId: "ST-1004",
    pharmacyName: "HealthFirst Clifton",
    customerName: "Ahmed Raza",
    customerPhone: "+92 321 8877221",
    status: "pending",

    items: [
      {
        id: "PI-3",
        productId: "PP-3",
        name: "Vitamin D3",
        quantity: 1,
        unitPrice: 720,
        prescriptionRequired: false,
      },
    ],

    subtotal: 720,
    deliveryFee: 150,
    serviceFee: 30,
    discount: 0,
    total: 900,

    paymentMethod: "cash",
    deliveryAddress: "DHA Phase 6, Karachi",

    createdAt: "2026-07-24T12:20:00",
  },

  {
    id: "PO-10003",
    pharmacyId: "ST-1004",
    pharmacyName: "HealthFirst Clifton",
    customerName: "Ali Hamza",
    customerPhone: "+92 333 5566771",
    status: "delivered",

    items: [
      {
        id: "PI-4",
        productId: "PP-4",
        name: "Cetirizine 10mg",
        quantity: 1,
        unitPrice: 140,
        prescriptionRequired: false,
      },
    ],

    subtotal: 140,
    deliveryFee: 120,
    serviceFee: 20,
    discount: 0,
    total: 280,

    paymentMethod: "wallet",
    deliveryAddress: "PECHS, Karachi",

    createdAt: "2026-07-24T09:30:00",
  },
];

export const dummyPharmacyCategories: PharmacyCategory[] = [
  {
    id: "PC-1",
    pharmacyId: "ST-1004",
    name: "Pain Relief",
    active: true,
    sortOrder: 1,
  },
  {
    id: "PC-2",
    pharmacyId: "ST-1004",
    name: "Antibiotics",
    active: true,
    sortOrder: 2,
  },
  {
    id: "PC-3",
    pharmacyId: "ST-1004",
    name: "Vitamins",
    active: true,
    sortOrder: 3,
  },
  {
    id: "PC-4",
    pharmacyId: "ST-1004",
    name: "Allergy",
    active: true,
    sortOrder: 4,
  },
];

export const dummyPharmacyProducts: PharmacyProduct[] = [
  {
    id: "PP-1",
    pharmacyId: "ST-1004",
    categoryId: "PC-1",

    name: "Panadol Extra",
    genericName: "Paracetamol + Caffeine",

    sku: "PAN-EX-20",
    dosage: "500mg",
    packSize: "20 tablets",

    price: 180,

    stock: 82,
    lowStockThreshold: 15,

    prescriptionRequired: false,
    available: true,
  },

  {
    id: "PP-2",
    pharmacyId: "ST-1004",
    categoryId: "PC-2",

    name: "Augmentin 625mg",
    genericName: "Amoxicillin + Clavulanate",

    sku: "AUG-625",
    dosage: "625mg",
    packSize: "6 tablets",

    price: 950,

    stock: 8,
    lowStockThreshold: 10,

    prescriptionRequired: true,
    available: true,
  },

  {
    id: "PP-3",
    pharmacyId: "ST-1004",
    categoryId: "PC-3",

    name: "Vitamin D3",
    genericName: "Cholecalciferol",

    sku: "VD3-1000",
    dosage: "1000 IU",
    packSize: "30 tablets",

    price: 720,

    stock: 26,
    lowStockThreshold: 8,

    prescriptionRequired: false,
    available: true,
  },

  {
    id: "PP-4",
    pharmacyId: "ST-1004",
    categoryId: "PC-4",

    name: "Cetirizine 10mg",
    genericName: "Cetirizine Hydrochloride",

    sku: "CET-10",
    dosage: "10mg",
    packSize: "10 tablets",

    price: 140,

    stock: 4,
    lowStockThreshold: 10,

    prescriptionRequired: false,
    available: true,
  },
];

export const dummyPharmacyPrescriptions: PharmacyPrescription[] = [
  {
    id: "PR-1001",

    orderId: "PO-10001",

    pharmacyId: "ST-1004",

    customerName: "Sara Khan",

    doctorName: "Dr. Adeel Hassan",

    imageName: "prescription-sara-1001.jpg",

    status: "pending",

    submittedAt: "2026-07-24T10:50:00",
  },

  {
    id: "PR-1002",

    pharmacyId: "ST-1004",

    customerName: "Noman Ali",

    doctorName: "Dr. Kamran Shah",

    imageName: "prescription-noman-1002.jpg",

    status: "approved",

    notes: "Prescription verified.",

    submittedAt: "2026-07-23T16:15:00",

    reviewedAt: "2026-07-23T16:32:00",
  },
];

export const dummyPharmacyLicense: PharmacyLicense = {
  id: "PL-1001",

  pharmacyId: "ST-1004",

  licenseNumber: "PH-KHI-88721",

  authority: "Drug Regulatory Authority",

  issuedAt: "2025-05-30",

  expiresAt: "2027-05-30",

  status: "valid",

  verified: true,
};

export const dummyPharmacyPromotions: PharmacyPromotion[] = [
  {
    id: "PHP-1",

    pharmacyId: "ST-1004",

    title: "Health Essentials 10% Off",

    code: "HEALTH10",

    discountType: "percentage",

    discountValue: 10,

    active: true,

    startDate: "2026-07-01",

    endDate: "2026-07-31",
  },
];

export const dummyPharmacyRefunds: PharmacyRefund[] = [
  {
    id: "PHREF-1",

    orderId: "PO-10003",

    pharmacyId: "ST-1004",

    amount: 140,

    reason: "Incorrect item delivered",

    status: "pending",

    createdAt: "2026-07-24T10:40:00",
  },
];