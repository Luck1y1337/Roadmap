import { createContext, useContext, useState, type ReactNode } from 'react'
import { getTranslation, type Lang, type TranslationKeys } from './i18n'
import { useLocalStorage } from './hooks'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'uz',
  setLang: () => {},
  t: getTranslation('uz'),
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [savedLang, setSavedLang] = useLocalStorage<Lang>('luck1y_lang', 'uz')
  const [lang, setLangState] = useState<Lang>(savedLang)

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    setSavedLang(newLang)
  }

  const t = getTranslation(lang)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
