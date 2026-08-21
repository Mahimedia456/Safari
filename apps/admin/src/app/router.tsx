import {
  createBrowserRouter,
} from "react-router-dom";

/* ======================================================
   AUTH / GUARDS
====================================================== */

import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleRouteGuard from "../components/auth/RoleRouteGuard";
import StoreActionGuard from "../components/auth/StoreActionGuard";

/* ======================================================
   LAYOUTS
====================================================== */

import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";

/* ======================================================
   AUTH PAGES
====================================================== */

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

/* ======================================================
   COMMON
====================================================== */

import AccessDeniedPage from "../pages/AccessDeniedPage";
import NotFoundPage from "../pages/NotFoundPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

/* ======================================================
   MERCHANT ADMIN
====================================================== */

import MerchantsPage from "../pages/merchants/MerchantsPage";
import MerchantApplicationsPage from "../pages/merchants/MerchantApplicationsPage";
import MerchantDetailPage from "../pages/merchants/MerchantDetailPage";

/* ======================================================
   MERCHANT PORTAL

   IMPORTANT:
   Merchant payout page has its own unique import name.
====================================================== */

import MerchantEarningsPage from "../pages/merchant/MerchantEarningsPage";

import MerchantPortalPayoutsPage from "../pages/merchant/MerchantPayoutsPage";

import MerchantStoreSettingsPage from "../pages/merchant/MerchantStoreSettingsPage";

/* ======================================================
   STORES
====================================================== */

import StoresPage from "../pages/stores/StoresPage";
import StoreCreatePage from "../pages/stores/StoreCreatePage";
import StoreDetailPage from "../pages/stores/StoreDetailPage";
import StoreEditPage from "../pages/stores/StoreEditPage";

/* ======================================================
   FOOD
====================================================== */

import FoodDashboardPage from "../pages/food/FoodDashboardPage";
import FoodOrdersPage from "../pages/food/FoodOrdersPage";
import FoodOrderDetailPage from "../pages/food/FoodOrderDetailPage";
import FoodMenuPage from "../pages/food/FoodMenuPage";
import FoodCategoriesPage from "../pages/food/FoodCategoriesPage";
import FoodPromotionsPage from "../pages/food/FoodPromotionsPage";
import FoodReviewsPage from "../pages/food/FoodReviewsPage";
import FoodRefundsPage from "../pages/food/FoodRefundsPage";

/* ======================================================
   GROCERY
====================================================== */

import GroceryDashboardPage from "../pages/grocery/GroceryDashboardPage";
import GroceryOrdersPage from "../pages/grocery/GroceryOrdersPage";
import GroceryOrderDetailPage from "../pages/grocery/GroceryOrderDetailPage";
import GroceryProductsPage from "../pages/grocery/GroceryProductsPage";
import GroceryCategoriesPage from "../pages/grocery/GroceryCategoriesPage";
import GroceryBrandsPage from "../pages/grocery/GroceryBrandsPage";
import GroceryInventoryPage from "../pages/grocery/GroceryInventoryPage";
import GrocerySubstitutionsPage from "../pages/grocery/GrocerySubstitutionsPage";
import GroceryPromotionsPage from "../pages/grocery/GroceryPromotionsPage";
import GroceryRefundsPage from "../pages/grocery/GroceryRefundsPage";

/* ======================================================
   PHARMACY
====================================================== */

import PharmacyDashboardPage from "../pages/pharmacy/PharmacyDashboardPage";
import PharmacyOrdersPage from "../pages/pharmacy/PharmacyOrdersPage";
import PharmacyOrderDetailPage from "../pages/pharmacy/PharmacyOrderDetailPage";
import PharmacyProductsPage from "../pages/pharmacy/PharmacyProductsPage";
import PharmacyCategoriesPage from "../pages/pharmacy/PharmacyCategoriesPage";
import PharmacyInventoryPage from "../pages/pharmacy/PharmacyInventoryPage";
import PharmacyPrescriptionsPage from "../pages/pharmacy/PharmacyPrescriptionsPage";
import PharmacyPrescriptionDetailPage from "../pages/pharmacy/PharmacyPrescriptionDetailPage";
import PharmacyLicensePage from "../pages/pharmacy/PharmacyLicensePage";
import PharmacyPromotionsPage from "../pages/pharmacy/PharmacyPromotionsPage";
import PharmacyRefundsPage from "../pages/pharmacy/PharmacyRefundsPage";

