import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
const groups = {
  Languages: ["Python", "JavaScript", "TypeScript", "Dart", "Java", "SQL"],
  Frontend: ["React", "Vue.js", "Tailwind CSS", "Flutter", "jQuery"],
  Backend: [
    "Node.js",
    "Express.js",
    "ERPNext",
    "Frappe Framework",
    "REST APIs",
  ],
  Databases: ["MongoDB", "MySQL", "MariaDB", "PostgreSQL", "Firebase"],
  Tools: ["Git", "GitHub", "Docker", "Postman", "VS Code"],
  Deployment: ["Netlify", "Render", "cPanel", "GitHub Actions", "CI/CD"],
};
export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-blue-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-copy">
            Tools and technologies across the application lifecycle.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groups).map(([group, skills]) => (
            <motion.article
              key={group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="panel"
            >
              <Code2
                aria-hidden="true"
                className="text-blue-600 dark:text-blue-400 mb-4"
              />
              <h3 className="text-xl font-semibold mb-5">{group}</h3>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li className="skill-badge" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
