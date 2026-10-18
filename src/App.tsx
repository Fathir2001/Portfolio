import { MotionConfig } from "framer-motion";
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
              <Experience />
              <About />
            </div>
            <Skills />
            <Education />
            <Contact />
          </main>
          <footer className="site-footer">
            <div className="page-width">
              <a href="#home" className="wordmark">
                rf<span>.</span>
              </a>
              <p>Thoughtfully built by Rifthan Fathir.</p>
              <span>React / TypeScript / A little curiosity</span>
            </div>
          </footer>
          <BackToTop />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
