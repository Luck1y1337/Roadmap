/* ═══════════════════════════════════════════════════
   LUCK1Y ROADMAP — INTERACTIVE APP LOGIC
   ═══════════════════════════════════════════════════ */

// ══════════ PARTICLE BACKGROUND ══════════
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.3 + 0.05;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.03 * (1 - dist / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
})();

// ══════════ MOBILE NAVIGATION ══════════
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
let overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    hamburger.classList.toggle('open');
    overlay.classList.toggle('show');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    hamburger.classList.remove('open');
    overlay.classList.remove('show');
});

// ══════════ SMOOTH SCROLL NAVIGATION ══════════
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Close mobile
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
        overlay.classList.remove('show');
    });
});

// Active nav on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(l => l.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ══════════ TRACK SWITCHER ══════════
const trackBtns = document.querySelectorAll('.track-btn');
let currentTrack = 'both';

trackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        trackBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTrack = btn.dataset.track;
        filterPhases();
    });
});

function filterPhases() {
    const phaseCards = document.querySelectorAll('.phase-card');
    phaseCards.forEach(card => {
        const track = card.dataset.track;
        if (currentTrack === 'both' || track === 'both' || track === currentTrack) {
            card.classList.remove('hidden-track');
        } else {
            card.classList.add('hidden-track');
        }
    });
}

// ══════════ PHASE ACCORDION ══════════
function togglePhase(headerEl) {
    const card = headerEl.closest('.phase-card');
    card.classList.toggle('open');
}

// ══════════ CHECKLIST WITH LOCALSTORAGE ══════════
const STORAGE_KEY = 'luck1y_roadmap_checks';

function loadChecks() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
}

function saveChecks(checks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
}

function initChecklist() {
    const checks = loadChecks();
    const checkItems = document.querySelectorAll('.check-item');

    checkItems.forEach(item => {
        const id = item.dataset.id;
        const input = item.querySelector('input[type="checkbox"]');

        if (checks[id]) {
            input.checked = true;
        }

        input.addEventListener('change', () => {
            const currentChecks = loadChecks();
            currentChecks[id] = input.checked;
            saveChecks(currentChecks);
            updateProgressRings();
            updateOverallProgress();
        });
    });
}

function updateProgressRings() {
    const phaseCards = document.querySelectorAll('.phase-card');

    phaseCards.forEach(card => {
        const checkboxes = card.querySelectorAll('.check-item input[type="checkbox"]');
        if (checkboxes.length === 0) return;

        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percent = Math.round((checked / checkboxes.length) * 100);

        const ringFill = card.querySelector('.ring-fill');
        const ringText = card.querySelector('.ring-text');

        if (ringFill) {
            ringFill.setAttribute('stroke-dasharray', `${percent}, 100`);
        }
        if (ringText) {
            ringText.textContent = `${percent}%`;
        }
    });
}

