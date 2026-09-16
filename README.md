# Amir Shahzad Hashmi, portfolio

A static single-page portfolio for Amir Shahzad Hashmi, aimed at software engineering roles in back-end, full-stack and AI automation. Live at [https://amirshahzadhashmi7145.github.io/Amir-Portfolio/](https://amirshahzadhashmi7145.github.io/Amir-Portfolio/).

## Run locally

From the repo root:

```bash
npx serve .
```

Or open `index.html` in a browser. There is no build step.

## File layout

- `index.html`: all page content and structure
- `styles.css`: design tokens, layout and print styles
- `script.js`: theme toggle, mobile nav, active section highlighting, footer year
- `assets/`: profile image variants, Open Graph image, SVG favicon, and `Amir_Shahzad_CV.pdf` for the Download CV buttons
- `favicon.ico`: legacy favicon
- `robots.txt`, `sitemap.xml`: crawling hints for the GitHub Pages URL

## Update content

Edit the relevant section in `index.html`:

- Work case studies and earlier projects: `#work`
- Jobs: `#experience`
- Skills groups: `#skills`
- Bio, education, certifications: `#about`
- Email, phone and profiles: `#contact`

Do not invent projects, metrics or employers. If a fact is missing, leave a `<!-- TODO: Amir to confirm -->` comment.

## Theme toggle

The default theme follows `prefers-color-scheme`. An inline script in `<head>` applies a stored `localStorage.theme` value (`light` or `dark`) before CSS paints, so there is no flash. The nav button then overrides that choice.

## Image variants

`assets/profile-480.webp` and `assets/profile-960.webp` are used in a `<picture>` element with `assets/profile-480.jpg` as the fallback. The About photo is 240px wide, lazy-loaded, and sits below the fold.
