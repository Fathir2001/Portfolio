import type { heroPreview } from '../data/hero-previews';

type Preview = ReturnType<typeof heroPreview>;

export default function FloatingDevices({ preview, title }: { preview: Preview; title: string }) {
  return (
    <div className={`studio-devices ${preview.overview ? 'is-overview' : ''}`}>
      <div className="studio-laptop-float">
        <div className="studio-laptop">
          <div className="studio-laptop-lid">
            <span className="studio-webcam" aria-hidden="true" />
            <div className="studio-laptop-screen">
              <img src={preview.desktop} alt={`${title} ${preview.overview ? 'project overview' : 'desktop interface'}`} width={1280} height={800} decoding="async" />
              <span className="studio-screen-reflection" aria-hidden="true" />
            </div>
            <span className="studio-laptop-chin" aria-hidden="true">{preview.overview ? 'PROJECT ARCHIVE' : 'LIVE EXPERIENCE'}</span>
          </div>
          <div className="studio-laptop-base" aria-hidden="true">
            <div className="studio-speaker speaker-left" /><div className="studio-speaker speaker-right" />
            <div className="studio-keyboard">{Array.from({ length: 56 }, (_, i) => <i key={i} />)}</div>
            <div className="studio-trackpad" />
            <div className="studio-laptop-notch" />
          </div>
        </div>
      </div>
      {preview.mobile && <div className="studio-phone-float">
        <div className="studio-phone">
          <div className="studio-phone-screen">
            <img src={preview.mobile} alt={`${title} responsive mobile interface`} width={390} height={844} decoding="async" />
            <span className="studio-screen-reflection" aria-hidden="true" />
          </div>
          <span className="studio-phone-camera" aria-hidden="true" />
          <span className="studio-phone-button" aria-hidden="true" />
          <span className="studio-phone-home" aria-hidden="true" />
        </div>
        <div className="studio-phone-plinth" aria-hidden="true" />
      </div>}
    </div>
  );
}
