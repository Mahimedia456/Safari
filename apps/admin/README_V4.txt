Safari Admin Vercel Build Fix V4
================================

Fixes the final 10 reported TypeScript errors:

1. Merchant.approvedAt is optional for pending/rejected demo records.
2. Ride.createdAt is optional for legacy demo rides.
3. RideTable formatDate() safely handles missing dates.
4. GermanyPricingPage.tsx is NOT included.
5. GermanyRegionPage.tsx is NOT included.
6. lib/supabase.ts is NOT included.

IMPORTANT:
Do not merge the src directory into your existing src directory.
Delete the old src first, or use APPLY_ADMIN_V4.ps1.

Recommended:
  PowerShell -ExecutionPolicy Bypass -File .\APPLY_ADMIN_V4.ps1

Then:
  cd E:\Safari\apps\admin
  npm run build
