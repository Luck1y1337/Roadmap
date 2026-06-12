import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import type { ResourceCategory } from '../types'

const resKeys = {
  frontend: ['fm', 'top', 'react', 'fire'],
  backend: ['fcc', 'sql', 'docker', 'cs50'],
  security: ['thm', 'ps', 'htb', 'pico'],
  dsa: ['lc', 'nc', 'robo', 'cf'],
  ielts: ['camb', 'ia', 'bbc', 'liz'],
}

const resUrls: Record<string, string> = {
  fm: 'https://frontendmentor.io', top: 'https://theodinproject.com', react: 'https://react.dev/learn', fire: 'https://youtube.com/@Fireship',
  fcc: 'https://freecodecamp.org/learn/back-end-development-and-apis/', sql: 'https://sqlbolt.com', docker: 'https://docker-curriculum.com', cs50: 'https://cs50.harvard.edu/x/',
  thm: 'https://tryhackme.com', ps: 'https://portswigger.net/web-security', htb: 'https://hackthebox.com', pico: 'https://picoctf.org',
  lc: 'https://leetcode.com', nc: 'https://neetcode.io', robo: 'https://robocontest.uz', cf: 'https://codeforces.com',
  camb: 'https://www.cambridge.org/gb/cambridgeenglish/catalog/cambridge-english-exams-ielts', ia: 'https://www.youtube.com/@IELTSAdvantage', bbc: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english', liz: 'https://ieltsliz.com',
}

const resIcons: Record<string, string> = {
  fm: '🎨', top: '📖', react: '⚛️', fire: '▶️', fcc: '🟢', sql: '🐘', docker: '🐳', cs50: '🎓',
  thm: '🏠', ps: '🕸️', htb: '📦', pico: '🏁', lc: '🟨', nc: '🗺️', robo: '🤖', cf: '⚔️',
  camb: '📕', ia: '🎬', bbc: '🎧', liz: '📝',
}

const resTypes: Record<string, string> = {
  fm: 'Bepul', top: 'Bepul', react: 'Bepul', fire: 'Bepul',
  fcc: 'Bepul', sql: 'Bepul', docker: 'Bepul', cs50: 'Bepul',
  thm: 'Bepul/Pro', ps: 'Bepul', htb: 'Bepul/Pro', pico: 'Bepul',
  lc: 'Bepul/Pro', nc: 'Bepul', robo: 'Bepul', cf: 'Bepul',
  camb: 'Kitob', ia: 'Bepul', bbc: 'Bepul', liz: 'Bepul',
}

const tabIcons: Record<ResourceCategory, string> = {
  frontend: '⚛️', backend: '⚙️', security: '🛡️', dsa: '🧠', ielts: '🇬🇧',
}

const categories: ResourceCategory[] = ['frontend', 'backend', 'security', 'dsa', 'ielts']

export default function ResourcesSection() {
  const [activeTab, setActiveTab] = useState<ResourceCategory>('frontend')
  const { t } = useLanguage()
  const keys = resKeys[activeTab]

  return (
    <section id="resources" className="section">
      <div className="section-header">
        <span className="section-tag">{t.resources.tag}</span>
        <h2 className="section-title">{t.resources.title}</h2>
        <p className="section-desc">{t.resources.desc}</p>
      </div>
      <div className="resource-tabs">
        {categories.map(cat => (
          <button key={cat} className={`res-tab ${activeTab === cat ? 'active' : ''}`} onClick={() => setActiveTab(cat)}>
            {tabIcons[cat]} {t.resources.tabs[cat]}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} className="resource-grid"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
        >
          {keys.map((rk, i) => {
            const rd = t.res[rk as keyof typeof t.res]
            return (
              <motion.div key={rk} className="resource-card"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="resource-card-header">
                  <span className="resource-icon">{resIcons[rk]}</span>
                  <div><div className="resource-name">{rd.n}</div></div>
                  <span className="resource-type">{resTypes[rk]}</span>
                </div>
                <p className="resource-desc">{rd.d}</p>
                <a href={resUrls[rk]} target="_blank" rel="noopener noreferrer" className="resource-link">{t.resources.goTo}</a>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