/* ======================================================
   SERVICES
====================================================== */

import ServicesDashboardPage from "../pages/services/ServicesDashboardPage";
import ServiceBookingsPage from "../pages/services/ServiceBookingsPage";
import ServiceBookingDetailPage from "../pages/services/ServiceBookingDetailPage";
import ServiceCatalogPage from "../pages/services/ServiceCatalogPage";
import ServiceCategoriesPage from "../pages/services/ServiceCategoriesPage";
import ServiceStaffPage from "../pages/services/ServiceStaffPage";
import ServiceAvailabilityPage from "../pages/services/ServiceAvailabilityPage";
import ServiceAreasPage from "../pages/services/ServiceAreasPage";
import ServiceReviewsPage from "../pages/services/ServiceReviewsPage";
import ServicePromotionsPage from "../pages/services/ServicePromotionsPage";
import ServiceRefundsPage from "../pages/services/ServiceRefundsPage";

/* ======================================================
   RIDES
====================================================== */

import RideDashboardPage from "../pages/rides/RideDashboardPage";
import RidesPage from "../pages/rides/RidesPage";
import ActiveRidesPage from "../pages/rides/ActiveRidesPage";
import RideDetailPage from "../pages/rides/RideDetailPage";
import RideDispatchPage from "../pages/rides/RideDispatchPage";
import ScheduledRidesPage from "../pages/rides/ScheduledRidesPage";
import CancelledRidesPage from "../pages/rides/CancelledRidesPage";
import RideIncidentsPage from "../pages/rides/RideIncidentsPage";

/* ======================================================
   PRICING
====================================================== */

import PricingDashboardPage from "../pages/pricing/PricingDashboardPage";
import PakistanPricingPage from "../pages/pricing/PakistanPricingPage";
import DriverCommissionPage from "../pages/pricing/DriverCommissionPage";
import FreeRideProgramPage from "../pages/pricing/FreeRideProgramPage";
import SurgePricingPage from "../pages/pricing/SurgePricingPage";
import FareCalculatorPage from "../pages/pricing/FareCalculatorPage";

/* ======================================================
   DRIVERS
====================================================== */

import DriverDashboardPage from "../pages/drivers/DriverDashboardPage";
import DriversPage from "../pages/drivers/DriversPage";
import DriverDetailPage from "../pages/drivers/DriverDetailPage";
import DriverApplicationsPage from "../pages/drivers/DriverApplicationsPage";
import DriverApplicationDetailPage from "../pages/drivers/DriverApplicationDetailPage";
import DriverDocumentsPage from "../pages/drivers/DriverDocumentsPage";
import DriverVehiclesPage from "../pages/drivers/DriverVehiclesPage";
import DriverVehicleDetailPage from "../pages/drivers/DriverVehicleDetailPage";
import OnlineDriversPage from "../pages/drivers/OnlineDriversPage";
import SuspendedDriversPage from "../pages/drivers/SuspendedDriversPage";
import DriverRatingsPage from "../pages/drivers/DriverRatingsPage";
import DriverWalletsPage from "../pages/drivers/DriverWalletsPage";

/* ======================================================
   PASSENGERS
====================================================== */

import PassengerDashboardPage from "../pages/passengers/PassengerDashboardPage";
import PassengersPage from "../pages/passengers/PassengersPage";
import PassengerDetailPage from "../pages/passengers/PassengerDetailPage";
import ActivePassengersPage from "../pages/passengers/ActivePassengersPage";
import SuspendedPassengersPage from "../pages/passengers/SuspendedPassengersPage";
import PassengerRidesPage from "../pages/passengers/PassengerRidesPage";
import PassengerWalletsPage from "../pages/passengers/PassengerWalletsPage";
import PassengerAddressesPage from "../pages/passengers/PassengerAddressesPage";
import PassengerSafetyPage from "../pages/passengers/PassengerSafetyPage";
import PassengerSupportPage from "../pages/passengers/PassengerSupportPage";

/* ======================================================
   REWARDS
====================================================== */

import RewardsDashboardPage from "../pages/rewards/RewardsDashboardPage";
import RewardRulesPage from "../pages/rewards/RewardRulesPage";
import RewardCampaignsPage from "../pages/rewards/RewardCampaignsPage";
import RewardLedgerPage from "../pages/rewards/RewardLedgerPage";
import ReferralRewardsPage from "../pages/rewards/ReferralRewardsPage";

