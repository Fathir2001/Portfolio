import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Monitor } from "lucide-react";
import { projects } from "../data/projects";
import covers from "../data/project-covers.json";
const categories = ["All", "Production", "Academic"] as const;
export default function Projects() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const visible = projects.filter(
    (project) => category === "All" || project.category === category,
  );
  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-gradient-to-br dark:from-primary-900 dark:to-primary-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-copy max-w-2xl mx-auto">
            Production web and mobile applications, followed by the academic
            projects that shaped my foundations.
          </p>
        </div>
        <div
          className="flex flex-wrap justify-center gap-3 mb-8"
          role="group"
          aria-label="Filter projects"
        >
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              className={
                category === item ? "primary-button" : "secondary-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}{" "}
              <span className="text-xs">
                {item === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === item).length}
              </span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">
          Showing {visible.length} projects
        </p>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
          {visible.map((project) => {
            const cover = (covers as Record<string, string>)[project.id || ""];
            const image = cover || project.image;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="project-card flex flex-col"
              >
                <div className="relative aspect-video bg-blue-50 dark:bg-primary-800 overflow-hidden">
                  {image ? (
                    <img
                      src={`${import.meta.env.BASE_URL}${image}`}
                      alt={`${project.title} - ${cover ? "real desktop and mobile website captures" : project.category === "Production" || project.title === "EcoRoute" ? "illustrative project artwork" : "project preview"}`}
                      width={1280}
                      height={720}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-3 text-blue-700 dark:text-blue-300">
                      <Monitor size={36} aria-hidden="true" />
                      <span className="font-semibold">{project.title}</span>
                      <span className="text-xs">Preview coming soon</span>
                    </div>
                  )}
                  {!cover &&
                    image &&
                    (project.category === "Production" ||
                      project.title === "EcoRoute") && (
                      <span className="absolute left-3 bottom-3 bg-white/95 text-gray-700 px-2 py-1 rounded text-xs">
                        Illustrative artwork
                      </span>
                    )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs uppercase tracking-wider font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="section-copy mb-5">{project.description}</p>
                  <ul className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <li key={tag} className="skill-badge">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {project.live && (
                      <a
                        className="primary-button text-sm"
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo of ${project.title}`}
                      >
                        <ExternalLink size={16} aria-hidden="true" />
                        Live Demo
                      </a>
                    )}
                    {project.github?.map((repo) => (
                      <a
                        key={repo.link}
                        className="secondary-button text-sm"
                        href={repo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} ${repo.label} repository`}
                      >
                        <Github size={16} aria-hidden="true" />
                        {repo.label}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
