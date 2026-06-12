import { useLanguage } from '../LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>⚡ <strong>Luck1y</strong> {t.footer.text}</p>
        <p className="footer-quote">{t.footer.quote}</p>
      </div>
    </footer>
  )
}
