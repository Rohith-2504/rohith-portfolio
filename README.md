# Rohith Reddy B — Portfolio

Personal portfolio site for **Rohith Reddy B**, AI/ML Engineer & Full Stack Developer. Built with React, Vite, Tailwind CSS, and Framer Motion.

**Live repo:** [github.com/Rohith-2504/rohith-portfolio](https://github.com/Rohith-2504/rohith-portfolio)

## Features

- Animated speaking hero with Web Speech API intro
- Milano Red + Lemon Chiffon gradient theme
- Sections: About, Experience, Skills, Projects, Education, Contact
- Responsive navigation with mobile menu
- Downloadable resume and project highlights from Gopafy work

## Tech Stack

- **Frontend:** React 18, Vite 6, Tailwind CSS 3
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Speech:** Web Speech API (browser-native)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/     # UI sections (Hero, Navbar, Projects, etc.)
├── data/
│   └── portfolio.js   # Profile, experience, skills, projects
├── hooks/          # Speaking intro hook
└── utils/          # Speech voice helpers
public/
├── hero-portrait.png
├── profile.png
└── resume.pdf
```

## Customize

| What | File |
|------|------|
| Content (bio, jobs, projects) | `src/data/portfolio.js` |
| Colors & typography | `src/index.css`, `tailwind.config.js` |
| Hero portrait | `public/hero-portrait.png` |
| Resume PDF | `public/resume.pdf` |

## Featured Projects

**At Gopafy**
- Bliss & Bites — full-stack restaurant ordering platform
- Kirana NearU — hyperlocal grocery ordering mobile app

**Personal**
- ECHO — Multimodal RAG AI Assistant
- Text-to-Floor Plan Generator

## Contact

- **Email:** rohithreddy.ai.dev@gmail.com
- **Phone:** +91 7022347647
- **Location:** Bengaluru, Karnataka, India
- **GitHub:** [Rohith-2504](https://github.com/Rohith-2504)
- **LinkedIn:** [rohithreddy](https://linkedin.com/in/rohithreddy)

## License

Private portfolio project. All rights reserved.
