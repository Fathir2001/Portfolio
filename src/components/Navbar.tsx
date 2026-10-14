import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/theme";
const links = [
  ["projects", "Work"],
  ["experience", "Experience"],
  ["about", "About"],
  ["skills", "Skills"],
  ["education", "Education"],
];
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const sections = [...document.querySelectorAll("main > section")];
      let current = "home";
      for (const section of sections)
        if (section.getBoundingClientRect().top <= 160) current = section.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const resize = () => {
      if (innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <nav className="page-width nav-inner" aria-label="Main navigation">
        <a
          href="#home"
          className="wordmark"
          onClick={() => setOpen(false)}
          aria-label="Rifthan Fathir home"
        >
          rf<span>.</span>
          <span className="wordmark-name">Rifthan Fathir</span>
        </a>
        <div className="desktop-nav">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contact" className="nav-contact">
            Let's talk <ArrowUpRight size={16} />
          </a>
          <button
            ref={menuButton}
            className="icon-button mobile-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {[...links, ["contact", "Contact"]].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
