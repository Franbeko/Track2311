import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { 
  FaBars, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaFacebook, FaTwitter, FaInstagram, FaChevronDown,
  FaGlobe
} from 'react-icons/fa';
import LoginModal from './LoginModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t, changeLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalMode, setLoginModalMode] = useState('login');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openLoginModal = () => {
    setLoginModalMode('login');
    setIsLoginModalOpen(true);
  };

  return (
    <>
      {/* Top Bar with Contact Info */}
      <div className="bg-primary text-white py-3 hidden md:block border-b border-accent/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 group">
                <FaEnvelope className="text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm">egsmithjr@track2311investments.org</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <FaPhone className="text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm">+1 (901) 608-0131</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <FaMapMarkerAlt className="text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm">Mon - Fri: 8:00 AM - 4:00 PM (Liberia)</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-300">{t.nav?.followUs || 'Follow us:'}</span>
              <div className="flex space-x-3">
                <a href="https://www.facebook.com/people/Track2311-Investments-Consultancy-Ltd/100082914168655/" className="hover:text-accent transition-colors" aria-label="Facebook">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="https://twitter.com/track2311invest?t=f14zVsNckZU3eMYNLRXwnw&s=09" className="hover:text-accent transition-colors" aria-label="Twitter">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/p/C578FUKuLBV/?igsh=MWQwcDFwMWp1eW5idA%3D%3D" className="hover:text-accent transition-colors" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-5 md:py-6">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/images/logo/logo.png" 
                  alt="Track2311 Logo" 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50x50?text=T';
                  }}
                />
              </div>
              <div>
                <span className="text-lg md:text-xl font-bold text-primary">Track2311</span>
                <span className="text-xs block text-gray-500">{t.nav?.investmentConsultancy || 'Investment & Consultancy'}</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-accent">
                {t.nav?.home || 'Home'}
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-accent">
                {t.nav?.companyProfile || 'Company Profile'}
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-accent">
                {t.nav?.services || 'Services'}
              </Link>
              <Link to="/shareholders" className="text-gray-700 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-accent">
                {t.nav?.shareholders || 'Shareholders & Investors'}
              </Link>
              
              {/* Blog Dropdown Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-accent group">
                  <span>{t.nav?.blog || 'Blog'}</span>
                  <FaChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link to="/blog/news" className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition-colors rounded-t-lg">
                      {t.blog?.latestNews || 'Latest News'}
                    </Link>
                    <Link to="/blog/investment-tips" className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition-colors">
                      {t.blog?.investmentTips || 'Investment Tips'}
                    </Link>
                    <Link to="/blog/market-updates" className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition-colors">
                      {t.blog?.marketUpdates || 'Market Updates'}
                    </Link>
                    <Link to="/blog/success-stories" className="block px-4 py-2 text-gray-700 hover:bg-primary hover:text-white transition-colors rounded-b-lg">
                      {t.blog?.successStories || 'Success Stories'}
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link to="/team" className="text-gray-700 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-accent">
                {t.nav?.team || 'Team'}
              </Link>
              <Link to="/gallery" className="text-gray-700 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-accent">
                {t.nav?.gallery || 'Gallery'}
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors py-2 border-b-2 border-transparent hover:border-accent">
                {t.nav?.contact || 'Contact'}
              </Link>
            </div>

            {/* Right Side: Language Selector + Login Button */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-primary transition-colors"
                >
                  <FaGlobe className="text-primary" />
                  <span className="font-medium text-gray-700">{language.toUpperCase()}</span>
                  <FaChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                          language === lang.code ? 'bg-primary/5 text-primary' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm">{lang.name}</span>
                        {language === lang.code && (
                          <span className="ml-auto text-accent text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Auth Buttons - Only Login */}
              {user ? (
                <>
                  <Link to="/account" className="text-gray-700 hover:text-primary font-medium transition-colors">
                    My Account
                  </Link>
                  <button onClick={handleLogout} className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all font-medium">
                    {t.nav?.logout || 'Logout'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={openLoginModal} 
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-secondary transition-all font-medium shadow-md hover:shadow-lg"
                >
                  {t.nav?.login || 'Login'}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-2xl text-primary p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden pb-6 space-y-4 animate-slide-up">
              <Link to="/" className="block text-gray-700 hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                {t.nav?.home || 'Home'}
              </Link>
              <Link to="/about" className="block text-gray-700 hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                {t.nav?.companyProfile || 'Company Profile'}
              </Link>
              <Link to="/services" className="block text-gray-700 hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                {t.nav?.services || 'Services'}
              </Link>
              <Link to="/shareholders" className="block text-gray-700 hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                {t.nav?.shareholders || 'Shareholders & Investors'}
              </Link>
              
              {/* Mobile Blog Dropdown */}
              <div>
                <button
                  onClick={() => setIsBlogOpen(!isBlogOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary py-2 border-b border-gray-100"
                >
                  <span>{t.nav?.blog || 'Blog'}</span>
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${isBlogOpen ? 'rotate-180' : ''}`} />
                </button>
                {isBlogOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    <Link to="/blog/news" className="block text-gray-600 hover:text-primary py-1" onClick={() => setIsOpen(false)}>
                      {t.blog?.latestNews || 'Latest News'}
                    </Link>
                    <Link to="/blog/investment-tips" className="block text-gray-600 hover:text-primary py-1" onClick={() => setIsOpen(false)}>
                      {t.blog?.investmentTips || 'Investment Tips'}
                    </Link>
                    <Link to="/blog/market-updates" className="block text-gray-600 hover:text-primary py-1" onClick={() => setIsOpen(false)}>
                      {t.blog?.marketUpdates || 'Market Updates'}
                    </Link>
                    <Link to="/blog/success-stories" className="block text-gray-600 hover:text-primary py-1" onClick={() => setIsOpen(false)}>
                      {t.blog?.successStories || 'Success Stories'}
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/team" className="block text-gray-700 hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                {t.nav?.team || 'Team'}
              </Link>
              <Link to="/gallery" className="block text-gray-700 hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                {t.nav?.gallery || 'Gallery'}
              </Link>
              <Link to="/contact" className="block text-gray-700 hover:text-primary py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
                {t.nav?.contact || 'Contact'}
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <FaGlobe className="text-primary" />
                  <span className="text-sm font-semibold text-gray-700">Select Language</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        language === lang.code
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Auth Buttons */}
              {user ? (
                <>
                  <Link to="/account" className="block text-gray-700 hover:text-primary py-2" onClick={() => setIsOpen(false)}>
                    My Account
                  </Link>
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left text-red-600 py-2 font-medium">
                    {t.nav?.logout || 'Logout'}
                  </button>
                </>
              ) : (
                <div className="pt-4">
                  <button 
                    onClick={() => { openLoginModal(); setIsOpen(false); }} 
                    className="block w-full text-center bg-primary text-white px-4 py-2 rounded-lg"
                  >
                    {t.nav?.login || 'Login'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal - Only allowed on homepage */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        initialMode={loginModalMode}
        allowedPaths={['/']}
      />
    </>
  );
};

export default Navbar;