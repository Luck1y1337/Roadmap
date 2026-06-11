import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resourcesData } from '../data'
import type { ResourceCategory } from '../types'

const tabs: { id: ResourceCategory; icon: string; label: string }[] = [
  { id: 'frontend', icon: '⚛️', label: 'Frontend' },
  { id: 'backend', icon: '⚙️', label: 'Backend' },
  { id: 'security', icon: '🛡️', label: 'Security' },
  { id: 'dsa', icon: '🧠', label: 'DSA' },
  { id: 'ielts', icon: '🇬🇧', label: 'IELTS' },
]

export default function ResourcesSection() {
  const [activeTab, setActiveTab] = useState<ResourceCategory>('frontend')
  const resources = resourcesData[activeTab]

  return (
    <section id="resources" className="section">
      <div className="section-header">
        <span className="section-tag">RESOURCES</span>
        <h2 className="section-title">📚 Eng Yaxshi Resurslar</h2>
        <p className="section-desc">Dunyodagi eng sara, bepul va sifatli manbalar</p>
      </div>

      <div className="resource-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`res-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="resource-grid"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {resources.map((r, i) => (
            <motion.div
              key={r.name}
              className="resource-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="resource-card-header">
                <span className="resource-icon">{r.icon}</span>
                <div><div className="resource-name">{r.name}</div></div>
                <span className="resource-type">{r.type}</span>
              </div>
              <p className="resource-desc">{r.desc}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="resource-link">Saytga o'tish →</a>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
