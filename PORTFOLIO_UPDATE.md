# Portfolio update

Updated in the existing React / TypeScript / Vite / Tailwind repository. No deployment, push, or merge performed.

## Changes

- Hero, About and Quick Overview: current Software Engineer position, enterprise development focus, corrected email, project/contact calls to action.
- Education: Wrexham BSc first (academic reference September 2026, In Progress); Moratuwa NDT second (2022-2025, Completed).
- Employment: three requested Imara roles with exact month ranges. Volunteering has its own section; old unconfirmed ongoing volunteer dates are omitted.
- Projects: eight production projects first; five academic projects retained; category filters, always-visible accessible actions, technology badges, lazy-loaded covers.
- Skills: six requested groups, no percentage ratings.
- Contact: labelled controls, trimmed input, email validation, field errors, focus on invalid fields, duplicate-submit protection, success/failure messages, direct email link. Existing EmailJS service retained.
- Navigation/themes/accessibility: mobile close-on-selection and Escape, labelled theme toggle, skip link, focus styles, safe theme storage, reduced-motion support, cleaned-up hero animation frame lifecycle.
- SEO and assets: page title/description/social metadata; base-aware favicon and project/profile paths; GitHub Pages base remains `/Portfolio/`.
- `src/data/projects.ts` separates project content from card UI; `src/data/project-covers.json` maps real captures.
- Build now includes TypeScript checking. Playwright and Sharp are development dependencies.

## Images and live sites

All eight live sites rendered and received real desktop (1440 x 900) and mobile (390 x 844) captures, composed into 1280 x 720 WebP covers. No UI was fabricated. The desktop captures are scaled into a laptop frame and the mobile captures into a phone frame, with a subtle background and shadows. CHEM IS TRY shows its public login screen. Think Different renders despite returning HTTP 307. The initial Nando's desktop capture had an incomplete background. Recapturing with normal browser motion settings and waiting for CSS background assets restored the full real hero. Each viewport now uses a fresh page. Device frames no longer overlap, so both interfaces remain fully visible.

The existing folder is `public/images/Projects/` with a capital P. All references preserve this case for Linux/GitHub Pages compatibility. The named supplied artwork is retained as production fallback data; EcoRoute uses an optimized copy of its supplied illustration, explicitly labelled illustrative artwork. The two generic `ChatGPT Image...` files are preserved but not assigned because their project mapping is unknown.

Refresh captures with `npm run capture:projects` (requires installed Chrome and network access), or `npm run capture:projects -- nandos think-different` for selected projects. Raw captures and diagnostic reports go to ignored `artifacts/`. No authenticated access is attempted.

## Missing information / limits

- No resume exists, so no Download CV button was added.
- Confirmed technology stacks are still needed for MI Creations, i-Touch, Zyndigo and Think Different. No stacks were guessed.
- Public repositories were verified for all five academic projects, Nando's and HireMe. No verified matching public repositories were found for the other production projects.
- HireMe's technologies were confirmed from its public README/package.json: https://github.com/Fathir2001/HireMe . Nando's source: https://github.com/Fathir2001/Nando-s . Other production descriptions reflect their public pages and supplied details, without copying promotional metrics.
- EmailJS delivery and recipient configuration need an owner check. Browser submission checks use mocked responses and send no messages.
- Dependency installation reported 34 audit findings (3 low, 6 moderate, 25 high). No broad or breaking dependency upgrades were applied. The build also reports an outdated Browserslist database.

## Completed validation

- `npm run build`: passed, including TypeScript checking.
- `npm run lint`: passed with no errors or warnings.
- Production preview browser checks: passed at 390, 768 and 1440 pixels, in light and dark modes; no horizontal overflow or page errors.
- Mobile selection/Escape navigation, category counts, local anchors, required-field validation and mocked send failure/success states: passed.
- All 13 project image URLs returned HTTP 200 with valid image data under `/Portfolio/`. All eight combined covers verified at exactly 1280 x 720.
- `git diff --check`: passed (Git printed only Windows line-ending notices).
- No manual production screenshots remain outstanding.

## Validation and deployment

Run `npm run build` and `npm run lint`. For browser checks, start `npm run preview -- --host 127.0.0.1` and run `npm run verify:ui`; it checks the production build at `http://127.0.0.1:4173/Portfolio/` at mobile, tablet and desktop widths in both themes.

Review locally with `npm run dev`. On Windows where PowerShell blocks npm.ps1, use `npm.cmd` instead of `npm`.

When approved to publish, run `npm run deploy` from this checkout. Its predeploy step builds and the existing gh-pages command publishes `dist/`. Configure GitHub Pages to serve the `gh-pages` branch root. The intended repository URL is `https://fathir2001.github.io/Portfolio/`. The base path must remain `/Portfolio/` unless the hosting location changes.
