# Halden: multi-page skincare storefront

Static, dependency-free. Open `index.html`, or run `python3 -m http.server 8000`.

## Pages
`index.html` · `shop.html` (filter, sort, search; supports `?cat=treat` and `?q=serum`) · `product.html?p=<slug>` (one template for every product) · `our-story.html` · `ingredients.html` · `journal.html`

## Shared code
- `script.js` injects the same header, mobile menu, cart drawer and footer on every page, so edit navigation in one place (the `links` array).
- Cart is stored in `localStorage` (`halden_cart_v2`) and syncs across pages and open tabs.
- `products.js` holds the catalogue. Add a product there and it appears in the shop, bestsellers, related products and gets its own product page automatically.
- `styles.css` holds all tokens and styles.
