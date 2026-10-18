import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Calendar, Briefcase, Box, BarChart3, HeartHandshake, ChevronDown, Workflow, Layers, Code2, Network, Database, Plug, UploadCloud, type LucideIcon } from "lucide-react";
import "./Experience.css";
const employment = [
  {
    title: "Software Engineer",
    year: "2026",
    current: true,
    technologies: ["ERPNext", "Frappe Framework", "Python", "REST APIs", "MariaDB"],
    period: "September 2026–Present",
    description:
      "Developing enterprise applications with ERPNext, Frappe Framework, Python, and REST APIs. Working across enterprise reporting, academic management, HRMS, databases, and production deployments.",
  },
  {
    title: "Associate Software Engineer",
    year: "2025",
    current: false,
    technologies: ["API Integration", "Databases", "Reporting", "Deployment"],
    period: "September 2025–August 2026",
    description:
      "Developed and maintained full-stack applications and enterprise workflows, contributing to API integrations, database-backed features, reporting, and deployment activities.",
  },
  {
    title: "Software Engineer Intern",
    year: "2025",
    current: false,
    technologies: ["Frappe", "Python", "REST APIs", "Databases"],
    period: "February 2025–September 2025",
    description:
      "Contributed to enterprise software development and gained hands-on experience with Python, Frappe, REST APIs, and databases in a production development environment.",
  },
];
const volunteering = [
  {
    title: "Publicity Committee Member",
    company: "IEEE RAS Student Branch Chapter of the University of Moratuwa",
    period: "2024 - Present",
    description:
      "Collaborated with a dynamic team to create engaging content, manage social media presence, and enhance brand visibility. Led social media campaigns and organized technical workshops.",
    icon: "🤖",
    type: "volunteer",
  },
  {
    title: "President",
    company:
      "Old Boys Association - Puttalam, Kalpity, Kurinchipity Muslim Maha Vidyalaya",
    period: "2021 - Present",
    description:
      "Led initiatives to strengthen connections, organized events to support school development, and fostered community engagement. Spearheaded projects benefiting both current students and the broader school community.",
    icon: "👔",
    type: "volunteer",
  },
];

type Employment = (typeof employment)[number];

const technologyIcons: Record<string, LucideIcon> = {
  ERPNext: Workflow,
  "Frappe Framework": Layers,
  Frappe: Layers,
  Python: Code2,
  "REST APIs": Network,
  MariaDB: Database,
  "API Integration": Plug,
  Databases: Database,
  Reporting: BarChart3,
  Deployment: UploadCloud,
};

function ExperienceCard({ job, index }: { job: Employment; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reached = useInView(ref, { once: true, amount: .3 });
  const active = useInView(ref, { amount: .3 });
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 180, damping: 26 });
  const rotateY = useSpring(y, { stiffness: 180, damping: 26 });
  const lightX = useMotionValue(50);
  const lightY = useMotionValue(20);
  const lighting = useMotionTemplate`radial-gradient(350px circle at ${lightX}% ${lightY}%, #3478ff20, transparent 75%)`;
  return (
    <li ref={ref} className="ex-milestone" data-reached={reached} data-active={active}>
      <div className="ex-date-rail" aria-hidden="true"><strong>{job.year}</strong><span>{job.current ? "Present" : index === 1 ? "Sep - Aug" : "Feb - Sep"}</span></div>
      <span className={`ex-node ${job.current ? "ex-node-current" : ""}`} aria-hidden="true"><i /></span>
      <motion.div initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={reached ? { opacity: 1, y: 0 } : undefined} transition={{ duration: reduced ? 0 : .5 }}>
        <motion.article className={`ex-card ${job.current ? "ex-card-current" : ""}`} style={{ rotateX, rotateY, transformPerspective: 1100 }}
          onPointerMove={event => {
            if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
            const r = event.currentTarget.getBoundingClientRect();
            const px = (event.clientX - r.left) / r.width;
            const py = (event.clientY - r.top) / r.height;
            x.set((.5 - py) * 4); y.set((px - .5) * 4);
            lightX.set(px * 100); lightY.set(py * 100);
          }}
          onPointerLeave={() => { x.set(0); y.set(0); lightX.set(50); lightY.set(20); }}>
          <motion.div className="ex-card-light" style={{ background: lighting }} aria-hidden="true" />
          <div className="ex-identity">
            <span className="ex-briefcase" aria-hidden="true"><Briefcase size={26} strokeWidth={1.5} /></span>
            <div>
              {job.current && <span className="ex-current"><i />Current role</span>}
              <h3>{job.title}</h3>
              <p className="ex-company">Imara Software Solutions (Pvt) Ltd</p>
              <p className="ex-period"><Calendar size={15} aria-hidden="true" />{job.period}</p>
            </div>
          </div>
          <div className="ex-responsibilities">
            <p>{job.description}</p>
            <ul className="ex-technologies" aria-label={`${job.title} technologies and areas of work`}>
              {job.technologies.map(technology => {
                const Icon = technologyIcons[technology] || Code2;
                return <li key={technology}><Icon size={13} strokeWidth={1.8} aria-hidden="true" />{technology}</li>;
              })}
            </ul>
          </div>
          <span className="ex-card-planet" aria-hidden="true" />
        </motion.article>
      </motion.div>
    </li>
  );
}

