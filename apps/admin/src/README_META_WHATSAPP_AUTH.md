# Safari Meta WhatsApp OTP Auth — Final Replacement

## Architecture

Mobile user-visible auth:

- Create account: phone + password + optional email
- Safari backend creates an internal Supabase email identity
- Backend sends a 6-digit OTP through Meta WhatsApp Cloud API
- OTP verification activates the Safari profile
- Mobile automatically logs in using phone + password
- Login remains phone + password
- Forgot password uses WhatsApp OTP
- Admin/Merchant remains email + password

Supabase built-in Phone Provider / Twilio is NOT used.

## Meta values configured

- Meta App ID: `61593042354923`
- Phone Number ID: `1217362621466284`
- WhatsApp Business Account ID: `1028944836715885`
- Callback URL: `https://api.scentsbyaamir.com/api/v1/webhooks/meta/whatsapp`
- OTP Template: `carpool_text`
- Template Language: `en`

## Webhook verify token

Use this exact value in Meta Webhooks:

`safari_meta_verify_itx5Sn0qMTIrhOgba1duVywb-U75vBKe`

Callback URL:

`https://api.scentsbyaamir.com/api/v1/webhooks/meta/whatsapp`

Subscribe the WhatsApp app/WABA to message events.

## Supabase SQL

Run:

`sql/meta_whatsapp_auth.sql`

after the existing Safari phase SQL.

## Run

```powershell
cd E:\Safari\backend
npm install
npm run dev
```

Then mobile:

```powershell
cd E:\Safari\apps\mobile
npx expo start -c
```

Physical Android phone API:

`http://192.168.100.27:5000`

## Test API

PC:

`http://localhost:5000/api/v1/system/ready`

Phone browser:

`http://192.168.100.27:5000/api/v1/system/ready`

## Meta OTP template

This pack is configured for the previously-approved authentication template:

`carpool_text`

The sender uses both the OTP body parameter and the authentication URL/copy-code
button parameter. If the exact approved template name in WhatsApp Manager differs,
change only:

`META_WHATSAPP_OTP_TEMPLATE=...`

## Security

The Meta access token is backend-only. Never place it in Expo/Vite environment files.
The OTP itself is never stored in plaintext; only an HMAC hash is stored.

The access token used here was pasted into chat and should be rotated in Meta before
production deployment. After rotation, replace `META_WHATSAPP_ACCESS_TOKEN` in
`backend/.env`.
