import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../data'

interface SidebarProps {
  activeSection: string
  overallProgress: number
}

export default function Sidebar({ activeSection, overallProgress }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

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
      <ul className="nav-links">
        {navItems.map(item => (
          <li key={item.id}>
            <button
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollTo(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <div className="overall-progress">
          <span className="progress-label">Umumiy progress</span>
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
      </header>

      {/* Desktop sidebar */}
      <nav className="sidebar desktop-sidebar">{navContent}</nav>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="sidebar mobile-sidebar"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {navContent}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
