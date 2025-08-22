### Variant Pricing — Frontend Guide

A compact reference for frontend developers to calculate product prices (preview) when variants are selected.

- **Purpose**: let the frontend show an accurate price preview without waiting for the server.
- **Source of truth**: the server stores `gold_price` (IRR per unit weight) and product/variant fields. Frontend should fetch `gold_price` from the API or receive it with product data.

**Inputs required**
- **`goldPrice`**: number (IRR per unit weight) — from server settings.
- **`variant.weight`**: number (if variant missing, use `product.weight`).
- **`variant.construction_fee_percent`**: number (percent; optional).
- **`variant.accessories_fee`**: number (IRR; optional).

**Formula**
Final unit price (IRR) = round(
  goldPrice * weight
  + (goldPrice * weight * construction_fee_percent / 100)
  + accessories_fee
)

If no `variant` is selected, use base product price or `product.weight` per business rules.

JavaScript helper (example):
```javascript
function computeVariantPrice({ variant, product }, goldPrice) {
  const weight = (variant && variant.weight) || parseFloat(product.weight) || 0;
  const constructionPercent = (variant && variant.construction_fee_percent) || 0;
  const accessories = (variant && variant.accessories_fee) || 0;

  if (!goldPrice || goldPrice <= 0) {
    // fallback: return null so UI can show "price unavailable" or use server-provided price
    return null;
  }

  const goldValue = goldPrice * weight;
  const constructionValue = Math.round((goldValue * constructionPercent) / 100);
  const unitPrice = Math.round(goldValue + constructionValue + accessories);
  return unitPrice; // integer IRR
}
```

**Example**
- `goldPrice = 500000` (IRR)  
- `weight = 0.2`  
- `construction_fee_percent = 10`  
- `accessories_fee = 20000`  

goldValue = 500000 * 0.2 = 100000  
constructionValue = round(100000 * 10% ) = 10000  
unitPrice = round(100000 + 10000 + 20000) = 130000 IRR

**UI recommendations**
- **Fetch `goldPrice`** at app startup or include it in product API responses to avoid extra requests.  
- **Show a loading/placeholder** if `goldPrice` is missing; do not show incorrect values.  
- **Format currency** for display (thousand separators, currency label).  
- **Server verification**: always re-calculate on the server before finalizing orders; frontend calculation is only for preview.

**Edge cases**
- If `weight` is 0 or missing, fall back to product base price or show "contact support".  
- If `construction_fee_percent` is >100 or negative, cap/validate before presenting.  

Place this file in `src/docs/variant-pricing.md` for quick reference.


