import { motion } from 'framer-motion'
import { useLanguage } from '../LanguageContext'

export default function AbroadSection() {
  const { t } = useLanguage()
  const cn = t.abroad.cn
  const jp = t.abroad.jp

  const cnReqs = [
    { icon: '🇬🇧', title: cn.r1t, sub: cn.r1s },
    { icon: '🇨🇳', title: cn.r2t, sub: cn.r2s },
    { icon: '📄', title: cn.r3t, sub: cn.r3s },
    { icon: '📝', title: cn.r4t, sub: cn.r4s },
    { icon: '💉', title: cn.r5t, sub: cn.r5s },
  ]
  const jpReqs = [
    { icon: '🇬🇧', title: jp.r1t, sub: jp.r1s },
    { icon: '🇯🇵', title: jp.r2t, sub: jp.r2s },
    { icon: '📄', title: jp.r3t, sub: jp.r3s },
    { icon: '📝', title: jp.r4t, sub: jp.r4s },
    { icon: '🎤', title: jp.r5t, sub: jp.r5s },
  ]

  const renderCard = (country: typeof cn | typeof jp, reqs: typeof cnReqs, cardClass: string, moreUrl: string, xDir: number) => (
    <motion.div className={`abroad-card ${cardClass}`} whileHover={{ y: -4 }}
      initial={{ opacity: 0, x: xDir }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
    >
      <div className="abroad-header">
        <span className="abroad-flag">{cardClass === 'china-card' ? '🇨🇳' : '🇯🇵'}</span>
        <h3>{country.name}</h3>
        <span className="abroad-badge">{country.grant}</span>
      </div>
      <div className="abroad-body">
        <div className="abroad-section">
          <h4>{t.abroad.topUni}</h4>
          <ul><li>{country.u1}</li><li>{country.u2}</li><li>{country.u3}</li><li>{country.u4}</li></ul>
        </div>
        <div className="abroad-section">
          <h4>{t.abroad.reqs}</h4>
          <div className="requirement-list">
            {reqs.map(r => (
              <div key={r.title} className="req-item">
                <span className="req-icon">{r.icon}</span>
                <div><strong>{r.title}</strong><br />{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="abroad-section">
          <h4>{t.abroad.finance}</h4>
          <div className="cost-grid">
            <div className="cost-item"><span className="cost-label">{t.abroad.living}</span><span className="cost-value">{country.cost}</span></div>
            <div className="cost-item"><span className="cost-label">{t.abroad.stipend}</span><span className="cost-value">{country.stip}</span></div>
            <div className="cost-item"><span className="cost-label">{t.abroad.tuition}</span><span className="cost-value highlight-free">{t.abroad.free}</span></div>
          </div>
        </div>
        <div className="abroad-section">
          <h4>{t.abroad.deadlines}</h4>
          <div className="deadline-list">
            <div className="deadline-item"><span className="deadline-date">{country.d1d}</span><span>{country.d1t}</span></div>
            <div className="deadline-item"><span className="deadline-date">{country.d2d}</span><span>{country.d2t}</span></div>
            <div className="deadline-item"><span className="deadline-date">{country.d3d}</span><span>{country.d3t}</span></div>
          </div>
        </div>
        <a href={moreUrl} target="_blank" rel="noopener noreferrer" className="abroad-link">{t.abroad.more}</a>
      </div>
    </motion.div>
  )

  return (
    <section id="abroad" className="section">
      <div className="section-header">
        <span className="section-tag">{t.abroad.tag}</span>
        <h2 className="section-title">{t.abroad.title}</h2>
        <p className="section-desc">{t.abroad.desc}</p>
      </div>
      <div className="abroad-comparison">
        {renderCard(cn, cnReqs, 'china-card', 'https://www.campuschina.org', -30)}
        {renderCard(jp, jpReqs, 'japan-card', 'https://www.studyinjapan.go.jp', 30)}
      </div>
    </section>
  )
}
