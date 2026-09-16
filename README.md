# Sivasankar R — Portfolio

A vanilla HTML/CSS/JS portfolio site, built for GitHub Pages. No build step, no framework, no backend.

## File structure

```
portfolio/
├── index.html
├── README.md
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── icons/favicon.svg
│   └── resume/Sivasankar-R-Resume.pdf
```

## Deploying to GitHub Pages

1. Create (or reuse) a repository named `<your-username>.github.io` for a root domain, or any repo name if you're fine with a `/repo-name/` path.
2. Copy every file/folder above into the repository root, preserving the folder structure exactly (all paths in `index.html` are relative).
3. Commit and push to the `main` branch.
4. In the repo, go to **Settings → Pages**, set **Source** to the `main` branch (root), and save.
5. Your site goes live at `https://<your-username>.github.io` (or your custom domain, e.g. `devsiva.in`, if you have a `CNAME` file already configured for that).
6. If you use a custom domain, keep your existing `CNAME` file in the repo root — it isn't included here since it's specific to your DNS setup.

No environment variables, server, or database are required — everything runs client-side.

## Updating content

- **Resume file**: replace `assets/resume/Sivasankar-R-Resume.pdf` with a new export any time and keep the same filename, or update the `href` in the "Download résumé" button in `index.html` if you rename it.
- **Projects**: edit both the `<article class="project-card">` blocks in `index.html` (the card you see on the page) and the matching entry in the `projects` array near the top of `assets/js/script.js` (the data used for the "View details" modal). Keeping these in sync is the only manual step.
- **Skills**: edit the `<span class="tag">` items inside `#skills` in `index.html`.

## Adding a GitHub profile link

No GitHub username was in your resume, so no GitHub button/link was added anywhere (nav, footer, or project cards) — adding one would have meant guessing a URL. Once you have a public GitHub profile:
- Add a link in `.sidebar-socials` and `.footer-links` in `index.html`.
- Optionally add a `data-github="https://github.com/..."` attribute per project in the `projects` array in `script.js`, and a matching "View on GitHub" button in each modal render, if you want per-project repo links.

## Making the contact form actually send email

Right now, submitting the contact form opens the visitor's email client via a `mailto:` link (see the `contact-form` handler in `script.js`) — this works with zero backend but depends on the visitor having a configured email client.

To collect messages directly instead:
1. Sign up for [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com) (both have free tiers that work on static sites).
2. Follow their setup docs to get a form endpoint or API keys.
3. Replace the `submit` handler in `assets/js/script.js` with their recommended `fetch()` call, using the endpoint/keys they give you.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). Uses `IntersectionObserver`, `localStorage`, and CSS custom properties — all with graceful fallbacks already handled in `script.js`.
