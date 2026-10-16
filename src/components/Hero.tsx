import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Box, Github, Linkedin, Users, Zap } from 'lucide-react';
import { projects, production } from '../data/projects';
import DeviceShowcase from './DeviceShowcase';
import HeroAtmosphere from './HeroAtmosphere';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.08 });
  const reduced = useReducedMotion();
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const parallaxX = useSpring(x, { stiffness: 45, damping: 22 });
  const parallaxY = useSpring(y, { stiffness: 45, damping: 22 });
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  const reveal = (delay: number) => ({
    initial: reduced ? false as const : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.65, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="home" className="studio-hero" ref={ref} data-active={visible && pageVisible}
      onPointerMove={event => {
        if (reduced || event.pointerType !== 'mouse' || !visible) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width - 0.5) * -22);
        y.set(((event.clientY - rect.top) / rect.height - 0.5) * -14);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}>
      <HeroAtmosphere x={parallaxX} y={parallaxY} />
      <div className="studio-container">
        <div className="studio-layout">
          <div className="studio-copy">
            <motion.div className="studio-status" {...reveal(0.1)}><i /> FROM IDEA TO EXPERIENCE</motion.div>
            <motion.p className="studio-greeting" {...reveal(0.2)}>Hello, I'm Rifthan Fathir.</motion.p>
            <h1>
              <motion.span {...reveal(0.3)}>Thoughtful code.</motion.span>
              <motion.span className="studio-gradient-text" {...reveal(0.42)}>Lasting impact.</motion.span>
            </h1>
            <motion.p className="studio-description" {...reveal(0.5)}>
              I turn complex workflows into intuitive software — from enterprise systems to the web and mobile apps people use every day.
            </motion.p>
            <motion.div className="studio-actions" {...reveal(0.58)}>
              <a href="#projects" className="studio-button studio-button-primary">Explore my work <ArrowUpRight size={18} /></a>
              <a href="#contact" className="studio-button studio-button-glass">Let's talk <ArrowUpRight size={18} /></a>
            </motion.div>
            <motion.div className="studio-stats" aria-label="Portfolio at a glance" {...reveal(0.7)}>
              <div><Box size={23} /><strong>{String(projects.length).padStart(2, '0')}</strong><span>Projects built</span></div>
              <div><Users size={23} /><strong>{String(production.length).padStart(2, '0')}</strong><span>Live experiences</span></div>
              <div className="studio-stat-platform"><Zap size={23} /><strong>Web + Mobile</strong><span>Interface to infrastructure</span></div>
            </motion.div>
          </div>
          <DeviceShowcase active={visible && pageVisible} />
        </div>
        <div className="studio-baseline">
          <a href="#projects" className="studio-scroll"><span><ArrowDown size={14} /></span> SCROLL TO EXPLORE</a>
          <div className="studio-signature"><span>DESIGNED WITH INTENT. BUILT WITH PRECISION.</span><a href="https://github.com/Fathir2001" aria-label="Rifthan on GitHub" target="_blank" rel="noopener noreferrer"><Github size={17} /></a><a href="https://www.linkedin.com/in/rifthan-fathir" aria-label="Rifthan on LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin size={17} /></a></div>
        </div>
      </div>
    </section>
  );
}
