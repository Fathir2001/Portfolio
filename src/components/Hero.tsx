import { motion } from "framer-motion";
import {
  Code2,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showScrollText, setShowScrollText] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Triangle {
      x: number;
      y: number;
      size: number;
      rotation: number;
      speed: number;
      color: string;
      opacity: number;

      constructor() {
        this.size = Math.random() * 20 + 10;
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.2 + 0.1;
        this.color = "#3b82f6";
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      draw() {
        ctx!.save();
        ctx!.translate(this.x, this.y);
        ctx!.rotate(this.rotation);
        ctx!.beginPath();
        ctx!.moveTo(-this.size / 2, this.size / 2);
        ctx!.lineTo(this.size / 2, this.size / 2);
        ctx!.lineTo(0, -this.size / 2);
        ctx!.closePath();
        ctx!.fillStyle = `${this.color}${Math.floor(this.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx!.fill();
        ctx!.restore();
      }

      update() {
        this.rotation += this.speed * 0.02;
        this.y += Math.sin(this.rotation) * 0.3;
        this.x += Math.cos(this.rotation) * 0.3;

        if (canvas) {
          if (this.x < -this.size) this.x = canvas.width + this.size;
          if (this.x > canvas.width + this.size) this.x = -this.size;
          if (this.y < -this.size) this.y = canvas.height + this.size;
          if (this.y > canvas.height + this.size) this.y = -this.size;
        }
      }
    }

    const triangles: Triangle[] = Array.from(
      { length: 25 },
      () => new Triangle()
    );
    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;

    canvas.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const drawGrid = () => {
      const gridSize = 30;
      const offset = frame % gridSize;

      ctx.strokeStyle = "#1e40af20";
      ctx.lineWidth = 1;

      for (let x = offset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame++;
      drawGrid();

      triangles.forEach((triangle) => {
        const dx = mouseX - triangle.x;
        const dy = mouseY - triangle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const angle = Math.atan2(dy, dx);
          triangle.x -= Math.cos(angle) * 2;
          triangle.y -= Math.sin(angle) * 2;
          triangle.opacity = Math.min(0.4, triangle.opacity + 0.02);
        } else {
          triangle.opacity = Math.max(0.1, triangle.opacity - 0.01);
        }

        triangle.update();
        triangle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollText(false);
      } else {
        setShowScrollText(true);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30 dark:opacity-100"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 dark:from-primary-900/50 dark:to-primary-800/50" />

      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="backdrop-blur-lg bg-white/90 dark:bg-primary-900/70 rounded-2xl p-8 border border-gray-200 dark:border-primary-700/70 hover:border-blue-400 dark:hover:border-accent-400/50 transition-all duration-300 shadow-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-blue-500 dark:border-accent-400 shadow-xl"
            >
              <img
                src="/Portfolio/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center space-y-4 mt-6"
            >
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
              >
                Rifthan Fathir
              </motion.h1>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6, type: "spring" }}
                className="flex items-center justify-center space-x-2 text-blue-600 dark:text-accent-400"
              >
                <Code2 className="w-6 h-6" />
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-xl font-medium"
                >
                  Full Stack | Mobile Developer
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-primary-200"
              >
                Crafting seamless digital experiences with dedication and
                expertise. Specialized in Flutter and React for responsive,
                dynamic solutions.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="text-blue-600 dark:text-accent-400 text-lg font-medium"
              >
                Currently working as an Associate Software Engineer at Imara
                Software Solutions PVT LTD
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 mt-8"
            >
              {[
                { icon: Github, href: "https://github.com/Fathir2001" },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/rifthan-fathir",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/rifthan_fathir",
                },
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/rifthanfathir.professional",
                },
                {
                  icon: Youtube,
                  href: "https://www.youtube.com/@tdgamersfathirs962",
                },
                { icon: X, href: "https://x.com/rifthanfathir33" },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full backdrop-blur-md bg-primary-800/30 border border-primary-700/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-accent-600/20"
                >
                  <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          {showScrollText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-primary-400"
              >
                <span className="block text-sm text-center mb-2">
                  Scroll to explore
                </span>
                <div className="w-6 h-10 border-2 border-primary-400 rounded-full mx-auto flex justify-center">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1 h-3 bg-primary-400 rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
