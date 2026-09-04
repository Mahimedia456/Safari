import { supabaseAdmin } from "../../lib/supabase.js";

async function participantRide(
  userId: string,
  rideId: string,
) {
  const { data, error } = await supabaseAdmin
    .from("rides")
    .select(`
      id,
      passenger_id,
      driver_id,
      ride_status,
      ride_number,
      profiles!rides_passenger_id_fkey (
        id,
        full_name,
        phone,
        avatar_url
      ),
      driver_profile:profiles!rides_driver_id_fkey (
        id,
        full_name,
        phone,
        avatar_url
      )
    `)
    .eq("id", rideId)
    .single();

  if (error || !data) {
    throw new Error("Safari ride was not found.");
  }

  if (
    data.passenger_id !== userId &&
    data.driver_id !== userId
  ) {
    throw new Error(
      "You are not a participant in this Safari ride.",
    );
  }

  return data;
}

export async function getRideChat(
  userId: string,
  rideId: string,
) {
  const ride =
    await participantRide(
      userId,
      rideId,
    );

  const { data: messages, error } =
    await supabaseAdmin
      .from("ride_messages")
      .select(`
        id,
        ride_id,
        sender_id,
        message,
        created_at,
        read_at,
        profiles!ride_messages_sender_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq("ride_id", rideId)
      .order("created_at", {
        ascending: true,
      })
      .limit(300);

  if (error) {
    throw new Error(error.message);
  }

  const unreadIds =
    (messages ?? [])
      .filter(
        (item: any) =>
          item.sender_id !== userId &&
          item.read_at == null,
      )
      .map((item: any) => item.id);

  if (unreadIds.length > 0) {
    await supabaseAdmin
      .from("ride_messages")
      .update({
        read_at:
          new Date().toISOString(),
      })
      .in("id", unreadIds);
  }

  return {
    ride,
    messages: messages ?? [],
  };
}

export async function sendRideChatMessage(
  userId: string,
  rideId: string,
  message: string,
) {
  const ride =
    await participantRide(
      userId,
      rideId,
    );

  if (
    ![
      "driver_assigned",
      "driver_arriving",
      "driver_arrived",
      "in_progress",
    ].includes(ride.ride_status)
  ) {
    throw new Error(
      "Ride chat is only available after a driver is assigned and before the ride is completed.",
    );
  }

  const { data, error } =
    await supabaseAdmin
      .from("ride_messages")
      .insert({
        ride_id: rideId,
        sender_id: userId,
        message: message.trim(),
      })
      .select(`
        id,
        ride_id,
        sender_id,
        message,
        created_at,
        read_at,
        profiles!ride_messages_sender_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  const recipientId =
    ride.passenger_id === userId
      ? ride.driver_id
      : ride.passenger_id;

  if (recipientId) {
    await supabaseAdmin
      .from("notifications")
      .insert({
        user_id: recipientId,
        notification_type:
          "ride_chat_message",
        title:
          "New Safari ride message",
        body:
          message.trim().slice(0, 120),
        data: {
          rideId,
          messageId: data.id,
        },
        is_read: false,
      });
  }

  return data;
}
