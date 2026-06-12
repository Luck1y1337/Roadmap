import { useLanguage } from '../LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="py-8 text-center border-t border-border mt-12 bg-card/30">
      <div className="flex flex-col gap-2 max-w-[800px] mx-auto px-5 text-text-muted text-[0.85rem]">
        <p>⚡ <strong className="text-text-secondary">Luck1y</strong> {t.footer.text}</p>
        <p className="italic opacity-70">{t.footer.quote}</p>
      </div>
    </footer>
  )
}
