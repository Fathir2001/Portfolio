import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

type Props = { title: string; desktop: string; mobile?: string; onClose: () => void };

export default function ProjectPreview({ title, desktop, mobile, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [phone, setPhone] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; previousFocus?.focus({ preventScroll: true }); };
  }, []);
  return createPortal(
    <dialog ref={dialog} className="studio-preview" aria-labelledby="studio-preview-title"
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="studio-preview-shell">
        <header><h2 id="studio-preview-title">{title}</h2><button autoFocus onClick={onClose} aria-label="Close project preview"><X size={22} /></button></header>
        <div className="studio-preview-toolbar">
          <button aria-pressed={!phone} onClick={() => { setPhone(false); setZoomed(false); }}>Desktop / overview</button>
          {mobile && <button aria-pressed={phone} onClick={() => { setPhone(true); setZoomed(false); }}>Mobile</button>}
          <button className="studio-preview-zoom" aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}{zoomed ? 'Fit to window' : 'Actual size'}</button>
        </div>
        <div className={`studio-preview-image ${zoomed ? 'is-zoomed' : ''}`} tabIndex={0} aria-label="Project screenshot; scroll to inspect when viewing actual size">
          <img src={phone && mobile ? mobile : desktop} alt={`${title} ${phone ? 'mobile' : 'desktop or project overview'} preview`} />
        </div>
      </div>
    </dialog>, document.body,
  );
}
