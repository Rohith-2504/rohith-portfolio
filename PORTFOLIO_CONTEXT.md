# Rohith Reddy B — Complete Portfolio Website Context

> Single reference file for all content, structure, design, and functionality in this portfolio website.
> Last updated: July 17, 2026

---

## 1. Project Overview

| Item | Detail |
|------|--------|
| **Project name** | rohith-portfolio |
| **Type** | React single-page portfolio |
| **Stack** | React 18, Vite 6, Tailwind CSS 3, Framer Motion, Lucide React |
| **Run** | `npm install` → `npm run dev` → http://localhost:5173 |
| **Build** | `npm run build` → output in `dist/` |
| **Primary data file** | `src/data/portfolio.js` |

---

## 2. Personal Profile

| Field | Value |
|-------|-------|
| **Full name** | Rohith Reddy B |
| **Short name** | Rohith Reddy |
| **Brand name (nav logo)** | Rohith. |
| **Title** | AI/ML Engineer & Full Stack Developer |
| **Tagline** | Building scalable web applications, GenAI systems, and products that bridge design and engineering. |
| **Email** | rohithreddy.ai.dev@gmail.com |
| **Phone** | +91 7022347647 |
| **Location** | Bengaluru, Karnataka, India |
| **GitHub** | https://github.com/Rohith-2504 |
| **LinkedIn** | https://linkedin.com/in/rohithreddy |
| **Resume file** | `/resume.pdf` (source: `public/resume.pdf`) |
| **Profile photo** | `/profile.png` (source: `public/profile.png`) |
| **Hero portrait** | `/hero-portrait.png` (stylized illustration — black shirt, curly hair, red studio background, laptop, headphones) |

### Professional Summary

AI/ML Engineer with experience in Generative AI, Agentic AI, and full-stack development using Python, LLMs, and modern AI frameworks. Skilled in building RAG-based applications, multimodal AI systems, REST APIs, and scalable AI workflows using FastAPI, LangChain, OpenCV, and vector databases.

---

## 3. Navigation

| Label | Section ID | Anchor |
|-------|------------|--------|
| Home | Hero | `#home` |
| About | About Me | `#about` |
| Expertise | Experience | `#experience` |
| Skills | Skills | `#skills` |
| Projects | Projects | `#projects` |
| Certification | Education | `#education` |
| Contact | Contact | `#contact` |

**Navbar actions:** Resume download, mobile slide-out menu

---

## 4. Hero Section (`#home`)

### Eyebrow
AI/ML Engineer · Full Stack Developer

### Headline
I build fast, scalable and modern web applications using React, Node.js and Tailwind CSS.

### Subtext
Plus GenAI, RAG pipelines, and production APIs — currently shipping real products at **Gopafy**.

### Call-to-action buttons
- **View My Work** → `#projects`
- **Contact Me** → `#contact`

### Footer line
Bengaluru, Karnataka, India · rohithreddy.ai.dev@gmail.com

### Hero visual — Speaking Portrait
- Animated stylized portrait (not a video file)
- Effects: blink, breathe, mouth pulse while speaking
- Live intro caption box with typed/s spoken script
- Controls: speaker (voice), replay, pause/play
- Badge: "Animated hero — Blink · Breathe · Speak"

---

## 5. Live Intro Script (Speaking Portrait)

Used for on-screen captions and browser speech (Web Speech API).

1. Hi. I'm Rohith Reddy — an AI and full-stack engineer who ships production-ready products.
2. At Gopafy, I build scalable React applications, REST APIs, and polished experiences for real businesses.
3. I specialize in Generative AI, RAG systems, FastAPI backends, and modern frontend engineering.
4. If you need someone who learns fast, codes clean, and delivers with confidence — I am ready to talk.

### Voice settings
- Prefers male voice (Microsoft David, Mark, etc. on Windows)
- Rate: 0.86 | Pitch: 0.90 | Volume: 1.0
- Line-by-line delivery with pauses between sentences
- User must tap speaker icon for audio (browser autoplay policy)

---

## 6. About Section (`#about`)

**Eyebrow:** About Me  
**Title:** Engineering intelligent products with purpose  
**Description:** From GenAI pipelines to production-ready web apps — I build systems that are scalable, thoughtful, and user-focused.

**Body:** Uses professional summary + note about current Gopafy internship.

**Info cards:**
- Email: rohithreddy.ai.dev@gmail.com
- Phone: +91 7022347647
- Location: Bengaluru, Karnataka, India
- Focus: GenAI · Full Stack · Web Apps

---

## 7. Expertise / Experience (`#experience`)

