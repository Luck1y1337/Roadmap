import type { Phase, Resource, PracticeItem, ResourceCategory } from './types'

export const phases: Phase[] = [
  {
    id: 'phase-0', badge: 'HOZIR', badgeClass: 'active', title: "Yozgi ta'til — Poydevor qurish (2026-yil yozi)",
    period: '15 yosh · Iyun–Sentyabr', track: 'both',
    tasks: [
      { id: 'p0-1', text: "Najot Ta'lim React kursini yakunlash va 2-3 ta real loyiha Deploy qilish" },
      { id: 'p0-2', text: 'GitHub profilni professional qilish: 5+ repo, yaxshi README lar' },
      { id: 'p0-3', text: 'IELTS Listening va Reading har kuni 30 daqiqa mashq' },
      { id: 'p0-4', text: 'Git professional: branch, PR, merge conflict ishlashni o\'rganish' },
      { id: 'p0-5', text: 'TryHackMe da ro\'yxatdan o\'tish va "Pre-Security" yo\'lini boshlash' },
    ],
    tip: { icon: '💡', text: "Yozgi ta'til — bu sizning eng katta imkoniyatingiz. Maktab darslarisiz kuniga 4-6 soat IT ga ajratishingiz mumkin. Bu 3 oy kelajak 3 yilning poydevori!" },
  },
  {
    id: 'phase-1', badge: '9-SINF', badgeClass: 'default', title: 'Backend & Tarmoqlar asoslari',
    period: '16 yosh · 2026–2027', track: 'both',
    tasks: [
      { id: 'p1-1', text: "Node.js/Express.js — Backend server yaratishni o'rganish" },
      { id: 'p1-2', text: "MongoDB yoki PostgreSQL — Ma'lumotlar bazasi bilan ishlash" },
      { id: 'p1-3', text: 'REST API yaratish (CRUD operatsiyalari)' },
      { id: 'p1-4', text: "TCP/IP, HTTP/HTTPS, DNS — tarmoq asoslarini o'rganish" },
      { id: 'p1-5', text: 'TypeScript — JS dan keyingi qadam' },
      { id: 'p1-6', text: 'IELTS rasmiy imtihon — maqsad 6.0+' },
      { id: 'p1-7', text: 'Full-stack loyiha qilib Deploy qilish (masalan, E-commerce)' },
    ],
    tip: { icon: '🚀', text: "Siz JS ni bilganingiz uchun Node.js ni o'rganish eng oson yo'l. Backend ni bilsangiz — saytlar qanday buzilishini va himoyalanishini ham tushunasiz." },
  },
  {
    id: 'phase-2c', badge: '🛡️ CYBER', badgeClass: 'cyber', title: 'Kiberxavfsizlik — Amaliy hujum va himoya',
    period: '17 yosh · 2027–2028', track: 'cyber',
    tasks: [
      { id: 'p2c-1', text: 'TryHackMe "Jr Penetration Tester" yo\'lini tugallash' },
      { id: 'p2c-2', text: 'OWASP Top 10 zaifliklarni amalda sinash (PortSwigger Lab)' },
      { id: 'p2c-3', text: "Kali Linux — Nmap, Wireshark, Burp Suite o'rganish" },
      { id: 'p2c-4', text: 'Kriptografiya: simmetrik/asimmetrik shifrlash, hashing, TLS' },
      { id: 'p2c-5', text: 'Uy laboratoriyasi: Kali VM + Metasploitable2 — mashq qilish' },
      { id: 'p2c-6', text: 'CTF (Capture The Flag) musobaqalarida qatnashish (picoCTF)' },
    ],
    tip: { icon: '⚠️', text: "Olingan bilimlarni hech qachon ruxsatsiz birovning saytida sinab ko'rmang! Faqat TryHackMe, HackTheBox va PortSwigger kabi maxsus platformalarda mashq qiling.", warning: true },
  },
  {
    id: 'phase-2d', badge: '💻 DEV', badgeClass: 'dev', title: 'Full-Stack Professional — Murakkab loyihalar',
    period: '17 yosh · 2027–2028', track: 'dev',
    tasks: [
      { id: 'p2d-1', text: "Next.js — React asosida server-side rendering o'rganish" },
      { id: 'p2d-2', text: "Docker — konteynerlar bilan ishlash asoslari" },
      { id: 'p2d-3', text: 'Testing: Jest, Vitest bilan kodni testlash' },
      { id: 'p2d-4', text: "3-5 ta full-stack loyiha qilish va portfolioga qo'shish" },
      { id: 'p2d-5', text: 'Open Source loyihalarga Pull Request yuborish' },
      { id: 'p2d-6', text: 'Freelance loyihalar olish (Upwork, Telegram guruhlar)' },
    ],
    tip: { icon: '💰', text: "Freelance orqali ham tajriba, ham pul topasiz. 17 yoshda Upwork dagi birinchi buyurtmangiz — bu kelajak rezumengizning eng kuchli qismi bo'ladi." },
  },
  {
    id: 'phase-3', badge: '11-SINF', badgeClass: 'gold', title: 'Grantlar, sertifikatlar va universitetga tayyorgarlik',
    period: '18 yosh · 2028–2029', track: 'both',
    tasks: [
      { id: 'p3-1', text: 'IELTS 7.0+ rasmiy sertifikat olish' },
      { id: 'p3-2', text: 'CSC (Xitoy) yoki MEXT (Yaponiya) grantiga ariza topshirish' },
      { id: 'p3-3', text: 'LeetCode — kamida 100 ta masala yechish' },
      { id: 'p3-4', text: 'Bug Bounty — HackerOne da birinchi zaiflik topish' },
      { id: 'p3-5', text: 'Xitoy tili (HSK 3-4) yoki Yapon tili (JLPT N4) tayyorgarlik' },
      { id: 'p3-6', text: 'Professional Portfolio sayt yaratish' },
    ],
    tip: { icon: '🏆', text: "11-sinf — bu hal qiluvchi yil! IELTS 7.0+ va yaxshi portfolio bilan CSC yoki MEXT granti yutish imkoniyati ancha oshadi." },
  },
  {
    id: 'phase-4', badge: '🎓 UNI', badgeClass: 'final', title: 'Universitet va Professional Karyera',
    period: '19-22 yosh · 2029–2033', track: 'both',
    tasks: [
      { id: 'p4-1', text: 'CompTIA Security+ yoki eJPT sertifikat olish (Cyber yo\'l)' },
      { id: 'p4-2', text: 'Stajyor (Intern) sifatida ishga kirish' },
      { id: 'p4-3', text: "Cloud platformalar: AWS/GCP/Azure asoslarini o'rganish" },
      { id: 'p4-4', text: 'OSCP sertifikat yoki System Design bilimi' },
      { id: 'p4-5', text: 'Birinchi to\'liq ish joyi — Junior Developer yoki SOC Analyst' },
    ],
    tip: { icon: '🌍', text: "Universitetda bilimingiz bor, OSCP yoki kuchli portfolio bilan — o'rtacha boshlang'ich maosh $60-90K (Osiyo) yoki $80-130K (AQSH/Yevropa)." },
  },
]

