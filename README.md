<div align="center">

<br>

<img src="https://img.shields.io/badge/⚡-Luck1y's_Roadmap-00d4ff?style=for-the-badge&labelColor=0d1117" alt="Luck1y Roadmap" />

<br><br>

# 🚀 Interactive Career Roadmap

A premium, fully interactive single-page web app that maps and tracks the journey
from a 15-year-old developer in Fergana, Uzbekistan toward the global tech industry —
built with **React**, **TypeScript**, **Vite**, and **Framer Motion**.

<br>

[![CI](https://github.com/Luck1y1337/Roadmap/actions/workflows/ci.yml/badge.svg)](https://github.com/Luck1y1337/Roadmap/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion_11-0055FF?style=flat-square&logo=framer&logoColor=white)

<br>

<a href="#-about-the-project">About</a> •
<a href="#-features">Features</a> •
<a href="#️-tech-stack">Tech Stack</a> •
<a href="#️-project-structure">Structure</a> •
<a href="#-getting-started">Getting Started</a> •
<a href="#-deployment">Deployment</a> •
<a href="#-security">Security</a> •
<a href="#-license">License</a>

</div>

---

## 🎯 About the Project

This isn't just a static roadmap — it's a **living, interactive web application** that
tracks a multi-year learning journey from an 8th-grade student toward a career as a
**Cyber Security Specialist** or **Software Developer**. Progress persists across visits
via the browser's `localStorage`, animations are hand-crafted with Framer Motion, and the
entire interface is available in **three languages** (Uzbek, English, Russian).

Everything is client-side: there is no backend, no account, and no data ever leaves the
browser. Open it, check off what you've accomplished, and your state is there next time.

---

## ✨ Features

- **🌍 Multi-language UI** — full Uzbek / English / Russian translations with a live language switcher.
- **🛡️💻 Track switcher** — toggle instantly between the Cyber Security and Software Development paths.
- **🗺️ Interactive timeline** — year-by-year phases with expandable cards and circular progress rings.
- **✅ Persistent progress** — every checkbox and todo saves to `localStorage` and survives reloads.
- **📊 Skills radar** — a Canvas-rendered radar chart visualising skill levels across six categories.
- **🔥 Activity heatmap** — a GitHub-style contribution grid driven by your daily activity.
- **✏️ Personal todo list** — add, complete, filter, and delete custom tasks with animated transitions.
- **📚 Resource library** — curated free resources across Frontend, Backend, Security, DSA, and IELTS.
- **🎯 Practice challenges** — hands-on exercises from beginner to advanced with direct platform links.
- **🌏 Study-abroad guide** — a side-by-side China (CSC) vs Japan (MEXT) scholarship comparison.
- **🖥️ Interactive terminal widget** — a draggable mini-terminal with playful commands (`help`, `whoami`, `skills`…).
- **⏱️ Focus widget** — a built-in Pomodoro-style focus timer.
- **🎨 Premium dark UI** — glassmorphism, an animated particle background, and gradient accents.
- **🧭 Smart navigation** — a scroll-spy sidebar (desktop) and hamburger menu (mobile), fully responsive.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18 | Component-based UI architecture |
| **Language** | TypeScript | Type safety & developer experience |
| **Build Tool** | Vite 6 | Fast HMR & optimized production bundling |
| **Styling** | Tailwind CSS 4 | Utility-first styling with a custom design-token theme |
| **Animations** | Framer Motion 11 | Physics-based animations & gestures |
| **i18n** | Custom React context | Uzbek / English / Russian translations |
| **Visualization** | Canvas API | Hand-drawn skills radar chart & particle background |
| **Persistence** | localStorage | Client-side, privacy-friendly data persistence |
| **Package Manager** | Yarn | Deterministic installs via `yarn.lock` |
| **CI** | GitHub Actions | Type-check & build on every push and PR |

---

## 🏗️ Project Structure

```
Roadmap/
├── index.html                  # Vite entry HTML
├── vite.config.ts              # Vite + React + Tailwind config
├── src/
│   ├── main.tsx                # React DOM entry point
│   ├── App.tsx                 # Root component — state & composition
│   ├── index.css               # Tailwind theme & design tokens
│   ├── types.ts                # Shared TypeScript types
│   ├── data.ts                 # App content (phases, resources, skills)
│   ├── i18n.ts                 # UZ / EN / RU translation sets
│   ├── LanguageContext.tsx     # Language provider & hook
│   ├── hooks.ts                # useLocalStorage, useScrollSpy, useInView, trackActivity
│   └── components/
│       ├── ParticleCanvas.tsx  # Animated particle background (Canvas API)
│       ├── Sidebar.tsx         # Desktop + mobile navigation
│       ├── LanguageSwitcher.tsx# UZ / EN / RU switcher
│       ├── Hero.tsx            # Landing section with stats & track switcher
│       ├── SkillsSection.tsx   # Radar chart + animated skill bars
│       ├── RoadmapSection.tsx  # Timeline, phase cards, persistent checklists
│       ├── ResourcesSection.tsx# Tabbed resource library
│       ├── PracticeSection.tsx # Coding-challenge cards by difficulty
│       ├── AbroadSection.tsx   # China vs Japan comparison
│       ├── TodoSection.tsx     # CRUD todo list with filters
│       ├── Heatmap.tsx         # Activity contribution grid
│       ├── TerminalWidget.tsx  # Draggable interactive terminal
│       ├── FocusWidget.tsx     # Focus / Pomodoro timer
│       └── Footer.tsx          # Site footer
└── .github/workflows/ci.yml    # Build & type-check pipeline
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and **Yarn** (Classic).

### Installation & development

```bash
# Clone the repository
git clone https://github.com/Luck1y1337/Roadmap.git
cd Roadmap

# Install dependencies
yarn install

# Start the dev server (http://localhost:5173)
yarn dev
```

### Available scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start the Vite dev server with hot-module reload |
| `yarn build` | Type-check (`tsc -b`) and build the production bundle into `dist/` |
| `yarn preview` | Serve the production build locally for a final check |

### Environment variables

None required. The app is fully client-side and stores all state in `localStorage`.

---

## 🌐 Deployment

The build output is a static `dist/` directory, deployable to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, …).

**Netlify / Vercel** — point the host at this repo and use:

- **Build command:** `yarn build`
- **Publish directory:** `dist`

That's the entire deployment; no server or runtime environment variables are needed.

---

## 🔐 Security

- **No backend, no accounts, no tracking.** All data stays in the visitor's browser
  (`localStorage`); nothing is transmitted to any server.
- **No secrets required.** The app ships with no API keys or environment variables.
- Dependencies are pinned via `yarn.lock`, and every push is type-checked and built in CI.

Found a security issue? Please open a private report via the repository's
[Security Advisories](https://github.com/Luck1y1337/Roadmap/security/advisories) tab.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-Luck1y1337-181717?style=for-the-badge&logo=github)](https://github.com/Luck1y1337)

**Built with React + TypeScript + Tailwind CSS + Framer Motion**

Made with ❤️ in Fergana, Uzbekistan 🇺🇿

⭐ Star this repo if you find it inspiring!

</div>
