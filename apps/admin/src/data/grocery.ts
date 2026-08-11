import type {
  GroceryBrand,
  GroceryCategory,
  GroceryOrder,
  GroceryProduct,
  GroceryPromotion,
  GroceryRefund,
  GrocerySubstitution,
} from "../types/grocery";

export const dummyGroceryOrders: GroceryOrder[] =
  [
    {
      id: "GO-10001",

      storeId: "ST-1003",

      storeName:
        "Fresh Basket F-7",

      customerName:
        "Hina Aslam",

      customerPhone:
        "+92 300 9988771",

      status: "picking",

      items: [
        {
          id: "GI-1",

          productId:
            "GP-1",

          name:
            "Nestle Milk",

          quantity: 2,

          unit: "1 L",

          unitPrice: 320,
        },

        {
          id: "GI-2",

          productId:
            "GP-2",

          name:
            "Farm Eggs",

          quantity: 1,

          unit:
            "12 pcs",

          unitPrice: 480,
        },
      ],

      subtotal: 1120,

      deliveryFee: 180,

      serviceFee: 50,

      discount: 100,

      total: 1250,

      paymentMethod: "card",

      deliveryAddress:
        "F-8/1, Islamabad",

      createdAt:
        "2026-07-24T11:20:00",
    },

    {
      id: "GO-10002",

      storeId: "ST-1003",

      storeName:
        "Fresh Basket F-7",

      customerName:
        "Saad Ahmed",

      customerPhone:
        "+92 321 7744221",

      status: "pending",

      items: [
        {
          id: "GI-3",

          productId:
            "GP-3",

          name:
            "Basmati Rice",

          quantity: 1,

          unit: "5 kg",

          unitPrice: 1850,
        },
      ],

      subtotal: 1850,

      deliveryFee: 150,

      serviceFee: 50,

      discount: 0,

      total: 2050,

      paymentMethod: "cash",

      deliveryAddress:
        "G-9/3, Islamabad",

      createdAt:
        "2026-07-24T12:05:00",
    },

    {
      id: "GO-10003",

      storeId: "ST-1003",

      storeName:
        "Fresh Basket F-7",

      customerName:
        "Areeba Khan",

      customerPhone:
        "+92 333 1188770",

      status: "delivered",

      items: [
        {
          id: "GI-4",

          productId:
            "GP-4",

          name:
            "Coca-Cola",

          quantity: 3,

          unit: "1.5 L",

          unitPrice: 220,
        },
      ],

      subtotal: 660,

      deliveryFee: 140,

      serviceFee: 30,

      discount: 0,

      total: 830,

      paymentMethod: "wallet",

      deliveryAddress:
        "Blue Area, Islamabad",

      createdAt:
        "2026-07-24T09:20:00",
    },
  ];

export const dummyGroceryCategories: GroceryCategory[] =
  [
    {
      id: "GC-1",
      storeId: "ST-1003",
      name: "Dairy & Eggs",
      active: true,
      sortOrder: 1,
    },

    {
      id: "GC-2",
      storeId: "ST-1003",
      name: "Rice & Flour",
      active: true,
      sortOrder: 2,
    },

    {
      id: "GC-3",
      storeId: "ST-1003",
      name: "Beverages",
      active: true,
      sortOrder: 3,
    },

    {
      id: "GC-4",
      storeId: "ST-1003",
      name: "Snacks",
      active: true,
      sortOrder: 4,
    },
  ];

export const dummyGroceryBrands: GroceryBrand[] =
  [
    {
      id: "GB-1",
      name: "Nestle",
      active: true,
    },

    {
      id: "GB-2",
      name: "Coca-Cola",
      active: true,
    },

    {
      id: "GB-3",
      name: "Guard",
      active: true,
    },

    {
      id: "GB-4",
      name: "Fresh Basket",
      active: true,
    },
  ];

export const dummyGroceryProducts: GroceryProduct[] =
  [
    {
      id: "GP-1",

      storeId: "ST-1003",

      categoryId: "GC-1",

      brandId: "GB-1",

      name:
        "Nestle Milk",

      sku:
        "NM-1L",

      unit: "1 L",

      price: 320,

      stock: 42,

      lowStockThreshold: 10,

      available: true,

      allowSubstitution: true,
    },

    {
      id: "GP-2",

      storeId: "ST-1003",

      categoryId: "GC-1",

      brandId: "GB-4",

      name:
        "Farm Eggs",

      sku:
        "EGG-12",

      unit:
        "12 pcs",

      price: 480,

      stock: 8,

      lowStockThreshold: 10,

      available: true,

      allowSubstitution: true,
    },

    {
      id: "GP-3",

      storeId: "ST-1003",

      categoryId: "GC-2",

      brandId: "GB-3",

      name:
        "Basmati Rice",

      sku:
        "RICE-5KG",

      unit: "5 kg",

      price: 1850,

      stock: 18,

      lowStockThreshold: 5,

      available: true,

      allowSubstitution: true,
    },

    {
      id: "GP-4",

      storeId: "ST-1003",

      categoryId: "GC-3",

      brandId: "GB-2",

      name:
        "Coca-Cola",

      sku:
        "COKE-15",

      unit: "1.5 L",

      price: 220,

      stock: 6,

      lowStockThreshold: 12,

      available: true,

      allowSubstitution: true,
    },

    {
      id: "GP-5",

      storeId: "ST-1003",

      categoryId: "GC-4",

      name:
        "Salted Chips",

      sku:
        "CHIPS-01",

      unit: "150 g",

      price: 190,

      stock: 0,

      lowStockThreshold: 10,

      available: false,

      allowSubstitution: true,
    },
  ];

export const dummyGrocerySubstitutions: GrocerySubstitution[] =
  [
    {
      id: "GS-1",

      orderId:
        "GO-10001",

      unavailableProductId:
        "GP-5",

      unavailableProductName:
        "Salted Chips",

      suggestedProductId:
        "GP-4",

      suggestedProductName:
        "Coca-Cola 1.5 L",

      customerDecision:
        "pending",
    },
  ];

export const dummyGroceryPromotions: GroceryPromotion[] =
  [
    {
      id: "GPR-1",

      storeId:
        "ST-1003",

      title:
        "Grocery Weekend Deal",

      code:
        "FRESH15",

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
      id: "GPR-2",

      storeId:
        "ST-1003",

      title:
        "Rs 250 Off",

      code:
        "SAVE250",

      discountType:
        "fixed",

      discountValue: 250,

      active: false,

      startDate:
        "2026-06-01",

      endDate:
        "2026-06-30",
    },
  ];

export const dummyGroceryRefunds: GroceryRefund[] =
  [
    {
      id:
        "GREF-1",

      orderId:
        "GO-10003",

      storeId:
        "ST-1003",

      amount: 220,

      reason:
        "Damaged bottle",

      status:
        "pending",

      createdAt:
        "2026-07-24T10:10:00",
    },
  ];