# Safari Admin System Final Stabilization

This pass fixes the complete admin runtime/data compatibility layer.

Key corrections:
- Pakistan-only admin. DE/Germany removed from region data/types/routes/UI.
- Ride table is used on All, Active, Scheduled, Cancelled and Timeline pages.
- Ride detail numeric values are null-safe.
- Ride passenger/driver UUIDs are resolved to names/phones from loaded stores.
- Food order customer UUIDs are resolved to passenger names/phones.
- Merchant store maps real merchant API rows to UI rows and joins store/order data.
- Merchant table no longer prints raw merchant UUID in the visible owner line.
- Merchant filters are Pakistan-only.
- Region data contains exactly one market: Pakistan.
- Existing backend API stores remain the source of truth; unsupported catalog pages stay empty instead of fake.
