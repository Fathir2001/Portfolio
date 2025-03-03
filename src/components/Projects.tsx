import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const projects = [
  {
    title: 'TrackTempo',
    description: 'An innovative Travel App elevating the travel experience in Sri Lanka, complete with an admin website for seamless management.',
    image: '/Portfolio/images/TravelApp.png',
    tags: ['Flutter(Dart)', 'NodeJS', 'ExpressJS', 'MongoDB', 'React', 'APIs'], 
    github: [
      { link: 'https://github.com/Fathir2001/TrekTempo', type: 'mobile', label: 'Mobile' },
      { link: 'https://github.com/Fathir2001/TrekTempo-Admin-Website', type: 'website', label: 'Website' }
    ],
  },
  {
    title: 'EcoRoute',
    description: 'An IoT-powered Weather Monitoring App delivering real-time environmental insights through sensor driven data visualization.',
    image: '/Portfolio/images/Weather App.jpg',
    tags: ['IoT', 'Arduino', 'Flutter', 'NodeJS', 'ExpressJS', 'MongoDB' ],
    github: 'https://github.com/Fathir2001/Weather_App',
  },
  {
    title: 'R.F Stores',
    description: 'A feature-rich grocery store app delivering fresh produce, snacks, and essentials with a seamless shopping experience.',
    image: '/Portfolio/images/RF Stores.jpg',
    tags: ['Flutter', 'NodeJS', 'ExpressJS', 'MongoDB'],
    github: 'https://github.com/Fathir2001/RF-Stores',
  },
  {
    title: 'Busify',
    description: 'Public Transport Service Tracking and Tickets Booking Application designed to streamline public transportation services in Sri Lanka.',
    image: '/Portfolio/images/Busify.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/Fathir2001/Busify',
  },
  {
    title: 'Foodie-Fix',
    description: 'This modern E-Commerce Website allows users to browse and order a variety of trendy food items and drinks online.',
    image: '/Portfolio/images/Restaurent.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/Fathir2001/Foodie-Fix',
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-primary-900 to-primary-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-white">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="project-card group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  {Array.isArray(project.github) ? (
                    project.github.map((repo, idx) => (
                      <a
                        key={idx}
                        href={repo.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Github className="w-6 h-6 text-gray-900" />
                        <span className="text-gray-900">{repo.label}</span>
                      </a>
                    ))
                  ) : (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Github className="w-6 h-6 text-gray-900" />
                    </a>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-[#121a2d] text-accent-400 dark:bg-purple-900 text-accent-400 dark:text-purple-400 rounded-full"
                    >
                      {tag}
                    </span>
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