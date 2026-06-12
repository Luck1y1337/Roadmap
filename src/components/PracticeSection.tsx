import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

const practiceConfigs = [
  { key: 'p1', difficulty: 'easy', category: 'Frontend', tags: ['React', 'CSS', 'Deploy'], url: 'https://www.frontendmentor.io', linkText: 'Frontend Mentor →' },
  { key: 'p2', difficulty: 'easy', category: 'Security', tags: ['Linux', 'Terminal', 'Basics'], url: 'https://tryhackme.com/room/tutorial', linkText: 'TryHackMe →' },
  { key: 'p3', difficulty: 'medium', category: 'Backend', tags: ['Node.js', 'Express', 'MongoDB'], url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/', linkText: 'FreeCodeCamp →' },
  { key: 'p4', difficulty: 'medium', category: 'Security', tags: ['SQLi', 'Web Security', 'OWASP'], url: 'https://portswigger.net/web-security/sql-injection', linkText: 'PortSwigger Lab →' },
  { key: 'p5', difficulty: 'medium', category: 'DSA', tags: ['Array', 'HashMap', 'Logic'], url: 'https://leetcode.com/problems/two-sum/', linkText: 'LeetCode →' },
  { key: 'p6', difficulty: 'hard', category: 'Full-Stack', tags: ['React', 'Node.js', 'PostgreSQL', 'Auth'], url: 'https://www.theodinproject.com/paths/full-stack-javascript', linkText: 'The Odin Project →' },
  { key: 'p7', difficulty: 'hard', category: 'Security', tags: ['Pentesting', 'Linux', 'Exploitation'], url: 'https://www.hackthebox.com', linkText: 'HackTheBox →' },
  { key: 'p8', difficulty: 'easy', category: 'DSA', tags: ['Python', 'C++', "O'zbek"], url: 'https://robocontest.uz', linkText: 'Robocontest.uz →' },
]

export default function PracticeSection() {
  const { t } = useLanguage()
  const levelClass: Record<string, string> = { 
    easy: 'bg-accent-green-light border-accent-green/20 text-accent-green', 
    medium: 'bg-accent-amber-light border-accent-amber/20 text-accent-amber', 
    hard: 'bg-accent-red-light border-accent-red/20 text-accent-red' 
  }
  const levelLabel: Record<string, string> = { easy: t.practice.easy, medium: t.practice.medium, hard: t.practice.hard }

  return (
    <section id="practice" className="py-20 px-5 md:px-12 max-w-[1100px] mx-auto">
      <div className="mb-12">
        <span className="inline-block font-mono text-[0.7rem] tracking-[0.2em] text-accent-cyan px-3 py-1 border border-accent-cyan/20 rounded-full mb-3.5">{t.practice.tag}</span>
        <h2 className="text-[2rem] font-extrabold mb-2 tracking-tight">{t.practice.title}</h2>
        <p className="text-text-secondary text-base">{t.practice.desc}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {practiceConfigs.map((p, i) => {
          const pt = t.practice[p.key as keyof typeof t.practice] as { t: string; d: string }
          return (
            <motion.div key={p.key} className="bg-card border border-border rounded-lg p-6 flex flex-col transition-all duration-300 hover:border-border-hover hover:shadow-[var(--shadow-md)]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="flex justify-between items-center mb-3.5">
                <span className={`font-mono text-[0.65rem] px-2.5 py-[3px] rounded-full font-semibold border ${levelClass[p.difficulty]}`}>{levelLabel[p.difficulty]}</span>
                <span className="text-[0.75rem] text-text-muted">{p.category}</span>
              </div>
              <h3 className="text-[1.05rem] font-semibold mb-2">{pt.t}</h3>
              <p className="text-[0.85rem] text-text-secondary leading-relaxed flex-1 mb-3.5">{pt.d}</p>
              <div className="flex gap-1.5 flex-wrap mb-3.5">
                {p.tags.map(tag => <span key={tag} className="font-mono text-[0.65rem] px-2 py-0.5 rounded border border-border bg-white/5 text-text-muted">{tag}</span>)}
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-accent-cyan text-[0.85rem] font-medium no-underline transition-colors duration-200 hover:text-[#33dfff]">{p.linkText}</a>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
