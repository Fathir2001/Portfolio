export const caseStudies: Record<
  string,
  {
    eyebrow: string;
    goal: string;
    focus: string;
    features: string[];
    layers: { name: string; tech: string; detail: string }[];
  }
> = {
  "chem-is-try": {
    eyebrow: "EDUCATION / WEB + MOBILE",
    goal: "Bring learning content and administration into a connected web and mobile experience.",
    focus:
      "A multi-platform application pairing a Flutter mobile experience with a React and TypeScript administration portal.",
    features: [
      "Separate mobile and administration experiences",
      "Publicly accessible, protected admin sign-in",
      "A stack spanning Flutter, React, Node.js and MongoDB",
    ],
    layers: [
      {
        name: "Experience",
        tech: "Flutter + React",
        detail:
          "Mobile and web interfaces serve different parts of the learning experience. The live preview shows the public admin sign-in.",
      },
      {
        name: "Application",
        tech: "Node.js + Express",
        detail:
          "Node.js and Express form the backend application stack.",
      },
      {
        name: "Data & services",
        tech: "MongoDB + Firebase",
        detail:
          "The project combines MongoDB with Firebase services as part of its web and mobile stack.",
      },
    ],
  },
  hireme: {
    eyebrow: "SERVICES / FULL-STACK PLATFORM",
    goal: "Connect people who need help with service providers, with a clear booking and tracking workflow.",
    focus:
      "A full-stack service booking platform with separate customer, provider and administration experiences.",
    features: [
      "Role-based access for customers, providers and admins",
      "Service booking and real-time status updates",
      "JWT authentication and OTP verification",
    ],
    layers: [
      {
        name: "Experience",
        tech: "React + TypeScript",
        detail:
          "Customer, service provider and admin interfaces support the service booking journey.",
      },
      {
        name: "Application",
        tech: "Express + Socket.IO",
        detail:
          "Node.js and Express handle application services, with Socket.IO supporting live updates.",
      },
      {
        name: "Data & identity",
        tech: "MongoDB + JWT",
        detail:
          "MongoDB stores application data; JWT and OTP support authentication and verification flows.",
      },
    ],
  },
};
