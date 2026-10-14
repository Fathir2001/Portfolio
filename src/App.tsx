import { MotionConfig } from "framer-motion";
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
            <Hero />
            <Projects />
            <Experience />
            <About />
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
