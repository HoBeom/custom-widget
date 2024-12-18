# StackOverflow Widgets

This directory contains various widgets for StackOverflow reputation display. Below are the three types of widgets available:

---

## 1. Default Widget (`widget.png`)

The default widget shows a 1:1 square layout for StackOverflow reputation.  

![Default Widget](./widget.png)

---

## 2. Wide Widget (`widget34.png`)

The wide widget is a 3:4 layout, optimized for horizontal display.  

![Wide Widget](./widget34.png)

---

## 3. Tall Widget (`widget43.png`)

The tall widget is a 4:3 layout, optimized for vertical display.  

![Tall Widget](./widget43.png)

---

## How to Use

Each widget is generated dynamically using Puppeteer in the `update-pngs.js` script. The layout and styles are defined in the respective HTML files:
- `index.html` → `widget.png`
- `widget34.html` → `widget34.png`
- `widget43.html` → `widget43.png`

To regenerate the widgets, run the GitHub Actions workflow or execute the script locally:

```bash
node update-pngs.js
