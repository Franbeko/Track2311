/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import apiClient from '../utils/axiosConfig';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Helper function to get initial user from localStorage (runs BEFORE React renders)
function getInitialUser() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  // Set the API header immediately
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
  // Try to get user from localStorage
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
  
  // If no user data, extract from token
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userFromToken = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
      name: payload.email.split('@')[0]
    };
    localStorage.setItem('user', JSON.stringify(userFromToken));
    return userFromToken;
  } catch (error) {
    console.error('Error extracting user from token:', error);
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  // Initialize state with the function - this runs before rendering
  const [user, setUser] = useState(getInitialUser);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Social Login (Google)
  const socialLogin = (token, userData) => {
    console.log('socialLogin called once');
    
    // Save to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Set apiClient default header
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Update state
    setUser(userData);
    
    // Show success message
    toast.success(`Welcome ${userData.name}!`);
    
    // Close modal if open
    closeLoginModal();
  };

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/api/auth/login', {
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      toast.success('Login successful!');
      closeLoginModal();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (name, email, password, phone) => {
    try {
      const response = await apiClient.post('/api/auth/register', {
        name,
        email,
        password,
        phone
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      toast.success('Registration successful!');
      closeLoginModal();
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout,
      socialLogin,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal
    }}>
      {children}
    </AuthContext.Provider>
  );
};