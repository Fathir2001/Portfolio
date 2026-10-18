import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Code2, Monitor, Server, Database, Wrench, UploadCloud, Settings, ArrowRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { projects } from "../data/projects";
import "./Skills.css";
const groups = {
  Languages: ["Python", "JavaScript", "TypeScript", "Dart", "Java", "SQL"],
  Frontend: ["React", "Vue.js", "Tailwind CSS", "Flutter", "jQuery"],
  Backend: [
    "Node.js",
    "Express.js",
    "ERPNext",
    "Frappe Framework",
    "REST APIs",
  ],
  Databases: ["MongoDB", "MySQL", "MariaDB", "PostgreSQL", "Firebase"],
  Tools: ["Git", "GitHub", "Docker", "Postman", "VS Code"],
  Deployment: ["Netlify", "Render", "cPanel", "GitHub Actions", "CI/CD"],
};

type Category = keyof typeof groups;
const categoryInfo: Record<Category, { description: string; icon: LucideIcon }> = {
  Languages: { description: "Core programming languages I use to build reliable and scalable solutions.", icon: Code2 },
  Frontend: { description: "Modern frameworks and libraries for interactive and responsive user interfaces.", icon: Monitor },
  Backend: { description: "Robust backend technologies for enterprise and full-stack applications.", icon: Server },
  Databases: { description: "Database systems for reliable data management and efficient storage.", icon: Database },
  Tools: { description: "Development tools and platforms that power my workflow.", icon: Wrench },
  Deployment: { description: "Cloud platforms and deployment tools for production-ready applications.", icon: UploadCloud },
};
const chipColors: Record<string, string> = {
  Python: "#f1cc65", JavaScript: "#ead565", TypeScript: "#6d9fff", Dart: "#65d3e5", Java: "#e89487", SQL: "#ab8bff",
  React: "#65d8ef", "Vue.js": "#63d9ae", Flutter: "#65c9ff", "Node.js": "#83cd91", MongoDB: "#78cc96", Firebase: "#f0bd66", Git: "#ea9683", Postman: "#eaa16d",
};
const normalize = (name: string) => name.toLowerCase().replace(/[.\s-]/g, "").replace(/^express$/, "expressjs");
// Only recorded project tags (plus explicit repository/hosting URLs) establish links.
const examplesFor = (category: Category) => projects.flatMap(project => {
  const matches = groups[category].filter(skill => project.tags.some(tag =>
    normalize(tag) === normalize(skill) || (tag === "Flutter(Dart)" && (skill === "Flutter" || skill === "Dart"))));
  if (category === "Tools" && project.github?.length) matches.push("GitHub");
  if (category === "Deployment" && project.live && new URL(project.live).hostname.endsWith(".netlify.app")) matches.push("Netlify");
  const href = category === "Tools" ? project.github?.[0]?.link : project.live || project.github?.[0]?.link;
  return matches.length && href ? [{ title: project.title, matches: [...new Set(matches)], href }] : [];
}).slice(0, 3);

function FloatingCodeCube({ pageVisible }: { pageVisible: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 110, damping: 22 });
  const rotateY = useSpring(y, { stiffness: 110, damping: 22 });
  const active = visible && pageVisible;
  const orbit = "M 20 130 C 20 65 380 65 380 130 C 380 195 20 195 20 130";
  return (
    <div ref={ref} className="sk-hologram" data-active={active}>
      <div className="sk-cube-scene" aria-hidden="true" onPointerMove={event => {
        if (reduced || event.pointerType !== "mouse") return;
        const r = event.currentTarget.getBoundingClientRect();
        x.set((.5 - (event.clientY - r.top) / r.height) * 6); y.set(((event.clientX - r.left) / r.width - .5) * 6);
      }} onPointerLeave={() => { x.set(0); y.set(0); }}>
        <svg className="sk-orbits" viewBox="0 0 400 260"><g transform="rotate(-24 200 130)">
          <path d={orbit} /><circle r="3" cx={20} cy={130} />
          {active && !reduced && <circle r="3" className="sk-orbit-particle"><animateMotion path={orbit} dur="20s" repeatCount="indefinite" /></circle>}
        </g><ellipse cx="200" cy="130" rx="145" ry="38" transform="rotate(-24 200 130)" /></svg>
        <motion.div className="sk-cube-parallax" style={{ rotateX, rotateY, transformPerspective: 900 }}>
          <div className="sk-cube-float"><div className="sk-code-cube">
            <span className="sk-face sk-face-front"><Code2 size={51} strokeWidth={1.5} /></span>
            <span className="sk-face sk-face-back" /><span className="sk-face sk-face-right" /><span className="sk-face sk-face-left" /><span className="sk-face sk-face-top" /><span className="sk-face sk-face-bottom" />
          </div></div>
        </motion.div>
        <span className="sk-fragment sk-fragment-one" /><span className="sk-fragment sk-fragment-two" />
      </div>
      <div className="sk-info-panel"><span><Settings size={25} strokeWidth={1.5} aria-hidden="true" /></span><p>Tools and technologies across the application lifecycle.</p></div>
    </div>
  );
}

