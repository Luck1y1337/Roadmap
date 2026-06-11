import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { phases } from '../data'
import { useLocalStorage } from '../hooks'
import type { Track } from '../types'

interface RoadmapProps {
  currentTrack: Track
  onProgressChange: (progress: number) => void
}

export default function RoadmapSection({ currentTrack, onProgressChange }: RoadmapProps) {
  const [checks, setChecks] = useLocalStorage<Record<string, boolean>>('luck1y_checks', {})
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({ 'phase-0': true })

  const filteredPhases = useMemo(
    () => phases.filter(p => currentTrack === 'both' || p.track === 'both' || p.track === currentTrack),
    [currentTrack]
  )

  const togglePhase = (id: string) => {
    setOpenPhases(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleCheck = (taskId: string) => {
    setChecks(prev => {
      const next = { ...prev, [taskId]: !prev[taskId] }
      // Calculate overall progress
      const allTasks = phases.flatMap(p => p.tasks)
      const checked = allTasks.filter(t => next[t.id]).length
      onProgressChange(Math.round((checked / allTasks.length) * 100))
      return next
    })
  }

  const getPhaseProgress = (phaseId: string) => {
    const phase = phases.find(p => p.id === phaseId)
    if (!phase) return 0
    const checked = phase.tasks.filter(t => checks[t.id]).length
    return Math.round((checked / phase.tasks.length) * 100)
  }

  const badgeClass = (cls: string) => {
    const map: Record<string, string> = {
      active: 'phase-badge active-badge',
      cyber: 'phase-badge badge-cyber',
      dev: 'phase-badge badge-dev',
      gold: 'phase-badge badge-gold',
      final: 'phase-badge badge-final',
      default: 'phase-badge',
    }
    return map[cls] || 'phase-badge'
  }

  return (
    <section id="roadmap" className="section">
      <div className="section-header">
        <span className="section-tag">ROADMAP</span>
        <h2 className="section-title">🗺️ Yo'l Xaritasi</h2>
        <p className="section-desc">Bosqichma-bosqich, yilma-yil reja</p>
      </div>

      <div className="timeline-visual">
        <div className="timeline-track">
          <div className="timeline-progress" />
          {['2026', '2027', '2028', '2029', '2030'].map((year, i) => (
            <div key={year} className={`timeline-marker ${i === 0 ? 'active' : ''}`} style={{ left: `${i * 25}%` }}>
              <span className="marker-dot" />
              <span className="marker-label">{year}<br /><small>{['Hozir', '9-sinf', '10-sinf', '11-sinf', 'Universitet'][i]}</small></span>
            </div>
          ))}
        </div>
      </div>

      <div className="phases-container">
        <AnimatePresence mode="popLayout">
          {filteredPhases.map(phase => {
            const progress = getPhaseProgress(phase.id)
            const isOpen = openPhases[phase.id]
            return (
              <motion.div
                key={phase.id}
                className={`phase-card ${isOpen ? 'open' : ''}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="phase-header" onClick={() => togglePhase(phase.id)}>
                  <div className={badgeClass(phase.badgeClass)}>{phase.badge}</div>
                  <div className="phase-info">
                    <h3>{phase.title}</h3>
                    <span className="phase-period">{phase.period}</span>
                  </div>
                  <div className="phase-progress-ring">
                    <svg viewBox="0 0 36 36">
                      <path className="ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <motion.path
                        className="ring-fill"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        initial={{ strokeDasharray: '0, 100' }}
                        animate={{ strokeDasharray: `${progress}, 100` }}
                        transition={{ duration: 0.6 }}
                      />
                    </svg>
                    <span className="ring-text">{progress}%</span>
                  </div>
                  <svg className="chevron-icon" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="phase-body"
                      style={{ display: 'block' }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="phase-checklist">
                        {phase.tasks.map(task => (
                          <label key={task.id} className="check-item">
                            <input type="checkbox" checked={!!checks[task.id]} onChange={() => toggleCheck(task.id)} />
                            <span className="checkmark" />
                            <span className="check-text">{task.text}</span>
                          </label>
                        ))}
                      </div>
                      <div className={`phase-tip ${phase.tip.warning ? 'tip-warning' : ''}`}>
                        <span className="tip-icon">{phase.tip.icon}</span>
                        <p>{phase.tip.text}</p>
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
