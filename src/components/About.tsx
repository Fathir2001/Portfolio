import { motion } from "framer-motion";
import { Annoyed, Code2, Volume2 } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-primary-900 to-primary-800"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
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
            <p className="text-lg text-accent-400 dark:text-gray-300 leading-relaxed">
              I'm a passionate{" "}
              <span className="font-bold text-white">Full Stack Developer</span>{" "}
              with expertise in{" "}
              <span className="font-bold text-white">
                Mobile and Web Development
              </span>
              , specializing in building seamless experiences with{" "}
              <span className="font-bold text-white">Flutter</span> and{" "}
              <span className="font-bold text-white">React</span>. Currently
              working as an{" "}
              <span className="font-bold text-white">
                Associate Software Engineer
              </span>{" "}
              at{" "}
              <span className="font-bold text-white">
                Imara Software Solutions PVT LTD
              </span>
              , where I contribute to innovative projects and grow my technical
              expertise.
            </p>
            <p className="text-lg text-accent-400 dark:text-gray-300 leading-relaxed">
              As an{" "}
              <span className="font-bold text-white">
                Information Technology student
              </span>{" "}
              at the{" "}
              <span className="font-bold text-white">
                Institute of Technology University of Moratuwa
              </span>
              , I'm constantly learning and exploring new technologies. My goal
              is to transform creative concepts into impactful digital solutions
              through well-structured, optimized, and scalable code. I strive to
              build applications that are both highly functional and a pleasure
              for users to interact with.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-gray-200 dark:text-purple-400 bg-primary-800/50 p-4 rounded-xl border border-accent-400/30"
            >
              <Volume2 className="h-6 w-6 text-accent-400" />
              <span className="text-lg font-medium text-accent-400 dark:text-gray-300">
                Fun fact: I speak fluent HTML, CSS, and JavaScript{" "}
              </span>
              <Annoyed className="h-6 w-6 text-accent-400" />
            </motion.div>
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
              whileHover={{ scale: 1.03, y: -5 }}
              className="backdrop-blur-lg bg-primary-900/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-primary-700/70 hover:border-accent-400/50 transition-all duration-500 group relative overflow-hidden"
              style={{
                boxShadow:
                  "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)",
              }}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/5 to-blue-500/0 group-hover:via-purple-500/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="h-8 w-8 text-accent-400 dark:text-purple-400" />
                  <h3 className="text-2xl font-semibold text-accent-400 dark:text-white group-hover:text-accent-300 transition-colors duration-300">
                    Quick Overview
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-200 dark:text-gray-300">
                  {[
                    { icon: "📧", text: "rifathanfathir33@gmail.com" },
                    {
                      icon: "💼",
                      text: "Associate Software Engineer at Imara Software Solutions",
                    },
                    {
                      icon: "🎓",
                      text: "NDT in Information Technology - ITU Moratuwa",
                    },
                    { icon: "🚀", text: "Specialized in Flutter & React" },
                    { icon: "🎯", text: "Focus on Clean Architecture" },
                    { icon: "📱", text: "Mobile & Web Development Expert" },
                    { icon: "🤖", text: "IEEE RAS Student Branch Member" },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary-800/50 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-400/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent-400/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
