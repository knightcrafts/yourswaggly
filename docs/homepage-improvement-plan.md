# Homepage Improvement Plan (benchmarked vs zigly.com)

Reference reviewed: **https://zigly.com/** (professional pet e‑commerce). Goal: make the YoursWaggly homepage feel more complete/professional without changing the approved visual direction. **Reuse-first** — the purchased Minion theme already ships most of these as unused sections.

## Why it feels "missing"
The build matches the approved (boutique, short) mockup. Zigly reads as professional because it's a **dense, merchandised storefront** with layered social proof, offers, and discovery paths. The gaps are missing **commerce/trust surfaces**, not design quality.

## Gap analysis — Zigly has / YoursWaggly doesn't yet
- Product cards: ratings, discount %, strike‑through price, variant swatches, Bestseller/Vet‑recommended badges, "save extra above $X", quick‑add, notify‑back‑in‑stock.
- Merchandising: tabbed deals carousels (Dry/Wet/Treats/Toys), bestsellers, new arrivals.
- Social proof: star ratings, brand logos, vet credibility, testimonials.
- Discovery: 12‑category grid, A–Z brand directory, lifestage (Puppy/Adult/Senior).
- Offers: order‑value offer bar, tiered discounts, seasonal collection.
- Services: prominent Vet / Grooming / Pharmacy banners.
- Trust: delivery/location selector, support hours, secure‑payment cues.
- Retention: wishlist, subscriptions/repeat delivery, recently viewed.
- Content: blog on homepage, testimonials.

## Phase 1 — Quick wins (reuse existing Minion sections, mostly config)
1. Tabbed product rows via existing `featured-collection-tabs`; Bestsellers/On‑Sale/New/Recommended via `grid-of-products`.
2. Enable richer product cards (sale badge, compare‑at strike‑through, swatches, quick‑add/quick‑view); Bestseller/Vet‑approved badge via `softali.featured_badge` metafield.
3. USP trust strip via `icon-banners` (free shipping over $49 · vet‑approved · 7‑day returns · 24/7 support).
4. Brand credibility row via `brands` / `brands-list`.
5. Blog teaser via `blog-posts`.
6. Enable `recently-viewed-products` + `product-recommendations`.
7. Turn on cart `free-delivery-bar`.

## Phase 2 — Higher-impact merchandising & trust
8. Expanded Shop‑by‑Category grid (8–12 tiles) via `popular-categories` / `collection-list` or extend `waggly-category-cards`.
9. Services block (Vet/Grooming/Pharmacy) via `collage` / `banners`.
10. Testimonials via `reviews` section.
11. Offer bar with a real promotion via `announcement-bar` / `ticker`.
12. Social‑proof counters via `counter-showcase` ("50,000+ happy pets", "4.8★").
13. Lifestage entry points (Puppy/Adult/Senior).
14. Payment/security + guarantee cues near footer.

## Phase 3 — Strategic (apps / metafields)
15. Product ratings & reviews app (Judge.me/Loox/Yotpo) — uses product‑page `@app` slots. Biggest credibility gap closer.
16. Wishlist app.
17. Subscriptions / repeat delivery (selling plans + app) — high LTV for food/litter.
18. Delivery/location estimate app.
19. Live chat / support (Shopify Inbox).
20. Search upgrade: predictive search + collection filters/facets + popular searches.

## Cross-cutting polish
- Consistent product photography on uniform backgrounds.
- Micro‑interactions (hover lift, section reveal — theme has fade‑in settings).
- SEO: metafields, structured data (`structured_data`), blog cadence.
- Performance/accessibility pass before launch.

## Recommended first step
Phase 1 items 1–5 (reuse existing sections = editor config + a couple of section adds), then Phase 3 #15 (reviews app) for real star‑ratings/social proof.

## Next deliverable (optional)
Section‑by‑section proposed homepage layout: exact order, which existing theme section powers each, content/collections to supply, and which items need a paid app vs. free/reuse.
