import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaShieldAlt, FaHeadset, FaChartLine } from 'react-icons/fa';
import { useAuth } from '../context/useAuth';
import SEO from '../components/SEO';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      navigate('/dashboard');
    }
  };

  // Load remembered email on component mount
  useState(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      <SEO 
        title="Login - Track2311 Investment Account"
        description="Login to your Track2311 investment account to access your dashboard, track agricultural investments, view returns, and manage your portfolio securely."
        keywords="login, investment account, Track2311 login, sign in, investment dashboard, account access"
        robots="noindex, nofollow"
      />
      
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header with animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaChartLine className="text-accent text-2xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Sign in to access your investment dashboard</p>
            </motion.div>

            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  {/* Remember Me & Forgot Password */}
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
                    <Link to="/forgot-password" className="text-sm text-primary hover:text-accent transition font-semibold">
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
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

                {/* Register Link */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary font-semibold hover:text-accent transition">
                      Create Account
                    </Link>
                  </p>
                </div>

                {/* Demo Credentials (Optional - for testing) */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-center text-gray-400 mb-3">Demo Credentials</p>
                  <div className="flex justify-center gap-4 text-xs">
                    <div className="bg-gray-50 px-3 py-1 rounded">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-primary font-semibold ml-1">demo@track2311.com</span>
                    </div>
                    <div className="bg-gray-50 px-3 py-1 rounded">
                      <span className="text-gray-500">Password:</span>
                      <span className="text-primary font-semibold ml-1">••••••</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            >
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                <FaShieldAlt className="text-primary text-2xl mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Secure Login</h3>
                <p className="text-xs text-gray-500 mt-1">256-bit SSL encryption</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                <FaHeadset className="text-primary text-2xl mx-auto mb-2" />
                <h3 className="font-semibold text-sm">24/7 Support</h3>
                <p className="text-xs text-gray-500 mt-1">Dedicated assistance</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                <FaChartLine className="text-primary text-2xl mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Real-time Dashboard</h3>
                <p className="text-xs text-gray-500 mt-1">Track investments live</p>
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8"
            >
              <p className="text-sm text-gray-500">
                Having trouble logging in?{' '}
                <Link to="/contact" className="text-primary font-semibold hover:text-accent transition">
                  Contact Support
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;