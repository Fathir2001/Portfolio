import { motion } from "framer-motion";
import { Calendar, Briefcase } from "lucide-react";
const employment = [
  {
    title: "Software Engineer",
    period: "September 2026–Present",
    description:
      "Developing enterprise applications with ERPNext, Frappe Framework, Python, and REST APIs. Working across enterprise reporting, academic management, HRMS, databases, and production deployments.",
  },
  {
    title: "Associate Software Engineer",
    period: "September 2025–August 2026",
    description:
      "Developed and maintained full-stack applications and enterprise workflows, contributing to API integrations, database-backed features, reporting, and deployment activities.",
  },
  {
    title: "Software Engineer Intern",
    period: "February 2025–September 2025",
    description:
      "Contributed to enterprise software development and gained hands-on experience with Python, Frappe, REST APIs, and databases in a production development environment.",
  },
];
const volunteering = [
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
export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="page-width">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / EXPERIENCE</p>
            <h2 className="section-title">
              Building software.
              <br />
              Growing with purpose.
            </h2>
          </div>
          <p className="section-copy">
            Building practical software for enterprise operations.
          </p>
        </div>
        <ol className="border-l-2 border-blue-300 dark:border-blue-800 ml-3 space-y-8">
          {employment.map((job) => (
            <motion.li
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-6 sm:pl-10 experience-item"
            >
              <span className="absolute -left-2 top-7 h-4 w-4 rounded-full bg-blue-600 border-4 border-blue-100 dark:border-primary-900" />
              <article className="panel">
                <Briefcase aria-hidden="true" className="text-blue-500 mb-3" />
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="mt-1 font-medium">
                  Imara Software Solutions (Pvt) Ltd
                </p>
                <p className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300 mt-3">
                  <Calendar size={16} aria-hidden="true" />
                  {job.period}
                </p>
                <p className="section-copy mt-4">{job.description}</p>
              </article>
            </motion.li>
          ))}
        </ol>
        <h3 className="text-2xl font-bold mt-16 mb-6 text-gray-900 dark:text-white">
          Volunteering &amp; Community
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {volunteering.map((role) => (
            <article key={role.title} className="panel">
              <h4 className="font-bold text-lg">{role.title}</h4>
              <p className="section-copy mt-2">{role.company}</p>
              <p className="section-copy mt-4">{role.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
