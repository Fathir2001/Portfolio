import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight, Code2, Database, Smartphone, Users, Briefcase, Layers, Sparkles, Mail, GraduationCap, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";
import "./About.css";

const overview = [
  { title: "Enterprise foundations", description: "Python, ERPNext, Frappe & REST APIs", icon: Code2, href: "#skills" },
  { title: "Across screens", description: "React web experiences & Flutter applications", icon: Smartphone, href: "#projects" },
  { title: "Beyond the interface", description: "Databases, reporting & production deployments", icon: Database, href: "#projects" },
  { title: "People-focused", description: "Building practical software for real users", icon: Users, href: "#contact" },
];
const statistics = [
  { value: "Since 2025", label: "Professional experience", icon: Code2 },
  { value: String(projects.length), label: "Projects built", icon: Layers },
  { value: "1", label: "Company", icon: Users },
  { value: "\u221e", label: "Passion for learning", icon: Sparkles },
];

function HolographicPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 140, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 140, damping: 24 });
  return (
    <div ref={ref} className="ab-portrait-scene" data-active={active}>
      <div className="ab-portrait-orbit" aria-hidden="true"><i /></div>
      <div className="ab-portrait-stage" aria-hidden="true"><i /><b /></div>
      <motion.div className="ab-portrait-depth" style={{ rotateX, rotateY, transformPerspective: 1100 }}
        onPointerMove={event => {
          if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
          const r = event.currentTarget.getBoundingClientRect();
          x.set((.5 - (event.clientY - r.top) / r.height) * 6);
          y.set(((event.clientX - r.left) / r.width - .5) * 6);
        }} onPointerLeave={() => { x.set(0); y.set(0); }}>
        <div className="ab-portrait-float">
          <figure className="ab-portrait-frame">
            <img src={`${import.meta.env.BASE_URL}images/profile_animated.png`} alt="Illustrated portrait of Rifthan Fathir wearing a blue shirt" width={1076} height={1462} loading="lazy" decoding="async" />
            <span className="ab-frame-corners" aria-hidden="true" />
            <figcaption className="ab-portrait-footer">
              <div><strong>RIFTHAN FATHIR</strong><span>Software Engineer</span></div>
              <span className="ab-availability"><i aria-hidden="true" />Open to<br />Opportunities</span>
            </figcaption>
          </figure>
          <div className="ab-identity-badge ab-badge-role" aria-hidden="true"><Briefcase size={21} /><span>Software<br />Engineer</span></div>
          <div className="ab-identity-badge ab-badge-learning" aria-hidden="true"><GraduationCap size={23} /><span>Always<br />Learning</span></div>
          <div className="ab-identity-badge ab-badge-code" aria-hidden="true"><Code2 size={22} /><span>Clean Code<br /><small>Better Systems</small></span></div>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .15 },
    transition: { duration: reduced ? 0 : .6, delay: reduced ? 0 : delay },
  });
  return (
    <section ref={ref} id="about" className="ab-section" aria-labelledby="ab-heading" data-active={inView && pageVisible}>
      <div className="ab-atmosphere" aria-hidden="true"><i /><i /><div /></div>
      <div className="ab-container">
        <div className="ab-visual-column">
          <header className="ab-header">
            <motion.p {...reveal()} className="ab-eyebrow">03 / THE PERSON BEHIND THE CODE</motion.p>
            <h2 id="ab-heading"><motion.span {...reveal(.05)}>Curious by nature.</motion.span><motion.span {...reveal(.12)} className="ab-gradient">Engineer by craft.</motion.span></h2>
          </header>
          <motion.div {...reveal(.15)} className="ab-portrait-entrance"><HolographicPortrait /></motion.div>
          <p className="ab-motto"><span />Build. Solve. Learn. Repeat.<span /></p>
        </div>
        <div className="ab-story">
          <motion.div {...reveal(.1)} className="ab-biography">
            <span className="ab-label"><i aria-hidden="true" />About me</span>
            <h3>Good software starts with understanding the people <span className="ab-gradient">who use it.</span></h3>
            <p>I'm a Software Engineer at <strong>Imara Software Solutions (Pvt) Ltd</strong>, building full-stack applications and enterprise software that supports everyday business operations.</p>
            <p>My experience spans ERPNext and Frappe development, Python, REST APIs, enterprise reporting, academic management, and HRMS. I connect reliable backend services with approachable interfaces, from databases through to production deployments.</p>
          </motion.div>
          <dl className="ab-stats">
            {statistics.map(({ value, label, icon: Icon }, index) => <motion.div key={label} {...reveal(index * .08)}>
              <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
              <dt>{label}</dt><dd className={value === "Since 2025" ? "ab-since" : undefined}>{value === "Since 2025" ? <><small>Since</small>2025</> : value}</dd>
            </motion.div>)}
          </dl>
          <div className="ab-overview">
            <h3 className="ab-eyebrow">Quick Overview</h3>
            <div className="ab-overview-grid">
              {overview.map(({ title, description, icon: Icon, href }, index) => <motion.a {...reveal(index * .08)} key={title} href={href} className="ab-overview-card">
                <span className="ab-overview-icon"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
                <span><strong>{title}</strong><span>{description}</span></span>
                <ChevronRight size={17} className="ab-overview-arrow" aria-hidden="true" />
              </motion.a>)}
            </div>
          </div>
          <motion.div {...reveal(.1)} className="ab-actions">
            <a className="ab-button ab-button-primary" href="#contact"><Mail size={18} aria-hidden="true" />Let's Discuss Opportunities<ArrowUpRight size={17} aria-hidden="true" /></a>
            <a className="ab-button ab-button-secondary" href="mailto:rifthanfathir33@gmail.com">Email me<ArrowUpRight size={17} aria-hidden="true" /></a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
