import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Front-End Development',
    skills: [
      { name: 'HTML', progress: 90 },
      { name: 'CSS', progress: 90 },
      { name: 'JavaScript', progress: 92 },
      { name: 'React', progress: 80 },
      { name: 'Flutter (Dart)', progress: 90 },
    ]
  },
  {
    title: 'Back-End Development',
    skills: [
      { name: 'PHP', progress: 80 },
      { name: 'Node.js', progress: 87 },
      { name: 'Express.js', progress: 87 },
    ]
  },
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Java', progress: 85 },
      { name: 'Python', progress: 88 },
    ]
  },
  {
    title: 'Database',
    skills: [
      { name: 'MySQL', progress: 83 },
      { name: 'MongoDB', progress: 85 },
    ]
  },
  {
    title: 'Version Control',
    skills: [
      { name: 'Git', progress: 88 },
      { name: 'GitHub', progress: 88 },
    ]
  },
  {
    title: 'Tools and Platforms',
    skills: [
      { name: 'VSCode', progress: 90 },
      { name: 'Figma', progress: 85 },
      { name: 'Canva', progress: 90 },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-primary-900 to-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-white">Skills & Expertise</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="backdrop-blur-lg bg-primary-900/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-primary-700/70"
              style={{ boxShadow: '0 0 5px rgba(59, 130, 246, 0.2), 0 0 10px rgba(59, 130, 246, 0.1), 0 0 15px rgba(59, 130, 246, 0.05)' }}
            >
              <h3 className="text-xl font-semibold mb-6 text-accent-400 dark:text-white">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 dark:text-gray-300">{skill.name}</span>
                      {/* <span className="text-accent-400 dark:text-purple-400">{skill.progress}%</span> */}
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="skill-bar"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;