import { motion } from 'framer-motion'
import { practiceItems } from '../data'

const levelClass: Record<string, string> = {
  easy: 'level-easy',
  medium: 'level-medium',
  hard: 'level-hard',
}

const levelLabel: Record<string, string> = {
  easy: "Boshlang'ich",
  medium: "O'rta",
  hard: 'Murakkab',
}

export default function PracticeSection() {
  return (
    <section id="practice" className="section">
      <div className="section-header">
        <span className="section-tag">PRACTICE</span>
        <h2 className="section-title">🎯 Mashqlar va Amaliyot</h2>
        <p className="section-desc">O'rganganingizni amalda qo'llash uchun topshiriqlar</p>
      </div>
      <div className="practice-grid">
        {practiceItems.map((p, i) => (
          <motion.div
            key={p.title}
            className="practice-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="practice-header">
              <span className={`practice-level ${levelClass[p.difficulty]}`}>{levelLabel[p.difficulty]}</span>
              <span className="practice-category">{p.category}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="practice-tags">
              {p.tags.map(t => <span key={t}>{t}</span>)}
            </div>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="practice-link">{p.linkText}</a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
