import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight, Layers, RotateCcw } from "lucide-react";
import covers from "../data/project-covers.json";
import { projects, type Project } from "../data/projects";
const DeviceScene = lazy(() => import("./DeviceScene"));
const imageFor = (project: Project) => `${import.meta.env.BASE_URL}${(covers as Record<string, string>)[project.id || ""] || project.image}`;
const deviceProjects = new Set(["chem-is-try", "pink-cosmetics", "hireme"]);
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export default function DeviceShowcase() {
  const [selected, setSelected] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [rotation, setRotation] = useState<[number, number]>([0, 0]);
  const reduced = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(min-width: 1024px) and (pointer: fine)");
    const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(media.matches && !motionPreference.matches);
    update();
    media.addEventListener("change", update);
    motionPreference.addEventListener("change", update);
    return () => { media.removeEventListener("change", update); motionPreference.removeEventListener("change", update); };
  }, [reduced]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  const project = projects[selected];
  const hasDevices = enabled && deviceProjects.has(project.id || "");
  const selectProject = (index: number) => {
    const next = (index + projects.length) % projects.length;
    setSelected(next);
    setRotation([0, 0]);
    const rail = container.current?.querySelector('.showcase-switcher');
    const button = rail?.children[next] as HTMLElement | undefined;
    if (rail && button) rail.scrollTo({ left: button.offsetLeft - (rail.clientWidth - button.clientWidth) / 2, behavior: reduced ? 'instant' : 'smooth' });
  };
  const fallback = (
    <img
      className="showcase-fallback"
      key={project.title}
      src={imageFor(project)}
      alt={`${project.title} project preview`}
      width={1280}
      height={720}
    />
  );
  return (
    <div className="showcase hero-gallery" ref={container} aria-label="Portfolio project showcase">
      <div className="showcase-top">
        <span>
          <Layers size={15} /> THE PROJECT COLLECTION
        </span>
        <span className="showcase-live">
          <span /> {project.category.toUpperCase()}
        </span>
      </div>
      <div
        className={`showcase-stage ${hasDevices ? 'has-devices' : 'has-preview'}`}
        onPointerMove={(event) => {
          if (!enabled || !visible) return;
          const rect = event.currentTarget.getBoundingClientRect();
          setRotation([
            (event.clientY - rect.top) / rect.height - 0.5,
            (event.clientX - rect.left) / rect.width - 0.5,
          ]);
        }}
        onPointerLeave={() => setRotation([0, 0])}
      >
        <div className="showcase-orbit orbit-one" aria-hidden="true" />
        <div className="showcase-orbit orbit-two" aria-hidden="true" />
        <span className="showcase-watermark" aria-hidden="true">{String(selected + 1).padStart(2, "0")}</span>
        {hasDevices ? (
          <SceneBoundary key={project.id} fallback={fallback}>
            <Suspense fallback={fallback}>
              <DeviceScene
                project={project.id!}
                rotation={rotation}
                active={visible}
              />
            </Suspense>
          </SceneBoundary>
        ) : (
          fallback
        )}
      </div>
      <div className="showcase-caption" aria-live="polite" aria-atomic="true">
        <div className="showcase-project-info">
          <p>{project.live ? 'LIVE ON THE WEB' : 'IDEAS PUT INTO PRACTICE'}</p>
          <h2>{project.title}</h2>
          <div className="showcase-description">{project.description}</div>
        </div>
        <a
          href={project.live || project.github?.[0]?.link || '#projects'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} ${project.live ? 'live website' : 'source code'}`}
        >
          <ArrowUpRight size={23} />
        </a>
      </div>
      <div className="showcase-navigation">
        <span><strong>{String(selected + 1).padStart(2, '0')}</strong> / {projects.length} <span className="gallery-browse-label">— Explore the collection</span></span>
        <div>
          {hasDevices && <button className="scene-reset" onClick={() => setRotation([0, 0])} aria-label="Reset device angle"><RotateCcw size={15} /></button>}
          <button onClick={() => selectProject(selected - 1)} aria-label="Previous project"><ArrowLeft size={18} /></button>
          <button onClick={() => selectProject(selected + 1)} aria-label="Next project"><ArrowRight size={18} /></button>
        </div>
      </div>
      <div className="showcase-bottom">
        <div
          className="showcase-switcher"
          role="group"
          aria-label="Choose showcase project"
        >
          {projects.map((item, index) => (
            <button
              key={item.title}
              onClick={() => selectProject(index)}
              aria-pressed={selected === index}
              aria-label={item.title}
              title={item.title}
            >
              <img src={imageFor(item)} alt="" width={96} height={60} loading="lazy" />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
