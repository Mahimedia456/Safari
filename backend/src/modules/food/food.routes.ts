import { Router } from "express";
import { z } from "zod";

import { requireAuth } from "../../middleware/auth.js";
import { requireAccountTypes } from "../../middleware/requireRole.js";
import {
  cancelFoodOrder,
  createFoodOrder,
  getFoodOrder,
  getRestaurant,
  listFoodOrders,
  listRestaurants,
} from "./food.service.js";

export const foodRouter = Router();

foodRouter.use(
  requireAuth,
  requireAccountTypes("passenger", "driver", "delivery_partner"),
);

foodRouter.get("/restaurants", async (req, res, next) => {
  try {
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

    const restaurants = await listRestaurants(query);

    res.json({
      success: true,
      data: {
        restaurants,
        total: restaurants.length,
      },
    });
  } catch (error) {
    next(error);
  }
});

foodRouter.get("/restaurants/:restaurantId", async (req, res, next) => {
  try {
    const restaurantId = z.string().uuid().parse(req.params.restaurantId);
    const data = await getRestaurant(restaurantId);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

foodRouter.post("/orders", async (req, res, next) => {
  try {
    const input = z
      .object({
        restaurantId: z.string().uuid(),
        deliveryAddressId: z.string().uuid().nullable().optional(),
        deliveryAddress: z.string().trim().min(3).max(300),
        deliveryLatitude: z.number().nullable().optional(),
        deliveryLongitude: z.number().nullable().optional(),
        paymentMethod: z.enum(["cash", "wallet", "card"]).default("cash"),
        customerNote: z.string().trim().max(500).nullable().optional(),
        items: z
          .array(
            z.object({
              menuItemId: z.string().uuid(),
              quantity: z.number().int().min(1).max(99),
              note: z.string().trim().max(300).nullable().optional(),
            }),
          )
          .min(1)
          .max(50),
      })
      .parse(req.body);

    const order = await createFoodOrder(
      req.authUser!.id,
      input,
    );

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

foodRouter.get("/orders", async (req, res, next) => {
  try {
    const orders = await listFoodOrders(req.authUser!.id);

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

foodRouter.get("/orders/:orderId", async (req, res, next) => {
  try {
    const orderId = z.string().uuid().parse(req.params.orderId);
    const data = await getFoodOrder(req.authUser!.id, orderId);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

foodRouter.post("/orders/:orderId/cancel", async (req, res, next) => {
  try {
    const orderId = z.string().uuid().parse(req.params.orderId);
    const input = z
      .object({
        reason: z.string().trim().min(2).max(300),
      })
      .parse(req.body);

    const order = await cancelFoodOrder(
      req.authUser!.id,
      orderId,
      input.reason,
    );

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
});
