import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { en } from './en';
import { mr, type Dictionary } from './mr';

export type Language = 'mr' | 'en';

const STORAGE_KEY = 'dm.language';

const dictionaries: Record<Language, Dictionary> = { mr, en };

type LanguageValue = {
  language: Language;
  t: Dictionary;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageValue>({
  language: 'mr',
  t: mr,
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('mr');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === 'mr' || stored === 'en') setLanguageState(stored);
      })
      .catch(() => {});
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({
      language,
      t: dictionaries[language],
      setLanguage: (next) => {
        setLanguageState(next);
        AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
      },
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useT() {
  return useContext(LanguageContext);
}

export { mr, en };
export type { Dictionary };
