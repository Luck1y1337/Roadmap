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
    <section id="hero" className="py-20 px-5 md:px-12 max-w-[1100px] mx-auto min-h-screen flex items-center pt-20 md:pt-10">
      <div className="w-full">
        <motion.div className="inline-flex items-center gap-2 py-1.5 px-4 bg-accent-cyan-light border border-accent-cyan/20 rounded-full font-mono text-xs text-accent-cyan tracking-widest uppercase mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-[var(--animate-pulse-glow)]" />
          <span>{t.hero.badge}</span>
        </motion.div>
        
        <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight mb-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="block">{t.hero.title1}</span>
          <span className="block gradient-text">{t.hero.title2}</span>
        </motion.h1>
        
        <motion.p className="text-lg text-text-secondary max-w-[580px] mb-10 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {t.hero.subtitle}
        </motion.p>
        
        <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-10" variants={container} initial="hidden" animate="show">
          {stats.map(s => (
            <motion.div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center relative overflow-hidden transition-all duration-300 hover:border-border-hover hover:shadow-[var(--shadow-glow-cyan)] before:absolute before:inset-x-0 before:top-0 before:h-[2px] before:bg-gradient-main before:opacity-0 hover:before:opacity-100 cursor-default" variants={item} whileHover={{ y: -4, transition: { duration: 0.2 } }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-mono text-2xl font-bold text-accent-cyan mb-1">{s.value}</div>
              <div className="text-xs text-text-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div className="flex flex-wrap gap-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          {tracks.map(tr => (
            <button key={tr.id} data-track={tr.id} onClick={() => onTrackChange(tr.id)} 
              className={`px-6 py-2.5 border rounded-full font-sans text-sm font-medium cursor-pointer transition-all duration-250 flex items-center gap-1.5 
              ${currentTrack === tr.id 
                ? (tr.id === 'dev' ? 'bg-accent-purple-light border-accent-purple/30 text-accent-purple shadow-[var(--shadow-glow-purple)]' : 'bg-accent-cyan-light border-accent-cyan/30 text-accent-cyan shadow-[var(--shadow-glow-cyan)]') 
                : 'bg-transparent border-border text-text-secondary hover:border-border-hover hover:bg-white/5'
              }`}
            >
              <span>{tr.icon}</span> {tr.label}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
