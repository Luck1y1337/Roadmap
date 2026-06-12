import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const navIcons = ['🏠', '📊', '🗺️', '📚', '🎯', '🌏', '✅']
const navIds = ['hero', 'skills', 'roadmap', 'resources', 'practice', 'abroad', 'todos']

interface SidebarProps {
  activeSection: string
  overallProgress: number
}

export default function Sidebar({ activeSection, overallProgress }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useLanguage()

  const navLabels = [
    t.nav.home, t.nav.skills, t.nav.roadmap,
    t.nav.resources, t.nav.practice, t.nav.abroad, t.nav.todos,
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const navContent = (
    <>
      <div className="sidebar-logo">
        <span className="logo-icon">⚡</span>
        <span className="logo-text">Luck1y</span>
      </div>
      <LanguageSwitcher />
      <ul className="nav-links">
        {navIds.map((id, i) => (
          <li key={id}>
            <button
              className={`nav-link ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              <span className="nav-icon">{navIcons[i]}</span>
              <span className="nav-label">{navLabels[i]}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <div className="overall-progress">
          <span className="progress-label">{t.sidebar.progress}</span>
          <div className="progress-bar-mini">
            <motion.div
              className="progress-fill-mini"
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="progress-percent">{overallProgress}%</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      <header className="mobile-header">
        <button
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
        <span className="mobile-logo">⚡ Luck1y</span>
        <div className="mobile-lang"><LanguageSwitcher /></div>
      </header>
      <nav className="sidebar desktop-sidebar">{navContent}</nav>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="sidebar-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.nav className="sidebar mobile-sidebar" initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              {navContent}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