function EnterpriseHologram() {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 100, damping: 22 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 22 });
  return (
    <div ref={ref} className="ex-hologram" data-active={active} aria-hidden="true" onPointerMove={event => {
      if (reduced || event.pointerType !== "mouse") return;
      const r = event.currentTarget.getBoundingClientRect();
      x.set(((event.clientY - r.top) / r.height - .5) * -8);
      y.set(((event.clientX - r.left) / r.width - .5) * 8);
    }} onPointerLeave={() => { x.set(0); y.set(0); }}>
      <div className="ex-holo-orbit"><i /><b /></div>
      <motion.div className="ex-holo-parallax" style={{ rotateX, rotateY, transformPerspective: 800 }}>
        <div className="ex-holo-panel"><Box size={35} strokeWidth={1.3} /><span>Enterprise Systems<small>Real People. Real Impact.</small></span></div>
      </motion.div>
      <div className="ex-chart-glass"><BarChart3 size={40} strokeWidth={1.6} /></div>
    </div>
  );
}

export default function Experience() {
  const section = useRef<HTMLElement>(null);
  const timeline = useRef<HTMLOListElement>(null);
  const visible = useInView(section);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 75%", "end 75%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .2 },
    transition: { duration: reduced ? 0 : .5, delay: reduced ? 0 : delay },
  });
  return (
    <section ref={section} id="experience" className="ex-section" aria-labelledby="ex-heading" data-active={visible && pageVisible}>
      <div className="ex-atmosphere" aria-hidden="true"><i /><i /><i /><div /></div>
      <div className="ex-container">
        <header className="ex-header">
          <div className="ex-heading-copy">
            <motion.p {...reveal()} className="ex-eyebrow">02 / EXPERIENCE</motion.p>
            <h2 id="ex-heading"><motion.span {...reveal(.05)}>Building software.</motion.span><motion.span {...reveal(.12)} className="ex-gradient">Growing with purpose.</motion.span></h2>
            <motion.p {...reveal(.18)} className="ex-intro">Turning ideas into real-world solutions through continuous learning, collaboration, and impact.</motion.p>
          </div>
          <motion.div {...reveal(.2)} className="ex-holo-slot"><EnterpriseHologram /></motion.div>
          <motion.div {...reveal(.25)} className="ex-header-aside">
            <p>Building practical software for enterprise operations.</p>
            <dl className="ex-stats">
              <div><dt>Roles</dt><dd>{employment.length}</dd></div>
              <div><dt>Career start</dt><dd><small>Since</small>2025</dd></div>
              <div><dt>Company</dt><dd>1</dd></div>
            </dl>
          </motion.div>
        </header>
        <ol ref={timeline} className="ex-timeline" aria-label="Professional employment, most recent first">
          <li className="ex-track" aria-hidden="true"><motion.div style={{ scaleY: reduced ? 1 : progress }} /></li>
          {employment.map((job, index) => <ExperienceCard key={job.title} job={job} index={index} />)}
        </ol>
        <div className="ex-community">
          <div className="ex-community-heading"><HeartHandshake size={21} aria-hidden="true" /><div><p className="ex-eyebrow">BEYOND THE WORKPLACE</p><h3>Volunteering &amp; Community</h3></div></div>
          <div className="ex-community-grid">
            {volunteering.map(role => <details key={role.title} className="ex-volunteer">
              <summary><span><strong>{role.title}</strong><span>{role.company}</span></span><ChevronDown size={20} aria-hidden="true" /></summary>
              <p>{role.description}</p>
            </details>)}
          </div>
        </div>
      </div>
    </section>
  );
}
