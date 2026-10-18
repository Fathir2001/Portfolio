import { useRef } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { MessageSquare, Lightbulb, Users } from "lucide-react";
export default function HolographicEnvelope({ pageVisible }: { pageVisible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 25 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 25 });
  const active = inView && pageVisible;
  const orbit = "M45 165C45 110 455 110 455 165C455 220 45 220 45 165";
  return <div ref={ref} className="ct-hologram" data-active={active} aria-hidden="true">
    <motion.div className="ct-envelope-scene" style={{ rotateX, rotateY, transformPerspective: 1000 }} onPointerMove={event => {
      if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const r = event.currentTarget.getBoundingClientRect(); x.set((.5 - (event.clientY - r.top) / r.height) * 6); y.set(((event.clientX - r.left) / r.width - .5) * 6);
    }} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <svg className="ct-envelope-art" viewBox="0 0 500 330">
        <defs>
          <linearGradient id="ct-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#65b8ff" stopOpacity=".6" /><stop offset=".42" stopColor="#164bca" stopOpacity=".3" /><stop offset="1" stopColor="#805bff" stopOpacity=".65" /></linearGradient>
          <linearGradient id="ct-flap" x1="0" y1="0" x2=".7" y2="1"><stop stopColor="#7dcfff" stopOpacity=".65" /><stop offset=".5" stopColor="#3478ff" stopOpacity=".28" /><stop offset="1" stopColor="#805bff" stopOpacity=".8" /></linearGradient>
          <radialGradient id="ct-stage-light"><stop stopColor="#3478ff" stopOpacity=".4" /><stop offset="1" stopColor="#3478ff" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="250" cy="277" rx="230" ry="45" fill="url(#ct-stage-light)" />
        <g className="ct-platform"><ellipse cx="250" cy="280" rx="173" ry="29" /><ellipse cx="250" cy="272" rx="173" ry="29" /><ellipse cx="250" cy="272" rx="149" ry="23" /><ellipse cx="250" cy="272" rx="120" ry="17" /><path d="M77 272V280M423 272V280" /></g>
        {[-23, 17].map((angle, i) => <g key={angle} transform={`rotate(${angle} 250 165)`} className={`ct-orbit ct-orbit-${i}`}><path d={orbit} /><circle cx="45" cy="165" r="3" />{active && !reduced && <circle r="3"><animateMotion path={orbit} dur={`${19 + i * 5}s`} repeatCount="indefinite" /></circle>}</g>)}
        <g className="ct-envelope-float">
          <path d="M151 90 325 55 344 68 169 105 178 220 159 208Z" fill="#163d89" fillOpacity=".5" stroke="#4d8fff" />
          <path d="M169 105 344 68 357 205 180 241Z" fill="url(#ct-glass)" stroke="#9cdaff" strokeWidth="2" />
          <path d="M180 241 253 155 357 205" fill="url(#ct-glass)" stroke="#8dbbff" strokeWidth="1.5" />
          <path d="M169 105 253 173Q260 179 267 169L344 68Z" fill="url(#ct-flap)" stroke="#c3e8ff" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M176 111 186 231 350 199 M178 100 338 67" fill="none" stroke="#65b8ff" strokeOpacity=".55" />
          <path d="M192 104 213 226M201 102 222 224" stroke="#c3e8ff" strokeOpacity=".12" strokeWidth="5" />
          <path d="M158 80V65L321 32V48M157 57V47L296 19" fill="none" stroke="#3478ff" strokeOpacity=".45" /><circle cx="321" cy="32" r="2" fill="#9cdaff" />
        </g>
        <path className="ct-fragment" d="M85 220 102 211 119 220 102 231Z M85 220V239L102 250 119 239V220M102 231V250 M395 107 409 101 420 110 406 117Z M395 107V122L406 130 420 123V110M406 117V130" />
      </svg>
      <span className="ct-floating-badge ct-badge-ideas"><MessageSquare size={20} />Discuss<br />Ideas</span>
      <span className="ct-floating-badge ct-badge-build"><Lightbulb size={20} />Build<br />Solutions</span>
      <span className="ct-floating-badge ct-badge-create"><Users size={20} />Create<br />Opportunities</span>
    </motion.div>
  </div>;
}
