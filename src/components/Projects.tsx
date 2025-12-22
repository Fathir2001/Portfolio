import { motion } from "framer-motion";
import { Github } from "lucide-react";

const projects = [
  {
    title: "TrackTempo",
    description:
      "An innovative Travel App elevating the travel experience in Sri Lanka, complete with an admin website for seamless management.",
    image: "/Portfolio/images/TravelApp.png",
    tags: ["Flutter(Dart)", "NodeJS", "ExpressJS", "MongoDB", "React", "APIs"],
    github: [
      {
        link: "https://github.com/Fathir2001/TrekTempo",
        type: "mobile",
        label: "Mobile",
      },
      {
        link: "https://github.com/Fathir2001/TrekTempo-Admin-Website",
        type: "website",
        label: "Website",
      },
    ],
  },
  {
    title: "EcoRoute",
    description:
      "An IoT-powered Weather Monitoring App delivering real-time environmental insights through sensor driven data visualization.",
    image: "/Portfolio/images/Weather App.jpg",
    tags: ["IoT", "Arduino", "Flutter", "NodeJS", "ExpressJS", "MongoDB"],
    github: "https://github.com/Fathir2001/Weather_App",
  },
  {
    title: "R.F Stores",
    description:
      "A feature-rich grocery store app delivering fresh produce, snacks, and essentials with a seamless shopping experience.",
    image: "/Portfolio/images/RF Stores.jpg",
    tags: ["Flutter", "NodeJS", "ExpressJS", "MongoDB"],
    github: "https://github.com/Fathir2001/RF-Stores",
  },
  {
    title: "Busify",
    description:
      "Public Transport Service Tracking and Tickets Booking Application designed to streamline public transportation services in Sri Lanka.",
    image: "/Portfolio/images/Busify.png",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/Fathir2001/Busify",
  },
  {
    title: "Foodie-Fix",
    description:
      "This modern E-Commerce Website allows users to browse and order a variety of trendy food items and drinks online.",
    image: "/Portfolio/images/Restaurent.png",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    github: "https://github.com/Fathir2001/Foodie-Fix",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-gradient-to-br dark:from-primary-900 dark:to-primary-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mt-4">
            Showcasing my creative solutions and technical expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              className="project-card group"
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-4">
                  {Array.isArray(project.github) ? (
                    project.github.map((repo, idx) => (
                      <motion.a
                        key={idx}
                        href={repo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 backdrop-blur-md bg-white/20 border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200 flex items-center space-x-2 text-white font-medium"
                      >
                        <Github className="w-5 h-5" />
                        <span>{repo.label}</span>
                      </motion.a>
                    ))
                  ) : (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-full hover:bg-white/30 transition-all duration-200"
                    >
                      <Github className="w-6 h-6 text-white" />
                    </motion.a>
                  )}
                </div>
              </div>
              <div className="p-6 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 rounded-full border border-blue-200/50 dark:border-blue-700/50 hover:shadow-md transition-all duration-200"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
