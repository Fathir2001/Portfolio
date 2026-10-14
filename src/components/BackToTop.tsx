import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="white"
              strokeWidth="3"
              fill="none"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (125.6 * scrollProgress) / 100}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <ArrowUp className="w-5 h-5 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
