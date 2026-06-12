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
  const levelClass: Record<string, string> = { easy: 'level-easy', medium: 'level-medium', hard: 'level-hard' }
  const levelLabel: Record<string, string> = { easy: t.practice.easy, medium: t.practice.medium, hard: t.practice.hard }

  return (
    <section id="practice" className="section">
      <div className="section-header">
        <span className="section-tag">{t.practice.tag}</span>
        <h2 className="section-title">{t.practice.title}</h2>
        <p className="section-desc">{t.practice.desc}</p>
      </div>
      <div className="practice-grid">
        {practiceConfigs.map((p, i) => {
          const pt = t.practice[p.key as keyof typeof t.practice] as { t: string; d: string }
          return (
            <motion.div key={p.key} className="practice-card"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="practice-header">
                <span className={`practice-level ${levelClass[p.difficulty]}`}>{levelLabel[p.difficulty]}</span>
                <span className="practice-category">{p.category}</span>
              </div>
              <h3>{pt.t}</h3>
              <p>{pt.d}</p>
              <div className="practice-tags">
                {p.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="practice-link">{p.linkText}</a>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