### Gopafy — Developer Intern
- **Period:** Jun 2026 — Present
- **Location:** Bengaluru, Karnataka
- Develop scalable web applications using modern frontend and backend technologies.
- Build responsive user interfaces, integrate REST APIs, and ship new application features.
- Collaborate with cross-functional teams using Git/GitHub, code reviews, and production fixes.
- Optimize performance, improve UI/UX, and contribute to Agile feature deployment.

### VTU Habba — Full Stack Development Intern
- **Period:** Dec 2025 — May 2026
- **Location:** Bengaluru, Karnataka
- Developed and deployed the official fest management platform.
- Integrated REST APIs for registrations, schedules, and event workflows.
- Collaborated on testing, debugging, deployment, and Git-based version control.

### LearnersByte Global Infovision — Generative AI Intern
- **Period:** Apr 2025 — Apr 2026
- **Location:** Remote
- Built LLM-powered AI workflows using Python and prompt engineering.
- Developed Agentic AI and RAG-based application prototypes for automation.
- Worked with conversational AI systems, workflow orchestration, and GenAI prototyping.

---

## 8. Skills (`#skills`)

### Languages
Python, JavaScript, Java, SQL

### AI / ML
Generative AI, Agentic AI, RAG, LLMs, Prompt Engineering, TensorFlow, NLP, Computer Vision

### Frameworks
React.js, Next.js, Node.js, Express.js, FastAPI, Tailwind CSS, MongoDB, Laravel

### Tools
Git, GitHub, Vercel, OpenCV, Supabase, Jupyter, Tableau, Power BI

---

## 9. Projects (`#projects`)

### At Gopafy

#### Bliss & Bites
- **Category:** Food & Hospitality
- **Description:** Full-stack restaurant ordering platform with customer storefront, in-app admin dashboard, and REST API.
- **Stack:** React, Vite, Node.js, REST API, Tailwind CSS
- **Highlights:** Customer ordering UI, admin panel, production API workflows
- **Link:** https://gopafy.com/products

#### Menu Platform
- **Category:** SaaS Product
- **Description:** Smart digital menu and vendor management for restaurants and vendors with QR menus.
- **Stack:** React, Node.js, QR Integration, Analytics
- **Highlights:** QR menus, live updates, order dashboard analytics
- **Link:** https://gopafy.com/products

#### NexCard
- **Category:** SaaS Product
- **Description:** Digital business card platform with NFC, QR, and personalized links.
- **Stack:** React, SaaS, NFC, QR Code
- **Highlights:** Identity sharing, service showcase, 800+ professionals
- **Link:** https://gopafy.com/products

#### EdTech Platform
- **Category:** SaaS Product
- **Description:** Student profiles and college placement management platform.
- **Stack:** React, Node.js, Placement Management, Profiles
- **Highlights:** Student portfolios, placement workflows, scalable for institutions
- **Link:** https://gopafy.com/products

#### Zevio
- **Category:** Client Project
- **Description:** Luxury hospitality booking platform with premium UX.
- **Stack:** React, Express.js, Node.js, Tailwind CSS
- **Highlights:** Premium booking, brand visibility, mobile discovery
- **Link:** https://zevio.com

#### Sri Sai Aquarium
- **Category:** Client Project
- **Description:** Digital transformation for retail aquarium brand in Mysuru.
- **Stack:** Laravel, PHP, MySQL, Tailwind CSS
- **Highlights:** Customer engagement, local brand recognition, full digital presence
- **Link:** https://www.gopafy.com/case-studies

#### Surya Auto LPG
- **Category:** Client Project
- **Description:** Custom LPG operations web application with automation.
- **Stack:** Laravel, Livewire, Automation
- **Highlights:** Reduced manual errors, real-time transaction visibility
- **Link:** https://www.gopafy.com/case-studies

### Personal Projects

#### ECHO — Multimodal RAG AI Assistant
- **Category:** AI / ML
- **Description:** Multimodal RAG assistant for text, image, audio, and video inputs.
- **Stack:** Python, LangChain, FastAPI, OpenCV, FAISS, OpenAI API
- **Highlights:** Multimodal retrieval, voice assistant, FastAPI orchestration
- **Link:** https://github.com/Rohith-2504

#### Text-to-Floor Plan Generator
- **Category:** AI / ML
- **Description:** Converts natural language prompts into 2D architectural floor plans.
- **Stack:** Python, TensorFlow, OpenCV, NLP, Matplotlib
- **Highlights:** NLP spatial reasoning, Transformer pipelines, inference workflows
- **Link:** https://github.com/Rohith-2504

---

## 10. Certification & Education (`#education`)

