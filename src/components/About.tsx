import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Coffee } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300">
              I'm a passionate Full Stack Developer specializing in Mobile & Web Development, 
              with a strong focus on Flutter, React Native, and React Development.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              My mission is turning innovative ideas into reality through clean, efficient, 
              and maintainable code. I believe in creating solutions that not only work 
              flawlessly but also provide exceptional user experiences.
            </p>
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
              <Coffee className="h-5 w-5" />
              <span className="text-lg font-medium">Fun fact: I turn coffee into code ☕</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl space-y-4"
          >
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Quick Overview
              </h3>
            </div>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li>📧 rifathanfathir@gmail.com</li>
              <li>💼 Full Stack & Mobile Developer</li>
              <li>🚀 Specialized in Flutter & React</li>
              <li>🎯 Focus on Clean Architecture</li>
              <li>📱 Mobile & Web Development Expert</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;