/* ======================================================
   FINANCE

   IMPORTANT:
   Admin finance merchant payouts has a different alias.
====================================================== */

import FinanceDashboardPage from "../pages/finance/FinanceDashboardPage";
import TransactionsPage from "../pages/finance/TransactionsPage";
import TransactionDetailPage from "../pages/finance/TransactionDetailPage";
import RevenuePage from "../pages/finance/RevenuePage";
import CommissionsPage from "../pages/finance/CommissionsPage";
import DriverPayoutsPage from "../pages/finance/DriverPayoutsPage";

import FinanceMerchantPayoutsPage from "../pages/finance/MerchantPayoutsPage";

import FinanceRefundsPage from "../pages/finance/FinanceRefundsPage";
import WalletLedgerPage from "../pages/finance/WalletLedgerPage";
import SettlementsPage from "../pages/finance/SettlementsPage";

/* ======================================================
   REGIONS
====================================================== */

import RegionDashboardPage from "../pages/regions/RegionDashboardPage";
import RegionsPage from "../pages/regions/RegionsPage";
import RegionDetailPage from "../pages/regions/RegionDetailPage";
import PakistanRegionPage from "../pages/regions/PakistanRegionPage";
import RegionServicesPage from "../pages/regions/RegionServicesPage";
import RegionRidesPage from "../pages/regions/RegionRidesPage";
import RegionLocalizationPage from "../pages/regions/RegionLocalizationPage";
import RegionSupportPage from "../pages/regions/RegionSupportPage";

/* ======================================================
   ACCESS / RBAC
====================================================== */

import AccessDashboardPage from "../pages/access/AccessDashboardPage";
import RolesPage from "../pages/access/RolesPage";
import RoleDetailPage from "../pages/access/RoleDetailPage";
import PermissionMatrixPage from "../pages/access/PermissionMatrixPage";
import AdminUsersPage from "../pages/access/AdminUsersPage";
import AdminUserDetailPage from "../pages/access/AdminUserDetailPage";
import AdminUserCreatePage from "../pages/access/AdminUserCreatePage";

/* ======================================================
   SYSTEM SETTINGS
====================================================== */

import SettingsDashboardPage from "../pages/settings/SettingsDashboardPage";
import GeneralSettingsPage from "../pages/settings/GeneralSettingsPage";
import MobileAppSettingsPage from "../pages/settings/MobileAppSettingsPage";
import MaintenanceSettingsPage from "../pages/settings/MaintenanceSettingsPage";
import AuthSettingsPage from "../pages/settings/AuthSettingsPage";
import PaymentSettingsPage from "../pages/settings/PaymentSettingsPage";
import RideDefaultsPage from "../pages/settings/RideDefaultsPage";
import MarketplaceDefaultsPage from "../pages/settings/MarketplaceDefaultsPage";
import NotificationSettingsPage from "../pages/settings/NotificationSettingsPage";
import UploadSettingsPage from "../pages/settings/UploadSettingsPage";
import SupportLegalPage from "../pages/settings/SupportLegalPage";
import FeatureFlagsPage from "../pages/settings/FeatureFlagsPage";
import SecuritySettingsPage from "../pages/settings/SecuritySettingsPage";
import AuditLogsPage from "../pages/settings/AuditLogsPage";

/* ======================================================
   ROUTER
====================================================== */

