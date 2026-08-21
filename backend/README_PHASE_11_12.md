# Safari Phase 11-12

Phase 11:
- Grocery stores
- Pharmacy stores
- Categories/products
- Inventory quantities
- Grocery checkout/orders
- Pharmacy checkout/orders
- Prescription-required product handling
- Merchant/admin order processing

Phase 12:
- Services categories
- Verified service providers
- Provider service catalog
- Customer bookings
- Scheduling
- Provider/admin booking lifecycle

Run SQL:
1. `sql/phase11_grocery_pharmacy.sql`
2. `sql/phase12_services_marketplace.sql`

Then:

```powershell
cd E:\Safari\backend
npm run seed
npm run dev
```

All demo passwords:
`safarimobile`

Merchants:
- grocery@safari.com
- pharmacy@safari.com
- services@safari.com

Storage note:
Phase 11 stores `prescription_storage_path` metadata. Actual upload/signing is completed in the dedicated Supabase Storage phase.
