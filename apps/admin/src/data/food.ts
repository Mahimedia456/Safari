import type {
  FoodCategory,
  FoodMenuItem,
  FoodOrder,
  FoodPromotion,
  FoodRefund,
  FoodReview,
} from "../types/food";

export const dummyFoodOrders: FoodOrder[] =
  [
    {
      id: "FO-10001",

      restaurantId:
        "ST-1001",

      restaurantName:
        "Burger District Gulberg",

      customerName:
        "Ahmed Khan",

      customerPhone:
        "+92 300 1112233",

      status:
        "preparing",

      items: [
        {
          id: "FI-1",
          name:
            "Double Smash Burger",
          quantity: 2,
          unitPrice: 850,
          addons: [
            "Extra Cheese",
          ],
        },

        {
          id: "FI-2",
          name:
            "Loaded Fries",
          quantity: 1,
          unitPrice: 550,
        },
      ],

      subtotal: 2250,

      deliveryFee: 180,

      serviceFee: 70,

      discount: 200,

      total: 2300,

      paymentMethod:
        "card",

      deliveryAddress:
        "Gulberg III, Lahore",

      createdAt:
        "2026-07-24T12:20:00",
    },

    {
      id: "FO-10002",

      restaurantId:
        "ST-1002",

      restaurantName:
        "Burger District DHA",

      customerName:
        "Hassan Ali",

      customerPhone:
        "+92 301 5552211",

      status:
        "pending",

      items: [
        {
          id: "FI-3",

          name:
            "Classic Beef Burger",

          quantity: 1,

          unitPrice: 720,
        },
      ],

      subtotal: 720,

      deliveryFee: 150,

      serviceFee: 40,

      discount: 0,

      total: 910,

      paymentMethod:
        "cash",

      deliveryAddress:
        "DHA Phase 6, Lahore",

      createdAt:
        "2026-07-24T12:40:00",
    },

    {
      id: "FO-10003",

      restaurantId:
        "ST-1001",

      restaurantName:
        "Burger District Gulberg",

      customerName:
        "Ayesha Noor",

      customerPhone:
        "+92 321 8822111",

      status:
        "delivered",

      items: [
        {
          id: "FI-4",

          name:
            "Crispy Chicken Burger",

          quantity: 2,

          unitPrice: 690,
        },
      ],

      subtotal: 1380,

      deliveryFee: 170,

      serviceFee: 50,

      discount: 150,

      total: 1450,

      paymentMethod:
        "wallet",

      deliveryAddress:
        "Model Town, Lahore",

      createdAt:
        "2026-07-24T10:30:00",
    },
  ];

export const dummyFoodCategories: FoodCategory[] =
  [
    {
      id: "FC-1",
      restaurantId:
        "ST-1001",
      name: "Burgers",
      active: true,
      sortOrder: 1,
    },

    {
      id: "FC-2",
      restaurantId:
        "ST-1001",
      name: "Sides",
      active: true,
      sortOrder: 2,
    },

    {
      id: "FC-3",
      restaurantId:
        "ST-1001",
      name: "Drinks",
      active: true,
      sortOrder: 3,
    },
  ];

export const dummyFoodMenuItems: FoodMenuItem[] =
  [
    {
      id: "FM-1",

      restaurantId:
        "ST-1001",

      categoryId: "FC-1",

      name:
        "Double Smash Burger",

      description:
        "Double beef patties, cheddar cheese and house sauce.",

      price: 850,

      available: true,

      preparationMinutes: 18,

      addons: [
        "Extra Cheese",
        "Jalapenos",
        "Extra Patty",
      ],

      variants: [
        "Regular",
        "Large",
      ],
    },

    {
      id: "FM-2",

      restaurantId:
        "ST-1001",

      categoryId: "FC-1",

      name:
        "Crispy Chicken Burger",

      description:
        "Crispy chicken fillet with lettuce and spicy mayo.",

      price: 690,

      available: true,

      preparationMinutes: 15,

      addons: [
        "Cheese",
        "Extra Sauce",
      ],

      variants: [
        "Regular",
      ],
    },

    {
      id: "FM-3",

      restaurantId:
        "ST-1001",

      categoryId: "FC-2",

      name:
        "Loaded Fries",

      description:
        "Crispy fries loaded with cheese and sauce.",

      price: 550,

      available: true,

      preparationMinutes: 12,

      addons: [
        "Extra Cheese",
      ],

      variants: [
        "Regular",
        "Large",
      ],
    },
  ];

export const dummyFoodPromotions: FoodPromotion[] =
  [
    {
      id: "FP-1",

      restaurantId:
        "ST-1001",

      title:
        "Weekend 20% Off",

      code:
        "WEEKEND20",

      discountType:
        "percentage",

      discountValue: 20,

      active: true,

      startDate:
        "2026-07-01",

      endDate:
        "2026-07-31",
    },

    {
      id: "FP-2",

      restaurantId:
        "ST-1001",

      title:
        "Rs 300 Off",

      code:
        "SAVE300",

      discountType:
        "fixed",

      discountValue: 300,

      active: false,

      startDate:
        "2026-06-01",

      endDate:
        "2026-06-30",
    },
  ];

export const dummyFoodReviews: FoodReview[] =
  [
    {
      id: "FR-1",

      restaurantId:
        "ST-1001",

      customerName:
        "Hamza",

      rating: 5,

      comment:
        "Food was fresh and delivery was quick.",

      createdAt:
        "2026-07-23T17:30:00",
    },

    {
      id: "FR-2",

      restaurantId:
        "ST-1001",

      customerName:
        "Maryam",

      rating: 4,

      comment:
        "Burger was excellent. Fries could be hotter.",

      createdAt:
        "2026-07-22T15:15:00",
    },
  ];

export const dummyFoodRefunds: FoodRefund[] =
  [
    {
      id: "FREF-1",

      orderId:
        "FO-10003",

      restaurantId:
        "ST-1001",

      amount: 350,

      reason:
        "Missing item",

      status:
        "pending",

      createdAt:
        "2026-07-24T11:10:00",
    },
  ];