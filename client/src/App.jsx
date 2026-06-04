import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import LanguageModal from './components/LanguageModal';
import LoginModal from './components/LoginModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { LanguageProvider } from './context/LanguageContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Shareholders = lazy(() => import('./pages/Shareholders'));
const InvestmentPlans = lazy(() => import('./pages/InvestmentPlans'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contact = lazy(() => import('./pages/Contact'));
const Account = lazy(() => import('./pages/Account'));
const Team = lazy(() => import('./pages/Team'));
const Gallery = lazy(() => import('./pages/Gallery'));
const BlogNews = lazy(() => import('./pages/BlogNews'));
const BlogInvestmentTips = lazy(() => import('./pages/BlogInvestmentTips'));
const BlogMarketUpdates = lazy(() => import('./pages/BlogMarketUpdates'));
const BlogSuccessStories = lazy(() => import('./pages/BlogSuccessStories'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Terms = lazy(() => import('./pages/Terms'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Careers = lazy(() => import('./pages/Careers'));
const AuthSuccess = lazy(() => import('./pages/AuthSuccess'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Wrapper component to access useAuth
const AppContent = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shareholders" element={<Shareholders />} />
            <Route path="/plans" element={<InvestmentPlans />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog/news" element={<BlogNews />} />
            <Route path="/blog/investment-tips" element={<BlogInvestmentTips />} />
            <Route path="/blog/market-updates" element={<BlogMarketUpdates />} />
            <Route path="/blog/success-stories" element={<BlogSuccessStories />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/account" element={<Account />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            
            {/* Redirect login and register to home */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <LiveChat />
      <LanguageModal />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        initialMode="login"
        allowedPaths={['/']}
      />
      <Toaster position="top-right" />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <LanguageProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <AppContent />
            </div>
          </Router>
        </LanguageProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;