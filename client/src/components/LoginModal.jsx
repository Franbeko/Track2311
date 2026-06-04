import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaEnvelope, FaLock, FaEye, FaEyeSlash, FaTimes, 
  FaUser, FaPhone, FaArrowRight, FaGoogle,
  FaShieldAlt, FaHeadset, FaChartLine, FaCheckCircle,
  FaExclamationTriangle, FaTimesCircle
} from 'react-icons/fa';
import { useAuth } from '../context/useAuth';
import toast from 'react-hot-toast';

const LoginModal = ({ isOpen, onClose, initialMode = 'login', allowedPaths = ['/'] }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Load remembered email when modal opens
  const loadRememberedEmail = () => {
    if (isOpen && !loginEmail) {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail && !loginEmail) {
        setLoginEmail(rememberedEmail);
        setRememberMe(true);
      }
    }
  };

  if (isOpen && !loginEmail) {
    loadRememberedEmail();
  }

  // Check if modal should be allowed on current page
  const isModalAllowed = allowedPaths.includes(location.pathname);

  // Reset form when modal closes
  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    setRegPassword('');
    setRegConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
    setRememberMe(false);
  };

  // Handle modal close
  const handleModalClose = () => {
    resetForms();
    onClose();
  };

  // Close modal if not allowed on current page
  if (isOpen && !isModalAllowed) {
    onClose();
    return null;
  }

  // Google login handler
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(loginEmail, loginPassword);
    setIsLoading(false);
    if (success) {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', loginEmail);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      handleModalClose();
      navigate('/');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (regPassword !== regConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (regPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    const success = await register(regName, regEmail, regPassword, regPhone);
    setIsLoading(false);
    if (success) {
      handleModalClose();
      navigate('/');
    }
  };

  // Calculate password strength
  const getPasswordStrength = (password) => {
    if (!password || password.length === 0) {
      return {
        score: 0,
        text: '',
        color: '',
        bgColor: '',
        icon: null,
        requirements: {
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          special: false
        }
      };
    }

    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    const metCount = Object.values(requirements).filter(Boolean).length;
    
    if (metCount <= 2) {
      return {
        score: 1,
        text: 'Weak',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: <FaTimesCircle className="text-red-600" />,
        requirements
      };
    } else if (metCount <= 3) {
      return {
        score: 2,
        text: 'Medium',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        icon: <FaExclamationTriangle className="text-yellow-600" />,
        requirements
      };
    } else {
      return {
        score: 3,
        text: 'Strong',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: <FaCheckCircle className="text-green-600" />,
        requirements
      };
    }
  };

  const passwordStrength = getPasswordStrength(regPassword);

  // Don't render modal if not allowed on current page
  if (!isOpen || !isModalAllowed) return null;

  return (
    <AnimatePresence>
      {isOpen && isModalAllowed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Logo & Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4">
                  <img 
                    src="/images/logo/logo.png" 
                    alt="Track2311 Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                          <span class="text-accent text-3xl font-bold">T</span>
                        </div>
                      `;
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-primary">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {mode === 'login' 
                    ? 'Sign in to access your investment dashboard' 
                    : 'Join Track2311 and start your investment journey'}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="flex gap-2 bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    mode === 'login'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    mode === 'register'
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Login Form */}
              {mode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        handleModalClose();
                        navigate('/forgot-password');
                      }}
                      className="text-sm text-primary hover:text-accent transition font-semibold"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      "Logging in..."
                    ) : (
                      <>
                        Login
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Register Form */}
              {mode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Phone Number (Optional)</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+123 456 7890"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Password Field with Strength Indicator */}
                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimum 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    
                    {regPassword.length > 0 && (
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-300 rounded-full ${
                                passwordStrength.score === 1 ? 'w-1/3 bg-red-500' :
                                passwordStrength.score === 2 ? 'w-2/3 bg-yellow-500' :
                                passwordStrength.score === 3 ? 'w-full bg-green-500' : 'w-0'
                              }`}
                            />
                          </div>
                          <div className={`flex items-center gap-1 text-xs font-medium ${passwordStrength.color}`}>
                            {passwordStrength.icon}
                            <span>{passwordStrength.text}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs space-y-1">
                          <p className="text-gray-500 mb-1">Password must contain:</p>
                          <div className="grid grid-cols-2 gap-1">
                            <div className={`flex items-center gap-1 ${passwordStrength.requirements.length ? 'text-green-600' : 'text-gray-400'}`}>
                              {passwordStrength.requirements.length ? <FaCheckCircle className="text-xs" /> : <FaTimesCircle className="text-xs" />}
                              <span>At least 8 characters</span>
                            </div>
                            <div className={`flex items-center gap-1 ${passwordStrength.requirements.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                              {passwordStrength.requirements.uppercase ? <FaCheckCircle className="text-xs" /> : <FaTimesCircle className="text-xs" />}
                              <span>Uppercase letter</span>
                            </div>
                            <div className={`flex items-center gap-1 ${passwordStrength.requirements.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                              {passwordStrength.requirements.lowercase ? <FaCheckCircle className="text-xs" /> : <FaTimesCircle className="text-xs" />}
                              <span>Lowercase letter</span>
                            </div>
                            <div className={`flex items-center gap-1 ${passwordStrength.requirements.number ? 'text-green-600' : 'text-gray-400'}`}>
                              {passwordStrength.requirements.number ? <FaCheckCircle className="text-xs" /> : <FaTimesCircle className="text-xs" />}
                              <span>Number</span>
                            </div>
                            <div className={`flex items-center gap-1 col-span-2 ${passwordStrength.requirements.special ? 'text-green-600' : 'text-gray-400'}`}>
                              {passwordStrength.requirements.special ? <FaCheckCircle className="text-xs" /> : <FaTimesCircle className="text-xs" />}
                              <span>Special character (!@#$%^&*)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold text-sm mb-2">Confirm Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {regConfirmPassword.length > 0 && regPassword !== regConfirmPassword && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <FaTimesCircle className="text-xs" /> Passwords do not match
                      </p>
                    )}
                    {regConfirmPassword.length > 0 && regPassword === regConfirmPassword && regPassword.length > 0 && (
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <FaCheckCircle className="text-xs" /> Passwords match
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                  >
                    {isLoading ? (
                      "Creating Account..."
                    ) : (
                      <>
                        Create Account
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Social Login Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Google Login Button Only */}
              <div className="grid grid-cols-1 gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition group"
                >
                  <FaGoogle className="text-red-500 text-lg" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {mode === 'login' ? 'Sign in with Google' : 'Sign up with Google'}
                  </span>
                </button>
              </div>

              {/* Features Footer */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <FaShieldAlt className="text-primary text-sm mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Secure</p>
                  </div>
                  <div>
                    <FaHeadset className="text-primary text-sm mx-auto mb-1" />
                    <p className="text-xs text-gray-500">24/7 Support</p>
                  </div>
                  <div>
                    <FaChartLine className="text-primary text-sm mx-auto mb-1" />
                    <p className="text-xs text-gray-500">Live Updates</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;