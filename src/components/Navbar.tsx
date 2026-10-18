import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Grid2X2, X } from "lucide-react";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "../context/theme";
import "./Navbar.css";

const links = [["home", "Home"], ["projects", "Work"], ["experience", "Experience"], ["about", "About"], ["skills", "Skills"], ["education", "Education"], ["contact", "Let's talk"]];
const COLLAPSE_DELAY = 6000;

export default function Navbar() {
  // const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const pendingNavigation = useRef<{ id: string; until: number } | null>(null);
  const island = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const collapse = useCallback((restoreFocus = true) => {
    clearTimeout(timer.current);
    if (restoreFocus && island.current?.contains(document.activeElement)) trigger.current?.focus();
    setOpen(false);
  }, []);
  const restartTimer = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // Do not hide navigation while a keyboard user is focused inside it.
      const focused = document.activeElement;
      if (focused && island.current?.contains(focused) && focused.matches(":focus-visible")) return;
      collapse();
    }, COLLAPSE_DELAY);
  }, [collapse]);
  useEffect(() => {
    if (open) restartTimer();
    return () => clearTimeout(timer.current);
  }, [open, restartTimer]);
  useEffect(() => {
    const onScroll = () => {
      // Use a point within the visible content, since sections have generous
      // top spacing and the floating island sits above them.
      const activationLine = Math.min(window.innerHeight * 0.38, 360);
      let current = "home";
      for (const section of document.querySelectorAll("main section[id]")) {
        if (section.getBoundingClientRect().top <= activationLine) current = section.id;
      }
      const pending = pendingNavigation.current;
      if (pending) {
        if (current !== pending.id && performance.now() < pending.until) return;
        pendingNavigation.current = null;
      }
      setActive(current);
    };
    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && document.getElementById(id)) {
        pendingNavigation.current = { id, until: performance.now() + 2000 };
        setActive(id);
      }
    };
    onHashChange();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!island.current?.contains(event.target as Node)) collapse(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") collapse();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open, collapse]);

  return (
    <header ref={island} className={`nav-island ${open ? "is-expanded" : ""}`}
      onPointerMove={() => open && restartTimer()}
      onPointerDown={() => open && restartTimer()}
      onKeyDown={() => open && restartTimer()}
      onBlur={() => open && restartTimer()}>
      <nav aria-label="Main navigation">
        <div className="island-top">
          <a className="island-brand" href="#home" onClick={() => {
            pendingNavigation.current = { id: "home", until: performance.now() + 2000 };
            setActive("home"); collapse(false);
          }}>
            <span className="island-monogram" aria-hidden="true">rf<span>.</span></span>
            <span className="island-identity"><strong>Rifthan Fathir</strong><span>Explore my portfolio</span></span>
          </a>
        <div className="studio-nav-links">
          {[["home", "Home"], ["projects", "Projects"], ["experience", "Experience"], ["about", "About"], ["skills", "Skills"], ["education", "Education"], ["contact", "Contact"]].map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}
            onClick={() => { pendingNavigation.current = { id, until: performance.now() + 2000 }; setActive(id); collapse(false); }}>{label}</a>)}
        </div>
          <button ref={trigger} className="island-trigger"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open} aria-controls="island-links"
            onClick={() => open ? collapse() : setOpen(true)}>
            <span className="island-toggle-icon" aria-hidden="true">{open ? <X size={17} /> : <Grid2X2 size={17} />}</span>
          </button>
          {/* Theme toggle temporarily disabled.
          <button className="island-theme" onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          */}
          <a className="studio-nav-contact" href="#contact" onClick={() => {
            pendingNavigation.current = { id: "contact", until: performance.now() + 2000 };
            setActive("contact"); collapse(false);
          }}>Let's talk <ArrowUpRight size={17} /></a>
        </div>
        <div id="island-links" className="island-links" hidden={!open}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => {
              pendingNavigation.current = { id, until: performance.now() + 2000 };
              setActive(id);
              collapse();
            }}>{label}{id === "contact" && <ArrowUpRight size={14} />}</a>)}
        </div>
      </nav>
    </header>
  );
}
