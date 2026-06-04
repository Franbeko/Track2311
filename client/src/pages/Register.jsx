import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, 
  FaCheckCircle, FaArrowRight, FaShieldAlt, FaHeadset, FaChartLine
} from 'react-icons/fa';
import { useAuth } from '../context/useAuth';
import SEO from '../components/SEO';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setIsLoading(true);
    const success = await register(name, email, password, phone);
    setIsLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <SEO 
        title="Create Account - Register with Track2311"
        description="Create your Track2311 investment account to start investing in Liberian agriculture. Fast, secure registration process. Join thousands of satisfied investors today."
        keywords="register, create account, sign up, investment account, Track2311 registration, start investing, agriculture investment"
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
                <FaUser className="text-accent text-2xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Create Account</h1>
              <p className="text-gray-500 mt-2">Join Track2311 and start your investment journey</p>
            </motion.div>

            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>

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

                  {/* Phone Number Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number (Optional)</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+231 77 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
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

                  {/* Confirm Password Field */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Confirm Password</label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                  </div>

                  {/* Password Requirements */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <p className="flex items-center gap-1">
                      <FaCheckCircle className="text-green-500 text-xs" />
                      Minimum 6 characters
                    </p>
                  </div>

                  {/* Register Button */}
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

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-semibold hover:text-accent transition">
                      Login here
                    </Link>
                  </p>
                </div>

                {/* Terms Agreement */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-center text-gray-400">
                    By creating an account, you agree to our{' '}
                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                  </p>
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
                <h3 className="font-semibold text-sm">Secure Registration</h3>
                <p className="text-xs text-gray-500 mt-1">Your data is protected</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                <FaHeadset className="text-primary text-2xl mx-auto mb-2" />
                <h3 className="font-semibold text-sm">24/7 Support</h3>
                <p className="text-xs text-gray-500 mt-1">Dedicated assistance</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                <FaChartLine className="text-primary text-2xl mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Start Investing</h3>
                <p className="text-xs text-gray-500 mt-1">Access investment plans</p>
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
                Need help registering?{' '}
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

export default Register;