export interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: "Production" | "Academic";
  live?: string;
  github?: { link: string; label: string }[];
}
export const production: Project[] = [
  {
    id: "chem-is-try",
    title: "CHEM IS TRY",
    live: "https://chem-is-try-admin.netlify.app/",
    image: "images/Projects/ChemIsTry.png",
    tags: [
      "Flutter",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
    ],
    description:
      "A web and mobile application with a publicly accessible administration portal.",
    category: "Production",
  },
  {
    id: "pink-cosmetics",
    title: "Pink Cosmetics",
    live: "https://pink-cosmetics.netlify.app/",
    image: "images/Projects/Pink.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
    description:
      "A cosmetics storefront with a full-stack commerce experience.",
    category: "Production",
  },
  {
    id: "nandos",
    github: [
      { link: "https://github.com/Fathir2001/Nando-s", label: "GitHub" },
    ],
    title: "Nando's Restaurant",
    live: "https://nando-s.netlify.app/",
    image: "images/Projects/Nando's.png",
    tags: ["React", "Firebase Authentication", "Firestore"],
    description: "A restaurant web application built with React and Firebase.",
    category: "Production",
  },
  {
    id: "mi-creations",
    title: "MI Creations",
    live: "https://mi-creations.netlify.app/",
    image: "",
    tags: [],
    description:
      "A handcrafted gift studio website featuring personalized collections, occasion-based browsing, and custom order enquiries.",
    category: "Production",
  },
  {
    id: "i-touch",
    title: "i-Touch",
    live: "https://i-touch.netlify.app/",
    image: "images/Projects/iTouch.png",
    tags: [],
    description:
      "A retail website for sports gear, mobile accessories, and a PS5 gaming zone, with WhatsApp ordering and session enquiries.",
    category: "Production",
  },
  {
    id: "zyndigo",
    title: "Zyndigo",
    live: "https://zyndigo.tech/",
    image: "",
    tags: [],
    description:
      "A digital engineering company website presenting software development, AI automation, infrastructure, and consulting services.",
    category: "Production",
  },
  {
    id: "think-different",
    title: "Think Different",
    live: "https://think-different-td.netlify.app/",
    image: "",
    tags: [],
    description:
      "An Islamic comfort and guidance website with a public conversational interface.",
    category: "Production",
  },
  {
    id: "hireme",
    github: [{ link: "https://github.com/Fathir2001/HireMe", label: "GitHub" }],
    title: "HireMe",
    live: "https://hireme-f.netlify.app/",
    image: "",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "JWT",
    ],
    description:
      "A service discovery website connecting visitors with skilled technicians and home service providers.",
    category: "Production",
  },
];
const academic: Project[] = [
  {
    category: "Academic",
    title: "TrekTempo",
    description:
      "An innovative Travel App elevating the travel experience in Sri Lanka, complete with an admin website for seamless management.",
    image: "images/TravelApp.png",
    tags: ["Flutter(Dart)", "NodeJS", "ExpressJS", "MongoDB", "React", "APIs"],
    github: [
      {
        link: "https://github.com/Fathir2001/TrekTempo",
        label: "Mobile",
      },
      {
        link: "https://github.com/Fathir2001/TrekTempo-Admin-Website",
        label: "Website",
      },
    ],
  },
  {
    category: "Academic",
    title: "EcoRoute",
    description:
      "An IoT-powered Weather Monitoring App delivering real-time environmental insights through sensor driven data visualization.",
    image: "images/Projects/ecoroute-illustration.webp",
    tags: ["IoT", "Arduino", "Flutter", "NodeJS", "ExpressJS", "MongoDB"],
    github: [
      { link: "https://github.com/Fathir2001/Weather_App", label: "GitHub" },
    ],
  },
  {
    category: "Academic",
    title: "RF Stores",
    description:
      "A feature-rich grocery store app delivering fresh produce, snacks, and essentials with a seamless shopping experience.",
    image: "images/RF Stores.jpg",
    tags: ["Flutter", "NodeJS", "ExpressJS", "MongoDB"],
    github: [
      { link: "https://github.com/Fathir2001/RF-Stores", label: "GitHub" },
    ],
  },
  {
    category: "Academic",
    title: "Busify",
    description:
      "Public Transport Service Tracking and Tickets Booking Application designed to streamline public transportation services in Sri Lanka.",
    image: "images/Busify.png",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    github: [{ link: "https://github.com/Fathir2001/Busify", label: "GitHub" }],
  },
  {
    category: "Academic",
    title: "Foodie-Fix",
    description:
      "This modern E-Commerce Website allows users to browse and order a variety of trendy food items and drinks online.",
    image: "images/Restaurent.png",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    github: [
      { link: "https://github.com/Fathir2001/Foodie-Fix", label: "GitHub" },
    ],
  },
];

export const projects = [...production, ...academic];
