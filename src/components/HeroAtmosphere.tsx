import { motion, type MotionValue } from 'framer-motion';
import { useState, type CSSProperties } from 'react';

// Deterministic positions prevent layout shifts and keep rendering inexpensive.
const stars = Array.from({ length: 45 }, (_, index) => ({
  x: (index * 37 + 7) % 100,
  y: (index * 23 + 11) % 86,
  size: index % 8 === 0 ? 3 : 1.5,
  delay: -(index % 9),
}));

export default function HeroAtmosphere({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  return (
    <div className={`studio-atmosphere ${backgroundLoaded ? 'has-background' : ''}`} aria-hidden="true">
      <img className="studio-space-image" src={`${import.meta.env.BASE_URL}images/studio-background.webp`}
        alt="" fetchPriority="high" width={1672} height={941} onLoad={() => setBackgroundLoaded(true)} onError={event => { event.currentTarget.style.display = 'none'; }} />
      <div className="studio-space-shade" />
      <div className="studio-nebula" />
      <motion.div className="studio-star-field" style={{ x, y }}>
        {stars.map((star, index) => <i key={index} style={{
          left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size,
          '--star-delay': `${star.delay}s`,
        } as CSSProperties} />)}
      </motion.div>
      <div className="studio-planet studio-planet-left" />
      <div className="studio-planet studio-planet-right" />
      <div className="studio-floor-grid" />
      <div className="studio-horizon" />
      <svg className="studio-terrain" viewBox="0 0 1600 180" preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-rock" x2="0" y2="1"><stop stopColor="#172d55" /><stop offset="1" stopColor="#050b18" /></linearGradient>
          <linearGradient id="studio-rock-edge"><stop stopColor="#3478ff" stopOpacity=".45" /><stop offset=".5" stopColor="#0b1733" /><stop offset="1" stopColor="#805bff" stopOpacity=".4" /></linearGradient>
        </defs>
        <path d="M0 34 40 65 76 50 112 101 155 86 204 133 259 118 310 153 387 134 450 164 536 152 623 171 790 166 912 177 1022 155 1085 160 1160 137 1213 149 1290 112 1345 123 1396 77 1460 93 1520 45 1600 18V180H0Z" fill="url(#studio-rock)" stroke="url(#studio-rock-edge)" />
        <path d="M0 70 40 65 64 120 112 101 148 158 204 133 244 170 310 153 342 180M1213 149 1256 180 1290 112 1320 165 1396 77 1420 153 1460 93 1502 175 1520 45 1550 126 1600 18" fill="none" stroke="#345989" strokeOpacity=".22" />
        <path d="M0 110 59 130 93 117 165 170 233 154 302 180H0ZM1600 91 1545 122 1500 110 1452 156 1390 146 1312 180H1600Z" fill="#050b18" />
      </svg>
    </div>
  );
}
