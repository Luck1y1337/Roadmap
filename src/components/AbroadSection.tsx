import { motion } from 'framer-motion'

const chinaReqs = [
  { icon: '🇬🇧', title: 'IELTS 6.0–6.5', sub: 'Ingliz tilidagi dasturlar uchun' },
  { icon: '🇨🇳', title: 'HSK 4 (180 ball+)', sub: 'Xitoy tilidagi dasturlar uchun' },
  { icon: '📄', title: 'Attestat (GPA 80%+)', sub: 'Maktab baholar yuqori bo\'lishi kerak' },
  { icon: '📝', title: 'Motivation Letter', sub: 'Ingliz tilida maqsadingiz haqida xat' },
  { icon: '💉', title: 'Tibbiy ko\'rik', sub: 'Sog\'liq haqida rasmiy ma\'lumotnoma' },
]

const japanReqs = [
  { icon: '🇬🇧', title: 'IELTS 6.0+', sub: 'Ingliz tilidagi dasturlar uchun' },
  { icon: '🇯🇵', title: 'JLPT N4–N3', sub: 'Yapon tili asoslari (eng muhim)' },
  { icon: '📄', title: 'Attestat (GPA 80%+)', sub: 'Akademik natijalar yuqori' },
  { icon: '📝', title: 'Research Plan', sub: 'Tadqiqot rejasi (MEXT uchun)' },
  { icon: '🎤', title: 'Intervyu', sub: 'Elchixonada suhbat (MEXT)' },
]

export default function AbroadSection() {
  return (
    <section id="abroad" className="section">
      <div className="section-header">
        <span className="section-tag">STUDY ABROAD</span>
        <h2 className="section-title">🌏 Xorijda O'qish — Xitoy yoki Yaponiya</h2>
        <p className="section-desc">Ikki davlatni batafsil solishtirish va kerakli hujjatlar</p>
      </div>
      <div className="abroad-comparison">
        {/* CHINA */}
        <motion.div className="abroad-card china-card" whileHover={{ y: -4 }} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="abroad-header">
            <span className="abroad-flag">🇨🇳</span>
            <h3>Xitoy</h3>
            <span className="abroad-badge">CSC Grant</span>
          </div>
          <div className="abroad-body">
            <div className="abroad-section">
              <h4>🎓 Top Universitetlar</h4>
              <ul>
                <li>Tsinghua University (dunyo top 20)</li>
                <li>Peking University</li>
                <li>Shanghai Jiao Tong University</li>
                <li>Zhejiang University</li>
              </ul>
            </div>
            <div className="abroad-section">
              <h4>📋 Kerakli talablar</h4>
              <div className="requirement-list">
                {chinaReqs.map(r => (
                  <div key={r.title} className="req-item">
                    <span className="req-icon">{r.icon}</span>
                    <div><strong>{r.title}</strong><br />{r.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="abroad-section">
              <h4>💰 Moliyaviy ma'lumot</h4>
              <div className="cost-grid">
                <div className="cost-item"><span className="cost-label">Yashash xarajati</span><span className="cost-value">$500–900/oy</span></div>
                <div className="cost-item"><span className="cost-label">CSC Stipendiya</span><span className="cost-value">$400–500/oy</span></div>
                <div className="cost-item"><span className="cost-label">O'qish narxi (grant)</span><span className="cost-value highlight-free">BEPUL</span></div>
              </div>
            </div>
            <div className="abroad-section">
              <h4>📅 Muhim muddatlar</h4>
              <div className="deadline-list">
                <div className="deadline-item"><span className="deadline-date">Dekabr – Fevral</span><span>CSC grantiga ariza topshirish</span></div>
                <div className="deadline-item"><span className="deadline-date">Aprel – Iyun</span><span>Natijalar e'lon qilinadi</span></div>
                <div className="deadline-item"><span className="deadline-date">Sentyabr</span><span>O'qish boshlanadi</span></div>
              </div>
            </div>
            <a href="https://www.campuschina.org" target="_blank" rel="noopener noreferrer" className="abroad-link">campuschina.org da batafsil →</a>
          </div>
        </motion.div>

        {/* JAPAN */}
        <motion.div className="abroad-card japan-card" whileHover={{ y: -4 }} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="abroad-header">
            <span className="abroad-flag">🇯🇵</span>
            <h3>Yaponiya</h3>
            <span className="abroad-badge">MEXT Grant</span>
          </div>
          <div className="abroad-body">
            <div className="abroad-section">
              <h4>🎓 Top Universitetlar</h4>
              <ul>
                <li>University of Tokyo (dunyo top 30)</li>
                <li>Osaka University</li>
                <li>Tohoku University</li>
                <li>Waseda University</li>
              </ul>
            </div>
            <div className="abroad-section">
              <h4>📋 Kerakli talablar</h4>
              <div className="requirement-list">
                {japanReqs.map(r => (
                  <div key={r.title} className="req-item">
                    <span className="req-icon">{r.icon}</span>
                    <div><strong>{r.title}</strong><br />{r.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="abroad-section">
              <h4>💰 Moliyaviy ma'lumot</h4>
              <div className="cost-grid">
                <div className="cost-item"><span className="cost-label">Yashash xarajati</span><span className="cost-value">$900–1400/oy</span></div>
                <div className="cost-item"><span className="cost-label">MEXT Stipendiya</span><span className="cost-value">$1000–1200/oy</span></div>
                <div className="cost-item"><span className="cost-label">O'qish narxi (grant)</span><span className="cost-value highlight-free">BEPUL</span></div>
              </div>
            </div>
            <div className="abroad-section">
              <h4>📅 Muhim muddatlar</h4>
              <div className="deadline-list">
                <div className="deadline-item"><span className="deadline-date">Aprel – May</span><span>MEXT grantiga ariza (elchixona)</span></div>
                <div className="deadline-item"><span className="deadline-date">Iyun – Iyul</span><span>Imtihon va intervyu</span></div>
                <div className="deadline-item"><span className="deadline-date">Aprel (keyingi yil)</span><span>O'qish boshlanadi</span></div>
              </div>
            </div>
            <a href="https://www.studyinjapan.go.jp" target="_blank" rel="noopener noreferrer" className="abroad-link">studyinjapan.go.jp da batafsil →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
