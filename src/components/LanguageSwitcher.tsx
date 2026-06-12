import { useLanguage } from '../LanguageContext'
import type { Lang } from '../i18n'

const langs: { id: Lang; flag: string; label: string }[] = [
  { id: 'uz', flag: '🇺🇿', label: 'UZ' },
  { id: 'en', flag: '🇬🇧', label: 'EN' },
  { id: 'ru', flag: '🇷🇺', label: 'RU' },
]

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="lang-switcher">
      {langs.map(l => (
        <button
          key={l.id}
          className={`lang-btn ${lang === l.id ? 'active' : ''}`}
          onClick={() => setLang(l.id)}
          aria-label={l.label}
        >
          <span className="lang-flag">{l.flag}</span>
          <span className="lang-label">{l.label}</span>
        </button>
      ))}
    </div>
  )
}
