import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.rotation = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.2 + 0.1;
        this.color = '#3b82f6';
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
        ctx!.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx!.fill();
        ctx!.restore();
      }

      update() {
        this.rotation += this.speed * 0.02;
        this.y += Math.sin(this.rotation) * 0.3;
        this.x += Math.cos(this.rotation) * 0.3;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }
    }

    const triangles: Triangle[] = Array.from({ length: 50 }, () => new Triangle());
    let mouseX = 0;
    let mouseY = 0;
    let frame = 0;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const drawGrid = () => {
      const gridSize = 30;
      const offset = frame % gridSize;
      
      ctx.strokeStyle = '#1e40af20';
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
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      frame++;
      drawGrid();

      triangles.forEach(triangle => {
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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-primary-800/50 backdrop-blur-[1px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="backdrop-blur-lg bg-primary-900/30 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-primary-700/30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-700/50 shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center space-y-4 mt-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Rifthan Fathir
              </h1>

              <div className="flex items-center justify-center space-x-2 text-accent-400">
                <Code2 className="w-6 h-6" />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-xl font-medium"
                >
                  Full Stack | Mobile Developer
                </motion.span>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="max-w-2xl mx-auto text-lg text-primary-200"
              >
                Building digital solutions with passion and precision. Specialized in Flutter, React Native, and React Development.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex justify-center space-x-6 mt-8"
            >
              {[
                { icon: Github, href: 'https://github.com/rifathanfathir' },
                { icon: Linkedin, href: 'https://linkedin.com/in/rifathanfathir' },
                { icon: Mail, href: 'mailto:rifathanfathir@gmail.com' }
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
                  <item.icon className="w-6 h-6 text-accent-400 hover:text-accent-300" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-primary-400"
            >
              <span className="block text-sm text-center mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-primary-400 rounded-full mx-auto flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-primary-400 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;