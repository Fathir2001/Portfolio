import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Grid2X2, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/theme";
import "./Navbar.css";

const links = [["home", "Home"], ["projects", "Work"], ["experience", "Experience"], ["about", "About"], ["skills", "Skills"], ["education", "Education"], ["contact", "Let's talk"]];
const COLLAPSE_DELAY = 6000;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
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
      let current = "home";
      for (const section of document.querySelectorAll("main > section")) {
        if (section.getBoundingClientRect().top <= 160) current = section.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          <button ref={trigger} className="island-trigger"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open} aria-controls="island-links"
            onClick={() => open ? collapse() : setOpen(true)}>
            <span className="island-monogram" aria-hidden="true">rf<span>.</span></span>
            <span className="island-identity"><strong>Rifthan Fathir</strong><span>{open ? "Find your next stop" : "Explore my portfolio"}</span></span>
            <span className="island-toggle-icon" aria-hidden="true">{open ? <X size={17} /> : <Grid2X2 size={17} />}</span>
          </button>
          {open && <button className="island-theme" onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>}
        </div>
        <div id="island-links" className="island-links" hidden={!open}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => collapse()}>{label}{id === "contact" && <ArrowUpRight size={14} />}</a>)}
        </div>
      </nav>
    </header>
  );
}
