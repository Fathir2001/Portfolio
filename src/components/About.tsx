import React from "react";
import { motion } from "framer-motion";
import { Code2, Annoyed, Volume2 } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-primary-800/50 backdrop-blur-[1px]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-white">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-accent-400 dark:text-gray-300 transform transition-transform duration-300 hover:scale-105">
              I'm a dedicated Full Stack Developer with expertise in Mobile and
              Web Development, specializing in building seamless experiences
              with Flutter and React. Currently, I'm working as a Software
              Engineering Intern at Imara Software Solutions PVT LTD.
            </p>
            <p className="text-lg text-accent-400 dark:text-gray-300 transform transition-transform duration-300 hover:scale-105">
              My goal is to transform creative concepts into impactful digital
              solutions through well-structured, optimized, and scalable code. I
              strive to build applications that are both highly functional and a
              pleasure for users to interact with.
            </p>
            <div className="flex items-center gap-2 text-gray-200 dark:text-purple-400 transform transition-transform duration-300 hover:scale-105">
              <Volume2 className="h-5 w-5 text-accent-400" />
              <span className="text-lg font-medium text-accent-400 dark:text-gray-300">
                Fun fact: I speak fluent HTML, CSS, and JavaScript{" "}
              </span>
              <Annoyed className="h-5 w-5 text-accent-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="backdrop-blur-lg bg-primary-900/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-primary-700/70 hover:scale-105 transition-transform duration-300"
              style={{
                boxShadow:
                  "0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3), 0 0 45px rgba(59, 130, 246, 0.2)",
              }}
            >
              <div className="flex items-center gap-3">
                <Code2 className="h-6 w-6 text-accent-400 dark:text-purple-400 mb-4 transform transition-transform duration-300 hover:scale-105" />
                <h3 className="text-xl font-semibold text-accent-400 dark:text-white mb-4  transform transition-transform duration-300 hover:scale-105">
                  Quick Overview
                </h3>
              </div>
              <ul className="space-y-3 text-gray-200 dark:text-gray-300">
                <li className="transform transition-transform duration-300 hover:scale-105">
                  📧 rifathanfathir33@gmail.com
                </li>
                <li className="transform transition-transform duration-300 hover:scale-105">
                  💼 Software Engineering Intern at Imara Software Solutions
                </li>
                <li className="transform transition-transform duration-300 hover:scale-105">
                  🚀 Specialized in Flutter & React
                </li>
                <li className="transform transition-transform duration-300 hover:scale-105">
                  🎯 Focus on Clean Architecture
                </li>
                <li className="transform transition-transform duration-300 hover:scale-105">
                  📱 Mobile & Web Development Expert
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
