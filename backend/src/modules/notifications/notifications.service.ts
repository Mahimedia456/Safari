import { supabaseAdmin } from "../../lib/supabase.js";

export async function listNotifications(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error)
    throw new Error(error.message);

  return data;
}

export async function markNotificationRead(
  userId: string,
  notificationId: string,
) {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("notifications")
    .update({
      is_read: true,
      read_at: now,
    })
    .eq("id", notificationId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error)
    throw new Error(error.message);

  return data;
}

export async function markAllNotificationsRead(
  userId: string,
) {
  const now = new Date().toISOString();

  const { error } = await supabaseAdmin
    .from("notifications")
    .update({
      is_read: true,
      read_at: now,
    })
    .eq("user_id", userId)
    .eq("is_read", false);

  if (error)
    throw new Error(error.message);
}

export async function registerDevice(
  userId: string,
  input: {
    platform: "android" | "ios" | "web";
    pushProvider: "expo" | "fcm" | "apns" | "web";
    token: string;
    deviceName?: string | null;
    appVersion?: string | null;
  },
) {
  const { data, error } = await supabaseAdmin
    .from("device_tokens")
    .upsert(
      {
        user_id: userId,
        platform: input.platform,
        push_provider: input.pushProvider,
        token: input.token,
        device_name: input.deviceName ?? null,
        app_version: input.appVersion ?? null,
        is_active: true,
        last_seen_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "push_provider,token",
      },
    )
    .select("*")
    .single();

  if (error)
    throw new Error(error.message);

  return data;
}
