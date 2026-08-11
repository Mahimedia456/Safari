import type {
  AuditLog,
  SystemSettings,
} from "../types/settings";

export const initialSystemSettings: SystemSettings = {
  general: {
    platformName: "Safari",

    companyName: "Safari Technologies",

    defaultTimezone: "Asia/Karachi",

    defaultLanguage: "English",

    defaultCountry: "Pakistan",

    defaultCurrency: "PKR",

    supportEmail: "support@safari.com",

    supportPhone: "+92 21 111 723274",

    dateFormat: "DD/MM/YYYY",

    timeFormat: "12h",
  },

  mobileApps: {
    passenger: {
      android: {
        latestVersion: "1.0.0",

        minimumVersion: "1.0.0",

        forceUpdate: false,

        storeUrl: "",

        updateMessage:
          "A newer version of Safari is available.",
      },

      ios: {
        latestVersion: "1.0.0",

        minimumVersion: "1.0.0",

        forceUpdate: false,

        storeUrl: "",

        updateMessage:
          "A newer version of Safari is available.",
      },
    },

    driver: {
      android: {
        latestVersion: "1.0.0",

        minimumVersion: "1.0.0",

        forceUpdate: false,

        storeUrl: "",

        updateMessage:
          "Please update Safari Driver to continue.",
      },

      ios: {
        latestVersion: "1.0.0",

        minimumVersion: "1.0.0",

        forceUpdate: false,

        storeUrl: "",

        updateMessage:
          "Please update Safari Driver to continue.",
      },
    },
  },

  maintenance: {
    enabled: false,

    passengerAppDisabled: false,

    driverAppDisabled: false,

    merchantPanelDisabled: false,

    adminPanelDisabled: false,

    title:
      "Safari is temporarily unavailable",

    message:
      "We are performing scheduled maintenance. Please try again shortly.",

    scheduledStart: "",

    scheduledEnd: "",
  },

  auth: {
    otpLength: 6,

    otpExpiryMinutes: 5,

    otpResendSeconds: 60,

    maxOtpAttempts: 5,

    passwordMinLength: 8,

    requireUppercase: true,

    requireNumber: true,

    requireSpecialCharacter: false,

    sessionExpiryHours: 24,

    allowEmailLogin: true,

    allowPhoneLogin: true,

    allowGoogleLogin: false,

    allowAppleLogin: false,

    requirePhoneVerification: true,

    requireEmailVerification: false,
  },

  payments: {
    cashEnabled: true,

    cardEnabled: true,

    walletEnabled: true,

    bankTransferEnabled: true,

    allowNegativeWallet: false,

    minimumWalletTopup: 100,

    maximumWalletTopup: 100000,

    automaticRefundsEnabled: false,

    automaticPayoutsEnabled: false,

    driverPayoutMinimum: 1000,

    merchantPayoutMinimum: 5000,

    payoutProcessingDays: 2,
  },

  rides: {
    searchRadiusKm: 10,

    driverMatchingTimeoutSeconds: 20,

    maximumDriverMatchingAttempts: 5,

    pickupGraceMinutes: 5,

    defaultFreeWaitingMinutes: 3,

    scheduledRideMinimumLeadMinutes: 30,

    scheduledRideMaximumDays: 30,

    cancellationReasonRequired: true,

    passengerRatingRequired: false,

    driverRatingRequired: false,

    emergencyButtonEnabled: true,

    tripShareEnabled: true,

    driverDestinationEnabled: true,
  },

  marketplace: {
    foodOrderAutoAccept: false,

    groceryOrderAutoAccept: false,

    pharmacyOrderAutoAccept: false,

    servicesBookingAutoAccept: false,

    defaultPreparationMinutes: 25,

    merchantCancellationReasonRequired: true,

    customerCancellationReasonRequired: true,

    reviewsEnabled: true,

    tipsEnabled: true,

    scheduledOrdersEnabled: true,

    merchantChatEnabled: true,
  },

  notifications: {
    pushEnabled: true,

    emailEnabled: true,

    smsEnabled: true,

    whatsappEnabled: false,

    rideUpdatesEnabled: true,

    orderUpdatesEnabled: true,

    payoutUpdatesEnabled: true,

    promotionNotificationsEnabled: true,

    securityNotificationsEnabled: true,

    systemAnnouncementsEnabled: true,
  },

  uploads: {
    maxImageSizeMb: 10,

    maxDocumentSizeMb: 20,

    maxVideoSizeMb: 50,

    maxImagesPerProduct: 10,

    maxVehiclePhotos: 8,

    allowedImageExtensions: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    allowedDocumentExtensions: [
      "pdf",
      "jpg",
      "jpeg",
      "png",
    ],

    imageCompressionEnabled: true,
  },

  supportLegal: {
    helpCenterUrl:
      "https://safari.com/help",

    privacyPolicyUrl:
      "https://safari.com/privacy",

    termsUrl:
      "https://safari.com/terms",

    driverTermsUrl:
      "https://safari.com/driver-terms",

    merchantTermsUrl:
      "https://safari.com/merchant-terms",

    refundPolicyUrl:
      "https://safari.com/refunds",

    safetyUrl:
      "https://safari.com/safety",

    contactEmail:
      "support@safari.com",

    legalEmail:
      "legal@safari.com",

    companyAddress:
      "Safari Technologies",
  },

  features: {
    rides: true,

    food: true,

    grocery: true,

    pharmacy: true,

    services: true,

    wallet: true,

    rewards: true,

    referrals: true,

    scheduledRides: true,

    scheduledOrders: true,

    surgePricing: true,

    driverFreeRideProgram: true,

    passengerSafety: true,

    merchantPromotions: true,

    liveDriverTracking: true,
  },

  security: {
    auditLoggingEnabled: true,

    loginAuditEnabled: true,

    financialAuditEnabled: true,

    adminActionAuditEnabled: true,

    requireAdminMfa: false,

    maxLoginAttempts: 5,

    lockoutMinutes: 15,

    allowConcurrentSessions: true,

    sessionIdleTimeoutMinutes: 60,
  },
};

export const dummyAuditLogs: AuditLog[] = [
  {
    id: "AUD-1001",

    actorName:
      "Safari Super Admin",

    actorEmail:
      "superadmin@safari.com",

    action:
      "settings_update",

    module:
      "System Settings",

    description:
      "Updated driver matching timeout from 25 seconds to 20 seconds.",

    ipAddress:
      "192.168.1.22",

    createdAt:
      "2026-07-27T11:20:00",
  },

  {
    id: "AUD-1002",

    actorName:
      "Finance Team",

    actorEmail:
      "finance@safari.com",

    action:
      "payout_update",

    module: "Finance",

    description:
      "Approved driver payout PAY-DRV-1002.",

    ipAddress:
      "192.168.1.30",

    createdAt:
      "2026-07-27T10:10:00",
  },

  {
    id: "AUD-1003",

    actorName:
      "Safari Super Admin",

    actorEmail:
      "superadmin@safari.com",

    action:
      "region_update",

    module: "Regions",

    description:
      "Germany pharmacy merchant registration disabled.",

    ipAddress:
      "192.168.1.22",

    createdAt:
      "2026-07-27T09:15:00",
  },

  {
    id: "AUD-1004",

    actorName:
      "Platform Admin",

    actorEmail:
      "admin@safari.com",

    action:
      "pricing_update",

    module: "Pricing",

    description:
      "Updated Pakistan Economy ride pricing.",

    ipAddress:
      "192.168.1.41",

    createdAt:
      "2026-07-26T18:20:00",
  },
];