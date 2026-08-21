import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import {
  createCommerceOrder,
  getCommerceOrder,
  getStore,
  listCommerceOrders,
  listStores,
} from "./commerce.service.js";

export const commerceRouter = Router();

commerceRouter.use(
  requireAuth,
  requireAccountTypes("passenger", "driver", "delivery_partner"),
);

commerceRouter.get("/:type/stores", async (req, res, next) => {
  try {
    const storeType = z
      .enum(["grocery", "pharmacy"])
      .parse(req.params.type);

    const query = z
      .object({
        cityId: z.string().uuid().optional(),
        search: z.string().trim().max(120).optional(),
        featured: z
          .enum(["true", "false"])
          .transform((value) => value === "true")
          .optional(),
      })
      .parse(req.query);

    const stores = await listStores({
      storeType,
      ...query,
    });

    res.json({
      success: true,
      data: {
        stores,
        total: stores.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

commerceRouter.get("/:type/stores/:storeId", async (req, res, next) => {
  try {
    const storeType = z
      .enum(["grocery", "pharmacy"])
      .parse(req.params.type);

    const storeId = z.string().uuid().parse(req.params.storeId);

    const data = await getStore(storeType, storeId);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

commerceRouter.post("/:type/orders", async (req, res, next) => {
  try {
    const orderType = z
      .enum(["grocery", "pharmacy"])
      .parse(req.params.type);

    const input = z
      .object({
        storeId: z.string().uuid(),
        deliveryAddressId: z.string().uuid().nullable().optional(),
        deliveryAddress: z.string().trim().min(3).max(300),
        deliveryLatitude: z.number().nullable().optional(),
        deliveryLongitude: z.number().nullable().optional(),
        paymentMethod: z.enum(["cash", "wallet", "card"]).default("cash"),
        customerNote: z.string().trim().max(500).nullable().optional(),
        prescriptionStoragePath: z
          .string()
          .trim()
          .max(500)
          .nullable()
          .optional(),
        items: z
          .array(
            z.object({
              productId: z.string().uuid(),
              quantity: z.number().int().min(1).max(99),
              note: z.string().trim().max(300).nullable().optional(),
            }),
          )
          .min(1)
          .max(100),
      })
      .parse(req.body);

    const data = await createCommerceOrder(
      req.authUser!.id,
      orderType,
      input,
    );

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});

commerceRouter.get("/:type/orders", async (req, res, next) => {
  try {
    const orderType = z
      .enum(["grocery", "pharmacy"])
      .parse(req.params.type);

    const orders = await listCommerceOrders(
      req.authUser!.id,
      orderType,
    );

    res.json({
      success: true,
      data: {
        orders,
        total: orders.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

commerceRouter.get("/:type/orders/:orderId", async (req, res, next) => {
  try {
    z.enum(["grocery", "pharmacy"]).parse(req.params.type);

    const orderId = z.string().uuid().parse(req.params.orderId);

    const data = await getCommerceOrder(
      req.authUser!.id,
      orderId,
    );

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});
