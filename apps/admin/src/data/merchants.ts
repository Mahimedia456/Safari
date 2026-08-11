import type {
  Merchant,
} from "../types/merchant";

export const dummyMerchants: Merchant[] =
  [
    {
      id: "MER-1001",

      ownerName:
        "Ali Raza",

      businessName:
        "Burger District",

      email:
        "ali@burgerdistrict.pk",

      phone:
        "+92 300 1112233",

      type: "food",

      status:
        "approved",

      country:
        "Pakistan",

      city:
        "Lahore",

      address:
        "MM Alam Road, Gulberg III, Lahore",

      registeredAt:
        "2026-07-05",

      approvedAt:
        "2026-07-06",

      totalStores: 2,

      activeStores: 2,

      totalOrders: 1842,

      grossSales: 2895000,

      stores: [
        {
          id: "ST-1001",

          name:
            "Burger District Gulberg",

          type: "food",

          city:
            "Lahore",

          country:
            "Pakistan",

          status:
            "active",

          commissionPercentage:
            14,
        },

        {
          id: "ST-1002",

          name:
            "Burger District DHA",

          type: "food",

          city:
            "Lahore",

          country:
            "Pakistan",

          status:
            "active",

          commissionPercentage:
            16,
        },
      ],

      documents: [
        {
          id: "DOC-1",

          type:
            "identity",

          name:
            "Owner CNIC",

          number:
            "35202-1234567-1",

          status:
            "verified",
        },

        {
          id: "DOC-2",

          type:
            "business_registration",

          name:
            "Business Registration",

          number:
            "BR-928381",

          status:
            "verified",
        },

        {
          id: "DOC-3",

          type: "tax",

          name:
            "NTN Certificate",

          number:
            "NTN-229184",

          status:
            "verified",
        },
      ],

      bankDetails: {
        accountTitle:
          "Burger District Pvt Ltd",

        bankName:
          "Meezan Bank",

        accountNumber:
          "**** **** 8291",

        iban:
          "PK36MEZN0000123456789012",

        currency:
          "PKR",

        verified: true,
      },

      notes: [
        {
          id: "NOTE-1",

          text:
            "Merchant completed onboarding successfully.",

          author:
            "Safari Operations",

          createdAt:
            "2026-07-06T12:30:00",
        },
      ],

      activities: [
        {
          id: "ACT-1",

          title:
            "Merchant approved",

          description:
            "Application approved by Safari Admin.",

          createdAt:
            "2026-07-06T12:22:00",
        },

        {
          id: "ACT-2",

          title:
            "Application submitted",

          description:
            "Merchant submitted business details.",

          createdAt:
            "2026-07-05T17:10:00",
        },
      ],
    },

    {
      id: "MER-1002",

      ownerName:
        "Usman Shah",

      businessName:
        "Fresh Basket",

      email:
        "owner@freshbasket.pk",

      phone:
        "+92 301 6789012",

      type:
        "grocery",

      status:
        "pending",

      country:
        "Pakistan",

      city:
        "Islamabad",

      address:
        "F-7 Markaz, Islamabad",

      registeredAt:
        "2026-07-21",

      totalStores: 1,

      activeStores: 0,

      totalOrders: 0,

      grossSales: 0,

      stores: [
        {
          id: "ST-1003",

          name:
            "Fresh Basket F-7",

          type:
            "grocery",

          city:
            "Islamabad",

          country:
            "Pakistan",

          status:
            "pending",

          commissionPercentage:
            9,
        },
      ],

      documents: [
        {
          id: "DOC-4",

          type:
            "identity",

          name:
            "Owner CNIC",

          status:
            "verified",
        },

        {
          id: "DOC-5",

          type:
            "business_registration",

          name:
            "Business Registration",

          status:
            "pending",
        },

        {
          id: "DOC-6",

          type: "bank",

          name:
            "Bank Verification",

          status:
            "pending",
        },
      ],

      bankDetails: {
        accountTitle:
          "Fresh Basket",

        bankName:
          "HBL",

        accountNumber:
          "**** **** 1132",

        currency:
          "PKR",

        verified:
          false,
      },

      notes: [],

      activities: [
        {
          id: "ACT-3",

          title:
            "Application submitted",

          description:
            "New grocery merchant application received.",

          createdAt:
            "2026-07-21T10:15:00",
        },
      ],
    },

    {
      id: "MER-1003",

      ownerName:
        "Dr. Hamza Malik",

      businessName:
        "HealthFirst Pharmacy",

      email:
        "hamza@healthfirst.pk",

      phone:
        "+92 322 1114455",

      type:
        "pharmacy",

      status:
        "pending",

      country:
        "Pakistan",

      city:
        "Karachi",

      address:
        "Clifton Block 5, Karachi",

      registeredAt:
        "2026-07-22",

      totalStores: 1,

      activeStores: 0,

      totalOrders: 0,

      grossSales: 0,

      stores: [
        {
          id: "ST-1004",

          name:
            "HealthFirst Clifton",

          type:
            "pharmacy",

          city:
            "Karachi",

          country:
            "Pakistan",

          status:
            "pending",

          commissionPercentage:
            6.5,
        },
      ],

      documents: [
        {
          id: "DOC-7",

          type:
            "identity",

          name:
            "Owner Identity",

          status:
            "verified",
        },

        {
          id: "DOC-8",

          type:
            "license",

          name:
            "Pharmacy License",

          number:
            "PH-KHI-88721",

          expiryDate:
            "2027-05-30",

          status:
            "pending",
        },

        {
          id: "DOC-9",

          type:
            "business_registration",

          name:
            "Business Registration",

          status:
            "verified",
        },
      ],

      bankDetails: {
        accountTitle:
          "HealthFirst Pharmacy",

        bankName:
          "Bank Alfalah",

        accountNumber:
          "**** **** 8832",

        currency:
          "PKR",

        verified:
          true,
      },

      notes: [],

      activities: [
        {
          id: "ACT-4",

          title:
            "License uploaded",

          description:
            "Pharmacy license submitted for verification.",

          createdAt:
            "2026-07-22T15:30:00",
        },
      ],
    },

    {
      id: "MER-1004",

      ownerName:
        "Sana Ahmed",

      businessName:
        "Sparkle Home Services",

      email:
        "sana@sparklehome.pk",

      phone:
        "+92 333 7682211",

      type:
        "services",

      status:
        "approved",

      country:
        "Pakistan",

      city:
        "Rawalpindi",

      address:
        "Bahria Town Phase 7, Rawalpindi",

      registeredAt:
        "2026-06-15",

      approvedAt:
        "2026-06-17",

      totalStores: 1,

      activeStores: 1,

      totalOrders: 481,

      grossSales: 1580000,

      stores: [
        {
          id: "ST-1005",

          name:
            "Sparkle Home Services",

          type:
            "services",

          city:
            "Rawalpindi",

          country:
            "Pakistan",

          status:
            "active",

          commissionPercentage:
            12,
        },
      ],

      documents: [
        {
          id: "DOC-10",

          type:
            "identity",

          name:
            "Owner CNIC",

          status:
            "verified",
        },

        {
          id: "DOC-11",

          type:
            "business_registration",

          name:
            "Business Registration",

          status:
            "verified",
        },
      ],

      bankDetails: {
        accountTitle:
          "Sparkle Home Services",

        bankName:
          "UBL",

        accountNumber:
          "**** **** 7822",

        currency:
          "PKR",

        verified:
          true,
      },

      notes: [],

      activities: [],
    },

    {
      id: "MER-1005",

      ownerName:
        "Bilal Khan",

      businessName:
        "Pizza Republic",

      email:
        "bilal@pizzarepublic.pk",

      phone:
        "+92 310 9933112",

      type:
        "food",

      status:
        "suspended",

      country:
        "Pakistan",

      city:
        "Lahore",

      address:
        "Johar Town, Lahore",

      registeredAt:
        "2026-04-02",

      approvedAt:
        "2026-04-03",

      suspensionReason:
        "Multiple unresolved customer complaints.",

      totalStores: 3,

      activeStores: 0,

      totalOrders: 2181,

      grossSales: 3145000,

      stores: [
        {
          id: "ST-1006",

          name:
            "Pizza Republic Johar Town",

          type:
            "food",

          city:
            "Lahore",

          country:
            "Pakistan",

          status:
            "inactive",

          commissionPercentage:
            18,
        },
      ],

      documents: [],

      bankDetails: {
        accountTitle:
          "Pizza Republic",

        bankName:
          "MCB",

        accountNumber:
          "**** **** 9918",

        currency:
          "PKR",

        verified:
          true,
      },

      notes: [
        {
          id: "NOTE-2",

          text:
            "Account suspended pending dispute review.",

          author:
            "Operations Manager",

          createdAt:
            "2026-07-18T14:20:00",
        },
      ],

      activities: [],
    },

    {
      id: "MER-1006",

      ownerName:
        "Farhan Ali",

      businessName:
        "Quick Mart",

      email:
        "farhan@quickmart.pk",

      phone:
        "+92 321 8877662",

      type:
        "grocery",

      status:
        "rejected",

      country:
        "Pakistan",

      city:
        "Faisalabad",

      address:
        "D Ground, Faisalabad",

      registeredAt:
        "2026-07-10",

      rejectionReason:
        "Business registration document could not be verified.",

      totalStores: 1,

      activeStores: 0,

      totalOrders: 0,

      grossSales: 0,

      stores: [],

      documents: [
        {
          id: "DOC-12",

          type:
            "business_registration",

          name:
            "Business Registration",

          status:
            "rejected",
        },
      ],

      bankDetails: {
        accountTitle:
          "Quick Mart",

        bankName:
          "Allied Bank",

        accountNumber:
          "**** **** 7332",

        currency:
          "PKR",

        verified:
          false,
      },

      notes: [],

      activities: [],
    },

    {
      id: "MER-1007",

      ownerName:
        "Max Schneider",

      businessName:
        "Berlin Bites",

      email:
        "max@berlinbites.de",

      phone:
        "+49 151 2345678",

      type:
        "food",

      status:
        "approved",

      country:
        "Germany",

      city:
        "Berlin",

      address:
        "Alexanderplatz 8, Berlin",

      registeredAt:
        "2026-06-10",

      approvedAt:
        "2026-06-12",

      totalStores: 2,

      activeStores: 2,

      totalOrders: 923,

      grossSales: 28400,

      stores: [
        {
          id: "ST-1007",

          name:
            "Berlin Bites Mitte",

          type: "food",

          city:
            "Berlin",

          country:
            "Germany",

          status:
            "active",

          commissionPercentage:
            19,
        },
      ],

      documents: [],

      bankDetails: {
        accountTitle:
          "Berlin Bites GmbH",

        bankName:
          "Deutsche Bank",

        accountNumber:
          "**** **** 4812",

        iban:
          "DE89370400440532013000",

        currency:
          "EUR",

        verified:
          true,
      },

      notes: [],

      activities: [],
    },
  ];