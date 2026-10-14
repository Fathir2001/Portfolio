import { motion } from "framer-motion";
import { Annoyed, Code2, Volume2 } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-primary-900 dark:to-primary-800"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-gray-900 dark:text-white">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm Rifthan Fathir, a Software Engineer at{" "}
              <strong>Imara Software Solutions (Pvt) Ltd</strong>. I develop
              full-stack web and mobile applications and enterprise software
              that supports everyday business operations.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              My experience spans ERPNext and Frappe development, Python, REST
              APIs, enterprise reporting, academic management, and HRMS. I work
              with databases and production deployments, connecting reliable
              backend services with approachable interfaces.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I completed the National Diploma in Technology (IT) at the
              University of Moratuwa (2022–2025) and am pursuing the BSc (Hons)
              Computing (Top-Up) at Wrexham University, with an academic
              reference of September 2026.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-blue-100 dark:bg-primary-800/50 p-4 rounded-xl border border-blue-300 dark:border-accent-400/30"
            >
              <Volume2 className="h-6 w-6 text-blue-600 dark:text-accent-400" />
              <span className="text-lg font-medium text-gray-800 dark:text-gray-300">
                From enterprise workflows to web and mobile experiences{" "}
              </span>
              <Annoyed className="h-6 w-6 text-blue-600 dark:text-accent-400" />
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
              className="backdrop-blur-lg bg-white/80 dark:bg-primary-900/70 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)] border border-gray-200 dark:border-primary-700/70 hover:border-blue-400 dark:hover:border-accent-400/50 transition-all duration-500 group relative overflow-hidden"
              style={{
                boxShadow:
                  "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2)",
              }}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 group-hover:via-blue-500/10 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
                    Quick Overview
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                  {[
                    { icon: "\u2197", text: "rifthanfathir33@gmail.com" },
                    {
                      icon: "\u2197",
                      text: "Software Engineer · Imara Software Solutions (Pvt) Ltd",
                    },
                    {
                      icon: "\u2197",
                      text: "BSc (Hons) Computing (Top-Up) · In Progress",
                    },
                    {
                      icon: "\u2197",
                      text: "ERPNext / Frappe · Python · REST APIs",
                    },
                    {
                      icon: "\u2197",
                      text: "Enterprise reporting · Academic management · HRMS",
                    },
                    {
                      icon: "\u2197",
                      text: "React · Flutter · Web & mobile applications",
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-primary-800/50 transition-all duration-300"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="break-words min-w-0">{item.text}</span>
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
