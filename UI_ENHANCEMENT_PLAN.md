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

These are proposed changes, not implemented UI changes in the image-fix pass.
