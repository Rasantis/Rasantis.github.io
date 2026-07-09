import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { content, type Content, type Lang } from './data';

interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
  c: Content;
}

const LanguageContext = createContext<LangState | null>(null);

function initialLang(): Lang {
  const saved = localStorage.getItem('lang');
  if (saved === 'en' || saved === 'es' || saved === 'pt') return saved;
  // Padrão é inglês (posicionamento internacional); só espanhol é auto-detectado.
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, c: content[lang] }}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): LangState {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
