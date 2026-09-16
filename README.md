# The Snack Shack

A student-run snack shop concept presented as a responsive storefront. Browse a menu, filter snacks by category or sale, build a bag, and see a pickup-style confirmation.

## What the demo includes

- A menu of chips, drinks, sweets, and fresh snacks with prices and sample stock levels.
- Category and sale filters, quantity controls, sold-out states, and an order total.
- A confirmation dialog with a generated pickup number and pay-at-pickup instructions.

**This is a front-end demo, not a live ordering service.** Products and stock are defined in `script.js`; the cart exists only in the current page session. The confirmation number is generated in the browser and no order is sent to a server, saved, or reserved for pickup. The location, hours, prices, sale dates, and availability shown on the page are sample content, not a promise of a real shop.

## Run locally

Open `index.html` in a browser, or serve the directory with any static HTTP server. For example, if Python is available:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000/`. The site uses plain HTML, CSS, and JavaScript with no build step. `worker.js` forwards requests to static assets in its hosting environment; it does not implement checkout or inventory storage.
