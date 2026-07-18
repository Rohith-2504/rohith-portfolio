export const profile = {
  name: "Rohith Reddy B",
  shortName: "Rohith Reddy",
  brandName: "Rohith.",
  title: "Full Stack Developer",
  company: "Gopafy",
  companyUrl: "https://gopafy.com",
  location: "Bengaluru, Karnataka, India",
  email: "rohithreddy.ai.dev@gmail.com",
  phone: "+91 7022347647",
  github: "https://github.com/Rohith-2504",
  githubUsername: "Rohith-2504",
  linkedin: "https://linkedin.com/in/rohithreddy",
  resumePath: "/resume.pdf",
  profileImage: "/profile.webp",
  heroPortrait: "/hero-portrait.webp",
  availability: "Available for full-time roles",
  headline: "I build AI Products that solve real world problems.",
  subtitle:
    "Full Stack Developer & AI Engineer crafting intelligent products with precision, performance, and purpose — currently shipping at Gopafy.",
  animeAbout: "/anime-about-city.webp",
  animeContact: "/anime-contact-character.webp",
  mission:
    "Ship AI products and full-stack systems that are elegant, reliable, and genuinely useful in production.",
  focus: [
    "AI Products",
    "Full Stack Development",
    "RAG Pipelines",
    "FastAPI",
    "React",
    "Node.js",
    "Tailwind CSS",
    "MongoDB",
    "REST APIs",
    "Computer Vision",
    "Production AI Systems",
  ],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "AI Assistant", href: "#ai-assistant" },
  { label: "Contact", href: "#contact" },
];

export const osStats = [
  { label: "Experience", value: "1+", unit: "years" },
  { label: "Projects", value: "15+", unit: "shipped" },
  { label: "Internships", value: "3", unit: "completed" },
  { label: "Commits", value: "120+", unit: "this month" },
];

export const stats = [
  { value: 15, suffix: "+", label: "Projects completed" },
  { value: 3, suffix: "", label: "Internships" },
  { value: 8, suffix: "+", label: "Hackathons" },
  { value: 30, suffix: "+", label: "Technologies" },
  { value: 120, suffix: "+", label: "GitHub commits" },
  { value: 8, suffix: "", label: "Certifications" },
];

export const aboutCards = [
  {
    title: "Education",
    value: "B.E. Artificial Intelligence & Machine Learning",
    detail: "Acharya Institute of Technology · CGPA 7.0",
  },
  {
    title: "Current work",
    value: "Developer Intern @ Gopafy",
    detail: "Production SaaS and client platforms across India",
  },
  {
    title: "Mission",
    value: "Build intelligent products with craft and clarity",
    detail: "GenAI · Full-stack · Production systems",
  },
  {
    title: "Values",
    value: "Clarity, ownership, continuous learning",
    detail: "Clean code · Thoughtful UX · Fast iteration",
  },
  {
    title: "Interests",
    value: "Photography · AI · Software · Music · Technology",
    detail: "Curious builder exploring systems and design",
  },
  {
    title: "Location",
    value: "Bengaluru, Karnataka",
    detail: "Open to remote & hybrid opportunities",
  },
];

export const timeline = [
  {
    id: "gopafy",
    year: "2025 — Present",
    title: "Developer Intern · Gopafy",
    summary: "Building production SaaS and client platforms.",
    details: [
      "Scalable React apps, REST APIs, and polished product experiences.",
      "Bliss & Bites, Kirana NearU, and internal SaaS delivery.",
      "Performance, UI/UX, and Agile delivery with Git-based workflows.",
    ],
  },
  {
    id: "vtu",
    year: "2025",
    title: "Full Stack Intern · VTU Habba",
    summary: "Official fest management platform end-to-end.",
    details: [
      "Registrations, schedules, and event workflows in production.",
      "API integration, testing, deployment, and version control.",
    ],
  },
  {
    id: "learnersbyte",
    year: "2024 — 2025",
    title: "Generative AI Intern · LearnersByte",
    summary: "LLM workflows and RAG prototypes.",
    details: [
      "Agentic AI systems and automation pipelines in Python.",
      "Prompt engineering and conversational AI orchestration.",
    ],
  },
  {
    id: "education",
    year: "2022",
    title: "Started B.E. AI & ML",
    summary: "Foundation in ML, NLP, and software engineering.",
    details: ["Deep Learning, Computer Vision, DSA, DBMS, Cloud basics."],
  },
];

