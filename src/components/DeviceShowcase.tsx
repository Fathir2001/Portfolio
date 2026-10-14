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
import { ArrowUpRight, Box, RotateCcw } from "lucide-react";
import covers from "../data/project-covers.json";
const DeviceScene = lazy(() => import("./DeviceScene"));
const selections = [
  {
    id: "chem-is-try",
    title: "CHEM IS TRY",
    label: "Learning, connected.",
    kind: "WEB + MOBILE",
    url: "https://chem-is-try-admin.netlify.app/",
  },
  {
    id: "pink-cosmetics",
    title: "Pink Cosmetics",
    label: "Commerce with character.",
    kind: "E-COMMERCE",
    url: "https://pink-cosmetics.netlify.app/",
  },
  {
    id: "hireme",
    title: "HireMe",
    label: "Services, made simpler.",
    kind: "FULL-STACK PLATFORM",
    url: "https://hireme-f.netlify.app/",
  },
];
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
  const project = selections[selected];
  const fallback = (
    <img
      className="showcase-fallback"
      src={`${import.meta.env.BASE_URL}${(covers as Record<string, string>)[project.id]}`}
      alt={`${project.title}: actual desktop and mobile interfaces`}
      width={1280}
      height={720}
    />
  );
  return (
    <div className="showcase" ref={container}>
      <div className="showcase-top">
        <span>
          <Box size={15} /> SELECTED WORK /{" "}
          {String(selected + 1).padStart(2, "0")}
        </span>
        <span className="showcase-live">
          <span /> LIVE PROJECT
        </span>
      </div>
      <div
        className="showcase-stage"
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
        {enabled ? (
          <SceneBoundary fallback={fallback}>
            <Suspense fallback={fallback}>
              <DeviceScene
                project={project.id}
                rotation={rotation}
                active={visible}
              />
            </Suspense>
          </SceneBoundary>
        ) : (
          fallback
        )}
      </div>
      <div className="showcase-caption">
        <div>
          <p>{project.kind}</p>
          <h2 aria-live="polite">{project.label}</h2>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} live website`}
        >
          <ArrowUpRight size={23} />
        </a>
      </div>
      <div className="showcase-bottom">
        <div
          className="showcase-switcher"
          role="group"
          aria-label="Choose showcase project"
        >
          {selections.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                setSelected(index);
                setRotation([0, 0]);
              }}
              aria-pressed={selected === index}
            >
              {item.title}
            </button>
          ))}
        </div>
        <button
          className="scene-reset"
          onClick={() => setRotation([0, 0])}
          aria-label="Reset device angle"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}
