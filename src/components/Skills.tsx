import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Mobile Development',
    skills: [
      { name: 'Flutter/Dart', progress: 90 },
      { name: 'React Native', progress: 85 },
    ]
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', progress: 80 },
      { name: 'HTML5/CSS3', progress: 90 },
      { name: 'JavaScript', progress: 92 },
    ]
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js/Express.js', progress: 87 },
      { name: 'PHP', progress: 80 },
    ]
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', progress: 85 },
      { name: 'MySQL', progress: 83 },
    ]
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git/GitHub', progress: 88 },
      { name: 'Firebase', progress: 85 },
      { name: 'Figma', progress: 75 },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Skills & Expertise</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-300">{skill.name}</span>
                      <span className="text-purple-600 dark:text-purple-400">{skill.progress}%</span>
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