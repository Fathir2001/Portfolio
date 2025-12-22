import { motion } from "framer-motion";
import { Award, Calendar, GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "NDT in Information Technology",
    institution: "Institute of Technology University of Moratuwa",
    location: "Moratuwa, Sri Lanka",
    period: "2023 - Present",
    achievements: [
      "Member of IEEE RAS Student Branch Chapter",
      "Focus on Software Engineering and AI",
      "Active participant in coding competitions and hackathons",
    ],
    icon: "🎓",
  },
  {
    degree: "G.C.E Advanced Level - Physical Science Stream",
    institution: "Puttalam, Kalpity, Kurinchipity Muslim Maha Vidyalaya",
    location: "Puttalam, Sri Lanka",
    period: "2019 - 2021",
    achievements: [
      "3 passes in Combined Mathematics, Physics & Chemistry",
      "Active member of the school's IT Society",
      "Participated in various inter-school competitions",
    ],
    icon: "🏫",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="py-20 bg-white dark:bg-gradient-to-br dark:from-primary-900 dark:to-primary-800"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <GraduationCap className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto" />
          </motion.div>
          <h2 className="section-title text-gray-900 dark:text-white">
            Education
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">
            My academic journey and achievements
          </p>
        </motion.div>

        <div className="space-y-12">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="backdrop-blur-lg bg-primary-900/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-primary-700/70 hover:border-accent-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 group-hover:via-blue-500/10 transition-all duration-500" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl"
                      >
                        {edu.icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-white font-semibold mb-1">
                          {edu.institution}
                        </p>
                        <p className="text-gray-300 dark:text-gray-400 text-sm">
                          📍 {edu.location}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-primary-800/50 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-400/30"
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{edu.period}</span>
                    </motion.div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-white font-semibold">
                        Key Highlights
                      </span>
                    </div>
                    {edu.achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 group/item"
                      >
                        <motion.div
                          whileHover={{ scale: 1.3 }}
                          className="text-blue-600 dark:text-blue-400 mt-1 text-lg"
                        >
                          ✦
                        </motion.div>
                        <p className="text-gray-300 dark:text-gray-300 group-hover/item:text-white transition-colors duration-300">
                          {achievement}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent-400/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
