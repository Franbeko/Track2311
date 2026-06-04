import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const LanguageModal = () => {
  const { showLanguageModal, newLanguage, confirmLanguageChange, cancelLanguageChange } = useLanguage();

  const getLanguageName = (code) => {
    const languages = {
      en: 'English',
      es: 'Español',
      pt: 'Português',
      fr: 'Français',
      ar: 'العربية',
      zh: '中文'
    };
    return languages[code] || code;
  };

  if (!showLanguageModal) return null;

  return (
    <AnimatePresence>
      {showLanguageModal && (
        <div className="fixed top-0 left-0 right-0 z-[60] flex justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Google Translate Style Header */}
            <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-sm font-medium">🌐 Google Translate</span>
              </div>
              <button
                onClick={cancelLanguageChange}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body - Google Translate Style */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg">🔤</span>
                <div>
                  <p className="text-gray-700 text-sm font-medium">
                    Translate page to <strong>{getLanguageName(newLanguage)}</strong>?
                  </p>
                  <p className="text-gray-400 text-xs">The entire website will be translated</p>
                </div>
              </div>

              {/* Language Selection Display */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🌐</span>
                    <span className="text-sm text-gray-700">English → {getLanguageName(newLanguage)}</span>
                  </div>
                  <span className="text-xs text-gray-400">Page translation</span>
                </div>
              </div>

              {/* Always Translate Option */}
              <div className="flex items-center gap-2 mb-4">
                <input 
                  type="checkbox" 
                  id="alwaysTranslate" 
                  className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <label htmlFor="alwaysTranslate" className="text-xs text-gray-600">
                  Always translate {getLanguageName(newLanguage)}
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={cancelLanguageChange}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
                >
                  No
                </button>
                <button
                  onClick={confirmLanguageChange}
                  className="flex-1 bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-600 transition flex items-center justify-center gap-1"
                >
                  <FaCheckCircle className="w-3 h-3" />
                  Translate
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LanguageModal;