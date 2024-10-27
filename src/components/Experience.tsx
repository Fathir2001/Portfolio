import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Mobile Developer',
    company: 'Tech Innovators Inc.',
    period: '2022 - Present',
    description: 'Leading mobile app development using Flutter and React Native. Managing team of developers and implementing best practices.'
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    period: '2020 - 2022',
    description: 'Developed and maintained web applications using React and Node.js. Implemented responsive designs and RESTful APIs.'
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Web Agency',
    period: '2018 - 2020',
    description: 'Created responsive websites and web applications using modern JavaScript frameworks and CSS preprocessors.'
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Professional Experience</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 absolute left-1/2 transform -translate-x-1/2">
                  <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>

                <div className={`flex-1 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {experience.title}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium mt-1">
                      {experience.company}
                    </p>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.period}</span>
                    </div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
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