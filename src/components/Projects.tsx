import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, Layers, X } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { caseStudies } from "../data/case-studies";
import covers from "../data/project-covers.json";
const categories = ["All", "Production", "Academic"] as const;
const imageFor = (p: Project) =>
  (covers as Record<string, string>)[p.id || ""] || p.image;
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project, event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 180, damping: 24 });
  const study = caseStudies[project.id || ""];
  return (
    <motion.article
      layout={!reduced}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`work-card ${study ? "work-featured" : ""}`}
    >
      <div
        className="work-image-wrap"
        onPointerMove={(event) => {
          if (reduced || event.pointerType !== "mouse") return;
          const r = event.currentTarget.getBoundingClientRect();
          x.set(-((event.clientY - r.top) / r.height - 0.5) * 6);
          y.set(((event.clientX - r.left) / r.width - 0.5) * 6);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <motion.img
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          src={`${import.meta.env.BASE_URL}${imageFor(project)}`}
          alt={`${project.title} ${project.category === "Production" ? "desktop and mobile website preview" : "project preview"}`}
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
        />
        <span className="work-index">
          {String(index + 1).padStart(2, "0")} /{" "}
          {study ? "FEATURED PROJECT" : project.category.toUpperCase()}
        </span>
        {project.title === "EcoRoute" && (
          <span className="artwork-note">Illustrative artwork</span>
        )}
      </div>
      <div className="work-body">
        <div className="work-title-row">
          <div>
            <p className="eyebrow">
              {study?.eyebrow || project.category + " PROJECT"}
            </p>
            <h3>{project.title}</h3>
          </div>
          <ArrowUpRight className="work-arrow" size={25} />
        </div>
        <p className="section-copy">{study?.focus || project.description}</p>
        <ul className="work-tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className="work-actions">
          <button
            className="text-link"
            onClick={(event) => onOpen(project, event)}
            aria-label={`Explore ${project.title}`}
          >
            Explore project <ArrowUpRight size={16} />
          </button>
          <div>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo of ${project.title}`}
              >
                Live Demo <ExternalLink size={14} />
              </a>
            )}
            {project.github?.map((repo) => (
              <a
                key={repo.link}
                href={repo.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} ${repo.label} repository`}
              >
                <Github size={15} />
                <span>{repo.label}</span>
              </a>
            ))}
          </div>
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
export default function Projects() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const ordered = [...projects].sort(
    (a, b) =>
      Number(!!caseStudies[b.id || ""]) - Number(!!caseStudies[a.id || ""]),
  );
  const visible = ordered.filter(
    (p) => category === "All" || p.category === category,
  );
  const close = () => {
    setSelected(null);
    requestAnimationFrame(() => opener.current?.focus());
  };
  return (
    <section id="projects" className="work-section">
      <div className="page-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2 className="section-title">
              Ideas, built into
              <br />
              real experiences.
            </h2>
          </div>
          <p className="section-copy">
            A selection of live applications and academic explorations.
            Different challenges. The same attention to craft.
          </p>
        </div>
        <div className="work-filter-row">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}{" "}
                <span>
                  {item === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === item).length}
                </span>
              </button>
            ))}
          </div>
          <span className="filter-caption">
            BUILT WITH PURPOSE. SHIPPED WITH CARE.
          </span>
        </div>
        <p className="sr-only" role="status">
          Showing {visible.length} projects
        </p>
        <motion.div layout className="work-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onOpen={(p, e) => {
                  opener.current = e.currentTarget;
                  setSelected(p);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {selected && (
        <ProjectDialog
          key={selected.title}
          project={selected}
          onClose={close}
        />
      )}
    </section>
  );
}
