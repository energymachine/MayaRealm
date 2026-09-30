# MayaRealm website

Static website for MayaRealm, with no build step. Open `index.html` in a browser, or upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or regular web hosting).

## Structure

```
index.html               Home page (hero, BoltFall, games, universe, studio, craft, realms, CTA)
privacy.html             Privacy Policy page (linked from the nav menu and footer)
assets/css/styles.css    All styles; design tokens sit at the top in :root
assets/js/core.js        Shared helpers + the canvas scene manager (animates visible canvases only)
assets/js/scenes/*.js    One file per animated scene (hero, arena, worlds, universe, realms)
assets/js/main.js        Wires scenes to canvases, runs the UI, holds the LINKS config
assets/img/favicon.svg   Tab icon
```

Scripts are plain `<script>` tags loaded in order, so the site also works when opened straight from disk.

## Before going live

1. **Links.** In `assets/js/main.js`, fill in `LINKS` (steam, youtube, press). Until a link is filled in, its button shows a "coming soon" message.
2. **Privacy Policy placeholders.** In `privacy.html`, search for `[Insert` and fill in the effective date, last-updated date and support email. It also names `https://www.mayarealm.com` as the website. Change this if your domain is different.
3. **Social preview.** Add `assets/img/og-image.jpg` (1200×630). After you choose a domain, make the `og:image` URL in `index.html` absolute.
4. **Store listing.** Put the live URL of `privacy.html` into Google Play Console, App Store Connect and Steam.

## Editing content

- **Colors and fonts:** `:root` in `styles.css`.
- **Studio numbers:** the `data-count` values in the About section of `index.html`.
- **Concept gallery:** the `.rcard` blocks in `index.html` hold the text. The art settings (accent color, hood, weapon, world type) are in the `REALMS` array in `scenes/realms.js`.
- **Adding a page:** copy `privacy.html`, keep the header and footer, and replace the content inside `<main>`.