export const skillGroups = [
  { title: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"] },
  { title: "Backend", skills: ["Node.js", "Express", "Python", "FastAPI", "REST APIs"] },
  { title: "AI", skills: ["LangChain", "RAG", "OpenAI API", "TensorFlow", "NLP", "Computer Vision"] },
  { title: "Database", skills: ["MongoDB", "MySQL", "SQLite", "Supabase", "ChromaDB", "FAISS"] },
  { title: "Cloud", skills: ["Vercel", "Docker", "GitHub Actions", "Hostinger"] },
  { title: "Tools", skills: ["Git", "Figma", "Postman", "VS Code", "Jupyter"] },
];

export type Project = {
  id: string;
  name: string;
  category: string;
  tags: string[];
  problem: string;
  solution: string;
  stack: string[];
  gradient: string;
  image?: string;
  liveDemo: string | null;
  github: string | null;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "vtu-habba",
    name: "VTU Habba 2026",
    category: "Full Stack",
    tags: ["fullstack", "frontend", "backend"],
    problem: "Fest operations scattered across spreadsheets and manual workflows.",
    solution: "Unified platform for registrations, schedules, and real-time event management.",
    stack: ["React", "Node.js", "MongoDB", "REST API"],
    gradient: "from-violet-950 via-purple-900 to-indigo-950",
    image: "/projects/vtu-habba.webp",
    liveDemo: null,
    github: "https://github.com/Rohith-2504",
    featured: true,
  },
  {
    id: "bliss-bites",
    name: "Bliss & Bites",
    category: "Full Stack",
    tags: ["fullstack", "frontend", "backend"],
    problem: "Restaurant needed seamless ordering and admin operations in one system.",
    solution: "Customer storefront, in-app admin, and production-ready API.",
    stack: ["React", "Vite", "Node.js", "Tailwind"],
    gradient: "from-amber-950 via-orange-900 to-red-950",
    image: "/projects/bliss-bites.webp",
    liveDemo: "https://gopafy.com/products",
    github: null,
    featured: true,
  },
  {
    id: "rag-assistant",
    name: "RAG AI Assistant",
    category: "AI / ML",
    tags: ["ai", "backend"],
    problem: "Multimodal knowledge retrieval across text, image, audio, and video.",
    solution: "ECHO — LangChain + FAISS pipeline with voice and FastAPI orchestration.",
    stack: ["Python", "LangChain", "FastAPI", "OpenAI"],
    gradient: "from-slate-900 via-blue-950 to-indigo-950",
    image: "/projects/rag-assistant.webp",
    liveDemo: null,
    github: "https://github.com/Rohith-2504",
    featured: true,
  },
  {
    id: "floor-plan",
    name: "Text to Floor Plan",
    category: "AI / CV",
    tags: ["ai", "backend"],
    problem: "Architectural layout ideation is slow and manual for early-stage design.",
    solution: "NLP-to-layout system generating structured 2D floor plans from prompts.",
    stack: ["Python", "TensorFlow", "OpenCV", "NLP"],
    gradient: "from-emerald-950 via-teal-900 to-cyan-950",
    image: "/projects/floor-plan.webp",
    liveDemo: null,
    github: "https://github.com/Rohith-2504",
    featured: true,
  },
  {
    id: "image-restoration",
    name: "Image Restoration",
    category: "AI / CV",
    tags: ["ai"],
    problem: "Low-quality images limit usability in downstream AI pipelines.",
    solution: "Deep learning super-resolution and restoration with optimized inference.",
    stack: ["Python", "TensorFlow", "OpenCV", "CNN"],
    gradient: "from-rose-950 via-pink-900 to-fuchsia-950",
    image: "/projects/image-restoration.webp",
    liveDemo: null,
    github: "https://github.com/Rohith-2504",
    featured: true,
  },
  {
    id: "portfolio",
    name: "Portfolio Website",
    category: "Product Design",
    tags: ["frontend", "fullstack"],
    problem: "Traditional portfolios fail to communicate engineering depth and craft.",
    solution: "ROHITH.OS — a premium digital experience built as a living product dashboard.",
    stack: ["Next.js", "Framer Motion", "Tailwind", "FastAPI"],
    gradient: "from-zinc-900 via-neutral-900 to-stone-950",
    image: "/projects/portfolio.webp",
    liveDemo: null,
    github: "https://github.com/Rohith-2504/rohith-portfolio",
    featured: true,
  },
];

export const certifications = [
  {
    title: "Generative AI with LLMs",
    issuer: "DeepLearning.AI",
    year: "2024",
    detail: "LLM fundamentals, fine-tuning, and deployment patterns",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "Coursera / Stanford",
    year: "2023",
    detail: "Supervised learning, neural networks, and ML engineering",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM",
    year: "2023",
    detail: "Data analysis, visualization, and ML workflows",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    year: "2024",
    detail: "CNNs, sequence models, and optimization",
  },
  {
    title: "MongoDB Node.js Developer",
    issuer: "MongoDB University",
    year: "2024",
    detail: "CRUD, aggregation, and Node.js integration",
  },
  {
    title: "React Developer",
    issuer: "Meta",
    year: "2023",
    detail: "Component architecture, hooks, and advanced patterns",
  },
  {
    title: "Git & GitHub Foundations",
    issuer: "GitHub",
    year: "2023",
    detail: "Version control, collaboration, and CI basics",
  },
  {
    title: "Cloud Computing Essentials",
    issuer: "AWS Educate",
    year: "2023",
    detail: "Cloud concepts, deployment, and scalable architecture",
  },
];

export const suggestedQuestions = [
  "Who is Rohith?",
  "Tell me about Rohith's experience",
  "What technologies does he know?",
  "Explain the RAG project",
  "Show AI projects",
  "Tell me about Gopafy",
  "Show certifications",
  "How can I contact Rohith?",
];
