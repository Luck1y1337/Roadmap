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

  const renderCard = (country: typeof cn | typeof jp, reqs: { icon: string, title: string, sub: string }[], cardClass: string, moreUrl: string, xDir: number) => {
    const isChina = cardClass === 'china-card';
    return (
      <motion.div className="flex-1 bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-border-hover" whileHover={{ y: -4 }}
        initial={{ opacity: 0, x: xDir }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
      >
        <div className="p-6 border-b border-border flex items-center gap-4 relative overflow-hidden bg-white/5">
          <span className="text-3xl shrink-0 z-[1]">{isChina ? '🇨🇳' : '🇯🇵'}</span>
          <h3 className="text-[1.3rem] font-bold z-[1]">{country.name}</h3>
          <span className={`ml-auto font-mono text-[0.65rem] px-2.5 py-1 rounded border bg-transparent shrink-0 z-[1] ${isChina ? 'border-accent-cyan/30 text-accent-cyan' : 'border-accent-red/30 text-accent-red'}`}>{country.grant}</span>
        </div>
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div>
            <h4 className="text-[0.95rem] font-semibold text-text-primary mb-3 pb-2 border-b border-border">{t.abroad.topUni}</h4>
            <ul className="list-none flex flex-col gap-2 pl-1">
              {[country.u1, country.u2, country.u3, country.u4].map((u, i) => (
                <li key={i} className="text-[0.85rem] text-text-secondary relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[7px] before:w-[5px] before:h-[5px] before:rounded-full before:bg-current">
                  <span className={isChina ? 'text-accent-cyan' : 'text-accent-red'} style={{ color: 'inherit' }}>
                    <span className="text-text-secondary">{u}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[0.95rem] font-semibold text-text-primary mb-3 pb-2 border-b border-border">{t.abroad.reqs}</h4>
            <div className="flex flex-col gap-3.5">
              {reqs.map(r => (
                <div key={r.title} className="flex items-start gap-3">
                  <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
                  <div className="text-[0.8rem] text-text-muted leading-relaxed">
                    <strong className="text-text-secondary text-[0.85rem] font-semibold block mb-0.5">{r.title}</strong>
                    {r.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[0.95rem] font-semibold text-text-primary mb-3 pb-2 border-b border-border">{t.abroad.finance}</h4>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-border p-3 rounded-lg flex flex-col gap-1"><span className="text-[0.7rem] text-text-muted">{t.abroad.living}</span><span className="font-mono text-[0.95rem] font-semibold text-text-primary">{country.cost}</span></div>
              <div className="bg-white/5 border border-border p-3 rounded-lg flex flex-col gap-1"><span className="text-[0.7rem] text-text-muted">{t.abroad.stipend}</span><span className="font-mono text-[0.95rem] font-semibold text-text-primary">{country.stip}</span></div>
              <div className="bg-white/5 border border-border p-3 rounded-lg flex flex-col gap-1"><span className="text-[0.7rem] text-text-muted">{t.abroad.tuition}</span><span className="font-mono text-[0.95rem] font-semibold text-accent-green !font-bold">{t.abroad.free}</span></div>
            </div>
          </div>
          <div>
            <h4 className="text-[0.95rem] font-semibold text-text-primary mb-3 pb-2 border-b border-border">{t.abroad.deadlines}</h4>
            <div className="flex flex-col gap-2">
              <div className={`flex justify-between items-center bg-white/5 p-2.5 px-3.5 rounded text-[0.8rem] text-text-secondary border-l-2 ${isChina ? 'border-accent-cyan' : 'border-accent-red'}`}><span className="font-mono font-medium text-text-primary">{country.d1d}</span><span>{country.d1t}</span></div>
              <div className={`flex justify-between items-center bg-white/5 p-2.5 px-3.5 rounded text-[0.8rem] text-text-secondary border-l-2 ${isChina ? 'border-accent-cyan' : 'border-accent-red'}`}><span className="font-mono font-medium text-text-primary">{country.d2d}</span><span>{country.d2t}</span></div>
              <div className={`flex justify-between items-center bg-white/5 p-2.5 px-3.5 rounded text-[0.8rem] text-text-secondary border-l-2 ${isChina ? 'border-accent-cyan' : 'border-accent-red'}`}><span className="font-mono font-medium text-text-primary">{country.d3d}</span><span>{country.d3t}</span></div>
            </div>
          </div>
          <a href={moreUrl} target="_blank" rel="noopener noreferrer" className={`mt-4 py-3 text-center border rounded-lg font-semibold text-[0.9rem] no-underline transition-all duration-200 ${isChina ? 'border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/10' : 'border-accent-red/20 text-accent-red hover:bg-accent-red/10'}`}>{t.abroad.more}</a>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="abroad" className="py-20 px-5 md:px-12 max-w-[1100px] mx-auto">
      <div className="mb-12">
        <span className="inline-block font-mono text-[0.7rem] tracking-[0.2em] text-accent-cyan px-3 py-1 border border-accent-cyan/20 rounded-full mb-3.5">{t.abroad.tag}</span>
        <h2 className="text-[2rem] font-extrabold mb-2 tracking-tight">{t.abroad.title}</h2>
        <p className="text-text-secondary text-base">{t.abroad.desc}</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        {renderCard(cn, cnReqs, 'china-card', 'https://www.campuschina.org', -30)}
        {renderCard(jp, jpReqs, 'japan-card', 'https://www.studyinjapan.go.jp', 30)}
      </div>
    </section>
  )
}
