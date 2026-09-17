# Sivasankar R — Portfolio Website

A modern, responsive, static Software Developer / Full-Stack Developer portfolio built with **HTML5, CSS3, and vanilla JavaScript**.

## Features

- Responsive layout for mobile, tablet, desktop, and large screens
- Dark and light themes
- System color-scheme detection
- Theme preference stored in `localStorage`
- Sticky navigation with active-section highlighting
- Accessible mobile navigation
- Scroll progress indicator
- IntersectionObserver-based reveal animations
- Reduced-motion support
- Project filtering without page reloads
- Accessible project-detail modal
- Escape-key and outside-click modal closing
- Keyboard focus handling for the modal
- Client-side contact-form validation
- `mailto:` contact workflow for GitHub Pages
- Back-to-top button
- Semantic HTML and accessible focus states
- SEO metadata and Open Graph metadata
- No framework, build step, backend, or database required

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Native browser APIs:
  - IntersectionObserver
  - `localStorage`
  - `matchMedia`
  - `URL`/`mailto` navigation
  - CSS media queries

The design uses Google Fonts for typography. If you need a completely dependency-free/offline build, replace the font import in `style.css` with local/system fonts.

## Folder Structure

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── resume.pdf
    └── images/
```

## Running Locally

No installation is required.

### Option 1 — Open directly

Open `index.html` in a modern browser.

### Option 2 — Use a local static server

From the portfolio directory:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## GitHub Pages Deployment

1. Create a GitHub repository.
2. Put `index.html`, `style.css`, `script.js`, `README.md`, and the `assets/` directory in the repository root.
3. Confirm that the resume exists at:

```text
assets/resume.pdf
```

4. Push the files to GitHub.
5. Open the repository's **Settings → Pages**.
6. Under the Pages build/deployment settings, select the branch containing the portfolio and the repository root (`/`) as the publishing source.
7. Save the Pages configuration.
8. GitHub will publish the static site.

The site uses relative paths, so it can also work when published under a GitHub Pages project URL.

## Adding / Replacing the Resume

Replace:

```text
assets/resume.pdf
```

with your current PDF while keeping the same filename.

The website's Resume buttons already point to:

```text
./assets/resume.pdf
```

## Updating Content

Most visible portfolio content is in `index.html`.

Search for the relevant section:

- Hero
- About
- Skills
- Projects
- Education
- Certifications
- Contact
- Footer

Keep portfolio claims aligned with the resume. Do not add employment history, achievements, metrics, testimonials, repositories, demos, or other claims unless they are factually available.

## Updating Projects

Project cards are in `index.html`.

Project modal content is stored near the top of:

```text
script.js
```

inside:

```javascript
const projectData = { ... };
```

If you add a project, update both:

1. The project card in `index.html`
2. The matching modal entry in `script.js`

For filtering, give the card a `data-tags` attribute using the existing categories:

```text
Python
Java
Web
API
Database
```

Only use categories that accurately describe the project.

## Customizing the Theme

The design system is controlled through CSS variables near the top of `style.css`.

Dark theme variables are in:

```css
:root { ... }
```

Light theme variables are in:

```css
html[data-theme="light"] { ... }
```

Useful variables include:

```css
--bg
--surface
--text
--muted
--accent
--line
--radius
--shadow
```

The theme toggle in `script.js` persists the selected theme using:

```text
localStorage key: portfolio-theme
```

## Contact Form

The contact form does not use a server.

After client-side validation, JavaScript constructs a `mailto:` URL addressed to:

```text
sivasankar7530@gmail.com
```

The visitor's email client handles the message.

If you later want server-side form processing, replace the `mailto` workflow with a form service or your own backend. Do not claim server submission while using the current static workflow.

## Accessibility

The portfolio includes:

- Semantic sections and headings
- Skip-to-content link
- Keyboard-visible focus states
- Accessible navigation controls
- ARIA labels for interactive controls
- Accessible modal semantics
- Escape-to-close modal behavior
- Focus restoration after modal close
- Reduced-motion support
- Mobile-friendly controls
- Form validation messages

## Performance Notes

The portfolio intentionally avoids JavaScript frameworks and large UI libraries.

For further optimization:

- Keep images compressed and appropriately sized.
- Prefer WebP/AVIF for future images.
- Lazy-load non-critical images.
- Avoid adding unnecessary third-party scripts.
- Keep project visuals CSS-based when real screenshots are unavailable.

## Content Source

The portfolio content is based on the supplied resume. It intentionally avoids fabricated employment history, client information, metrics, testimonials, GitHub statistics, live project links, awards, and other unsupported claims.

## License

No license is specified by the resume or portfolio source. Add an appropriate license if you decide to publish the source for reuse.
