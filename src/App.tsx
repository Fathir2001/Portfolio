import { MotionConfig } from "framer-motion";
import { Github, Linkedin, ArrowUpRight } from "lucide-react";
import "./studio-background.css";
import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar />
          <main id="main" tabIndex={-1}>
            <div className="studio-continuum">
              <div className="studio-fixed-background" aria-hidden="true">
                <img src={`${import.meta.env.BASE_URL}images/studio-background.webp`} alt="" width={1672} height={941} />
                <div className="studio-fixed-shade" />
              </div>
              <Hero />
              <div className="studio-section-divider" aria-hidden="true" />
              <Projects />
              <div className="studio-section-divider" aria-hidden="true" />
              <Experience />
              <div className="studio-section-divider" aria-hidden="true" />
              <About />
              <div className="studio-section-divider" aria-hidden="true" />
              <Skills />
              <div className="studio-section-divider" aria-hidden="true" />
              <Education />
              <div className="studio-section-divider" aria-hidden="true" />
              <Contact />
            </div>
          </main>
          <footer className="site-footer ct-footer">
            <div className="page-width studio-footer-content">
              <div className="studio-footer-main">
                <div>
              <a href="#home" className="wordmark">
                rf<span>.</span>
              </a>
                  <h2>Built with curiosity.<br /><span>Ready for what's next.</span></h2>
                </div>
                <a className="studio-footer-cta" href="mailto:rifthanfathir33@gmail.com">Start a conversation <ArrowUpRight size={18} aria-hidden="true" /></a>
              </div>
              <div className="studio-footer-links">
                <nav aria-label="Footer navigation"><a href="#projects">Projects</a><a href="#experience">Experience</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
                <div><a href="https://github.com/Fathir2001" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)"><Github size={18} aria-hidden="true" />GitHub</a><a href="https://www.linkedin.com/in/rifthan-fathir" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)"><Linkedin size={18} aria-hidden="true" />LinkedIn</a></div>
              </div>
              <div className="studio-footer-bottom">
              <p>Thoughtfully built by Rifthan Fathir.</p>
              <span>React / TypeScript / A little curiosity</span>
              </div>
            </div>
          </footer>
          <BackToTop />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
