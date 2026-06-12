import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import { useLocalStorage } from '../hooks'
import type { Track } from '../types'

interface RoadmapProps {
  currentTrack: Track
  onProgressChange: (progress: number) => void
}

type PhaseKey = 'phase0' | 'phase1' | 'phase2c' | 'phase2d' | 'phase3' | 'phase4'

interface PhaseConfig {
  key: PhaseKey
  id: string
  badgeClass: string
  track: 'both' | 'cyber' | 'dev'
  taskKeys: string[]
  tipWarning?: boolean
}

const phaseConfigs: PhaseConfig[] = [
  { key: 'phase0', id: 'phase-0', badgeClass: 'active', track: 'both', taskKeys: ['t1','t2','t3','t4','t5'] },
  { key: 'phase1', id: 'phase-1', badgeClass: 'default', track: 'both', taskKeys: ['t1','t2','t3','t4','t5','t6','t7'] },
  { key: 'phase2c', id: 'phase-2c', badgeClass: 'cyber', track: 'cyber', taskKeys: ['t1','t2','t3','t4','t5','t6'], tipWarning: true },
  { key: 'phase2d', id: 'phase-2d', badgeClass: 'dev', track: 'dev', taskKeys: ['t1','t2','t3','t4','t5','t6'] },
  { key: 'phase3', id: 'phase-3', badgeClass: 'gold', track: 'both', taskKeys: ['t1','t2','t3','t4','t5','t6'] },
  { key: 'phase4', id: 'phase-4', badgeClass: 'final', track: 'both', taskKeys: ['t1','t2','t3','t4','t5'] },
]

const tipIcons: Record<PhaseKey, string> = {
  phase0: '💡', phase1: '🚀', phase2c: '⚠️', phase2d: '💰', phase3: '🏆', phase4: '🌍',
}

export default function RoadmapSection({ currentTrack, onProgressChange }: RoadmapProps) {
  const { t } = useLanguage()
  const [checks, setChecks] = useLocalStorage<Record<string, boolean>>('luck1y_checks', {})
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ 'phase-0': true })

  const filteredPhases = useMemo(
    () => phaseConfigs.filter(p => currentTrack === 'both' || p.track === 'both' || p.track === currentTrack),
    [currentTrack]
  )

  const allTaskIds = useMemo(() => phaseConfigs.flatMap(p => p.taskKeys.map((_, i) => `${p.id}-${i}`)), [])

  const togglePhase = (id: string) => {
    setOpenPhases(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleCheck = (taskId: string) => {
    setChecks(prev => {
      const next = { ...prev, [taskId]: !prev[taskId] }
      const checked = allTaskIds.filter(id => next[id]).length
      onProgressChange(Math.round((checked / allTaskIds.length) * 100))
      return next
    })
  }

  const getPhaseProgress = (config: PhaseConfig) => {
    const taskIds = config.taskKeys.map((_, i) => `${config.id}-${i}`)
    const checked = taskIds.filter(id => checks[id]).length
    return Math.round((checked / taskIds.length) * 100)
  }

  const badgeClassMap: Record<string, string> = {
    active: 'phase-badge active-badge', cyber: 'phase-badge badge-cyber',
    dev: 'phase-badge badge-dev', gold: 'phase-badge badge-gold',
    final: 'phase-badge badge-final', default: 'phase-badge',
  }

  return (
    <section id="roadmap" className="section">
      <div className="section-header">
        <span className="section-tag">{t.roadmap.tag}</span>
        <h2 className="section-title">{t.roadmap.title}</h2>
        <p className="section-desc">{t.roadmap.desc}</p>
      </div>
      <div className="timeline-visual">
        <div className="timeline-track">
          <div className="timeline-progress" />
          {['2026','2027','2028','2029','2030'].map((year, i) => (
            <div key={year} className={`timeline-marker ${i === 0 ? 'active' : ''}`} style={{ left: `${i * 25}%` }}>
              <span className="marker-dot" />
              <span className="marker-label">{year}<br /><small>{[t.roadmap.tl.y0, t.roadmap.tl.y1, t.roadmap.tl.y2, t.roadmap.tl.y3, t.roadmap.tl.y4][i]}</small></span>
            </div>
          ))}
        </div>
      </div>
      <div className="phases-container">
        <AnimatePresence mode="popLayout">
          {filteredPhases.map(config => {
            const phaseT = t[config.key]
            const progress = getPhaseProgress(config)
            const isOpen = openPhases[config.id]
            return (
              <motion.div key={config.id} className={`phase-card ${isOpen ? 'open' : ''}`} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
              >
                <div className="phase-header" onClick={() => togglePhase(config.id)}>
                  <div className={badgeClassMap[config.badgeClass]}>{phaseT.badge}</div>
                  <div className="phase-info">
                    <h3>{phaseT.title}</h3>
                    <span className="phase-period">{phaseT.period}</span>
                  </div>
                  <div className="phase-progress-ring">
                    <svg viewBox="0 0 36 36">
                      <path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <motion.path className="ring-fill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: `${progress}, 100` }} transition={{ duration: 0.6 }}
                      />
                    </svg>
                    <span className="ring-text">{progress}%</span>
                  </div>
                  <svg className="chevron-icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div className="phase-body" style={{ display: 'block' }}
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    >
                      <div className="phase-checklist">
                        {config.taskKeys.map((tk, i) => {
                          const taskId = `${config.id}-${i}`
                          const taskText = (phaseT as Record<string, string>)[tk]
                          return (
                            <label key={taskId} className="check-item">
                              <input type="checkbox" checked={!!checks[taskId]} onChange={() => toggleCheck(taskId)} />
                              <span className="checkmark" />
                              <span className="check-text">{taskText}</span>
                            </label>
                          )
                        })}
                      </div>
                      <div className={`phase-tip ${config.tipWarning ? 'tip-warning' : ''}`}>
                        <span className="tip-icon">{tipIcons[config.key]}</span>
                        <p>{phaseT.tip}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}
