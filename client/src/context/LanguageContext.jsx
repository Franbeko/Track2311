/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import en from '../locales/en';
import es from '../locales/es';
import pt from '../locales/pt';
import fr from '../locales/fr';
import ar from '../locales/ar';
import zh from '../locales/zh';

const translations = {
  en,
  es,
  pt,
  fr,
  ar,
  zh
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage && translations[savedLanguage] ? savedLanguage : 'en';
  });
  
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [newLanguage, setNewLanguage] = useState(null);

  const t = translations[language];

  const changeLanguage = (langCode) => {
    if (langCode === language) return;
    
    setNewLanguage(langCode);
    setShowLanguageModal(true);
  };

  const confirmLanguageChange = () => {
    if (newLanguage) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      setShowLanguageModal(false);
      setNewLanguage(null);
      // Reload page to ensure all content updates
      window.location.reload();
    }
  };

  const cancelLanguageChange = () => {
    setShowLanguageModal(false);
    setNewLanguage(null);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      t, 
      changeLanguage, 
      showLanguageModal, 
      newLanguage,
      confirmLanguageChange,
      cancelLanguageChange
    }}>
      {children}
    </LanguageContext.Provider>
  );
};