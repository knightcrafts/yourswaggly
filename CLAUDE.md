# CLAUDE.md — Yours Waggly (Shopify theme)

Context for AI/dev sessions on this project. Read this first.

## Project
- **What:** Pet e‑commerce storefront "**Yours Waggly**" built on a **purchased "Minion" theme** (Domestic preset as the starting point).
- **Goal:** Implement the client‑approved homepage/design into the existing Minion theme. **Do not rebuild the theme**; reuse Minion components, keep everything editable in the Theme Editor, preserve existing Shopify functionality.
- **Design source:** `Yours waggly V4_compressed.pdf` (full mockup) and `Yours waggly colours_compressed.pdf` (palette). Client fonts + illustration exports live in `local/`.

## Store & deploy (IMPORTANT)
- **Store domain:** `cdz1eu-2n.myshopify.com`
- **Live theme:** `Yours Waggly Custom` — **ID `158488297664`** (role: live).
- ⚠️ **There is a duplicate unpublished theme also named "Yours Waggly Custom" (`158489870528`).** Always push by **ID** to the live one. (Recommend deleting the duplicate.)
- **Auth:** Shopify CLI with a **Theme Access token** (Admin → Apps → *Theme Access*). Pass via env `SHOPIFY_CLI_THEME_TOKEN` (never commit it to the repo; rotate if leaked).
- **Push pattern (surgical — code only):**
  ```bash
  export SHOPIFY_CLI_THEME_TOKEN='shptka_...'
  shopify theme push --store cdz1eu-2n.myshopify.com --theme 158488297664 --allow-live \
    --only sections/xxx.liquid --only snippets/yyy.liquid
  ```
- **NEVER push merchant‑content files** unless explicitly intended — they overwrite live editor config:
  `config/settings_data.json`, `templates/*.json`, `sections/*-group.json` (header-group/footer-group).
  Navigation **menus** live at the shop level (Admin → Content → Menus), **not** in theme files — the Theme Access token cannot edit them.
- Verify a deploy by fetching the live URL and grepping the HTML for expected classes (e.g. `list-menu__icon`, `submenu__item-desc`, `outfit-700.woff2`).

