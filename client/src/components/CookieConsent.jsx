import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show the modal after a short delay
      const timer = setTimeout(() => setShowConsent(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="cookie-consent-modal" style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: 'auto',
      zIndex: 9999,
      animation: 'slideInUp 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        width: '380px',
        maxWidth: 'calc(100vw - 40px)',
        overflow: 'hidden',
        border: '1px solid #e9ecef'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: '#f8f9fa',
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '20px' }}>🍪</span>
          <span style={{ fontWeight: '600', color: '#1a1a2e' }}>Cookie Consent</span>
        </div>
        
        {/* Body */}
        <div style={{ padding: '20px' }}>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.5', color: '#555' }}>
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
          <div style={{ marginBottom: '16px' }}>
            <Link 
              to="/cookie-policy" 
              style={{ 
                color: '#667eea', 
                fontSize: '13px', 
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Learn more →
            </Link>
          </div>
          
          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={acceptCookies}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: '#1a1a2e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#2d2d4e'}
              onMouseLeave={(e) => e.target.style.background = '#1a1a2e'}
            >
              Accept
            </button>
            <button
              onClick={declineCookies}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: 'white',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '13px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f8f9fa';
                e.target.style.borderColor = '#ccc';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#ddd';
              }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;