export const router =
  createBrowserRouter([
    /* ==================================================
       PUBLIC AUTH
    ================================================== */

    {
      element: <AuthLayout />,

      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },

        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },

    /* ==================================================
       PROTECTED APPLICATION
    ================================================== */

    {
      path: "/",

      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),

      children: [
        /* ==============================================
           DASHBOARD / COMMON
        ============================================== */

        {
          index: true,
          element: <DashboardPage />,
        },

        {
          path: "access-denied",
          element: <AccessDeniedPage />,
        },

        /* ==============================================
           MERCHANT PORTAL

           These are REAL pages.
           No placeholders.
        ============================================== */

        {
          path: "merchant/earnings",

          element: (
            <RoleRouteGuard>
              <MerchantEarningsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "merchant/payouts",

          element: (
            <RoleRouteGuard>
              <MerchantPortalPayoutsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "merchant/store-settings",

          element: (
            <RoleRouteGuard>
              <MerchantStoreSettingsPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           MERCHANT ADMIN
        ============================================== */

        {
          path: "merchants",

          element: (
            <RoleRouteGuard>
              <MerchantsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "merchants/applications",

          element: (
            <RoleRouteGuard>
              <MerchantApplicationsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "merchants/:merchantId",

          element: (
            <RoleRouteGuard>
              <MerchantDetailPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           STORES
        ============================================== */

        {
          path: "stores",

          element: (
            <RoleRouteGuard>
              <StoresPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "stores/create",

          element: (
            <RoleRouteGuard>
              <StoreActionGuard
                action="create"
              >
                <StoreCreatePage />
              </StoreActionGuard>
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "stores/:storeId/edit",

          element: (
            <RoleRouteGuard>
              <StoreActionGuard
                action="edit"
              >
                <StoreEditPage />
              </StoreActionGuard>
            </RoleRouteGuard>
          ),
        },

        {
          path: "stores/:storeId",

          element: (
            <RoleRouteGuard>
              <StoreDetailPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           FOOD
        ============================================== */

        {
          path: "food",

          element: (
            <RoleRouteGuard>
              <FoodDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "food/orders",

          element: (
            <RoleRouteGuard>
              <FoodOrdersPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "food/orders/:orderId",

          element: (
            <RoleRouteGuard>
              <FoodOrderDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "food/menu",

          element: (
            <RoleRouteGuard>
              <FoodMenuPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "food/categories",

          element: (
            <RoleRouteGuard>
              <FoodCategoriesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "food/promotions",

          element: (
            <RoleRouteGuard>
              <FoodPromotionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "food/reviews",

          element: (
            <RoleRouteGuard>
              <FoodReviewsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "food/refunds",

          element: (
            <RoleRouteGuard>
              <FoodRefundsPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           GROCERY
        ============================================== */

        {
          path: "grocery",

          element: (
            <RoleRouteGuard>
              <GroceryDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "grocery/orders",

          element: (
            <RoleRouteGuard>
              <GroceryOrdersPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "grocery/orders/:orderId",

          element: (
            <RoleRouteGuard>
              <GroceryOrderDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "grocery/products",

          element: (
            <RoleRouteGuard>
              <GroceryProductsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "grocery/categories",

          element: (
            <RoleRouteGuard>
              <GroceryCategoriesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "grocery/brands",

          element: (
            <RoleRouteGuard>
              <GroceryBrandsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "grocery/inventory",

          element: (
            <RoleRouteGuard>
              <GroceryInventoryPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "grocery/substitutions",

          element: (
            <RoleRouteGuard>
              <GrocerySubstitutionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "grocery/promotions",

          element: (
            <RoleRouteGuard>
              <GroceryPromotionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "grocery/refunds",

          element: (
            <RoleRouteGuard>
              <GroceryRefundsPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           PHARMACY
        ============================================== */

        {
          path: "pharmacy",

          element: (
            <RoleRouteGuard>
              <PharmacyDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "pharmacy/orders",

          element: (
            <RoleRouteGuard>
              <PharmacyOrdersPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pharmacy/orders/:orderId",

          element: (
            <RoleRouteGuard>
              <PharmacyOrderDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pharmacy/products",

          element: (
            <RoleRouteGuard>
              <PharmacyProductsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pharmacy/categories",

          element: (
            <RoleRouteGuard>
              <PharmacyCategoriesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pharmacy/inventory",

          element: (
            <RoleRouteGuard>
              <PharmacyInventoryPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pharmacy/prescriptions",

          element: (
            <RoleRouteGuard>
              <PharmacyPrescriptionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pharmacy/prescriptions/:prescriptionId",

          element: (
            <RoleRouteGuard>
              <PharmacyPrescriptionDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "pharmacy/license",

          element: (
            <RoleRouteGuard>
              <PharmacyLicensePage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pharmacy/promotions",

          element: (
            <RoleRouteGuard>
              <PharmacyPromotionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "pharmacy/refunds",

          element: (
            <RoleRouteGuard>
              <PharmacyRefundsPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           SERVICES
        ============================================== */

        {
          path: "services",

          element: (
            <RoleRouteGuard>
              <ServicesDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "services/bookings",

          element: (
            <RoleRouteGuard>
              <ServiceBookingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "services/bookings/:bookingId",

          element: (
            <RoleRouteGuard>
              <ServiceBookingDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "services/catalog",

          element: (
            <RoleRouteGuard>
              <ServiceCatalogPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "services/categories",

          element: (
            <RoleRouteGuard>
              <ServiceCategoriesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "services/staff",

          element: (
            <RoleRouteGuard>
              <ServiceStaffPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "services/availability",

          element: (
            <RoleRouteGuard>
              <ServiceAvailabilityPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "services/areas",

          element: (
            <RoleRouteGuard>
              <ServiceAreasPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "services/reviews",

          element: (
            <RoleRouteGuard>
              <ServiceReviewsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "services/promotions",

          element: (
            <RoleRouteGuard>
              <ServicePromotionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "services/refunds",

          element: (
            <RoleRouteGuard>
              <ServiceRefundsPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           RIDES
        ============================================== */

        {
          path: "rides/dashboard",

          element: (
            <RoleRouteGuard>
              <RideDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rides",

          element: (
            <RoleRouteGuard>
              <RidesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rides/active",

          element: (
            <RoleRouteGuard>
              <ActiveRidesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rides/dispatch",

          element: (
            <RoleRouteGuard>
              <RideDispatchPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rides/scheduled",

          element: (
            <RoleRouteGuard>
              <ScheduledRidesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rides/cancelled",

          element: (
            <RoleRouteGuard>
              <CancelledRidesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rides/incidents",

          element: (
            <RoleRouteGuard>
              <RideIncidentsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rides/:rideId",

          element: (
            <RoleRouteGuard>
              <RideDetailPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           PRICING
        ============================================== */

        {
          path: "pricing",

          element: (
            <RoleRouteGuard>
              <PricingDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pricing/pakistan",

          element: (
            <RoleRouteGuard>
              <PakistanPricingPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "pricing/surge",

          element: (
            <RoleRouteGuard>
              <SurgePricingPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pricing/commission",

          element: (
            <RoleRouteGuard>
              <DriverCommissionPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pricing/free-rides",

          element: (
            <RoleRouteGuard>
              <FreeRideProgramPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "pricing/calculator",

          element: (
            <RoleRouteGuard>
              <FareCalculatorPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           DRIVERS
        ============================================== */

        {
          path:
            "drivers/dashboard",

          element: (
            <RoleRouteGuard>
              <DriverDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "drivers",

          element: (
            <RoleRouteGuard>
              <DriversPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "drivers/applications",

          element: (
            <RoleRouteGuard>
              <DriverApplicationsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "drivers/applications/:applicationId",

          element: (
            <RoleRouteGuard>
              <DriverApplicationDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "drivers/vehicles",

          element: (
            <RoleRouteGuard>
              <DriverVehiclesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "drivers/vehicles/:vehicleId",

          element: (
            <RoleRouteGuard>
              <DriverVehicleDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "drivers/online",

          element: (
            <RoleRouteGuard>
              <OnlineDriversPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "drivers/suspended",

          element: (
            <RoleRouteGuard>
              <SuspendedDriversPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "drivers/ratings",

          element: (
            <RoleRouteGuard>
              <DriverRatingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "drivers/wallets",

          element: (
            <RoleRouteGuard>
              <DriverWalletsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "drivers/:driverId/documents",

          element: (
            <RoleRouteGuard>
              <DriverDocumentsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "drivers/:driverId",

          element: (
            <RoleRouteGuard>
              <DriverDetailPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           PASSENGERS
        ============================================== */

        {
          path:
            "passengers/dashboard",

          element: (
            <RoleRouteGuard>
              <PassengerDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "passengers",

          element: (
            <RoleRouteGuard>
              <PassengersPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "passengers/active",

          element: (
            <RoleRouteGuard>
              <ActivePassengersPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "passengers/restricted",

          element: (
            <RoleRouteGuard>
              <SuspendedPassengersPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "passengers/wallets",

          element: (
            <RoleRouteGuard>
              <PassengerWalletsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "passengers/safety",

          element: (
            <RoleRouteGuard>
              <PassengerSafetyPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "passengers/support",

          element: (
            <RoleRouteGuard>
              <PassengerSupportPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "passengers/:passengerId/rides",

          element: (
            <RoleRouteGuard>
              <PassengerRidesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "passengers/:passengerId/addresses",

          element: (
            <RoleRouteGuard>
              <PassengerAddressesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "passengers/:passengerId",

          element: (
            <RoleRouteGuard>
              <PassengerDetailPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           REWARDS
        ============================================== */

        {
          path: "rewards",

          element: (
            <RoleRouteGuard>
              <RewardsDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rewards/rules",

          element: (
            <RoleRouteGuard>
              <RewardRulesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "rewards/campaigns",

          element: (
            <RoleRouteGuard>
              <RewardCampaignsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "rewards/ledger",

          element: (
            <RoleRouteGuard>
              <RewardLedgerPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "rewards/referrals",

          element: (
            <RoleRouteGuard>
              <ReferralRewardsPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           FINANCE
        ============================================== */

        {
          path: "finance",

          element: (
            <RoleRouteGuard>
              <FinanceDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "finance/transactions",

          element: (
            <RoleRouteGuard>
              <TransactionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "finance/transactions/:transactionId",

          element: (
            <RoleRouteGuard>
              <TransactionDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "finance/revenue",

          element: (
            <RoleRouteGuard>
              <RevenuePage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "finance/commissions",

          element: (
            <RoleRouteGuard>
              <CommissionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "finance/payouts/drivers",

          element: (
            <RoleRouteGuard>
              <DriverPayoutsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "finance/payouts/merchants",

          element: (
            <RoleRouteGuard>
              <FinanceMerchantPayoutsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "finance/refunds",

          element: (
            <RoleRouteGuard>
              <FinanceRefundsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "finance/wallet-ledger",

          element: (
            <RoleRouteGuard>
              <WalletLedgerPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "finance/settlements",

          element: (
            <RoleRouteGuard>
              <SettlementsPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           REGIONS
        ============================================== */

        {
          path:
            "regions/dashboard",

          element: (
            <RoleRouteGuard>
              <RegionDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "regions",

          element: (
            <RoleRouteGuard>
              <RegionsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "regions/pakistan",

          element: (
            <RoleRouteGuard>
              <PakistanRegionPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "regions/:regionCode/services",

          element: (
            <RoleRouteGuard>
              <RegionServicesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "regions/:regionCode/rides",

          element: (
            <RoleRouteGuard>
              <RegionRidesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "regions/:regionCode/localization",

          element: (
            <RoleRouteGuard>
              <RegionLocalizationPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "regions/:regionCode/support",

          element: (
            <RoleRouteGuard>
              <RegionSupportPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "regions/:regionCode",

          element: (
            <RoleRouteGuard>
              <RegionDetailPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           ACCESS CONTROL
        ============================================== */

        {
          path: "access",

          element: (
            <RoleRouteGuard>
              <AccessDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "access/roles",

          element: (
            <RoleRouteGuard>
              <RolesPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "access/permissions",

          element: (
            <RoleRouteGuard>
              <PermissionMatrixPage />
            </RoleRouteGuard>
          ),
        },

        {
          path: "access/users",

          element: (
            <RoleRouteGuard>
              <AdminUsersPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "access/users/create",

          element: (
            <RoleRouteGuard>
              <AdminUserCreatePage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "access/users/:userId",

          element: (
            <RoleRouteGuard>
              <AdminUserDetailPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "access/roles/:roleId",

          element: (
            <RoleRouteGuard>
              <RoleDetailPage />
            </RoleRouteGuard>
          ),
        },

        /* ==============================================
           SYSTEM SETTINGS
        ============================================== */

        {
          path: "settings",

          element: (
            <RoleRouteGuard>
              <SettingsDashboardPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/general",

          element: (
            <RoleRouteGuard>
              <GeneralSettingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/mobile-apps",

          element: (
            <RoleRouteGuard>
              <MobileAppSettingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/maintenance",

          element: (
            <RoleRouteGuard>
              <MaintenanceSettingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/auth",

          element: (
            <RoleRouteGuard>
              <AuthSettingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/payments",

          element: (
            <RoleRouteGuard>
              <PaymentSettingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/rides",

          element: (
            <RoleRouteGuard>
              <RideDefaultsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/marketplace",

          element: (
            <RoleRouteGuard>
              <MarketplaceDefaultsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/notifications",

          element: (
            <RoleRouteGuard>
              <NotificationSettingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/uploads",

          element: (
            <RoleRouteGuard>
              <UploadSettingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/legal",

          element: (
            <RoleRouteGuard>
              <SupportLegalPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/features",

          element: (
            <RoleRouteGuard>
              <FeatureFlagsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/security",

          element: (
            <RoleRouteGuard>
              <SecuritySettingsPage />
            </RoleRouteGuard>
          ),
        },

        {
          path:
            "settings/audit-logs",

          element: (
            <RoleRouteGuard>
              <AuditLogsPage />
            </RoleRouteGuard>
          ),
        },
      ],
    },

    /* ==================================================
       NOT FOUND
    ================================================== */

    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

export default router;