# PixelVault

Editorial marketplace for digital assets — UI kits, 3D models, fonts, photo packs, brushes, and sound kits. Built with Vite, React 19, TypeScript, and Tailwind CSS v4.

## Simulated checkout

PixelVault does **not** process real payments. There is no Stripe (or any other processor) integration, no secret keys, and no charges.

At checkout, enter any name, a valid-looking email, a **Luhn-valid 16-digit card number** (for example `4242 4242 4242 4242`), a future expiry, and a 3–4 digit CVC. On success you receive an order id and the assets appear in **Library**. Download generates a small in-browser text file (license + asset name) — simulated delivery only.

Cart contents persist in `localStorage`.

## Scripts

```bash
npm run dev
npm run build
```
