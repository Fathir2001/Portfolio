import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { GraduationCap, Calendar, Check, BookOpen, Lightbulb, Target, Sprout } from "lucide-react";
import "./Education.css";

const education = [
  { degree: "BSc (Hons) Computing (Top-Up)", institution: "Wrexham University", date: "2026", status: "Completed",
    description: "Completed a BSc (Hons) Computing (Top-Up), strengthening knowledge in advanced computing, software engineering, and practical application development." },
  { degree: "National Diploma in Technology (Information Technology)", institution: "Institute of Technology, University of Moratuwa (ITUM)", date: "2022\u20132025", status: "Completed",
    description: "Built a strong foundation in information technology, software development, system design, and practical technical skills." },
];
const milestones = [
  { year: "2022", text: "Began National Diploma in Technology (IT)" },
  { year: "2025", text: "Completed NDT (IT)" },
  { year: "2026", text: "Completed BSc (Hons) Computing (Top-Up)" },
];
const philosophy = [
  { title: "Continuous Learning", text: "Always exploring new technologies.", icon: BookOpen },
  { title: "Practical Mindset", text: "Applying knowledge to real-world problems.", icon: Lightbulb },
  { title: "Growth Focused", text: "Building skills for meaningful impact.", icon: Target },
  { title: "Stronger Tomorrow", text: "Turning education into opportunity.", icon: Sprout },
];

function HolographicGraduationCap({ pageVisible }: { pageVisible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 110, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 110, damping: 24 });
  const active = inView && pageVisible;
  const orbit = "M 35 155 C 35 95 425 95 425 155 C 425 215 35 215 35 155";
  return (
    <div ref={ref} className="ed-hologram" data-active={active}>
      <motion.div className="ed-cap-scene" aria-hidden="true" style={{ rotateX, rotateY, transformPerspective: 1000 }} onPointerMove={event => {
        if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const r = event.currentTarget.getBoundingClientRect();
        x.set((.5 - (event.clientY - r.top) / r.height) * 6); y.set(((event.clientX - r.left) / r.width - .5) * 6);
      }} onPointerLeave={() => { x.set(0); y.set(0); }}>
        <svg viewBox="0 0 460 320" className="ed-cap-art">
          <defs>
            <linearGradient id="ed-glass-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#439cff" stopOpacity=".7" /><stop offset=".45" stopColor="#275ae8" stopOpacity=".25" /><stop offset="1" stopColor="#805bff" stopOpacity=".65" /></linearGradient>
            <linearGradient id="ed-glass-band"><stop stopColor="#3478ff" stopOpacity=".75" /><stop offset=".2" stopColor="#10285f" stopOpacity=".7" /><stop offset=".7" stopColor="#101b4d" stopOpacity=".8" /><stop offset="1" stopColor="#805bff" stopOpacity=".6" /></linearGradient>
            <radialGradient id="ed-platform-light"><stop stopColor="#3478ff" stopOpacity=".38" /><stop offset="1" stopColor="#3478ff" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="230" cy="266" rx="205" ry="43" fill="url(#ed-platform-light)" />
          <g className="ed-cap-platform"><ellipse cx="230" cy="262" rx="168" ry="25" /><ellipse cx="230" cy="257" rx="168" ry="25" /><ellipse cx="230" cy="257" rx="145" ry="19" /><ellipse cx="230" cy="257" rx="118" ry="13" /></g>
          <g transform="rotate(-26 230 155)" className="ed-cap-orbit"><path d={orbit} /><circle cx="35" cy="155" r="3" />{active && !reduced && <circle r="3"><animateMotion path={orbit} dur="21s" repeatCount="indefinite" /></circle>}</g>
          <g className="ed-cap-float">
            <path d="M158 119 153 178 Q224 225 302 178 L308 125Z" fill="url(#ed-glass-band)" stroke="#7eb5ff" strokeWidth="1.5" />
            <path d="M158 169 Q226 211 304 168 M166 130 163 180 M295 133 290 184" fill="none" stroke="#65b8ff" strokeOpacity=".55" />
            <path d="M88 100 228 57 372 111 233 161 88 107Z" fill="#193c9b" stroke="#8bcaff" strokeWidth="1.5" />
            <path d="M88 100 228 57 372 105 233 154Z" fill="url(#ed-glass-top)" stroke="#a5ddff" strokeWidth="2" />
            <path d="M107 100 228 66 351 106 234 145Z M135 90 258 137 M181 77 305 122" fill="none" stroke="#87bfff" strokeOpacity=".26" />
            <path d="M232 106 Q263 112 335 124 L329 194" fill="none" stroke="#afdfff" strokeWidth="2.5" />
            <path d="M235 107 Q264 116 332 127 L326 193" fill="none" stroke="#805bff" strokeWidth="1" />
            <ellipse cx="232" cy="104" rx="8" ry="4" fill="#65b8ff" stroke="#c0edff" /><path d="M224 104V110Q232 117 240 110V104" fill="#3478ff" stroke="#83d0ff" />
            <rect x="324" y="191" width="9" height="14" rx="4" fill="#4277df" stroke="#c1dcff" />
            <path d="M325 205 319 237Q329 243 338 237L331 205Z" fill="url(#ed-glass-band)" stroke="#a0c9ff" strokeWidth="1.5" /><path d="M328 207 326 238 M330 207 332 238" stroke="#80bbff" strokeWidth="1" />
          </g>
          <path className="ed-fragment" d="M85 204 100 199 113 207 99 213Z M100 199V215 M85 204V218L99 226 113 220V207 M99 213V226" />
          <path className="ed-fragment" d="M358 67 370 61 381 68 370 74Z M358 67V80L370 87 381 80V68 M370 74V87" />
        </svg>
      </motion.div>
      <div className="ed-info-panel"><span><BookOpen size={29} strokeWidth={1.5} aria-hidden="true" /></span><p>Learning today.<br /><strong>Building tomorrow.</strong></p></div>
    </div>
  );
}

