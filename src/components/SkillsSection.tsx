import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import { useInView } from '../hooks'

const levels = [75, 40, 30, 55, 80, 55]

export default function SkillsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { ref: sectionRef, inView } = useInView(0.3)
  const { t } = useLanguage()

  const radarLabels = [t.radar.s1, t.radar.s2, t.radar.s3, t.radar.s4, t.radar.s5, t.radar.s6]
  const skillsData = [
    { name: t.skills.s1, level: 75, note: t.skills.s1n },
    { name: t.skills.s2, level: 40, note: t.skills.s2n },
    { name: t.skills.s3, level: 30, note: t.skills.s3n },
    { name: t.skills.s4, level: 55, note: t.skills.s4n },
    { name: t.skills.s5, level: 80, note: t.skills.s5n },
    { name: t.skills.s6, level: 55, note: t.skills.s6n },
  ]

  const drawRadar = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = 400 * dpr
    canvas.height = 400 * dpr
    canvas.style.width = '400px'
    canvas.style.height = '400px'
    ctx.scale(dpr, dpr)

    const cx = 200, cy = 200, maxR = 150
    const count = radarLabels.length
    const step = (2 * Math.PI) / count

    for (let r = 1; r <= 4; r++) {
      const radius = (maxR / 4) * r
      ctx.beginPath()
      for (let i = 0; i <= count; i++) {
        const a = step * i - Math.PI / 2
        const x = cx + Math.cos(a) * radius
        const y = cy + Math.sin(a) * radius
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    for (let i = 0; i < count; i++) {
      const a = step * i - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR)
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.stroke()
    }

    ctx.beginPath()
    levels.forEach((val, i) => {
      const a = step * i - Math.PI / 2
      const r = (val / 100) * maxR
      i === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
    })
    ctx.closePath()
    const grad = ctx.createLinearGradient(50, 50, 350, 350)
    grad.addColorStop(0, 'rgba(0,212,255,0.15)')
    grad.addColorStop(1, 'rgba(139,92,246,0.15)')
    ctx.fillStyle = grad
    ctx.fill()
    ctx.strokeStyle = 'rgba(0,212,255,0.6)'
    ctx.lineWidth = 2
    ctx.stroke()

    levels.forEach((val, i) => {
      const a = step * i - Math.PI / 2
      const r = (val / 100) * maxR
      const x = cx + Math.cos(a) * r
      const y = cy + Math.sin(a) * r
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#00d4ff'
      ctx.fill()
      ctx.strokeStyle = '#0d1117'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    ctx.font = '12px Inter, sans-serif'
    ctx.fillStyle = '#8b949e'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    radarLabels.forEach((label, i) => {
      const a = step * i - Math.PI / 2
      ctx.fillText(label, cx + Math.cos(a) * (maxR + 25), cy + Math.sin(a) * (maxR + 25))
    })
  }, [radarLabels])

  useEffect(() => {
    if (inView) drawRadar()
  }, [inView, drawRadar])

  return (
    <section id="skills" className="section" ref={sectionRef}>
      <div className="section-header">
        <span className="section-tag">{t.skills.tag}</span>
        <h2 className="section-title">{t.skills.title}</h2>
        <p className="section-desc">{t.skills.desc}</p>
      </div>
      <div className="skills-container">
        <div className="skills-radar-wrap">
          <canvas ref={canvasRef} style={{ maxWidth: '100%' }} />
        </div>
        <div className="skills-details">
          {skillsData.map((skill, i) => (
            <motion.div key={skill.name} className="skill-item"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <motion.div className="skill-fill"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <p className="skill-note">{skill.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