function SkillCategoryCard({ category, index }: { category: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "60px" });
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 170, damping: 26 });
  const rotateY = useSpring(y, { stiffness: 170, damping: 26 });
  const lightX = useMotionValue(50); const lightY = useMotionValue(0);
  const lighting = useMotionTemplate`radial-gradient(300px circle at ${lightX}% ${lightY}%, #3478ff24, transparent 75%)`;
  const { icon: Icon, description } = categoryInfo[category];
  const examples = examplesFor(category);
  return (
    <motion.div ref={ref} className="sk-card-shell" initial={{ opacity: 0, y: reduced ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: reduced ? 0 : .5, delay: reduced ? 0 : (index % 3) * .08 }}>
      <motion.article className="sk-card" data-active={active} style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onPointerMove={event => {
          if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
          const r = event.currentTarget.getBoundingClientRect(); const px = (event.clientX - r.left) / r.width; const py = (event.clientY - r.top) / r.height;
          x.set((.5 - py) * 5); y.set((px - .5) * 5); lightX.set(px * 100); lightY.set(py * 100);
        }} onPointerLeave={() => { x.set(0); y.set(0); lightX.set(50); lightY.set(0); }}>
        <motion.div className="sk-card-light" style={{ background: lighting }} aria-hidden="true" />
        <div className="sk-card-heading">
          <div className="sk-category-hologram" aria-hidden="true"><span /><span /><Icon size={34} strokeWidth={1.5} /></div>
          <div className="sk-category-copy"><span className="sk-index">{String(index + 1).padStart(2, "0")}</span><h3>{category}</h3><p>{description}</p></div>
          {examples.length > 0 && <button className="sk-expand" aria-label={`${expanded ? "Hide" : "Show"} ${category} project examples`} aria-expanded={expanded} aria-controls={`sk-details-${category}`} onClick={() => setExpanded(!expanded)}><ArrowRight size={20} aria-hidden="true" /></button>}
        </div>
        <ul className="sk-chips" aria-label={`${category} technologies`}>
          {groups[category].map(skill => <li key={skill}><i style={{ backgroundColor: chipColors[skill] || "#65b8ff" }} aria-hidden="true" />{skill}</li>)}
        </ul>
        <div id={`sk-details-${category}`}>
          <AnimatePresence initial={false}>{expanded && <motion.div className="sk-details" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? 0 : .25 }}>
            <div><h4>Selected project examples</h4><ul>{examples.map(example => <li key={example.title}><a href={example.href} target="_blank" rel="noopener noreferrer"><span><strong>{example.title}</strong><small>{example.matches.join(" / ")}</small></span><ArrowUpRight size={16} aria-hidden="true" /></a></li>)}</ul></div>
          </motion.div>}</AnimatePresence>
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(true);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const reveal = (delay = 0) => ({ initial: { opacity: 0, y: reduced ? 0 : 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: reduced ? 0 : .6, delay: reduced ? 0 : delay } });
  return (
    <section ref={ref} id="skills" className="sk-section" aria-labelledby="sk-heading" data-active={visible && pageVisible}>
      <div className="sk-atmosphere" aria-hidden="true"><i /><i /><div /></div>
      <div className="sk-container">
        <header className="sk-header">
          <div><motion.p {...reveal()} className="sk-eyebrow">04 / THE TOOLKIT</motion.p>
            <h2 id="sk-heading"><motion.span {...reveal(.06)}>The right tools.</motion.span><motion.span {...reveal(.12)}>For the <span className="sk-gradient">right problem.</span></motion.span></h2>
            <motion.p {...reveal(.18)} className="sk-intro">A collection of technologies and tools I use to design, build, and deploy real-world solutions.</motion.p>
          </div>
          <motion.div {...reveal(.2)}><FloatingCodeCube pageVisible={pageVisible} /></motion.div>
        </header>
        <div className="sk-grid">{(Object.keys(groups) as Category[]).map((category, index) => <SkillCategoryCard key={category} category={category} index={index} />)}</div>
      </div>
    </section>
  );
}