### Acharya Institute of Technology
- **Degree:** Bachelor of Engineering in Artificial Intelligence and Machine Learning
- **Period:** 2022 — Present
- **Location:** Bengaluru, Karnataka
- **CGPA:** 7.0 / 10
- **Coursework:** ML, Deep Learning, NLP, Computer Vision, DSA, DBMS

### Alva's Pre-University College
- **Degree:** Pre-University Course (PCMB)
- **Period:** 2020 — 2022
- **Location:** Moodbidri, Karnataka
- **Result:** Graduated with 85.83%

---

## 11. Contact Section (`#contact`)

**Eyebrow:** Contact  
**Title:** Let's build something meaningful  
**Description:** Open to internships, collaborations, and AI/full-stack engineering opportunities.

**Contact details:** Email, Phone, Location (same as profile)

**Form fields:** Name, Email, Message → opens mailto to rohithreddy.ai.dev@gmail.com

---

## 12. Footer

- Brand: **Rohith.**
- © 2026 Rohith Reddy B

---

## 13. Design System

### Fonts
- **Body / UI:** Plus Jakarta Sans
- **Headlines:** Instrument Serif

### Color palette
| Token | Value | Usage |
|-------|-------|-------|
| Brand red | `#DC2626` | Hero accent, highlights |
| Brand red dark | `#B91C1C` | Portrait frame |
| Classic yellow / amber | `#FBBF24`, `#F59E0B`, `#FDE68A` | Buttons, accents, progress bar |
| Blue | `#1E40AF`, `#1D4ED8`, `#172554` | Gradient backgrounds |
| Text | White / white-80 | On gradient backgrounds |

### Background style
- **No plain white pages** — full-site gradient mesh (blue → amber → red)
- **Hero:** Red + blue + yellow linear gradient
- **Sections:** Glass panels (`section-panel`) on gradient
- **Cards:** Frosted glass (`glass-card`) with blur and subtle borders

### UI patterns
- Rounded corners (1.5rem–2rem)
- Gold gradient primary buttons
- Glass secondary buttons
- Scroll reveal animations (Framer Motion)
- Minimal navbar with amber hover underlines

---

## 14. Site Structure (React Components)

```
App.jsx
├── Navbar.jsx          — Fixed nav, mobile menu, resume link
├── HeroSection.jsx     — Hero copy + SpeakingPortrait
├── About.jsx
├── Experience.jsx
├── Skills.jsx
├── Projects.jsx        — Uses ProjectCard.jsx
├── Education.jsx
├── Contact.jsx
└── Footer.jsx

Supporting:
├── SpeakingPortrait.jsx    — Animated portrait + intro controls
├── SectionHeading.jsx      — Section titles
├── Reveal.jsx              — Scroll animations
├── hooks/useSpeakingIntro.js
└── utils/speechVoice.js    — Male voice selection + line speech
```

---

## 15. Public Assets

| File | Purpose |
|------|---------|
| `public/hero-portrait.png` | Stylized hero illustration |
| `public/profile.png` | Original profile photo |
| `public/resume.pdf` | Downloadable resume |
| `public/assets/dark.svg` | Favicon |

---

## 16. Key Features

1. **Animated speaking hero** — Portrait with blink, breathe, mouth sync + live captions
2. **Voice intro** — Browser Speech API with preferred male voice
3. **Gradient UI** — Blue, classic yellow, red — no flat white layout
4. **Gopafy project showcase** — 7 company projects + 2 personal AI projects
5. **Responsive** — Mobile menu, grid layouts
6. **Recruiter-focused copy** — Clear CTAs: View My Work, Contact Me, Resume download

---

## 17. How to Edit Content

**Change all text/data:** Edit `src/data/portfolio.js`  
**Change styles:** Edit `src/index.css` and `tailwind.config.js`  
**Change hero animation:** Edit `src/components/SpeakingPortrait.jsx`  
**Change voice behavior:** Edit `src/utils/speechVoice.js` and `src/hooks/useSpeakingIntro.js`  
**Replace portrait:** Update `public/hero-portrait.png`  
**Replace resume:** Update `public/resume.pdf`

---

## 18. Resume Source Details (from PDF)

These details were used to build the site content:

- **Name:** Rohith Reddy B
- **Phone:** +917022347647
- **Email (resume):** rohithreddy.ai.dev@gmail.com
- **Education:** BE AI & ML, Acharya Institute of Technology (CGPA 7.0)
- **PUC:** Alva's Pre-University College, 85.83%
- **Internships:** Gopafy, VTU Habba, LearnersByte Global Infovision
- **Projects:** ECHO (Multimodal RAG), Text-to-Floor Plan Generator

---

*This file is the master context document for the Rohith Reddy portfolio website.*
