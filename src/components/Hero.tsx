import { motion } from 'framer-motion'
import type { Track } from '../types'

interface HeroProps {
  currentTrack: Track
  onTrackChange: (track: Track) => void
}

const stats = [
  { value: '15', label: 'Hozirgi yosh', icon: '🎂' },
  { value: '5.5', label: 'IELTS Mock', icon: '🇬🇧' },
  { value: '3 yil', label: '11-singacha', icon: '🎓' },
  { value: 'React', label: 'Hozirgi stack', icon: '⚛️' },
  { value: 'CN/JP', label: 'Maqsad davlat', icon: '✈️' },
]

const tracks: { id: Track; icon: string; label: string }[] = [
  { id: 'both', icon: '⚡', label: 'Hammasi' },
  { id: 'cyber', icon: '🛡️', label: 'Cyber Security' },
  { id: 'dev', icon: '💻', label: 'Software Dev' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function Hero({ currentTrack, onTrackChange }: HeroProps) {
  return (
    <section id="hero" className="section hero-section">
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge-dot" />
          <span>Shaxsiy Yo'l Xaritasi · 2026</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="line">Farg'onadan</span>
          <span className="line gradient-text">Dunyo IT Sanoatiga</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          15 yoshda, 8-sinf tamom, React o'rganyapman, IELTS 5.5 — va bu faqat boshlanish.
          Kelajakda Cyber Security yoki Software Developer bo'lish uchun to'liq interaktiv reja.
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

        <motion.div
          className="track-switcher"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {tracks.map(t => (
            <button
              key={t.id}
              className={`track-btn ${currentTrack === t.id ? 'active' : ''}`}
              data-track={t.id}
              onClick={() => onTrackChange(t.id)}
            >
              <span className="track-icon">{t.icon}</span> {t.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
