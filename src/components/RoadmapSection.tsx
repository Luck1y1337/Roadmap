import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import { useLocalStorage, trackActivity } from '../hooks'
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
      if (next[taskId]) trackActivity()
      return next
    })
  }

  const getPhaseProgress = (config: PhaseConfig) => {
    const taskIds = config.taskKeys.map((_, i) => `${config.id}-${i}`)
    const checked = taskIds.filter(id => checks[id]).length
    return Math.round((checked / taskIds.length) * 100)
  }

  const badgeClassMap: Record<string, string> = {
    active: 'font-mono text-[0.65rem] tracking-wider px-3 py-1 rounded-full border shrink-0 font-semibold bg-accent-cyan-light border-accent-cyan/30 text-accent-cyan animate-[var(--animate-pulse-glow)]',
    cyber: 'font-mono text-[0.65rem] tracking-wider px-3 py-1 rounded-full border shrink-0 font-semibold bg-accent-cyan-light border-accent-cyan/20 text-accent-cyan',
    dev: 'font-mono text-[0.65rem] tracking-wider px-3 py-1 rounded-full border shrink-0 font-semibold bg-accent-purple-light border-accent-purple/20 text-accent-purple',
    gold: 'font-mono text-[0.65rem] tracking-wider px-3 py-1 rounded-full border shrink-0 font-semibold bg-accent-amber-light border-accent-amber/20 text-accent-amber',
    final: 'font-mono text-[0.65rem] tracking-wider px-3 py-1 rounded-full border shrink-0 font-semibold bg-accent-green-light border-accent-green/20 text-accent-green',
    default: 'font-mono text-[0.65rem] tracking-wider px-3 py-1 rounded-full border shrink-0 font-semibold border-border text-text-muted bg-white/5',
  }

  return (
    <section id="roadmap" className="py-20 px-5 md:px-12 max-w-[1100px] mx-auto">
      <div className="mb-12">
        <span className="inline-block font-mono text-[0.7rem] tracking-[0.2em] text-accent-cyan px-3 py-1 border border-accent-cyan/20 rounded-full mb-3.5">{t.roadmap.tag}</span>
        <h2 className="text-[2rem] font-extrabold mb-2 tracking-tight">{t.roadmap.title}</h2>
        <p className="text-text-secondary text-base">{t.roadmap.desc}</p>
      </div>
      <div className="mb-12 px-5">
        <div className="relative h-1 bg-white/5 rounded-sm mt-12 mb-10">
          <div className="absolute left-0 top-0 h-full w-[5%] bg-gradient-main rounded-sm" />
          {['2026','2027','2028','2029','2030'].map((year, i) => (
            <div key={year} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${i * 25}%` }}>
              <span className={`w-3.5 h-3.5 border-2 rounded-full z-[1] transition-all duration-300 ${i === 0 ? 'bg-accent-cyan border-accent-cyan shadow-[0_0_12px_rgba(0,212,255,0.5)]' : 'bg-card border-text-muted'}`} />
              <span className={`absolute top-[22px] font-mono text-[0.7rem] text-center whitespace-nowrap ${i === 0 ? 'text-accent-cyan' : 'text-text-muted'}`}>
                {year}<br /><small className="block font-sans text-[0.65rem] text-text-muted">{[t.roadmap.tl.y0, t.roadmap.tl.y1, t.roadmap.tl.y2, t.roadmap.tl.y3, t.roadmap.tl.y4][i]}</small>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 relative pl-10 md:pl-14">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[19px] md:left-[27px] top-4 bottom-0 w-1 bg-white/5 rounded-full overflow-hidden">
          {/* Animated fill based on overall progress (or just glow) */}
          <motion.div 
            className="w-full bg-gradient-main rounded-full" 
            style={{ height: `${(filteredPhases.filter(p => getPhaseProgress(p) === 100).length / filteredPhases.length) * 100}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${(filteredPhases.filter(p => getPhaseProgress(p) === 100).length / filteredPhases.length) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>

        <AnimatePresence mode="popLayout">
          {filteredPhases.map((config, index) => {
            const phaseT = t[config.key]
            const progress = getPhaseProgress(config)
            const isOpen = openPhases[config.id]
            const isCompleted = progress === 100
            const isCurrent = progress > 0 && progress < 100

            return (
              <motion.div key={config.id} className="relative" layout>
                {/* Timeline Dot */}
                <div className={`absolute top-6 -left-10 md:-left-14 w-5 h-5 rounded-full border-[3px] z-10 flex items-center justify-center transition-all duration-500 ${isCompleted ? 'bg-accent-cyan border-accent-cyan shadow-[0_0_15px_rgba(0,212,255,0.6)]' : isCurrent ? 'bg-[#0d1117] border-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.3)] animate-pulse' : 'bg-[#0d1117] border-white/20'}`}>
                  {isCompleted && <span className="text-[#06080f] text-[10px] font-bold">✓</span>}
                </div>

                <motion.div className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 hover:border-border-hover ${isCompleted ? 'border-accent-cyan/40' : isCurrent ? 'border-accent-cyan/60 shadow-[0_0_20px_rgba(0,212,255,0.1)]' : 'border-border'}`} layout
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-4 p-5 md:px-6 cursor-pointer select-none transition-colors duration-200 hover:bg-white/5" onClick={() => togglePhase(config.id)}>
                    <div className={badgeClassMap[config.badgeClass]}>{phaseT.badge}</div>
                    <div className="flex-1">
                      <h3 className={`text-base font-semibold mb-0.5 ${isCurrent ? 'text-accent-cyan' : 'text-text-primary'}`}>{phaseT.title}</h3>
                      <span className="text-[0.78rem] text-text-muted">{phaseT.period}</span>
                    </div>
                    <div className="w-9 h-9 relative shrink-0">
                      <svg viewBox="0 0 36 36" className="-rotate-90 w-full h-full">
                        <path className="fill-none stroke-white/5 stroke-[3]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <motion.path className={`fill-none stroke-[3] rounded-full ${isCompleted ? 'stroke-accent-cyan' : 'stroke-accent-cyan'}`} style={{ strokeLinecap: 'round' }} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          initial={{ strokeDasharray: '0, 100' }} animate={{ strokeDasharray: `${progress}, 100` }} transition={{ duration: 0.6 }}
                        />
                      </svg>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.5rem] text-text-muted">{progress}%</span>
                    </div>
                    <svg className={`w-4.5 h-4.5 text-text-muted transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div className="border-t border-border overflow-hidden" style={{ display: 'block' }}
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      >
                        <div className="pt-5 px-5 md:px-6 flex flex-col gap-2.5">
                          {config.taskKeys.map((tk, i) => {
                            const taskId = `${config.id}-${i}`
                            const taskText = (phaseT as Record<string, string>)[tk]
                            return (
                              <label key={taskId} className="flex items-start gap-3 py-2.5 px-3.5 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-white/5 group">
                                <input type="checkbox" className="peer hidden" checked={!!checks[taskId]} onChange={() => toggleCheck(taskId)} />
                                <span className="w-5 h-5 border-2 border-text-muted rounded-md shrink-0 flex items-center justify-center transition-all duration-250 mt-px peer-checked:bg-accent-cyan peer-checked:border-accent-cyan peer-checked:shadow-[0_0_8px_rgba(0,212,255,0.3)] after:content-['✓'] after:text-[#06080f] after:text-[0.75rem] after:font-bold after:opacity-0 peer-checked:after:opacity-100" />
                                <span className="text-[0.9rem] leading-relaxed text-text-secondary transition-all duration-200 peer-checked:line-through peer-checked:text-text-muted">{taskText}</span>
                              </label>
                            )
                          })}
                        </div>
                        <div className={`flex gap-3 m-4.5 mx-5 md:mx-6 mb-6 py-3.5 px-4.5 rounded-lg border-l-[3px] ${config.tipWarning ? 'bg-accent-amber-light/60 border-accent-amber' : 'bg-accent-cyan-light/40 border-accent-cyan'}`}>
                          <span className="text-[1.2rem] shrink-0">{tipIcons[config.key]}</span>
                          <p className="text-[0.85rem] text-text-secondary leading-relaxed">{phaseT.tip}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}
