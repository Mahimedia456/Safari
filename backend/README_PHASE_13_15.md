# Safari Phase 13-15

Run SQL:

1. `sql/phase13_unified_orders_merchants.sql`
2. `sql/phase14_wallet_payments_transactions.sql`
3. `sql/phase15_notifications_realtime.sql`

Then:

```powershell
cd E:\Safari\backend
npm run seed
npm run dev
```

All seeded accounts still use:
`safarimobile`

Phase 13
- merchant profiles
- unified order index
- merchant management APIs

Phase 14
- wallet accounts
- wallet transactions
- payment records
- merchant ledger

Phase 15
- notifications
- device tokens
- realtime event table
- Supabase Realtime publication for notifications, realtime_events, rides and driver_locations

Auth + all `.env` files will be normalized in the dedicated next auth pass.
