<div align="center">

<br>

<img src="https://img.shields.io/badge/⚡-Luck1y's_Roadmap-00d4ff?style=for-the-badge&labelColor=0d1117" alt="Luck1y Roadmap" />

<br><br>

# 🚀 Interactive Career Roadmap

### A premium, fully interactive web application built with **React**, **TypeScript**, and **Framer Motion** — mapping the journey from a 15-year-old developer in Fergana, Uzbekistan to the global tech industry.

<br>

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=flat-square&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

<br>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Get Started</a> •
  <a href="#-roadmap-phases">Phases</a> •
  <a href="#-study-abroad">Study Abroad</a>
</p>

<br>

> **"The best time to start was yesterday. The second best time is now."**

</div>

---

## 🎯 What Is This?

This isn't just a roadmap — it's a **living, interactive web application** that tracks my entire journey from an 8th-grade student to a professional **Cyber Security Specialist** or **Software Developer**. Every checkbox saves to `localStorage`, every animation is hand-crafted with Framer Motion, and every pixel is designed to feel premium.

<table>
<tr>
<td width="50%">

### 👤 About Me
- 🎂 **15 years old** — born April 3, 2011
- 📍 **Fergana, Uzbekistan**
- ⚛️ Learning **React** at Najot Ta'lim
- 🇬🇧 **IELTS 5.5** (targeting 7.0+)
- 🐧 **Linux** enthusiast (Kali & Ubuntu)
- 🛠️ Proficient with **Git**, **Vercel**, **Netlify**

</td>
<td width="50%">

### 🎯 Goals
- 🛡️ Become a **Cyber Security Specialist**
- 💻 Or a **Software Developer**
- 🇨🇳 Study in **China** (CSC Scholarship)
- 🇯🇵 Or **Japan** (MEXT Scholarship)
- 🏆 Build a **world-class portfolio**
- 💼 Land a **global tech career**

</td>
</tr>
</table>

---

## ✨ Features

<table>
<tr>
<td align="center" width="25%">

#### 🎨 Premium Dark UI
Glassmorphism, animated particle background, gradient accents, and JetBrains Mono typography

</td>
<td align="center" width="25%">

#### 📊 Skills Radar Chart
Canvas-rendered radar visualization showing real-time skill levels across 6 categories

</td>
<td align="center" width="25%">

#### ✅ Persistent Progress
Every checkbox saves to `localStorage` — come back tomorrow and your progress is still there

</td>
<td align="center" width="25%">

#### 🎬 Framer Motion
Staggered animations, layout transitions, `AnimatePresence` for smooth mount/unmount effects

</td>
</tr>
<tr>
<td align="center">

#### 🗺️ Interactive Timeline
Year-by-year roadmap with expandable phase cards and circular progress rings

</td>
<td align="center">

#### 📚 Resource Library
20+ curated free resources across 5 categories with real, working links

</td>
<td align="center">

#### 🎯 Practice Challenges
8 hands-on exercises from beginner to advanced with direct platform links

</td>
<td align="center">

#### 🌏 Study Abroad Guide
China vs Japan detailed comparison: requirements, costs, deadlines, and scholarships

</td>
</tr>
<tr>
<td align="center">

#### 🛡️💻 Track Switcher
Toggle between Cyber Security and Software Development career paths instantly

</td>
<td align="center">

#### ✏️ Personal TODO List
Add, complete, filter, and delete custom tasks with animated transitions

</td>
<td align="center">

#### 📱 Fully Responsive
Desktop sidebar + mobile hamburger menu — works on every screen size

</td>
<td align="center">

#### 🧭 Smart Navigation
Scroll-spy sidebar that highlights the current section as you scroll

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18 | Component-based UI architecture |
| **Language** | TypeScript | Type safety & developer experience |
| **Build Tool** | Vite 6 | Lightning-fast HMR & bundling |
| **Animations** | Framer Motion 11 | Physics-based animations & gestures |
| **Styling** | Vanilla CSS | Custom properties, gradients, glassmorphism |
| **Typography** | Inter + JetBrains Mono | Premium Google Fonts pairing |
| **Visualization** | Canvas API | Hand-drawn radar chart |
| **Persistence** | localStorage | Client-side data persistence |
| **Package Manager** | Yarn | Fast, deterministic installs |

---

## 🏗️ Architecture

