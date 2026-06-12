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
      <div className="flex items-center gap-2.5 px-6 mb-4">
        <span className="text-2xl animate-[var(--animate-pulse-glow)]">⚡</span>
        <span className="font-bold text-xl bg-gradient-main text-transparent bg-clip-text">Luck1y</span>
      </div>
      <LanguageSwitcher />
      <ul className="flex-1 flex flex-col gap-1 px-3 list-none">
        {navIds.map((id, i) => (
          <li key={id}>
            <button
              className={`flex items-center gap-3 py-2.5 px-3.5 rounded-xl border-none w-full text-left font-sans text-[0.9rem] font-medium cursor-pointer transition-all duration-200 relative
                ${activeSection === id 
                  ? 'bg-accent-cyan-light text-accent-cyan before:content-[""] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-5 before:bg-accent-cyan before:rounded-r-sm' 
                  : 'bg-transparent text-text-secondary hover:bg-white/5 hover:text-text-primary'}`}
              onClick={() => scrollTo(id)}
            >
              <span className="text-[1.1rem]">{navIcons[i]}</span>
              <span className="tracking-wide">{navLabels[i]}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="py-4 px-5 border-t border-border">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-text-muted">{t.sidebar.progress}</span>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-main rounded-full"
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="font-mono text-xs text-accent-cyan">{overallProgress}%</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      <header className="md:hidden fixed top-0 left-0 w-full h-14 bg-[#0d1117]/90 backdrop-blur-xl border-b border-border z-[110] flex items-center px-4 gap-3">
        <button
          className="w-7 h-5 flex flex-col justify-between cursor-pointer p-0 bg-transparent border-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={`block w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
          <span className={`block w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-full h-0.5 bg-text-primary rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
        </button>
        <span className="font-bold text-base bg-gradient-main text-transparent bg-clip-text">⚡ Luck1y</span>
        <div className="ml-auto"><LanguageSwitcher isMobile={true} /></div>
      </header>
      
      <nav className="hidden md:flex fixed top-0 left-0 w-[var(--spacing-sidebar)] h-screen bg-[#0d1117]/85 backdrop-blur-xl border-r border-border z-[100] flex-col py-6">
        {navContent}
      </nav>
      
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/50 z-[115]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.nav className="fixed top-0 left-0 w-[var(--spacing-sidebar)] h-screen bg-[#0d1117]/95 backdrop-blur-xl border-r border-border z-[120] flex flex-col py-6" initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
              {navContent}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
