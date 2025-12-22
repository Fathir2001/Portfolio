import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Front-End Development",
    icon: "🎨",
    skills: [
      { name: "HTML5", progress: 90 },
      { name: "CSS3", progress: 90 },
      { name: "JavaScript", progress: 92 },
      { name: "React", progress: 85 },
      { name: "TypeScript", progress: 80 },
      { name: "Tailwind CSS", progress: 88 },
      { name: "Flutter (Dart)", progress: 90 },
    ],
  },
  {
    title: "Back-End Development",
    icon: "⚙️",
    skills: [
      { name: "Node.js", progress: 87 },
      { name: "Express.js", progress: 87 },
      { name: "PHP", progress: 80 },
      { name: "REST APIs", progress: 85 },
    ],
  },
  {
    title: "Programming Languages",
    icon: "💻",
    skills: [
      { name: "Java", progress: 85 },
      { name: "Python", progress: 88 },
      { name: "C", progress: 80 },
      { name: "Dart", progress: 90 },
    ],
  },
  {
    title: "Database Management",
    icon: "🗄️",
    skills: [
      { name: "MySQL", progress: 83 },
      { name: "MongoDB", progress: 85 },
      { name: "Firebase", progress: 80 },
    ],
  },
  {
    title: "Version Control & Collaboration",
    icon: "🔧",
    skills: [
      { name: "Git", progress: 88 },
      { name: "GitHub", progress: 88 },
      { name: "GitLab", progress: 82 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    skills: [
      { name: "VS Code", progress: 90 },
      { name: "Figma", progress: 85 },
      { name: "Canva", progress: 90 },
      { name: "Postman", progress: 85 },
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-primary-900 to-primary-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gray-900 dark:text-white">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="backdrop-blur-lg bg-primary-900/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-primary-700/70 hover:border-accent-400/50 transition-all duration-500 group relative overflow-hidden"
              style={{
                boxShadow:
                  "0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.2), 0 0 30px rgba(59, 130, 246, 0.1)",
              }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 group-hover:via-blue-500/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl"
                  >
                    {category.icon}
                  </motion.span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          viewport={{ once: true }}
                          className="text-blue-600 dark:text-blue-400 font-semibold"
                        >
                          {skill.progress}%
                        </motion.span>
                      </div>
                      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.progress}%` }}
                          transition={{
                            duration: 1.5,
                            ease: "easeOut",
                            delay: skillIndex * 0.1,
                          }}
                          viewport={{ once: true }}
                          className="skill-bar relative"
                        >
                          <motion.div
                            animate={{
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent-400/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
