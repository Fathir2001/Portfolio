import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Github, Layers, Code2, X } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { caseStudies } from "../data/case-studies";
import covers from "../data/project-covers.json";
import { heroPreview } from "../data/hero-previews";
import "./Projects.css";
const categories = ["All", "Production", "Academic"] as const;
const imageFor = (p: Project) =>
  (covers as Record<string, string>)[p.id || ""] || p.image;
function ProjectCard({ project, index, onOpen }: {
  project: Project;
  index: number;
  onOpen: (project: Project, event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { margin: "80px" });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 180, damping: 24 });
  const preview = heroPreview(project);
  const featured = !!caseStudies[project.id || ""];
  return (
    <motion.article ref={ref} className={`pc-card ${featured ? "pc-featured" : ""}`}
      data-active={active} data-category={project.category}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={event => {
        if (reduced || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const r = event.currentTarget.getBoundingClientRect();
        x.set(-((event.clientY - r.top) / r.height - .5) * 6);
        y.set(((event.clientX - r.left) / r.width - .5) * 6);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <div className="pc-meta">
        <span className="pc-index">{String(index + 1).padStart(2, "0")} <span>/ {projects.length}</span></span>
        {featured && <span className="pc-featured-label">Featured project</span>}
        <span className="pc-status"><i />{project.category}</span>
      </div>
      <div className={`pc-stage ${preview.overview ? "pc-overview-stage" : ""}`}>
        <div className="pc-stage-grid" aria-hidden="true" />
        <div className="pc-stage-orbit" aria-hidden="true" />
        <div className="pc-platform" aria-hidden="true"><i /><b /></div>
        <div className="pc-devices">
          {preview.overview ? (
            <img className="pc-overview" src={preview.desktop} alt={`${project.title} ${project.title === "EcoRoute" ? "illustrative artwork" : "project overview"}`} loading="lazy" decoding="async" width={1280} height={720} />
          ) : <>
            <div className="pc-laptop">
              <div className="pc-laptop-lid"><i className="pc-camera" /><img src={preview.desktop} alt={`${project.title} desktop website`} loading="lazy" decoding="async" width={1440} height={900} /></div>
              <div className="pc-laptop-deck"><i /><b /></div>
            </div>
            <div className="pc-phone"><img src={preview.mobile} alt={`${project.title} mobile website`} loading="lazy" decoding="async" width={390} height={844} /><i /></div>
          </>}
        </div>
        <span className="pc-hologram" aria-hidden="true"><Layers size={21} /><span>{project.tags[0] || project.category}<small>{preview.overview ? "PROJECT EXPLORATION" : "WEB EXPERIENCE"}</small></span></span>
        <span className="pc-float-icon" aria-hidden="true"><Code2 size={26} /></span>
        {project.title === "EcoRoute" && <span className="pc-artwork-note">Illustrative artwork</span>}
      </div>
      <div className="pc-body">
        <div className="pc-title-row"><h3>{project.title}</h3>
          <button className="pc-detail" onClick={event => onOpen(project, event)} aria-label={`Explore ${project.title}`}><ArrowUpRight size={23} /></button>
        </div>
        <p>{project.description}</p>
        {project.tags.length > 0 && <ul className="pc-tags" aria-label={`${project.title} technologies`}>{project.tags.map(tag => <li key={tag}><i />{tag}</li>)}</ul>}
        <div className="pc-actions">
          {project.live && <a className="pc-live" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${project.title}`}>Live Demo <ExternalLink size={15} /></a>}
          {project.github?.map(repo => <a key={repo.link} href={repo.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} ${repo.label} repository`}><Github size={16} />{repo.label}</a>)}
          {!project.live && !project.github?.length && <button onClick={event => onOpen(project, event)}>Project details <ArrowUpRight size={16} /></button>}
        </div>
      </div>
    </motion.article>
  );
}
function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [layer, setLayer] = useState(0);
  const study = caseStudies[project.id || ""];
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const previous = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      el.close();
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">
        <div className="dialog-toolbar">
          <span className="eyebrow">
            PROJECT NOTES / {project.category.toUpperCase()}
          </span>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="icon-button"
            autoFocus
          >
            <X size={22} />
          </button>
        </div>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="section-copy">{study?.focus || project.description}</p>
        <img
          className="dialog-cover"
          src={`${import.meta.env.BASE_URL}${imageFor(project)}`}
          alt={`${project.title} project preview`}
          width={1280}
          height={720}
        />
        <div className="dialog-notes">
          <div>
            <h3>{study ? "The product goal" : "About the project"}</h3>
            <p className="section-copy">{study?.goal || project.description}</p>
          </div>
          <div>
            <h3>{study ? "What it brings together" : "Technologies"}</h3>
            <ul className="feature-list">
              {(study?.features || project.tags).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {!study && !project.tags.length && (
              <p className="section-copy">
                Explore the live website to see the project in action.
              </p>
            )}
          </div>
        </div>
        {study && (
          <div className="architecture">
            <div className="architecture-heading">
              <Layers size={18} />
              <h3>Inside the application</h3>
              <span>Select a layer</span>
            </div>
            <div
              className="architecture-nodes"
              role="group"
              aria-label="Explore application architecture"
            >
              {study.layers.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setLayer(index)}
                  aria-pressed={layer === index}
                  aria-controls="architecture-detail"
                >
                  <span>0{index + 1}</span>
                  <strong>{item.name}</strong>
                  <small>{item.tech}</small>
                </button>
              ))}
            </div>
            <div
              id="architecture-detail"
              aria-live="polite"
              className="architecture-detail"
            >
              <strong>{study.layers[layer].tech}</strong>
              <p>{study.layers[layer].detail}</p>
            </div>
          </div>
        )}
        <div className="dialog-links">
          {project.live && (
            <a
              className="primary-button"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit live project <ArrowUpRight size={18} />
            </a>
          )}
          {project.github?.map((repo) => (
            <a
              className="secondary-button"
              key={repo.link}
              href={repo.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={17} />
              {repo.label}
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
}
const ordered = [...projects].sort((a, b) => Number(!!caseStudies[b.id || ""]) - Number(!!caseStudies[a.id || ""]));
export default function Projects() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [pageActive, setPageActive] = useState(true);
  const opener = useRef<HTMLButtonElement | null>(null);
  const header = useRef<HTMLElement>(null);
  const headerActive = useInView(header);
  const reduced = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState({ first: 1, last: 3, previous: false, next: true });
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    el.scrollLeft = 0;
    const update = () => {
      const bounds = el.getBoundingClientRect();
      const cards = Array.from(el.children);
      const shown = cards.map((card, index) => ({ index, rect: card.getBoundingClientRect() }))
        .filter(({ rect }) => rect.right > bounds.left + 30 && rect.left < bounds.right - 30);
      setRange({ first: (shown[0]?.index ?? 0) + 1, last: (shown[shown.length - 1]?.index ?? 0) + 1,
        previous: el.scrollLeft > 4, next: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); el.removeEventListener("scroll", update); };
  }, [category]);
  const move = (direction: number) => {
    const el = rail.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap);
    el.scrollBy({ left: direction * step, behavior: reduced ? "instant" : "smooth" });
  };
  useEffect(() => {
    const update = () => setPageActive(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const visible = ordered.filter(p => category === "All" || p.category === category);
  const close = () => { setSelected(null); requestAnimationFrame(() => opener.current?.focus({ preventScroll: true })); };
  return (
    <section id="projects" className="project-collection" aria-labelledby="pc-heading" data-page-active={pageActive}>
      <div className="pc-container">
        <motion.header ref={header} data-active={headerActive} className="pc-header" initial={{ opacity: 0, y: reduced ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55 }}>
          <div className="pc-heading-copy">
            <span className="pc-badge"><i />Project collection</span>
            <h2 id="pc-heading">Ideas, built into<br /><span>real experiences.</span></h2>
            <p>A selection of live applications and academic explorations. Different challenges. The same attention to craft.</p>
          </div>
          <div className="pc-header-art" aria-hidden="true">
            <div className="pc-code-glass"><Code2 /></div>
            <div className="pc-glass-panel"><i /><i /><i /><i /><i /></div>
            <div className="pc-header-orbit" />
            <div className="pc-concept"><Layers size={24} /><span>From concept to deployment<small>Web, mobile and everything in between.</small></span></div>
            <span className="pc-satellite" />
          </div>
        </motion.header>
        <div className="pc-filter-row">
          <div className="pc-filters" role="group" aria-label="Filter projects">
            {categories.map(item => <button key={item} onClick={() => setCategory(item)} aria-pressed={category === item} aria-controls="pc-grid">
              {category === item && <motion.span className="pc-filter-active" layoutId="pc-filter-indicator" transition={{ duration: reduced ? 0 : .25 }} />}
              <span>{item}</span><small>{item === "All" ? projects.length : projects.filter(p => p.category === item).length}</small>
            </button>)}
          </div>
          <div className="pc-carousel-controls">
            <span className="pc-carousel-range" aria-live="polite">{range.first}&ndash;{range.last} <span>/ {visible.length}</span></span>
            <button onClick={() => move(-1)} disabled={!range.previous} aria-label="Previous projects" aria-controls="pc-grid"><ArrowLeft size={19} /></button>
            <button className="pc-next" onClick={() => move(1)} disabled={!range.next} aria-label="Next projects" aria-controls="pc-grid"><span>View more</span><ArrowRight size={19} /></button>
          </div>
        </div>
        <p className="sr-only" role="status">Showing {visible.length} projects</p>
        <div key={category} ref={rail} id="pc-grid" className="pc-grid" role="region" aria-roledescription="carousel" aria-label={`${category} projects. Swipe or use arrow keys to browse.`} tabIndex={0}
          onKeyDown={event => {
            if (event.target !== event.currentTarget) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
          }}>
            {visible.map(project => <motion.div key={project.title} className="pc-card-shell"
              initial={{ opacity: 0, y: reduced ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "80px" }} exit={{ opacity: 0, scale: reduced ? 1 : .98 }} transition={{ duration: reduced ? 0 : .3 }}>
              <ProjectCard project={project} index={ordered.indexOf(project)} onOpen={(p, e) => { opener.current = e.currentTarget; setSelected(p); }} />
            </motion.div>)}
        </div>
        <div className="pc-endnote"><span />Swipe or use the arrows to explore all {visible.length} projects.<span /></div>
      </div>
      {selected && <ProjectDialog key={selected.title} project={selected} onClose={close} />}
    </section>
  );
}
