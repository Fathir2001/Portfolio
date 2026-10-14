# Portfolio UI enhancement plan

Recommended direction: a polished software-engineering showcase with one memorable interactive element, restrained blue lighting, and real project stories.

## Highest-impact changes

1. **Hero with stronger hierarchy.** Use a two-column desktop layout: name, concise headline, current company and two actions on the left; a device showcase on the right. Keep the full professional headline in supporting copy. On mobile, put the text and actions before the visual.
2. **Feature two case studies.** Give CHEM IS TRY and one enterprise/full-stack project wider editorial cards. Include the problem, your role, implementation, and outcome. Use measured outcomes only when you can supply them; do not invent usage or revenue statistics.
3. **Project detail panel.** Open an accessible dialog containing larger real captures, role, architecture, features, and source/live links. Support Escape, focus trapping, a visible close button, and return focus to the originating card.
4. **More restrained surfaces.** Reduce the intense glow around About and Education. Use thin borders and soft shadows, with blue lighting reserved for the hero, selected filters, and hover/focus states. Increase contrast between headings, descriptions and metadata.
5. **Experience before education.** Lead with professional evidence: Hero -> Selected Work -> Experience -> About/Skills -> Education -> Contact. Show skill groups in the context of projects as well as in the skills section.
6. **Purposeful motion.** Use short staggered reveals, a clear active navigation state, and gently animated filter changes. Keep scrolling native; avoid cursor replacement and long entrance sequences.

## Three 3D options

| Option | What visitors see | Implementation | Relative effort |
| --- | --- | --- | --- |
| CSS perspective cards | A subtle 4-6 degree tilt and moving highlight on a focused project cover | CSS perspective + existing Framer Motion; pointer-fine only; return to rest on pointer leave; visible touch/keyboard actions | Low |
| Interactive hero devices (recommended signature feature) | A laptop and phone displaying actual project screenshots; buttons switch projects | Lazy-loaded React Three Fiber / Three.js scene, lightweight device geometry, screenshot textures, restrained rotation, accessible HTML controls | Medium |
| Explorable architecture scene | Frontend, API and database nodes connected in 3D for one project | React Three Fiber with labelled HTML controls and a matching plain-text architecture description | Higher |

Start with the CSS tilt and stronger case studies. Add the hero device scene once the content hierarchy feels right. Keep the architecture scene as an optional case-study detail rather than making it the main navigation.

## Performance and accessibility requirements

- Render the hero text immediately; load 3D after the main content. Keep the current combined WebP cover as a static fallback.
- Use one WebGL canvas. Avoid rendering a separate 3D scene in every project card.
- Use on-demand rendering when idle, modest device pixel ratio, small textures and simple lighting. Pause animation when offscreen or the tab is hidden.
- Replace rotation/parallax with a static visual for reduced-motion users. Keep all controls usable without hover, drag or WebGL.
- Test on an actual mid-range phone before shipping; retain the static version if the 3D scene worsens interaction or load time.

Official implementation references:
- React Three Fiber performance and on-demand rendering: https://r3f.docs.pmnd.rs/advanced/scaling-performance
- Motion reduced-motion handling: https://motion.dev/docs/react-use-reduced-motion
- Three.js resource cleanup: https://threejs.org/manual/pages/how-to-dispose-of-objects.html

Implemented in the existing repository:
- Editorial two-column hero with an on-demand React Three Fiber laptop/phone scene and three switchable real project screens.
- Static covers for narrow/touch layouts, reduced motion, and WebGL failures.
- Two featured projects, native accessible detail dialogs, and interactive architecture layers built with CSS perspective and semantic buttons.
- Fine-pointer card tilt, active navigation, reordered sections, refined surfaces, portrait About section, compact education cards and a footer.

The architecture explorer is a lightweight CSS 3D interaction, not a second WebGL scene. This keeps the portfolio to a single canvas. Three.js/Fiber are split into an optional desktop-only chunk. The existing React 18 architecture is retained using Fiber 8.

No project metrics, client counts or individual contribution claims were invented. Project notes use supplied stacks, public website information and the previously verified HireMe README.

## Redesign implementation and verification

The approved redesign is implemented in place. Main changes: `Hero.tsx`, `DeviceShowcase.tsx`, `DeviceScene.tsx`, `Projects.tsx`, `Navbar.tsx`, `About.tsx`, `Education.tsx`, `src/index.css`, `src/data/case-studies.ts`, and section ordering in `App.tsx`. The existing contact delivery/validation logic, academic projects, personal information, themes, and GitHub Pages base path remain in use.

The hero uses real capture textures in `public/images/screens/`; the capture script now refreshes these alongside the combined covers. Three showcase projects can be selected with ordinary HTML buttons. The architecture explorer uses CSS perspective rather than creating a second WebGL canvas.

Browser checks covered desktop 3D loading and project switching, 390/768/1440 layouts in both themes, dialog keyboard containment/Escape/focus restoration, architecture selection, project filters, mobile navigation, image/anchor paths, and mocked contact success/failure states. WebGL-disabled and initial reduced-motion fallbacks were separately verified. No actual contact messages were sent. Testing uses Chromium viewport emulation; a physical phone performance test was not available.

The main application is approximately 97 KB gzip, and the optional desktop 3D chunk is approximately 223 KB gzip. Vite reports a non-blocking large-chunk warning for this lazy-loaded dependency; mobile, touch and reduced-motion layouts avoid loading it. The existing Browserslist data-age warning remains.

Use `npm.cmd run dev` to review locally. For production browser verification, run `npm.cmd run build`, start `npm.cmd run preview -- --host 127.0.0.1`, then run `npm.cmd run verify:redesign`.

No push, merge or deployment was performed.

Final validation: build (including TypeScript) and lint pass. The live reduced-motion preference change was verified against the final production build: the canvas is removed and the actual project cover appears immediately. `git diff --check` passes. Screenshots are saved under ignored `artifacts/redesign/`, including desktop, mobile, tablet, light/dark and project dialog views.