function updateOverallProgress() {
    const allCheckboxes = document.querySelectorAll('.check-item input[type="checkbox"]');
    const checkedCount = Array.from(allCheckboxes).filter(cb => cb.checked).length;
    const totalCount = allCheckboxes.length;
    const percent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

    const progressFill = document.getElementById('overall-progress-fill');
    const progressText = document.getElementById('overall-progress-text');

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${percent}%`;
}

// ══════════ SKILLS RADAR CHART ══════════
function drawRadar() {
    const canvas = document.getElementById('skills-radar');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = 400 * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = '400px';
    canvas.style.height = '400px';
    ctx.scale(dpr, dpr);

    const centerX = 200, centerY = 200, maxRadius = 150;
    const labels = ['Frontend', 'Tillar', 'DSA', 'Security', 'Tools', 'IELTS'];
    const values = [75, 40, 30, 55, 80, 55];
    const count = labels.length;
    const angleStep = (2 * Math.PI) / count;

    // Draw grid rings
    for (let r = 1; r <= 4; r++) {
        const radius = (maxRadius / 4) * r;
        ctx.beginPath();
        for (let i = 0; i <= count; i++) {
            const angle = angleStep * i - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Draw axis lines
    for (let i = 0; i < count; i++) {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.stroke();
    }

    // Draw data polygon
    ctx.beginPath();
    values.forEach((val, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const radius = (val / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();

    const gradient = ctx.createLinearGradient(50, 50, 350, 350);
    gradient.addColorStop(0, 'rgba(0, 212, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.15)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    values.forEach((val, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const radius = (val / 100) * maxRadius;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00d4ff';
        ctx.fill();
        ctx.strokeStyle = '#0d1117';
        ctx.lineWidth = 2;
        ctx.stroke();
    });

    // Draw labels
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#8b949e';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    labels.forEach((label, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (maxRadius + 25);
        const y = centerY + Math.sin(angle) * (maxRadius + 25);
        ctx.fillText(label, x, y);
    });
}

// ══════════ SKILL BARS ANIMATION ══════════
function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        fill.classList.add('animated');
    });
}

// ══════════ RESOURCES DATA & RENDERING ══════════
const resourcesData = {
    frontend: [
        { icon: '🎨', name: 'Frontend Mentor', type: 'Bepul', desc: "Haqiqiy dizaynlar asosida loyiha qiling. HTML, CSS, JS va React ko'nikmalarni mustahkamlash uchun eng zo'r joy.", url: 'https://frontendmentor.io' },
        { icon: '📖', name: 'The Odin Project', type: 'Bepul', desc: "Full-Stack JavaScript yo'li. Dunyodagi eng mukammal va bepul darslik. Ishga kirish uchun yetarli.", url: 'https://theodinproject.com' },
        { icon: '⚛️', name: 'React.dev (Rasmiy)', type: 'Bepul', desc: "React ning rasmiy hujjatlari. Yangi tutorial juda yaxshi yozilgan, mustaqil o'rganish uchun ideal.", url: 'https://react.dev/learn' },
        { icon: '▶️', name: 'Fireship (YouTube)', type: 'Bepul', desc: "100 soniyada texnologiyalarni tushuntiradi. Vaqtingizni tejaydi va zamonaviy texlar haqida xabardor bo'lasiz.", url: 'https://youtube.com/@Fireship' }
    ],
    backend: [
        { icon: '🟢', name: 'FreeCodeCamp', type: 'Bepul', desc: 'Backend (Node.js/Express) va API yaratish bo\'yicha to\'liq kurslar. Sertifikat ham beriladi.', url: 'https://freecodecamp.org/learn/back-end-development-and-apis/' },
        { icon: '🐘', name: 'SQLBolt', type: 'Bepul', desc: "SQL ni boshlang'ichdan o'rganish uchun interaktiv darslar. Ma'lumotlar bazasi asoslarini o'rganing.", url: 'https://sqlbolt.com' },
        { icon: '🐳', name: 'Docker Curriculum', type: 'Bepul', desc: "Docker konteynerlarni boshlang'ichdan o'rganish. Zamonaviy backend uchun shart.", url: 'https://docker-curriculum.com' },
        { icon: '🎓', name: 'CS50 (Harvard)', type: 'Bepul', desc: "Garvard universitetining dunyo bo'ylab mashhur Computer Science asoslari kursi. Ingliz tilida.", url: 'https://cs50.harvard.edu/x/' }
    ],
    security: [
        { icon: '🏠', name: 'TryHackMe', type: 'Bepul/Pro', desc: "Boshlang'ichlar uchun 1-raqamli kiberxavfsizlik platformasi. O'yin o'ynagandek qiziqarli xonalar (rooms).", url: 'https://tryhackme.com' },
        { icon: '🕸️', name: 'PortSwigger Academy', type: 'Bepul', desc: "Web xavfsizlikni o'rganish va amalda sinash uchun dunyodagi eng zo'r laboratoriya. SQL Injection, XSS, CSRF.", url: 'https://portswigger.net/web-security' },
        { icon: '📦', name: 'HackTheBox', type: 'Bepul/Pro', desc: "TryHackMe dan keyingi qadam. Haqiqiy virtual mashinalarga kirib root olishni o'rganing.", url: 'https://hackthebox.com' },
        { icon: '🏁', name: 'picoCTF', type: 'Bepul', desc: "Boshlang'ichlar uchun CTF (Capture The Flag) musobaqasi. Xavfsizlik bilimlarini sinash uchun zo'r.", url: 'https://picoctf.org' }
    ],
    dsa: [
        { icon: '🟨', name: 'LeetCode', type: 'Bepul/Pro', desc: "Dunyodagi eng mashhur algoritmik masalalar sayti. Easy dan boshlang va har kuni 1 ta masala ishlang.", url: 'https://leetcode.com' },
        { icon: '🗺️', name: 'NeetCode 150', type: 'Bepul', desc: "LeetCode dagi eng kerakli 150 ta masala va ularning video yechimlari. Eng samarali yo'l.", url: 'https://neetcode.io' },
        { icon: '🤖', name: 'Robocontest.uz', type: 'Bepul', desc: "O'zbekistondagi algoritmik masalalar sayti. O'zbek tilida tushuntirishlar va masalalar.", url: 'https://robocontest.uz' },
        { icon: '⚔️', name: 'Codeforces', type: 'Bepul', desc: "Xalqaro algoritmik musobaqalar platformasi. Har hafta virtual contest o'tkaziladi.", url: 'https://codeforces.com' }
    ],
    ielts: [
        { icon: '📕', name: 'Cambridge IELTS (11-18)', type: 'Kitob', desc: "Haqiqiy IELTS testlari to'plami. Mock test ishlash uchun eng ishonchli manba. PDF larini topish mumkin.", url: 'https://www.cambridge.org/gb/cambridgeenglish/catalog/cambridge-english-exams-ielts' },
        { icon: '🎬', name: 'IELTS Advantage', type: 'Bepul', desc: "Writing va Speaking bo'yicha eng aniq maslahatlar. Band 7.0+ olish uchun strategiyalar.", url: 'https://www.youtube.com/@IELTSAdvantage' },
        { icon: '🎧', name: 'BBC 6 Minute English', type: 'Bepul', desc: "Listening darajasini oshirish va yangi so'zlarni eshitib o'rganish uchun qisqa podkastlar.", url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english' },
        { icon: '📝', name: 'IELTS Liz', type: 'Bepul', desc: "Writing Task 1 va 2 bo'yicha batafsil darslar va namuna javoblar. Band 7+ strategiyalar.", url: 'https://ieltsliz.com' }
    ]
};

let activeResTab = 'frontend';

function renderResources(category) {
    const grid = document.getElementById('resource-grid');
    const items = resourcesData[category] || [];
    grid.innerHTML = items.map(r => `
        <div class="resource-card">
            <div class="resource-card-header">
                <span class="resource-icon">${r.icon}</span>
                <div>
                    <div class="resource-name">${r.name}</div>
                </div>
                <span class="resource-type">${r.type}</span>
            </div>
            <p class="resource-desc">${r.desc}</p>
            <a href="${r.url}" target="_blank" class="resource-link">Saytga o'tish →</a>
        </div>
    `).join('');
}

document.querySelectorAll('.res-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.res-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeResTab = tab.dataset.res;
        renderResources(activeResTab);
    });
});

// ══════════ TODO LIST ══════════
const TODO_KEY = 'luck1y_todos';

function loadTodos() {
    const saved = localStorage.getItem(TODO_KEY);
    return saved ? JSON.parse(saved) : [];
}

function saveTodos(todos) {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

let currentFilter = 'all';

function renderTodos() {
    const list = document.getElementById('todo-list');
    const todos = loadTodos();
    const filtered = todos.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    list.innerHTML = filtered.map((t, i) => `
        <li class="todo-item ${t.completed ? 'completed' : ''}" data-index="${todos.indexOf(t)}">
            <button class="todo-check" onclick="toggleTodo(${todos.indexOf(t)})" aria-label="Toggle"></button>
            <span class="todo-text">${escapeHtml(t.text)}</span>
            <button class="todo-delete" onclick="deleteTodo(${todos.indexOf(t)})" aria-label="Delete">✕</button>
        </li>
    `).join('');

    const activeCount = todos.filter(t => !t.completed).length;
    document.getElementById('todo-count').textContent = `${activeCount} ta bajarilmagan vazifa`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (!text) return;

    const todos = loadTodos();
    todos.push({ text, completed: false, id: Date.now() });
    saveTodos(todos);
    input.value = '';
    renderTodos();
}

window.toggleTodo = function(index) {
    const todos = loadTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos();
};

window.deleteTodo = function(index) {
    const todos = loadTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos();
};

document.getElementById('todo-add-btn').addEventListener('click', addTodo);
document.getElementById('todo-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

document.getElementById('todo-clear').addEventListener('click', () => {
    const todos = loadTodos().filter(t => !t.completed);
    saveTodos(todos);
    renderTodos();
});

document.querySelectorAll('.todo-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.todo-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// ══════════ SCROLL REVEAL ══════════
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.phase-card, .resource-card, .practice-card, .abroad-card, .skill-item').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ══════════ SKILL BARS INTERSECTION ══════════
function initSkillAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                drawRadar();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
}

// ══════════ INITIALIZE ══════════
document.addEventListener('DOMContentLoaded', () => {
    initChecklist();
    updateProgressRings();
    updateOverallProgress();
    renderResources('frontend');
    renderTodos();
    initReveal();
    initSkillAnimation();
    drawRadar();
});

// Make togglePhase available globally
window.togglePhase = togglePhase;
