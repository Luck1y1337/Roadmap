import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import type { Track } from '../types'

interface HeroProps {
  currentTrack: Track
  onTrackChange: (track: Track) => void
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Hero({ currentTrack, onTrackChange }: HeroProps) {
  const { t } = useLanguage()

  const stats = [
    { value: '15', label: t.hero.statAge, icon: '🎂' },
    { value: '5.5', label: t.hero.statIelts, icon: '🇬🇧' },
    { value: '3 yil', label: t.hero.statYears, icon: '🎓' },
    { value: 'React', label: t.hero.statStack, icon: '⚛️' },
    { value: 'CN/JP', label: t.hero.statTarget, icon: '✈️' },
  ]

  const tracks: { id: Track; icon: string; label: string }[] = [
    { id: 'both', icon: '⚡', label: t.hero.trackAll },
    { id: 'cyber', icon: '🛡️', label: t.hero.trackCyber },
    { id: 'dev', icon: '💻', label: t.hero.trackDev },
  ]

  return (
    <section id="hero" className="section hero-section">
      <div className="hero-content">
        <motion.div className="hero-badge" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="badge-dot" />
          <span>{t.hero.badge}</span>
        </motion.div>
        <motion.h1 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="line">{t.hero.title1}</span>
          <span className="line gradient-text">{t.hero.title2}</span>
        </motion.h1>
        <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {t.hero.subtitle}
        </motion.p>
        <motion.div className="stats-grid" variants={container} initial="hidden" animate="show">
          {stats.map(s => (
            <motion.div key={s.label} className="stat-card" variants={item} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="track-switcher" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          {tracks.map(tr => (
            <button key={tr.id} className={`track-btn ${currentTrack === tr.id ? 'active' : ''}`} data-track={tr.id} onClick={() => onTrackChange(tr.id)}>
              <span className="track-icon">{tr.icon}</span> {tr.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
