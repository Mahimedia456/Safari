import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { profileRouter } from "../modules/profiles/profile.routes.js";
import { healthRouter } from "./health.routes.js";
import { passengerRouter } from "../modules/passengers/passenger.routes.js";
import { adminPassengersRouter } from "../modules/admin/passengers.routes.js";
import { driverRouter } from "../modules/drivers/driver.routes.js";
import { adminDriversRouter } from "../modules/admin/drivers.routes.js";
import { rideRouter } from "../modules/rides/ride.routes.js";
import { adminRidesRouter } from "../modules/admin/rides.routes.js";
import { matchingRouter } from "../modules/matching/matching.routes.js";
import { trackingRouter } from "../modules/tracking/tracking.routes.js";
import { adminLiveRidesRouter } from "../modules/admin/live-rides.routes.js";
import { ratingsRouter } from "../modules/ratings/ratings.routes.js";
import { foodRouter } from "../modules/food/food.routes.js";
import { adminFoodRouter } from "../modules/admin/food.routes.js";
import { commerceRouter } from "../modules/commerce/commerce.routes.js";
import { adminCommerceRouter } from "../modules/admin/commerce.routes.js";
import { servicesRouter } from "../modules/services/services.routes.js";
import { deliveryRouter } from "../modules/delivery/delivery.routes.js";
import { adminServicesRouter } from "../modules/admin/services.routes.js";
import { merchantRouter } from "../modules/merchants/merchant.routes.js";
import { adminMerchantsRouter } from "../modules/admin/merchants.routes.js";
import { walletRouter } from "../modules/wallet/wallet.routes.js";
import { adminPaymentsRouter } from "../modules/admin/payments.routes.js";
import { notificationsRouter } from "../modules/notifications/notifications.routes.js";
import { adminNotificationsRouter } from "../modules/admin/notifications.routes.js";
import { storageRouter } from "../modules/storage/storage.routes.js";
import { adminAnalyticsRouter } from "../modules/admin/analytics.routes.js";
import { systemRouter } from "../modules/system/system.routes.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/profiles", profileRouter);

apiRouter.use("/passengers", passengerRouter);
apiRouter.use("/admin/passengers", adminPassengersRouter);

apiRouter.use("/drivers", driverRouter);
apiRouter.use("/admin/drivers", adminDriversRouter);

apiRouter.use("/rides", rideRouter);
apiRouter.use("/admin/rides", adminRidesRouter);

apiRouter.use("/matching", matchingRouter);
apiRouter.use("/tracking", trackingRouter);
apiRouter.use("/admin/live-rides", adminLiveRidesRouter);

apiRouter.use("/trip", ratingsRouter);
apiRouter.use("/food", foodRouter);
apiRouter.use("/admin/food", adminFoodRouter);

apiRouter.use("/commerce", commerceRouter);
apiRouter.use("/admin/commerce", adminCommerceRouter);
apiRouter.use("/services", servicesRouter);
apiRouter.use("/delivery", deliveryRouter);
apiRouter.use("/admin/services", adminServicesRouter);

apiRouter.use("/merchants", merchantRouter);
apiRouter.use("/admin/merchants", adminMerchantsRouter);
apiRouter.use("/wallet", walletRouter);
apiRouter.use("/admin/payments", adminPaymentsRouter);
apiRouter.use("/notifications", notificationsRouter);
apiRouter.use("/admin/notifications", adminNotificationsRouter);

apiRouter.use("/storage", storageRouter);
apiRouter.use("/admin/analytics", adminAnalyticsRouter);
apiRouter.use("/system", systemRouter);
