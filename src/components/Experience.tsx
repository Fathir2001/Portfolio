import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Publicity committee member',
    company: 'IEEE RAS Student Branch Chapter of the University of Moratuwa',
    period: '2024 - Present',
    description: 'Collaborated with a dynamic team to create engaging content, manage social media presence, and enhance brand visibility.'
  },
  {
    title: 'President at Old Boys Association',
    company: 'Puttalam, Kalpity, Kurinchipity Muslim Maha Vidyalaya',
    period: '2021 - Present',
    description: 'Led initiatives to strengthen connections, organized events to support school development, and fostered community engagement. Spearheaded projects benefiting both current students and the broader school community.'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-primary-900 to-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-white">Volunteering Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full  dark:bg-purple-900 absolute left-1/2 transform -translate-x-1/2 z-10">
                  <Briefcase className="w-5 h-5 text-accent-400 dark:text-accent-400 bg-white-100" />
                </div>

                <div className={`flex-1 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className="backdrop-blur-lg bg-primary-900/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-primary-700/70"
                    style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.4), 0 0 20px rgba(59, 130, 246, 0.2), 0 0 30px rgba(59, 130, 246, 0.1)' }}
                  >
                    <h3 className="text-xl font-semibold text-accent-400 dark:text-white">
                      {experience.title}
                    </h3>
                    <p className="text-white dark:text-purple-400 font-medium mt-1">
                      {experience.company}
                    </p>
                    <div className={`flex items-center gap-2 text-white dark:text-gray-400 mt-2 ${
                      index === 1 ? 'justify-end' : ''
                    }`}>
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                    <p className="mt-4 text-gray-400 dark:text-gray-300">
                      {experience.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;