## Validation workflow
- Author Liquid, then validate with the **Shopify Dev MCP** `validate_theme` tool (or the `shopify-liquid` skill's `scripts/validate.mjs`). Fix before shipping.
- Pre‑existing vendor warnings that are **NOT ours** (leave them): in `layout/theme.liquid` the `sections.slideshow.pause_slideshow` / `play_slideshow` missing‑locale ERRORS and font `preload_tag` warnings; `img_url` deprecation warnings in `footer.liquid` and `menu-megamenu.liquid` banner code.

## Design system
- **Palette** (exact, from the designer PDF):
  - Background `#f7f2ef`, Secondary bg `#f2ebe3`
  - Text/base `#544340` (warm brown), Button/accent `#9b643d` (brown — **no orange**)
  - Footer `#544340`
  - Category cards: lavender `#d3a5d8`, teal `#89b5ae`, yellow `#f9d090`, peach `#f2af88`
  - Stored globally in `config/settings_data.json → current` (`color_base`, `color_accent`, `color_background`, `color_secondary_background`, `color_price`, `color_addtocart`).
- **Fonts:** **Outfit** (all headings + body) and **Kalam** (handwritten — category card titles, value heading). Self‑hosted woff2 in `assets/` (`outfit-400/500/600/700.woff2`, `kalam-400/700.woff2`), declared via `@font-face` in `layout/theme.liquid` which also overrides `--font-heading-family`/`--font-body-family` to Outfit and defines `--font-hand: 'Kalam'`.
  - Source TTFs: `local/Outfit/`, `local/kalam/`. Convert with `fonttools` (`f.flavor='woff2'`).

## Custom homepage sections (new; CSS lives in each file's `{% stylesheet %}`)
- `sections/waggly-hero.liquid` — reusable hero, used **twice** on the homepage (hero + intro) via `image_position` right/left. Eyebrow, 2‑line heading (line 2 = accent), subtext, 2 CTAs, image, paw/bone decor. Full‑width default. (Oval shape was removed — the illustration carries it.)
- `sections/waggly-category-cards.liquid` — "Explore The Best For Your Pet". **White rounded panel** with **slider arrows** (co‑located `waggly-cats-slider` custom element, ~30 lines, no library), **CSS‑only Dogs/Cats tabs** (radio `:checked` siblings), faint **paw prints** on the panel, **Kalam** heading, centered tabs. Blocks = category cards (image, heading, CTA, link, bg color, tab).
- `sections/waggly-value.liquid` — "Because They Deserve The Best". Rounded card, Kalam heading, side illustration, value blocks (label + optional icon).
- `sections/waggly-products.liquid` — "Loved By Pets & Chosen By Parents". Pulls from a **Shopify collection** and renders the theme's shared `snippets/product-card.liquid` inside a **scoped** wrapper (`.waggly-products`) restyled to rounded card + circular "+" add button. Reuses cart/quick‑add/badges.
- `sections/waggly-story.liquid` — reusable rich‑text/quote band (eyebrow, heading, richtext body, optional left/right image, centered‑quote mode, handwritten/large heading options).
- `sections/waggly-cards.liquid` — eyebrow + heading + grid of rounded cards (icon + text). Used for the Our Story "question" grid.
- `sections/waggly-steps.liquid` — intro text + a connected numbered process flow (step blocks: icon/title/description).
- `sections/waggly-closing.liquid` — dark rounded‑top banner: two‑column text + handwritten quote + logo/wordmark + optional corner decoration.
- `waggly-hero` also has a `heading_style` (normal Outfit / handwritten Kalam) option.
- **Our Story page** (`page.our-story.json`) rebuilt to a rich 7‑section layout (hero → "changing" story → question cards → "idea" story → process steps → "marketplace" story → dark quote banner) matching the client's ChatGPT mockup.
- **Content page templates** (client docs in `Client Docs/`): `templates/page.our-story.json` ("Love Beyond the Bowl" brand story), `page.bundle-of-joy.json` (puppy/kitten starter kit; CTAs → `/collections/puppies` & `/collections/kittens`; grid ← `bundle-of-joy` collection), `page.discovery-kit.json` (trial picks; grid ← `discovery-kit` collection). Built from `waggly-hero` + `waggly-story` + `waggly-products` + `waggly-category-cards`. Copy is seeded/editable; images are placeholders.
- `sections/waggly-decorations.liquid` — reusable **floating overlay** layer. Drop it anywhere; each block = a PNG/inline‑SVG element with position (x %, y px), size, mobile size, rotation, opacity, flip, z‑index, desktop/mobile visibility, optional link. Zero‑height by default so elements bleed into neighbouring sections; `pointer-events:none` so overlays never block clicks (links re‑enable it).
- Homepage order (`templates/index.json`): `hero → intro → categories → value → products`. Header/footer from `sections/header-group.json` / `footer-group.json`.

## Footer
- `sections/footer.liquid` extended (additive): rounded‑top, optional **top‑decoration image**, editable **copyright** (+ `{% stylesheet %}`). Dark‑brown look configured in `footer-group.json` (`color_background #544340`).

## Menu conventions (client‑editable in Content → Menus)
- **Rich dropdown items** (both mega menu and plain submenu): name a menu item `Label :: Description :: icon-name`. Description and icon are optional; `::` is the separator; leave the middle empty for icon‑only (e.g. `Dog menu ::  :: dog_sm`).
  - Implemented in `snippets/menu-megamenu.liquid` (3rd‑level items get description; column titles get icon) and `snippets/menu-submenu.liquid` (dropdown items get label + description + icon; dropdown auto‑widens via `:has()`).
  - `snippets/menu-drawer.liquid` strips the `::` on mobile (shows clean label only).
  - Icon names come from the theme's icon set (`snippets/icons-list*.liquid`; same names as the header **Main menu icons** block, e.g. `dog_sm`, `cat_sm`, `sale_sm`, `grooming_sm`, `new_sm`).
- **Classic header menu icons:** the vendor's classic layout did **not** render per‑item icons — added to `snippets/header-menu.liquid` (+ `sections/header.liquid` passes `icons:svg_icons, icons_size`). Icons are **positional** via the `Main menu icons` block: field #N → Nth top‑level item.

## Minion theme architecture notes (don't break these)
- ~everything interactive is a **Web Component** (`customElements.define`) driven by Shopify's **Section Rendering API**; behavior is bound to specific tag names, element IDs, `data-*` attrs, and `.js-*` classes — renaming silently breaks features.
- No jQuery / no animation library (only vendored `countUp.min.js`).
- **`snippets/product-card.liquid` is shared by ~9 sections** — never restyle it globally; scope CSS to a section wrapper.
- No top‑level `/blocks` folder — blocks are section‑local (declared in each section's `{% schema %}`). `@app` app blocks supported in `apps`, `main-product`, `featured-product`, `main-article`, `main-cart-footer`.
- Metafields used by theme: `product.metafields.softali.featured_badge`, `product.metafields.minion.countdown`. No metaobjects.
- Breakpoints: `≤576`, `577–1024`, `≥1025`, `≥1190`, `≥1441`.

## Local tooling used
- PDF viewing: `PyMuPDF` (render pages to PNG in OS temp — do not commit).
- Font conversion: `fonttools` + `brotli` (TTF→woff2).
- `local/4x/4x/*.png` = client illustration exports (hero pets, category images, footer pets, etc.) — **not yet wired**; currently sections use placeholder SVGs + image_picker settings.

## Conventions / preferences
- Reuse Minion components where practical; keep all content editable via Theme Editor; avoid unnecessary JS.
- New‑section CSS goes in the section's `{% stylesheet %}` (scoped), not in `base.css`.
- Commit messages end with the Co‑Authored‑By trailer. Work is committed to `master`.

## Open / next tasks
- Wire the real illustrations from `local/4x/` into the sections (hero, category cards, value, footer decoration).
- Optional: white‑panel + slider treatment on the Products section (mockup shows a similar container).
- Delete the duplicate unpublished "Yours Waggly Custom" theme.
- Rotate the Theme Access token (it was shared in chat during setup).
