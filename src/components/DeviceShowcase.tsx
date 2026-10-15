import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Layers, Maximize2 } from 'lucide-react';
import { projects } from '../data/projects';
import { heroPreview } from '../data/hero-previews';
import FloatingDevices from './FloatingDevices';
import HolographicPlatform from './HolographicPlatform';
import ShowcaseAtmosphere from './ShowcaseAtmosphere';
import ProjectPreview from './ProjectPreview';

export default function DeviceShowcase({ active = true }: { active?: boolean }) {
  const [selected, setSelected] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 90, damping: 22 });
  const rotateY = useSpring(tiltY, { stiffness: 90, damping: 22 });
  const project = projects[selected];
  const preview = heroPreview(project);
  const selectProject = (index: number) => {
    const next = (index + projects.length) % projects.length;
    if (next === selected) return;
    setDirection(index > selected ? 1 : -1);
    setSelected(next);
    tiltX.set(0); tiltY.set(0);
    const button = rail.current?.children[next] as HTMLElement | undefined;
    if (rail.current && button) rail.current.scrollTo({ left: button.offsetLeft - (rail.current.clientWidth - button.clientWidth) / 2, behavior: reduced ? 'instant' : 'smooth' });
  };
  const onKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const next = (selected + (event.key === 'ArrowRight' ? 1 : -1) + projects.length) % projects.length;
    if (rail.current?.contains(event.target as Node)) (rail.current.children[next] as HTMLButtonElement)?.focus({ preventScroll: true });
    selectProject(next);
  };

  return (
    <motion.div className="studio-showcase" aria-label="Portfolio project showcase" role="region"
      aria-roledescription="carousel" onKeyDown={event => { if (!previewOpen) onKeys(event); }} data-active={active && !previewOpen}
      initial={reduced ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.95, delay: reduced ? 0 : 0.3 }}>
      <div className="studio-stage"
        onPointerMove={event => {
          if (reduced || !active || event.pointerType !== 'mouse') return;
          const rect = event.currentTarget.getBoundingClientRect();
          tiltX.set(((event.clientY - rect.top) / rect.height - 0.5) * -5);
          tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 7);
        }}
        onPointerLeave={() => { tiltX.set(0); tiltY.set(0); }}
        onPointerDown={event => { if (event.pointerType === 'touch') touch.current = { x: event.clientX, y: event.clientY }; }}
        onPointerCancel={() => { touch.current = null; }}
        onPointerUp={event => {
          if (!touch.current) return;
          const dx = event.clientX - touch.current.x;
          const dy = event.clientY - touch.current.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) selectProject(selected + (dx < 0 ? 1 : -1));
          touch.current = null;
        }}>
        <div className="studio-stage-aura" aria-hidden="true" />
        <ShowcaseAtmosphere />
        <div className="studio-holo-label collection-label"><Layers size={19} /><span>THE PROJECT COLLECTION</span></div>
        <div className="studio-holo-label category-label"><i /><span>{project.category.toUpperCase()}</span></div>
        <HolographicPlatform title={project.title} />
        <motion.div className="studio-device-perspective" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div className="studio-device-transition" key={project.title}
              initial={{ opacity: 0, x: reduced ? 0 : direction * 24, y: reduced ? 0 : 8, scale: reduced ? 1 : 0.97 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: reduced ? 0 : direction * -18, scale: reduced ? 1 : 0.98 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: 'easeOut' }}>
              <FloatingDevices preview={preview} title={project.title} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <span className="studio-device-note">{preview.label}<svg viewBox="0 0 50 40" aria-hidden="true"><path d="M40 2Q45 24 12 28m0 0 8-8m-8 8 11 3" /></svg></span>
      </div>
      <div className="studio-project-panel">
        <button className="studio-enlarge" onClick={() => setPreviewOpen(true)} aria-label={`Enlarge ${project.title} screenshots`} title="Enlarge screenshots"><Maximize2 size={18} /></button>
        <div className="studio-panel-content" aria-live="polite" aria-atomic="true">
          <motion.div key={project.title} initial={reduced ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.45 }}>
            <p className="studio-project-status"><i />{project.live ? 'LIVE ON THE WEB' : 'FROM THE PROJECT ARCHIVE'}</p>
            <h2>{project.title}</h2>
            <p className="studio-project-description">{project.description}</p>
            {project.tags.length > 0 && <ul className="studio-tech-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
          </motion.div>
        </div>
        <div className="studio-panel-footer">
          <div className="studio-project-links">
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live website`}>Live site <ArrowUpRight size={14} /></a>}
            {project.github?.map(link => <a href={link.link} key={link.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} ${link.label} source code`}><Github size={13} />{link.label}</a>)}
          </div>
          <div className="studio-carousel-controls"><span><strong>{String(selected + 1).padStart(2, '0')}</strong> / {projects.length}</span><button onClick={() => selectProject(selected - 1)} aria-label="Previous project"><ArrowLeft size={18} /></button><button onClick={() => selectProject(selected + 1)} aria-label="Next project"><ArrowRight size={18} /></button></div>
        </div>
      </div>
      <div className="studio-project-rail" ref={rail} role="group" aria-label="Choose showcase project">
        {projects.map((item, index) => <button key={item.title} aria-label={item.title} title={item.title} aria-pressed={selected === index} onClick={() => selectProject(index)}>
          <img src={`${import.meta.env.BASE_URL}images/thumbnails/${heroPreview(item).desktop.split('/').pop()}`} alt="" width={240} height={150} loading="lazy" />
          <small>{item.title}</small>
        </button>)}
      </div>
      {previewOpen && <ProjectPreview title={project.title} desktop={preview.desktop} mobile={preview.mobile} onClose={() => setPreviewOpen(false)} />}
    </motion.div>
  );
}
