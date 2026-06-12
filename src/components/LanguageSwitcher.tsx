import { useLanguage } from '../LanguageContext'
import type { Lang } from '../i18n'

const langs: { id: Lang; flag: string; label: string }[] = [
  { id: 'uz', flag: '🇺🇿', label: 'UZ' },
  { id: 'en', flag: '🇬🇧', label: 'EN' },
  { id: 'ru', flag: '🇷🇺', label: 'RU' },
]

export default function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
  const { lang, setLang } = useLanguage()

  return (
    <div className={`flex gap-1 ${isMobile ? 'px-0 m-0' : 'px-4 mb-5'}`}>
      {langs.map(l => (
        <button
          key={l.id}
          className={`flex items-center gap-1 border rounded-sm font-mono cursor-pointer transition-all duration-200 font-semibold
            ${isMobile ? 'py-1 px-2 text-[0.65rem]' : 'py-1.5 px-2.5 text-[0.7rem]'}
            ${lang === l.id 
              ? 'bg-accent-cyan-light border-accent-cyan/30 text-accent-cyan shadow-[var(--shadow-glow-cyan)]' 
              : 'bg-transparent border-border text-text-muted hover:border-border-hover hover:bg-white/5 hover:text-text-secondary'}`}
          onClick={() => setLang(l.id)}
          aria-label={l.label}
        >
          <span className="text-[0.85rem]">{l.flag}</span>
          <span className="tracking-wider">{l.label}</span>
        </button>
      ))}
    </div>
  )
}
