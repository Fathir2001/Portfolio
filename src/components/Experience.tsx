import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const experiences = [
  {
    title: "Associate Software Engineer",
    company: "Imara Software Solutions Pvt Ltd",
    period: "2025 - Present",
    description:
      "Working as an Associate Software Engineer, developing and maintaining full-stack applications. Contributing to architectural decisions, code reviews, and mentoring junior developers. Implementing best practices and modern development workflows.",
    icon: "💼",
    type: "work",
  },
  {
    title: "Software Engineering Trainee",
    company: "Imara Software Solutions Pvt Ltd",
    period: "2025",
    description:
      "Gained hands-on experience in full-stack development, contributing to real-world projects, and enhancing technical skills in a professional environment. Worked with modern technologies and frameworks to build scalable applications.",
    icon: "💻",
    type: "work",
  },
  {
    title: "Publicity Committee Member",
    company: "IEEE RAS Student Branch Chapter of the University of Moratuwa",
    period: "2024 - Present",
    description:
      "Collaborated with a dynamic team to create engaging content, manage social media presence, and enhance brand visibility. Led social media campaigns and organized technical workshops.",
    icon: "🤖",
    type: "volunteer",
  },
  {
    title: "President",
    company:
      "Old Boys Association - Puttalam, Kalpity, Kurinchipity Muslim Maha Vidyalaya",
    period: "2021 - Present",
    description:
      "Led initiatives to strengthen connections, organized events to support school development, and fostered community engagement. Spearheaded projects benefiting both current students and the broader school community.",
    icon: "👔",
    type: "volunteer",
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-primary-900 dark:to-primary-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gray-900 dark:text-white">
            Professional Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">
            My journey of growth through work and volunteering
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center w-14 h-14 rounded-full dark:bg-purple-900 absolute left-1/2 transform -translate-x-1/2 z-10 bg-primary-800 border-4 border-primary-900 shadow-lg"
                >
                  <span className="text-2xl">{experience.icon}</span>
                </motion.div>

                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="backdrop-blur-lg bg-primary-900/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-primary-700/70 hover:border-accent-400/50 transition-all duration-500 group relative overflow-hidden"
                    style={{
                      boxShadow:
                        "0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(59, 130, 246, 0.3), 0 0 45px rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 group-hover:via-blue-500/10 transition-all duration-500" />

                    {/* Type badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                        experience.type === "work"
                          ? "bg-green-500/20 text-green-300 border border-green-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {experience.type === "work"
                        ? "💼 Professional"
                        : "🤝 Volunteer"}
                    </motion.div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
                        {experience.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mt-1">
                        {experience.company}
                      </p>
                      <div
                        className={`flex items-center gap-2 text-white dark:text-gray-400 mt-2 ${
                          index === 1 ? "justify-end" : ""
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{experience.period}</span>
                      </div>
                      <p className="mt-4 text-gray-400 dark:text-gray-300">
                        {experience.description}
                      </p>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-accent-400/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
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
