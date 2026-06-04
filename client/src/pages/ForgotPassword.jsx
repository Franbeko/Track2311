import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaShieldAlt, FaHeadset, FaChartLine } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/password-reset/request', { email });
      toast.success(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Forgot Password - Reset Your Account"
        description="Reset your Track2311 account password. Enter your email address to receive a secure password reset link. Fast and secure password recovery for your investment account."
        keywords="forgot password, password reset, recover password, reset password, account recovery, Track2311 password"
        robots="noindex, nofollow"
      />
      
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaShieldAlt className="text-accent text-2xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Forgot Password?</h1>
              <p className="text-gray-500 mt-2">No worries! We'll send you a reset link</p>
            </motion.div>

            {/* Forgot Password Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                      <p className="text-xs text-gray-500 mt-2">
                        Enter the email address associated with your account
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
                    </button>
                  </form>
                ) : (
                  <div className="text-center">
                    <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-primary mb-2">Check Your Email</h3>
                    <p className="text-gray-600 mb-4">
                      We've sent a password reset link to <strong>{email}</strong>
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                      Click the link in the email to reset your password. The link will expire in 1 hour.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-primary hover:text-accent font-semibold transition"
                    >
                      Didn't receive the email? Try again
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Back to Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mt-6"
            >
              <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition">
                <FaArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
            >
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                <FaShieldAlt className="text-primary text-2xl mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Secure Process</h3>
                <p className="text-xs text-gray-500 mt-1">Your data is protected</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                <FaHeadset className="text-primary text-2xl mx-auto mb-2" />
                <h3 className="font-semibold text-sm">24/7 Support</h3>
                <p className="text-xs text-gray-500 mt-1">Help when you need it</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
                <FaChartLine className="text-primary text-2xl mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Quick Recovery</h3>
                <p className="text-xs text-gray-500 mt-1">Fast password reset</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;