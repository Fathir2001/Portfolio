import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import DeviceShowcase from "./DeviceShowcase";
import { useReducedMotion } from "framer-motion";
import { projects, production } from "../data/projects";
export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="page-width relative">
        <div className="hero-layout">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-copy"
          >
            <div className="eyebrow">
              <span className="status-dot" /> FROM IDEA TO EXPERIENCE
            </div>
            <p className="hero-intro">Hello, I'm Rifthan Fathir.</p>
            <h1>
              Thoughtful code.
              <br />
              <span>Lasting impact<span className="hero-period">.</span></span>
            </h1>
            <p className="hero-description">
              I turn complex workflows into intuitive software — from enterprise
              systems to the web and mobile apps people use every day.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="primary-button">
                Explore my work <ArrowUpRight size={18} />
              </a>
              <a href="#contact" className="text-link">
                Let's talk <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-proof" aria-label="Portfolio at a glance">
              <div><strong>{String(projects.length).padStart(2, '0')}</strong><span>Projects built</span></div>
              <div><strong>{String(production.length).padStart(2, '0')}</strong><span>Live experiences</span></div>
              <div><strong>Web + Mobile</strong><span>Interface to infrastructure</span></div>
            </div>
            <div className="hero-person">
              <img
                src={`${import.meta.env.BASE_URL}images/profile.jpg`}
                alt="Rifthan Fathir"
                width={48}
                height={48}
              />
              <div>
                <strong>Software Engineer</strong>
                <span>Imara Software Solutions (Pvt) Ltd</span>
              </div>
              <div className="hero-socials">
                <a
                  href="https://github.com/Fathir2001"
                  aria-label="Rifthan on GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={19} />
                </a>
                <a
                  href="https://www.linkedin.com/in/rifthan-fathir"
                  aria-label="Rifthan on LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={19} />
                </a>
              </div>
            </div>
            <p className="sr-only">
              Software Engineer | Full-Stack Developer | Web &amp; Mobile
              Application Developer
            </p>
          </motion.div>
          <DeviceShowcase />
        </div>
        <div className="hero-baseline">
          <a href="#projects">
            <ArrowDown size={15} /> SCROLL TO DISCOVER
          </a>
          <span>
            DESIGN WITH INTENT <i /> BUILD WITH PRECISION <i /> DELIVER WITH CARE
          </span>
        </div>
      </div>
    </section>
  );
}