```
src/
├── main.tsx                    # React DOM entry point
├── App.tsx                     # Root component — state & composition
├── index.css                   # Design system (900+ lines)
├── types.ts                    # TypeScript interfaces & types
├── data.ts                     # All app data (phases, resources, skills)
├── hooks.ts                    # Custom hooks
│   ├── useLocalStorage         # Persistent state with JSON serialization
│   ├── useScrollSpy            # IntersectionObserver-based scroll tracking
│   └── useInView               # Viewport detection for lazy animations
│
└── components/
    ├── ParticleCanvas.tsx       # Animated particle background (Canvas API)
    ├── Sidebar.tsx              # Desktop + mobile navigation with Framer Motion
    ├── Hero.tsx                 # Landing section with stats & track switcher
    ├── SkillsSection.tsx        # Radar chart + animated skill bars
    ├── RoadmapSection.tsx       # Timeline, phase cards, persistent checklists
    ├── ResourcesSection.tsx     # Tabbed resource library (5 categories)
    ├── PracticeSection.tsx      # Coding challenge cards with difficulty levels
    ├── AbroadSection.tsx        # China vs Japan comparison
    ├── TodoSection.tsx          # CRUD todo list with filters
    └── Footer.tsx               # Site footer
```

### Design Decisions

- **Zero external UI libraries** — every component and style is hand-crafted
- **Custom hooks** instead of state management libraries — keeps the bundle lean
- **Single CSS file** with CSS custom properties — acts as a design system
- **Framer Motion** only for animations — no unnecessary dependencies
- **Data separated from components** — clean separation of concerns

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Luck1y1337/Roadmap.git
cd Roadmap

# Install dependencies
yarn install

# Start the development server
yarn dev

# Build for production
yarn build
```

The app will be available at `http://localhost:5173`

---

## 🗺️ Roadmap Phases

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Phase 0  ▸  Summer 2026 (NOW)                                 │
│              Finish React course, start TryHackMe               │
│                                                                 │
│  Phase 1  ▸  9th Grade (2026-27)                               │
│              Backend (Node.js), Networking, TypeScript           │
│                                                                 │
│  Phase 2  ▸  10th Grade (2027-28)                              │
│              🛡️ Cyber Security  OR  💻 Full-Stack Dev           │
│                                                                 │
│  Phase 3  ▸  11th Grade (2028-29)                              │
│              Scholarships, Certifications, IELTS 7.0+           │
│                                                                 │
│  Phase 4  ▸  University (2029-33)                              │
│              Professional career, internships, first job        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🌏 Study Abroad

<table>
<tr>
<th width="50%">🇨🇳 China (CSC Scholarship)</th>
<th width="50%">🇯🇵 Japan (MEXT Scholarship)</th>
</tr>
<tr>
<td>

- **Universities:** Tsinghua, Peking, SJTU, Zhejiang
- **IELTS:** 6.0–6.5 required
- **Language:** HSK 4 (Mandarin)
- **Stipend:** $400–500/month
- **Tuition:** Fully covered
- **Apply:** December–February
- **Living cost:** $500–900/month

</td>
<td>

- **Universities:** UTokyo, Osaka, Tohoku, Waseda
- **IELTS:** 6.0+ required
- **Language:** JLPT N4–N3 (Japanese)
- **Stipend:** $1000–1200/month
- **Tuition:** Fully covered
- **Apply:** April–May
- **Living cost:** $900–1400/month

</td>
</tr>
</table>

---

## 📚 Curated Resources

| Category | Platforms |
|----------|----------|
| **Frontend** | [Frontend Mentor](https://frontendmentor.io) · [The Odin Project](https://theodinproject.com) · [React.dev](https://react.dev) · [Fireship](https://youtube.com/@Fireship) |
| **Backend** | [FreeCodeCamp](https://freecodecamp.org) · [SQLBolt](https://sqlbolt.com) · [Docker Curriculum](https://docker-curriculum.com) · [CS50](https://cs50.harvard.edu/x/) |
| **Security** | [TryHackMe](https://tryhackme.com) · [PortSwigger](https://portswigger.net/web-security) · [HackTheBox](https://hackthebox.com) · [picoCTF](https://picoctf.org) |
| **DSA** | [LeetCode](https://leetcode.com) · [NeetCode](https://neetcode.io) · [Robocontest](https://robocontest.uz) · [Codeforces](https://codeforces.com) |
| **IELTS** | [Cambridge IELTS](https://cambridge.org) · [IELTS Advantage](https://youtube.com/@IELTSAdvantage) · [BBC Learning](https://bbc.co.uk/learningenglish) · [IELTS Liz](https://ieltsliz.com) |

---

## 🧰 Skills Assessment

```
Frontend & React    ████████████████████░░░░░░  75%
Git & Deploy        ████████████████████████░░  80%
Cybersecurity       ██████████████░░░░░░░░░░░░  55%
English (IELTS)     ██████████████░░░░░░░░░░░░  55%
Other Languages     ██████████░░░░░░░░░░░░░░░░  40%
Algorithms (DSA)    ████████░░░░░░░░░░░░░░░░░░  30%
```

---

<div align="center">

## 📬 Contact

[![GitHub](https://img.shields.io/badge/GitHub-Luck1y1337-181717?style=for-the-badge&logo=github)](https://github.com/Luck1y1337)

---

**Built with React + TypeScript + Framer Motion**

Made with ❤️ in Fergana, Uzbekistan 🇺🇿

⭐ **Star this repo if you find it inspiring!**

</div>
