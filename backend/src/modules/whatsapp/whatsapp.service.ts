import { env } from "../../config/env.js";

function normalizeMetaRecipient(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

export async function sendWhatsAppOtp(
  phone: string,
  otp: string,
) {
  const endpoint =
    `https://graph.facebook.com/${env.META_GRAPH_VERSION}/` +
    `${env.META_WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.META_WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: normalizeMetaRecipient(phone),
      type: "template",
      template: {
        name: env.META_WHATSAPP_OTP_TEMPLATE,
        language: {
          code: env.META_WHATSAPP_OTP_TEMPLATE_LANGUAGE,
        },
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: otp,
              },
            ],
          },
          {
            type: "button",
            sub_type: "url",
            index: "0",
            parameters: [
              {
                type: "text",
                text: otp,
              },
            ],
          },
        ],
      },
    }),
  });

  const raw = await response.text();

  let payload: any = null;

  try {
    payload = raw ? JSON.parse(raw) : null;
  } catch {
    payload = { raw };
  }

  if (!response.ok) {
    const metaMessage =
      payload?.error?.message ??
      payload?.error?.error_user_msg ??
      `Meta WhatsApp request failed with ${response.status}.`;

    throw new Error(metaMessage);
  }

  return payload;
}
