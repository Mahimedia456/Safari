# Safari Phase 09-10

Phase 09:
- ride receipts
- passenger/driver ratings
- profile rating aggregates

Phase 10:
- Safari Food restaurants
- menu sections/items
- customer orders
- order items/status history
- admin/food merchant order workflow

Mobile Auth Fix bundled:
- create account = phone + password
- login = phone + password
- forgot password = registered phone
- reset OTP = phone SMS OTP
- new password after OTP
- email stays optional for mobile registration
- admin/merchant auth remains email + password

Run SQL:
1. phase09_receipts_ratings.sql
2. phase10_food_module.sql

Then:
npm run seed
npm run dev

All seeded demo passwords:
safarimobile

Supabase Phone Auth must have an SMS provider configured for real OTP delivery.
