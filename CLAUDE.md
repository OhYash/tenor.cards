# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

tenor.cards is a static website for creating and sharing styled text cards (for Instagram, Twitter, etc.). Users compose a message, pick a card design, and get a shareable URL with the content base64-encoded in query params. No backend or database — everything runs client-side.

**Not affiliated with Tenor the GIF search engine.**

## Commands

```bash
make up          # http-server on :8080 + Tailwind CSS watch mode
make build       # npm install + minified Tailwind build
make surge       # Deploy to tenor-cards.surge.sh (prod)
make surge_dev   # Deploy to tc_dev.surge.sh (dev)
```

Tailwind input: `assets/css/main.css` → output: `assets/css/twind.css`

## Architecture

The site is vanilla HTML/JS with Tailwind CSS (no framework, no bundler).

### Card system

Each card design has two HTML files in `cards/`: a `_create.html` (editor form) and a `_view.html` (display). Card types: `simple`, `skew`, `quote`, `tss`, `kd1x1`, `kd1x1i`, `kd2x1`.

The design page (`design_card/index.html`) loads card HTML into an iframe via a dropdown selector. Card type is stored in the `ct` query param.

### Message encoding

User text is base64-encoded (`btoa(encodeURIComponent(text))`) into the `p` query param. Additional card-specific params (`n`, `d`, `bg`, `cbg`, etc.) carry extra fields. The view pages decode and render these params — the URL **is** the data store.

### Key JS files

- `assets/javascript/main.js` — Routing logic: `loadMainPage()` (landing page, redirects old-format URLs) and `loadSelectedCard()` (design page, manages iframe loading)
- `assets/javascript/card_create.js` — Encoding + link generation for the editor side
- `assets/javascript/card_view.js` — Decoding + rendering for the view side; includes per-card-type param processors (`processQuoteExtraParams`, `processTssExtraParams`, etc.)
- `assets/javascript/parsemsg-js/` — Git submodule ([parsemsg-js](https://github.com/OhYash/parsemsg-js)) for text formatting/parsing

### Hosting

Production is on Surge at `tenor-cards.surge.sh`. Analytics via GoatCounter.
