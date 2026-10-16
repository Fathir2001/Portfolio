// Layered glass and light surround the real device previews without obscuring them.
export default function ShowcaseAtmosphere() {
  return (
    <div className="studio-spatial-backdrop" aria-hidden="true">
      <div className="studio-device-halo" />
      <svg className="studio-glass-architecture" viewBox="0 0 800 520" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-pane" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop stopColor="#4389ff" stopOpacity=".18" /><stop offset=".45" stopColor="#2b59e8" stopOpacity=".025" /><stop offset="1" stopColor="#8367ff" stopOpacity=".16" />
          </linearGradient>
          <linearGradient id="studio-pane-edge" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#c8baff" /><stop offset=".25" stopColor="#6782ff" stopOpacity=".5" /><stop offset="1" stopColor="#3478ff" stopOpacity=".08" />
          </linearGradient>
          <linearGradient id="studio-pane-base"><stop stopColor="#65b8ff" stopOpacity=".1" /><stop offset=".65" stopColor="#74b7ff" /><stop offset="1" stopColor="#805bff" stopOpacity=".3" /></linearGradient>
        </defs>
        <g fill="url(#studio-pane)" stroke="#6e94ff" strokeOpacity=".3">
          <path d="M25 174 115 208V447L25 421Z" />
          <path d="M151 64 618 3V430L151 466Z" />
          <path d="M524 198 724 112V450L524 463Z" />
          <path d="M43 359 128 379V469L43 451Z" />
          <path d="M573 383 667 375V470L573 474Z" />
        </g>
        <g className="studio-panel-edges" stroke="url(#studio-pane-edge)" strokeWidth="1.6">
          <path d="M25 174V421M151 64V466M618 3V430M724 112V450M43 359V451M573 383V474" />
        </g>
        <g stroke="url(#studio-pane-base)" strokeWidth="1.4">
          <path d="m151 466 467-36M524 463l200-13M43 451l85 18M573 474l94-4" />
        </g>
        <g fill="#d1e5ff" className="studio-glass-corners">
          {[[25,174],[151,64],[618,3],[724,112],[43,359],[573,383]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="1.7" />)}
        </g>
      </svg>
      <svg className="studio-scene-particles" viewBox="0 0 800 520" fill="#8bbfff" preserveAspectRatio="none">
        {Array.from({ length: 64 }, (_, index) => <circle key={index}
          cx={35 + (index * 127 % 715)} cy={145 + (index * 83 % 340)}
          r={index % 9 === 0 ? 1.7 : .7} opacity={.2 + (index % 5) * .14} />)}
      </svg>
      <svg className="studio-orbits" viewBox="0 0 800 520" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-orbit-blue"><stop stopColor="#a084ff" /><stop offset=".35" stopColor="#3478ff" stopOpacity=".35" /><stop offset=".7" stopColor="#6589ff" /><stop offset="1" stopColor="#bb85ff" /></linearGradient>
        </defs>
        <g className="studio-orbit-loop">
          <path d="M165 212C-108 305-15 389 343 363S930 242 707 169 310 166 165 212Z" stroke="url(#studio-orbit-blue)" />
          <path d="M165 212C-108 305-15 389 343 363S930 242 707 169 310 166 165 212Z" className="studio-light-trail" stroke="#dbbbff" pathLength="100" strokeDasharray=".5 99.5" strokeWidth="3" />
        </g>
        <g className="studio-orbit-loop">
          <path d="M331 91C234-55 563 14 707 205S894 469 678 433 393 237 331 91Z" stroke="url(#studio-orbit-blue)" />
          <path d="M331 91C234-55 563 14 707 205S894 469 678 433 393 237 331 91Z" className="studio-light-trail trail-violet" stroke="#d1a6ff" pathLength="100" strokeDasharray=".5 99.5" strokeWidth="3" />
        </g>
        <g className="studio-orbit-flares" fill="#e6d6ff">
          <circle cx="16" cy="312" r="2" /><circle cx="321" cy="69" r="2" /><circle cx="783" cy="413" r="2" />
        </g>
      </svg>
    </div>
  );
}
