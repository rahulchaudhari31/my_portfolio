const screenshotFor = (liveUrl) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(liveUrl)}?w=1200&h=750`;

export const site = {
  title: "Rahul Dattatray Chaudhari — Full-Stack Developer",
  description:
    "Portfolio of Rahul Dattatray Chaudhari, a full-stack developer building fast, secure and beautiful web applications.",
  author: "Rahul Dattatray Chaudhari",
  keywords: [
    "Rahul Chaudhari",
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Nashik",
    "Portfolio",
  ],
};

export const profile = {
  name: "Rahul Dattatray Chaudhari",
  shortName: "Rahul",
  firstName: "Rahul",
  lastName: "Dattatray Chaudhari",
  role: "Full-Stack Developer",
  company: "Technoweb Solutions",
  companyPeriod: "Jul 2026 – Present",
  location: "Nashik, Maharashtra",
  email: "rahulchaudhari7498@gmail.com",
  emailHref: "mailto:rahulchaudhari7498@gmail.com",
  phone: "+91-7498446966",
  phoneHref: "tel:+917498446966",
  github: "https://github.com/rahulchaudhari31",
  linkedin: "https://www.linkedin.com/in/rahulchaudhari",
  photo: "/images/rahul.jpg",
  photoAlt: "Portrait of Rahul Dattatray Chaudhari",
  tagline:
    "I'm Rahul, a Full-Stack Developer at Technoweb Solutions and a Computer Engineering graduate (B.E., 2026). I build fast, secure and beautiful web apps end to end — polished React interfaces, reliable Node.js and Express APIs, and well-structured PostgreSQL, MySQL and MongoDB databases.",
  availability: "Open to full-stack opportunities",
  resumeUrl: "/Rahul_Resume.pdf",
};

export const socials = [
  {
    label: "GitHub",
    href: profile.github,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: profile.linkedin,
    icon: "linkedin",
  },
  {
    label: "Email",
    href: profile.emailHref,
    icon: "mail",
  },
  {
    label: "Phone",
    href: profile.phoneHref,
    icon: "phone",
  },
];

export const brand = {
  name: "Rahul",
  initials: "RC",
  href: "#home",
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const navigationCta = {
  label: "Hire me",
  href: "#contact",
};

export const a11y = {
  home: "Rahul home",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  scrollToTop: "Scroll to top",
};

export const hero = {
  greeting: "Hi, I'm",
  headlineName: profile.shortName,
  name: profile.name,
  role: profile.role,
  rolePrefix: "I'm a",
  tagline: profile.tagline,
  availability: "Available for opportunities",
  typewriter: [
    "Full-Stack Developer",
    "React & Node.js Engineer",
    "Problem Solver",
  ],
  primaryCta: { label: "View Projects", href: "#projects" },
  resumeCta: { label: "Download Resume", href: profile.resumeUrl },
  secondaryCta: { label: "Get in Touch", href: "#contact" },
  socialLinks: ["github", "linkedin", "mail"],
  scrollLabel: "Scroll to explore",
  stats: [
    { value: "6+", label: "Projects shipped" },
    { value: "2", label: "Professional roles" },
    { value: "2026", label: "B.E. Computer Engineering" },
  ],
};

export const about = {
  eyebrow: "01 — About",
  heading: "Full-stack developer with a product mindset.",
  paragraphs: [
    "I'm a Computer Engineering graduate (B.E., 2026) from Guru Gobind Singh College of Engineering and Research Centre, Nashik, and a Full-Stack Developer at Technoweb Solutions. I build secure, scalable web applications end to end — responsive React interfaces, robust Node.js/Express APIs and well-structured PostgreSQL, MySQL and MongoDB databases.",
    "I care about clean architecture, performance and the small details that make a product feel effortless. From JWT authentication and role-based access control to data-driven dashboards, I focus on shipping reliable software that solves real problems.",
  ],
  stats: [
    { value: 6, suffix: "+", label: "Projects" },
    { value: 2, suffix: "", label: "Roles/Internships" },
    { value: 6, suffix: "+", label: "Live Deployments" },
    { value: 3, suffix: "", label: "Databases" },
  ],
  educationLabel: "Education",
  certificationLabel: "Certification",
  education: [
    {
      degree: "B.E. Computer Engineering",
      institution:
        "Guru Gobind Singh College of Engineering and Research Centre",
      location: "Nashik, Maharashtra",
      period: "2022 – 2026",
    },
  ],
  schooling: [
    { level: "HSC", score: "82.33%", year: "2022" },
    { level: "SSC", score: "89.20%", year: "2020" },
  ],
  certification: {
    title: "Java Full Stack Development",
    type: "Virtual Internship",
  },
};

export const experienceSection = {
  eyebrow: "03 — Experience",
  heading: "Two teams, one focus: shipping reliable software.",
  description:
    "From a frontend internship to full-stack ownership — building production features across the stack.",
  currentLabel: "Current",
};

export const experience = [
  {
    company: "Technoweb Solutions",
    role: "Full-Stack Developer",
    period: "Jul 2026 – Present",
    location: "Nashik, Maharashtra",
    type: "Full-time",
    current: true,
    highlights: [
      "Build responsive web applications with React.js.",
      "Develop REST APIs with Node.js and Express.",
      "Model and manage data across PostgreSQL, MySQL and MongoDB.",
      "Implement JWT authentication and role-based access control (RBAC).",
    ],
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "JWT",
      "RBAC",
    ],
  },
  {
    company: "A G Tech Solutions",
    role: "Frontend Developer Intern",
    period: "Jan 2025 – Mar 2025",
    location: "Nashik, Maharashtra",
    type: "Internship",
    current: false,
    highlights: [
      "Built reusable React components and responsive layouts.",
      "Integrated REST APIs and handled application state.",
      "Debugged and tested features to improve reliability.",
      "Collaborated with the team using Git and GitHub.",
    ],
    tech: ["React.js", "HTML5", "CSS3", "JavaScript", "Git", "GitHub"],
  },
];

export const skills = [
  {
    category: "Languages",
    items: ["C++", "JavaScript", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "Security",
    items: ["JWT", "RBAC"],
  },
  {
    category: "Cloud",
    items: ["AWS", "Vercel", "Render"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Jupyter"],
  },
];

export const skillsSection = {
  eyebrow: "02 — Skills",
  heading: "A practical stack for shipping production-ready apps.",
  description:
    "From polished React interfaces to secure APIs and databases — here's what I work with.",
  sphereHint: "Drag to explore the stack",
};

export const projectsSection = {
  eyebrow: "04 — Projects",
  heading: "Selected work, built end to end.",
  description:
    "Production apps spanning HR platforms, business sites and data dashboards — each shipped with a focus on clarity and performance.",
  filters: ["All", "Full-Stack", "Frontend", "Data"],
  featuredLabel: "Featured",
  viewDetailsLabel: "View details",
  liveDemoLabel: "Live Demo",
  githubLabel: "GitHub",
  previewUnavailable: "Live preview unavailable",
  previewAltSuffix: "live preview",
  resultsSuffix: "projects shown",
  resultsSingular: "project shown",
  filterLabel: "Filter projects",
  detailsEyebrow: "Project details",
  featuresLabel: "Key features",
  stackLabel: "Tech stack",
  closeLabel: "Close project details",
  liveLinkLabel: "Open live project",
  repoLinkLabel: "View source on GitHub",
};

export const projects = [
  {
    id: "e2e-hrc",
    title: "E2E HRC",
    tagline: "Human Resource Consultancy",
    description:
      "A modern human resource consultancy platform connecting employers with the right talent. Designed for a smooth, responsive experience across devices.",
    category: "Full-Stack",
    featured: true,
    features: [
      "Responsive employer and talent discovery flows built with React.",
      "Node.js and Express APIs backed by MongoDB for dynamic content.",
      "A mobile-first interface designed for smooth navigation across devices.",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "https://humanresource-seven.vercel.app/",
    repoUrl: "https://github.com/rahulchaudhari31/E2E_hrc_Frontend.git",
    screenshot: screenshotFor("https://humanresource-seven.vercel.app/"),
  },
  {
    id: "imcam-hub",
    title: "ImCam Hub",
    tagline: "Full-Stack Case Management Platform",
    description:
      "A full-stack case management platform with dedicated workflows for admins, caseworkers and clients. Secured with JWT authentication, role-based access control and a content management system.",
    category: "Full-Stack",
    featured: true,
    features: [
      "Role-based dashboards for admins, caseworkers and clients.",
      "JWT authentication with protected API routes and RBAC.",
      "Case and content management workflows backed by PostgreSQL.",
      "A responsive React interface with secure session handling.",
    ],
    tech: ["React", "Node.js", "Express.js", "PostgreSQL"],
    liveUrl: "https://im-cam-hub-rosy.vercel.app/",
    repoUrl: "https://github.com/rahulchaudhari31/imcam-hub-frontend.git",
    screenshot: screenshotFor("https://im-cam-hub-rosy.vercel.app/"),
  },
  {
    id: "hrgridnx",
    title: "HRGridNX",
    tagline: "HR Management Platform",
    description:
      "An end-to-end HR management platform for handling employee records, attendance and organisational workflows. Built with a React frontend, a Node/Express API and PostgreSQL.",
    category: "Full-Stack",
    featured: true,
    features: [
      "Employee records and organisational data management.",
      "Attendance and day-to-day workflow tracking across teams.",
      "A React front end connected to a Node/Express and PostgreSQL API.",
      "Role-aware access to core HR operations and data.",
    ],
    tech: ["React", "Node.js", "Express.js", "PostgreSQL"],
    liveUrl: "https://hrgridnx-new.vercel.app/",
    repoUrl: "https://github.com/rahulchaudhari31/HRGRIDNX-New.git",
    screenshot: screenshotFor("https://hrgridnx-new.vercel.app/"),
  },
  {
    id: "e2e-world",
    title: "E2E World",
    tagline: "Modern Business Web Experience",
    description:
      "A modern, responsive web platform for E2E World that showcases its services and solutions. Focused on clean design, smooth navigation and a polished experience across devices.",
    category: "Frontend",
    featured: false,
    features: [
      "A service and solutions showcase designed for a modern business.",
      "Responsive layouts with smooth navigation across screen sizes.",
      "Clean, reusable component architecture built with React and Tailwind CSS.",
    ],
    tech: ["React", "Tailwind CSS"],
    liveUrl: "https://e2-e-world.vercel.app/",
    repoUrl: "https://github.com/rahulchaudhari31/E2E-WORLD-.git",
    screenshot: screenshotFor("https://e2-e-world.vercel.app/"),
  },
  {
    id: "smart-result-analysis",
    title: "Smart Result Analysis System",
    tagline: "Streamlit Dashboard for Student Results",
    description:
      "A Streamlit dashboard that analyses student results with subject-wise and overall performance charts. Makes it easy to spot trends and compare results at a glance.",
    category: "Data",
    featured: false,
    features: [
      "An interactive Streamlit dashboard for student performance.",
      "Subject-wise and overall result comparisons with charts.",
      "Pandas-powered data processing for quick trend analysis.",
      "Deployed on Render for easy access and sharing.",
    ],
    tech: ["Python", "Streamlit", "Pandas"],
    liveUrl: "https://smart-result-analysis-system.onrender.com/",
    repoUrl:
      "https://github.com/rahulchaudhari31/Smart-Result-Analysis-System-.git",
    screenshot: screenshotFor(
      "https://smart-result-analysis-system.onrender.com/",
    ),
  },
  {
    id: "tuneify",
    title: "Tuneify",
    tagline: "Spotify-Inspired Music Streaming App",
    description:
      "Tuneify is a Spotify-inspired music streaming app with a familiar, immersive listening experience. Browse, play and manage music through a clean, responsive interface.",
    category: "Frontend",
    featured: false,
    features: [
      "A Spotify-inspired browsing and playback interface.",
      "Responsive layouts built with reusable React components.",
      "Custom styling and smooth interactions using CSS3.",
    ],
    tech: ["React", "JavaScript", "CSS3"],
    liveUrl:
      "https://tuneify-a-spotify-inspired-music-st-eight.vercel.app/",
    repoUrl:
      "https://github.com/rahulchaudhari31/Tuneify-A-Spotify-inspired-music-streaming.git",
    screenshot: screenshotFor(
      "https://tuneify-a-spotify-inspired-music-st-eight.vercel.app/",
    ),
  },
];

export const contact = {
  eyebrow: "05 — Contact",
  heading: "Let's build something great together.",
  description:
    "I'm open to full-stack roles, freelance projects and collaborations. Drop me a message and I'll get back to you soon.",
  availability: profile.availability,
  responseTime: "Usually replies within 24 hours",
  formAriaLabel: "Contact form",
  formTitle: "Send a message",
  formHint: "Share a little about the role, project or idea.",
  channelsLabel: "Contact details",
  socialLabel: "Find me online",
  fields: {
    name: {
      label: "Your name",
      autoComplete: "name",
      maxLength: 80,
    },
    email: {
      label: "Your email",
      autoComplete: "email",
      maxLength: 120,
    },
    message: {
      label: "Your message",
      autoComplete: "off",
      maxLength: 1200,
    },
  },
  validation: {
    nameRequired: "Please enter your name.",
    nameShort: "Your name must be at least 2 characters.",
    emailRequired: "Please enter your email address.",
    emailInvalid: "Please enter a valid email address.",
    messageRequired: "Please tell me a little about your project.",
    messageShort: "Your message must be at least 10 characters.",
  },
  channels: [
    {
      id: "email",
      label: "Email",
      value: profile.email,
      href: profile.emailHref,
      icon: "mail",
      copyValue: profile.email,
    },
    {
      id: "phone",
      label: "Phone",
      value: profile.phone,
      href: profile.phoneHref,
      icon: "phone",
      copyValue: profile.phone,
    },
    {
      id: "location",
      label: "Location",
      value: profile.location,
      icon: "location",
    },
  ],
  submitLabel: "Send Message",
  sendingLabel: "Sending...",
  successMessage: "Thanks for reaching out! I'll get back to you soon.",
  errorMessage: "Something went wrong. Please email me directly.",
  fallbackMessage:
    "EmailJS isn't configured yet — opening your email app instead.",
  directEmailLabel: "Prefer email?",
  copyLabel: "Copy",
  copyEmailLabel: "Copy email address",
  copyPhoneLabel: "Copy phone number",
  copiedLabel: "Copied!",
};

export const footer = {
  wordmark: "Rahul Chaudhari",
  tagline: profile.tagline,
  availability: profile.availability,
  navigationLabel: "Explore",
  socialLabel: "Connect",
  copyright: `© ${new Date().getFullYear()} Rahul Dattatray Chaudhari. All rights reserved.`,
  builtWith: "Built with React, Tailwind CSS & Framer Motion.",
  backToTopLabel: "Back to top",
};

export const marqueeSection = {
  label: "Technologies I work with",
};

export const loading = {
  label: "Loading portfolio",
  status: "Preparing the experience",
};

export const notFound = {
  code: "404",
  title: "This page took a wrong turn.",
  description:
    "The page you're looking for doesn't exist. Head back to the portfolio and explore the work instead.",
  homeLabel: "Rahul home",
  backLabel: "Back to portfolio",
  hint: "Rahul Dattatray Chaudhari — Full-Stack Developer",
};
