import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import toast from 'react-hot-toast';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { socialLogin } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed.current) return;
    
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userParam = params.get('user');
    
    console.log('AuthSuccess - Processing login...');
    
    if (token && userParam && !hasProcessed.current) {
      hasProcessed.current = true;
      
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        console.log('AuthSuccess - User logged in:', userData.email);
        
        // Call socialLogin to save user data
        socialLogin(token, userData);
        
        // Redirect to home page
        navigate('/', { replace: true });
        
      } catch (error) {
        console.error('AuthSuccess - Error:', error);
        toast.error('Login failed. Please try again.');
        navigate('/', { replace: true });
      }
    } else if (!token || !userParam) {
      navigate('/', { replace: true });
    }
  }, [location, navigate, socialLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;