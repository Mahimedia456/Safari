import { Router } from "express";

import { env } from "../../config/env.js";
import { supabaseAdmin } from "../../lib/supabase.js";

export const whatsappWebhookRouter =
  Router();

whatsappWebhookRouter.get(
  "/meta/whatsapp",
  (req, res) => {
    const mode =
      req.query["hub.mode"];

    const token =
      req.query["hub.verify_token"];

    const challenge =
      req.query["hub.challenge"];

    if (
      mode === "subscribe" &&
      token ===
        env.META_WHATSAPP_VERIFY_TOKEN &&
      typeof challenge === "string"
    ) {
      res.status(200).send(challenge);
      return;
    }

    res.sendStatus(403);
  },
);

whatsappWebhookRouter.post(
  "/meta/whatsapp",
  async (req, res, next) => {
    try {
      // Acknowledge quickly after persisting the status/event.
      const entries =
        Array.isArray(req.body?.entry)
          ? req.body.entry
          : [];

      const rows:
        Record<string, unknown>[] = [];

      for (const entry of entries) {
        const changes =
          Array.isArray(entry?.changes)
            ? entry.changes
            : [];

        for (const change of changes) {
          const value =
            change?.value ?? {};

          const statuses =
            Array.isArray(value.statuses)
              ? value.statuses
              : [];

          for (const status of statuses) {
            rows.push({
              event_type:
                change?.field ??
                "messages",
              phone_number_id:
                value?.metadata
                  ?.phone_number_id ??
                null,
              whatsapp_business_account_id:
                entry?.id ?? null,
              message_id:
                status?.id ?? null,
              status:
                status?.status ?? null,
              recipient_id:
                status?.recipient_id ??
                null,
              payload: {
                entryId: entry?.id,
                change,
                status,
              },
            });
          }

          const messages =
            Array.isArray(value.messages)
              ? value.messages
              : [];

          for (const message of messages) {
            rows.push({
              event_type:
                "incoming_message",
              phone_number_id:
                value?.metadata
                  ?.phone_number_id ??
                null,
              whatsapp_business_account_id:
                entry?.id ?? null,
              message_id:
                message?.id ?? null,
              status: null,
              recipient_id:
                message?.from ?? null,
              payload: {
                entryId: entry?.id,
                change,
                message,
              },
            });
          }
        }
      }

      if (rows.length > 0) {
        const { error } =
          await supabaseAdmin
            .from(
              "whatsapp_webhook_events",
            )
            .insert(rows);

        if (error)
          throw new Error(
            error.message,
          );
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  },
);