function EducationCard({ item, index }: { item: (typeof education)[number]; index: number }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 170, damping: 26 }); const rotateY = useSpring(y, { stiffness: 170, damping: 26 });
  const lightX = useMotionValue(50); const lightY = useMotionValue(0);
  const lighting = useMotionTemplate`radial-gradient(400px circle at ${lightX}% ${lightY}%, #3478ff28, transparent 75%)`;
  return (
    <motion.div className="ed-card-shell" initial={{ opacity: 0, y: reduced ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduced ? 0 : .6, delay: reduced ? 0 : index * .1 }}>
      <motion.article className="ed-card" style={{ rotateX, rotateY, transformPerspective: 1100 }} onPointerMove={event => {
        if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const r = event.currentTarget.getBoundingClientRect(); const px = (event.clientX - r.left) / r.width; const py = (event.clientY - r.top) / r.height;
        x.set((.5 - py) * 5); y.set((px - .5) * 5); lightX.set(px * 100); lightY.set(py * 100);
      }} onPointerLeave={() => { x.set(0); y.set(0); lightX.set(50); lightY.set(0); }}>
        <motion.div className="ed-card-light" style={{ background: lighting }} aria-hidden="true" />
        <div className="ed-card-top"><span className="ed-degree-icon"><GraduationCap size={31} strokeWidth={1.5} aria-hidden="true" /></span><span className="ed-completed"><i aria-hidden="true" />{item.status}</span></div>
        <h3>{item.degree}</h3><p className="ed-institution">{item.institution}</p>
        <div className="ed-date"><Calendar size={17} aria-hidden="true" /><strong>{item.date}</strong><span>{index === 0 ? "Degree completed" : "Study period"}</span></div>
        <p className="ed-description">{item.description}</p>
        <svg className="ed-academic-art" aria-hidden="true" viewBox="0 0 320 170" fill="none"><path d="M30 145H290M45 138H275V78H45ZM36 78 160 22 284 78ZM67 92V128M102 92V128M137 92V128M182 92V128M217 92V128M252 92V128M23 153H297M58 85H262M58 134H262" /><circle cx="160" cy="56" r="12" /><path d="M160 48V56L166 60" /></svg>
      </motion.article>
    </motion.div>
  );
}

function AcademicTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reached = useInView(ref, { once: true, amount: .4 });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className="ed-journey" data-reached={reached}>
      <h3 className="ed-eyebrow">Academic milestones</h3>
      <div className="ed-journey-body"><div className="ed-journey-track" aria-hidden="true"><div /></div>
        <ol>{milestones.map((milestone, index) => <motion.li key={milestone.year} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={reached ? { opacity: 1, y: 0 } : undefined} transition={{ duration: reduced ? 0 : .4, delay: reduced ? 0 : index * .18 }}><span className="ed-milestone-node" aria-hidden="true">{index === 2 ? <Check size={12} /> : <i />}</span><time>{milestone.year}</time><p>{milestone.text}</p></motion.li>)}</ol>
      </div>
    </div>
  );
}

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => { const update = () => setPageVisible(!document.hidden); document.addEventListener("visibilitychange", update); return () => document.removeEventListener("visibilitychange", update); }, []);
  const reveal = (delay = 0) => ({ initial: { opacity: 0, y: reduced ? 0 : 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: reduced ? 0 : .6, delay: reduced ? 0 : delay } });
  return (
    <section ref={ref} id="education" className="ed-section" aria-labelledby="ed-heading" data-active={visible && pageVisible}>
      <div className="ed-atmosphere" aria-hidden="true"><i /><i /><div /></div>
      <div className="ed-container">
        <header className="ed-header"><div><motion.p {...reveal()} className="ed-eyebrow">05 / KEEP LEARNING</motion.p><h2 id="ed-heading"><motion.span {...reveal(.05)}>A foundation</motion.span><motion.span {...reveal(.12)} className="ed-gradient">to build on.</motion.span></h2><motion.p {...reveal(.18)} className="ed-intro">Formal study, practical experience, and the curiosity to keep moving forward.</motion.p></div><motion.div {...reveal(.15)}><HolographicGraduationCap pageVisible={pageVisible} /></motion.div></header>
        <div className="ed-grid">{education.map((item, index) => <EducationCard key={item.degree} item={item} index={index} />)}</div>
        <AcademicTimeline />
        <motion.aside {...reveal()} className="ed-learning" aria-label="Learning philosophy">{philosophy.map(({ title, text, icon: Icon }) => <div key={title}><span className="ed-feature-icon"><Icon size={25} strokeWidth={1.5} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</motion.aside>
      </div>
    </section>
  );
}
