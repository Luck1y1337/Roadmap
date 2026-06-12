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
    <section id="resources" className="py-20 px-5 md:px-12 max-w-[1100px] mx-auto">
      <div className="mb-12">
        <span className="inline-block font-mono text-[0.7rem] tracking-[0.2em] text-accent-cyan px-3 py-1 border border-accent-cyan/20 rounded-full mb-3.5">{t.resources.tag}</span>
        <h2 className="text-[2rem] font-extrabold mb-2 tracking-tight">{t.resources.title}</h2>
        <p className="text-text-secondary text-base">{t.resources.desc}</p>
      </div>
      <div className="flex gap-2 mb-7 flex-wrap">
        {categories.map(cat => (
          <button key={cat} className={`px-5 py-2 border rounded-full font-sans text-[0.85rem] cursor-pointer transition-all duration-200 ${activeTab === cat ? 'bg-accent-cyan-light border-accent-cyan/30 text-accent-cyan' : 'bg-transparent border-border text-text-secondary hover:border-border-hover hover:bg-white/5'}`} onClick={() => setActiveTab(cat)}>
            {tabIcons[cat]} {t.resources.tabs[cat]}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
        >
          {keys.map((rk, i) => {
            const rd = t.res[rk as keyof typeof t.res]
            return (
              <motion.div key={rk} className="bg-card border border-border rounded-lg p-6 flex flex-col transition-all duration-300 hover:border-border-hover hover:shadow-[var(--shadow-md)]"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[1.8rem]">{resIcons[rk]}</span>
                  <div><div className="font-semibold text-base">{rd.n}</div></div>
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded-full bg-accent-green-light text-accent-green ml-auto">{resTypes[rk]}</span>
                </div>
                <p className="text-[0.85rem] text-text-secondary leading-relaxed flex-1 mb-3.5">{rd.d}</p>
                <a href={resUrls[rk]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent-cyan text-[0.85rem] font-medium no-underline transition-all duration-200 hover:gap-2.5">{t.resources.goTo}</a>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