export const resourcesData: Record<ResourceCategory, Resource[]> = {
  frontend: [
    { icon: '🎨', name: 'Frontend Mentor', type: 'Bepul', desc: "Haqiqiy dizaynlar asosida loyiha qiling. React va CSS ko'nikmalarni mustahkamlash uchun eng zo'r joy.", url: 'https://frontendmentor.io' },
    { icon: '📖', name: 'The Odin Project', type: 'Bepul', desc: "Full-Stack JavaScript yo'li. Dunyodagi eng mukammal va bepul darslik.", url: 'https://theodinproject.com' },
    { icon: '⚛️', name: 'React.dev (Rasmiy)', type: 'Bepul', desc: "React ning rasmiy hujjatlari. Yangi tutorial juda yaxshi yozilgan.", url: 'https://react.dev/learn' },
    { icon: '▶️', name: 'Fireship (YouTube)', type: 'Bepul', desc: "100 soniyada texnologiyalarni tushuntiradi. Zamonaviy texlar haqida xabardor bo'lasiz.", url: 'https://youtube.com/@Fireship' },
  ],
  backend: [
    { icon: '🟢', name: 'FreeCodeCamp', type: 'Bepul', desc: "Backend (Node.js/Express) va API yaratish bo'yicha to'liq kurslar. Sertifikat ham beriladi.", url: 'https://freecodecamp.org/learn/back-end-development-and-apis/' },
    { icon: '🐘', name: 'SQLBolt', type: 'Bepul', desc: "SQL ni boshlang'ichdan o'rganish uchun interaktiv darslar.", url: 'https://sqlbolt.com' },
    { icon: '🐳', name: 'Docker Curriculum', type: 'Bepul', desc: "Docker konteynerlarni boshlang'ichdan o'rganish.", url: 'https://docker-curriculum.com' },
    { icon: '🎓', name: 'CS50 (Harvard)', type: 'Bepul', desc: "Garvard universitetining dunyo bo'ylab mashhur Computer Science kursi.", url: 'https://cs50.harvard.edu/x/' },
  ],
  security: [
    { icon: '🏠', name: 'TryHackMe', type: 'Bepul/Pro', desc: "Boshlang'ichlar uchun 1-raqamli kiberxavfsizlik platformasi. O'yin kabi qiziqarli.", url: 'https://tryhackme.com' },
    { icon: '🕸️', name: 'PortSwigger Academy', type: 'Bepul', desc: "Web xavfsizlikni o'rganish va amalda sinash uchun dunyodagi eng zo'r laboratoriya.", url: 'https://portswigger.net/web-security' },
    { icon: '📦', name: 'HackTheBox', type: 'Bepul/Pro', desc: "Haqiqiy virtual mashinalarga kirib root olishni o'rganing.", url: 'https://hackthebox.com' },
    { icon: '🏁', name: 'picoCTF', type: 'Bepul', desc: "Boshlang'ichlar uchun CTF musobaqasi. Xavfsizlik bilimlarini sinash uchun zo'r.", url: 'https://picoctf.org' },
  ],
  dsa: [
    { icon: '🟨', name: 'LeetCode', type: 'Bepul/Pro', desc: "Dunyodagi eng mashhur algoritmik masalalar sayti. Easy dan boshlang.", url: 'https://leetcode.com' },
    { icon: '🗺️', name: 'NeetCode 150', type: 'Bepul', desc: "LeetCode dagi eng kerakli 150 ta masala va video yechimlari.", url: 'https://neetcode.io' },
    { icon: '🤖', name: 'Robocontest.uz', type: 'Bepul', desc: "O'zbekistondagi algoritmik masalalar sayti. O'zbek tilida.", url: 'https://robocontest.uz' },
    { icon: '⚔️', name: 'Codeforces', type: 'Bepul', desc: "Xalqaro algoritmik musobaqalar platformasi.", url: 'https://codeforces.com' },
  ],
  ielts: [
    { icon: '📕', name: 'Cambridge IELTS (11-18)', type: 'Kitob', desc: "Haqiqiy IELTS testlari to'plami. Mock test uchun eng ishonchli manba.", url: 'https://www.cambridge.org/gb/cambridgeenglish/catalog/cambridge-english-exams-ielts' },
    { icon: '🎬', name: 'IELTS Advantage', type: 'Bepul', desc: "Writing va Speaking bo'yicha eng aniq maslahatlar. Band 7.0+ strategiyalar.", url: 'https://www.youtube.com/@IELTSAdvantage' },
    { icon: '🎧', name: 'BBC 6 Minute English', type: 'Bepul', desc: "Listening darajasini oshirish va yangi so'zlarni o'rganish uchun qisqa podkastlar.", url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english' },
    { icon: '📝', name: 'IELTS Liz', type: 'Bepul', desc: "Writing Task 1 va 2 bo'yicha batafsil darslar va namuna javoblar.", url: 'https://ieltsliz.com' },
  ],
}

export const practiceItems: PracticeItem[] = [
  { difficulty: 'easy', category: 'Frontend', title: 'Portfolio sayti yarating', desc: "O'zingiz haqida, loyihalaringiz va ko'nikmalaringiz haqida professional sayt yarating.", tags: ['React', 'CSS', 'Deploy'], url: 'https://www.frontendmentor.io', linkText: 'Frontend Mentor →' },
  { difficulty: 'easy', category: 'Security', title: 'TryHackMe — Birinchi xona', desc: '"Tutorial" va "Starting Out In Cyber Sec" xonalarini tugating.', tags: ['Linux', 'Terminal', 'Basics'], url: 'https://tryhackme.com/room/tutorial', linkText: 'TryHackMe →' },
  { difficulty: 'medium', category: 'Backend', title: 'REST API yarating', desc: "Node.js + Express + MongoDB bilan to'liq CRUD API yozing.", tags: ['Node.js', 'Express', 'MongoDB'], url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', linkText: 'FreeCodeCamp →' },
  { difficulty: 'medium', category: 'Security', title: 'SQL Injection laboratoriyasi', desc: "PortSwigger da SQL Injection laboratoriyalarini bajaring.", tags: ['SQLi', 'Web Security', 'OWASP'], url: 'https://portswigger.net/web-security/sql-injection', linkText: 'PortSwigger Lab →' },
  { difficulty: 'medium', category: 'DSA', title: 'LeetCode — Two Sum', desc: "Algoritmlarni \"Easy\" masalalardan boshlang. Har kuni 1 ta masala — yilda 365 ta!", tags: ['Array', 'HashMap', 'Logic'], url: 'https://leetcode.com/problems/two-sum/', linkText: 'LeetCode →' },
  { difficulty: 'hard', category: 'Full-Stack', title: 'E-Commerce sayt yarating', desc: "React + Node.js + PostgreSQL bilan to'liq do'kon yarating.", tags: ['React', 'Node.js', 'PostgreSQL', 'Auth'], url: 'https://www.theodinproject.com/paths/full-stack-javascript', linkText: 'The Odin Project →' },
  { difficulty: 'hard', category: 'Security', title: 'HackTheBox — Birinchi mashina', desc: "Virtual mashinalarga kirib root olishni o'rganing. \"Easy\" dan boshlang.", tags: ['Pentesting', 'Linux', 'Exploitation'], url: 'https://www.hackthebox.com', linkText: 'HackTheBox →' },
  { difficulty: 'easy', category: 'DSA', title: "Robocontest — O'zbekcha masalalar", desc: "O'zbek tilidagi algoritmik masalalar sayti. Python yoki C++ da yeching.", tags: ['Python', 'C++', "O'zbek"], url: 'https://robocontest.uz', linkText: 'Robocontest.uz →' },
]

export const skillsData = [
  { name: '⚛️ Frontend & React', level: 75, note: 'React, API, State Management — yaxshi daraja' },
  { name: '🐍 Boshqa tillar', level: 40, note: "Python, C++ — boshlang'ich tajriba" },
  { name: '🧠 Algoritmlar (DSA)', level: 30, note: "Asosiy narsalarni bilasiz, chuqurlashtirish kerak" },
  { name: '🛡️ Kiberxavfsizlik', level: 55, note: "Linux, SQLi, XSS — yaxshi boshlang'ich" },
  { name: '🔧 Git & Deploy', level: 80, note: 'Git, Vercel, Netlify — professional daraja' },
  { name: '🇬🇧 Ingliz tili (IELTS)', level: 55, note: '5.5 band — 7.0+ maqsad' },
]

export const radarLabels = ['Frontend', 'Tillar', 'DSA', 'Security', 'Tools', 'IELTS']
export const radarValues = [75, 40, 30, 55, 80, 55]

export const sectionIds = ['hero', 'skills', 'roadmap', 'resources', 'practice', 'abroad', 'todos']

export const navItems = [
  { id: 'hero', icon: '🏠', label: 'Bosh sahifa' },
  { id: 'skills', icon: '📊', label: 'Bilim darajasi' },
  { id: 'roadmap', icon: '🗺️', label: "Yo'l xaritasi" },
  { id: 'resources', icon: '📚', label: 'Resurslar' },
  { id: 'practice', icon: '🎯', label: 'Mashqlar' },
  { id: 'abroad', icon: '🌏', label: "Xorijda o'qish" },
  { id: 'todos', icon: '✅', label: 'Vazifalar' },
]
