export interface GeneralSettings {
  platformName: string;

  companyName: string;

  defaultTimezone: string;

  defaultLanguage: string;

  defaultCountry: string;

  defaultCurrency: string;

  supportEmail: string;

  supportPhone: string;

  dateFormat: string;

  timeFormat: "12h" | "24h";
}

export interface MobileAppPlatformSettings {
  latestVersion: string;

  minimumVersion: string;

  forceUpdate: boolean;

  storeUrl: string;

  updateMessage: string;
}

export interface MobileAppSettings {
  passenger: {
    android: MobileAppPlatformSettings;

    ios: MobileAppPlatformSettings;
  };

  driver: {
    android: MobileAppPlatformSettings;

    ios: MobileAppPlatformSettings;
  };
}

export interface MaintenanceSettings {
  enabled: boolean;

  passengerAppDisabled: boolean;

  driverAppDisabled: boolean;

  merchantPanelDisabled: boolean;

  adminPanelDisabled: boolean;

  title: string;

  message: string;

  scheduledStart?: string;

  scheduledEnd?: string;
}

export interface AuthSettings {
  otpLength: number;

  otpExpiryMinutes: number;

  otpResendSeconds: number;

  maxOtpAttempts: number;

  passwordMinLength: number;

  requireUppercase: boolean;

  requireNumber: boolean;

  requireSpecialCharacter: boolean;

  sessionExpiryHours: number;

  allowEmailLogin: boolean;

  allowPhoneLogin: boolean;

  allowGoogleLogin: boolean;

  allowAppleLogin: boolean;

  requirePhoneVerification: boolean;

  requireEmailVerification: boolean;
}

export interface PaymentSettings {
  cashEnabled: boolean;

  cardEnabled: boolean;

  walletEnabled: boolean;

  bankTransferEnabled: boolean;

  allowNegativeWallet: boolean;

  minimumWalletTopup: number;

  maximumWalletTopup: number;

  automaticRefundsEnabled: boolean;

  automaticPayoutsEnabled: boolean;

  driverPayoutMinimum: number;

  merchantPayoutMinimum: number;

  payoutProcessingDays: number;
}

export interface RideDefaultSettings {
  searchRadiusKm: number;

  driverMatchingTimeoutSeconds: number;

  maximumDriverMatchingAttempts: number;

  pickupGraceMinutes: number;

  defaultFreeWaitingMinutes: number;

  scheduledRideMinimumLeadMinutes: number;

  scheduledRideMaximumDays: number;

  cancellationReasonRequired: boolean;

  passengerRatingRequired: boolean;

  driverRatingRequired: boolean;

  emergencyButtonEnabled: boolean;

  tripShareEnabled: boolean;

  driverDestinationEnabled: boolean;
}

export interface MarketplaceDefaultSettings {
  foodOrderAutoAccept: boolean;

  groceryOrderAutoAccept: boolean;

  pharmacyOrderAutoAccept: boolean;

  servicesBookingAutoAccept: boolean;

  defaultPreparationMinutes: number;

  merchantCancellationReasonRequired: boolean;

  customerCancellationReasonRequired: boolean;

  reviewsEnabled: boolean;

  tipsEnabled: boolean;

  scheduledOrdersEnabled: boolean;

  merchantChatEnabled: boolean;
}

export interface NotificationSettings {
  pushEnabled: boolean;

  emailEnabled: boolean;

  smsEnabled: boolean;

  whatsappEnabled: boolean;

  rideUpdatesEnabled: boolean;

  orderUpdatesEnabled: boolean;

  payoutUpdatesEnabled: boolean;

  promotionNotificationsEnabled: boolean;

  securityNotificationsEnabled: boolean;

  systemAnnouncementsEnabled: boolean;
}

export interface UploadSettings {
  maxImageSizeMb: number;

  maxDocumentSizeMb: number;

  maxVideoSizeMb: number;

  maxImagesPerProduct: number;

  maxVehiclePhotos: number;

  allowedImageExtensions: string[];

  allowedDocumentExtensions: string[];

  imageCompressionEnabled: boolean;
}

export interface SupportLegalSettings {
  helpCenterUrl: string;

  privacyPolicyUrl: string;

  termsUrl: string;

  driverTermsUrl: string;

  merchantTermsUrl: string;

  refundPolicyUrl: string;

  safetyUrl: string;

  contactEmail: string;

  legalEmail: string;

  companyAddress: string;
}

export interface FeatureFlags {
  rides: boolean;

  food: boolean;

  grocery: boolean;

  pharmacy: boolean;

  services: boolean;

  wallet: boolean;

  rewards: boolean;

  referrals: boolean;

  scheduledRides: boolean;

  scheduledOrders: boolean;

  surgePricing: boolean;

  driverFreeRideProgram: boolean;

  passengerSafety: boolean;

  merchantPromotions: boolean;

  liveDriverTracking: boolean;
}

export interface SecuritySettings {
  auditLoggingEnabled: boolean;

  loginAuditEnabled: boolean;

  financialAuditEnabled: boolean;

  adminActionAuditEnabled: boolean;

  requireAdminMfa: boolean;

  maxLoginAttempts: number;

  lockoutMinutes: number;

  allowConcurrentSessions: boolean;

  sessionIdleTimeoutMinutes: number;
}

export type AuditAction =
  | "login"
  | "logout"
  | "settings_update"
  | "role_update"
  | "user_update"
  | "payout_update"
  | "refund_update"
  | "region_update"
  | "pricing_update";

export interface AuditLog {
  id: string;

  actorName: string;

  actorEmail: string;

  action: AuditAction;

  module: string;

  description: string;

  ipAddress: string;

  createdAt: string;
}

export interface SystemSettings {
  general: GeneralSettings;

  mobileApps: MobileAppSettings;

  maintenance: MaintenanceSettings;

  auth: AuthSettings;

  payments: PaymentSettings;

  rides: RideDefaultSettings;

  marketplace: MarketplaceDefaultSettings;

  notifications: NotificationSettings;

  uploads: UploadSettings;

  supportLegal: SupportLegalSettings;

  features: FeatureFlags;

  security: SecuritySettings;
}