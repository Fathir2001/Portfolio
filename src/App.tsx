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
            <About />
            <Education />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <BackToTop />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;
