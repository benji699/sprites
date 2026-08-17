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

Sticky header + mobile nav, hero, trust stats, services grid (10 services),
"why choose us" / about, before-after gallery, review carousel (real Google
review quotes), 3-tier pricing, map + opening hours, FAQ accordion, contact
form, footer.

Instagram is wired up to the real account, **[@kingstudiios](https://www.instagram.com/kingstudiios/)**
(14K+ followers) — its bio surfaced three services that weren't in the
original Google listing (Vehicle Customising, Motorworks, Detailing Courses),
which are now included as service cards, and confirmed the studio identifies
itself as Mile End rather than Bow.

## Before going live — things to customise

- **Photos**: gallery and hero currently use styled colour panels as
  placeholders. Replace with real before/after photos and studio shots in
  `assets/` — there's no shortage of real content on
  [@kingstudiios](https://www.instagram.com/kingstudiios/).
- **Opening hours**: third-party listings disagree (Google shows "closes
  9pm", other directories show anywhere from 9am–5pm to 9am–11pm daily). The
  site currently shows "Every day, 9:00 AM – 9:00 PM" with a note pointing
  visitors to Instagram/phone to confirm — replace with confirmed hours in
  the `<table class="hours">` block once known.
- **Contact form**: `js/script.js` currently opens the visitor's email client
  via a `mailto:` link with a placeholder address
  (`info@kingstudiosdetailing.co.uk`). For a production site, wire the form
  up to a real inbox or booking system (e.g. Formspree, Netlify Forms, or a
  small backend) and update that address.
- **Pricing**: the three packages use indicative "From £X" prices — confirm
  real pricing before publishing.
