# Hair Extension Pricing Calculator

A consultation and quoting tool for hair extension and colour services.
A stylist picks an install method, length, number of packs and colour
services, and the page works out a price as they go.

Plain HTML, CSS and JavaScript. No build step, no server — open
`index.html` in a browser, or use the live version linked in this repo's
settings.

## About the prices in this repo

**The prices in `catalog-data.js` are placeholder example data. They are
not Styled by Lucy's real pricing.** They came with the original template
and are roughly 2-3x the real rates. Treat every number in here as a
stand-in.

## Before putting real pricing in

**This repository is public.** Anything committed here can be read by
anyone who finds it — including hair costs, wholesale costs, stylist
labour rates and the margin between them.

So, before loading real numbers:

- Switch the repository to private first, **or**
- Keep the real pricing out of the repo entirely.

Note that making a repo private later does not undo it — anything already
pushed stays in the git history and may already have been copied.

## Files

| File | What it does |
|---|---|
| `index.html` | The page itself |
| `styles.css` | All styling |
| `catalog-data.js` | Price lists: brands, lengths, services, treatments |
| `app.js` | The pricing logic and interface behaviour |
