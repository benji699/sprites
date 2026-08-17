# King Studios Detailing — Website

A clean, modern one-page website for **King Studios Detailing**, a car valeting &amp;
detailing studio at 430 Burdett Rd, London E3 4JS.

## Structure

```
king-studios-detailing/
├── index.html      All page content/sections
├── css/style.css   Design system (colours, type, layout, responsive rules)
├── js/script.js    Mobile nav, scroll reveal, testimonial carousel, FAQ, form
└── assets/         Drop real photos/logo files here
```

No build step or dependencies — open `index.html` directly, or serve the folder
with any static file server, e.g.:

```
cd king-studios-detailing
python3 -m http.server 8080
```

## Sections included

Sticky header + mobile nav, hero, trust stats, services grid (8 services),
"why choose us" / about, before-after gallery, review carousel (real Google
review quotes), 3-tier pricing, map + opening hours, FAQ accordion, contact
form, footer.

## Before going live — things to customise

- **Photos**: gallery and hero currently use styled colour panels as
  placeholders. Replace with real before/after photos and studio shots in
  `assets/`.
- **Instagram handle**: links currently point to `instagram.com` generically —
  update `href="https://www.instagram.com/"` in `index.html` to the real
  `@handle`.
- **Opening hours**: the hours table is an estimate (Mon–Sat 8am–9pm). Confirm
  exact hours and update the `<table class="hours">` block.
- **Contact form**: `js/script.js` currently opens the visitor's email client
  via a `mailto:` link with a placeholder address
  (`info@kingstudiosdetailing.co.uk`). For a production site, wire the form
  up to a real inbox or booking system (e.g. Formspree, Netlify Forms, or a
  small backend) and update that address.
- **Pricing**: the three packages use indicative "From £X" prices — confirm
  real pricing before publishing.
