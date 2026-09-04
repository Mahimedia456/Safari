-- Safari: atomic passenger acceptance of a driver's fare offer.
-- Run this in Supabase SQL Editor before testing the updated backend.

create or replace function public.accept_safari_driver_offer(
  p_offer_id uuid,
  p_passenger_id uuid,
  p_ride_id uuid
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_offer public.ride_driver_offers%rowtype;
  v_ride public.rides%rowtype;
  v_now timestamptz := now();
begin
  select * into v_ride
  from public.rides
  where id = p_ride_id
    and passenger_id = p_passenger_id
  for update;

  if not found then
    raise exception 'Safari ride not found.';
  end if;

  -- Idempotent retry: mobile can safely retry after a network interruption.
  if v_ride.ride_status = 'driver_assigned' and v_ride.driver_id is not null then
    return v_ride.id;
  end if;

  if v_ride.ride_status not in ('requested', 'searching') then
    raise exception 'This Safari ride is no longer accepting driver offers.';
  end if;

  select * into v_offer
  from public.ride_driver_offers
  where id = p_offer_id
    and ride_id = p_ride_id
  for update;

  if not found then
    raise exception 'This driver offer does not belong to this Safari ride.';
  end if;

  if v_offer.offer_status <> 'pending' then
    raise exception 'This Safari driver offer is no longer pending.';
  end if;

  if v_offer.expires_at is not null and v_offer.expires_at <= v_now then
    update public.ride_driver_offers
      set offer_status = 'expired', responded_at = v_now, updated_at = v_now
    where id = v_offer.id;
    raise exception 'This Safari driver offer has expired.';
  end if;

  update public.rides
  set driver_id = v_offer.driver_id,
      vehicle_id = v_offer.vehicle_id,
      agreed_fare = v_offer.offered_fare,
      ride_status = 'driver_assigned',
      updated_at = v_now
  where id = p_ride_id
    and passenger_id = p_passenger_id
    and ride_status in ('requested', 'searching');

  if not found then
    raise exception 'Safari could not assign this driver.';
  end if;

  update public.ride_driver_offers
  set offer_status = case when id = p_offer_id then 'accepted' else 'rejected' end,
      responded_at = v_now,
      updated_at = v_now
  where ride_id = p_ride_id
    and offer_status = 'pending';

  update public.ride_match_requests
  set match_status = case when driver_id = v_offer.driver_id then 'accepted' else 'rejected' end,
      responded_at = coalesce(responded_at, v_now),
      updated_at = v_now
  where ride_id = p_ride_id
    and match_status in ('offered', 'accepted');

  insert into public.ride_status_events(
    ride_id, from_status, to_status, actor_type, actor_user_id, note
  ) values (
    p_ride_id, v_ride.ride_status, 'driver_assigned', 'passenger', p_passenger_id,
    'Passenger accepted a driver fare offer.'
  );

  return p_ride_id;
end;
$$;

revoke all on function public.accept_safari_driver_offer(uuid, uuid, uuid) from public;
grant execute on function public.accept_safari_driver_offer(uuid, uuid, uuid) to service_role;
