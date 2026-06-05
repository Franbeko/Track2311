import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEye, FaEyeSlash, FaArrowLeft, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import apiClient from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verifying, setVerifying] = useState(true);

  // Verify token on load
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await apiClient.get(`/api/password-reset/verify/${token}`);
        if (response.status === 200) {
          setIsTokenValid(true);
        }
      } catch (error) {
        setIsTokenValid(false);
        toast.error(error.response?.data?.message || 'Invalid or expired reset link');
      } finally {
        setVerifying(false);
      }
    };
    
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiClient.post('/api/password-reset/reset', {
        token,
        password,
        confirmPassword
      });
      
      toast.success(response.data.message);
      setIsSubmitted(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (verifying) {
    return (
      <>
        <SEO 
          title="Verifying Reset Link - Track2311"
          description="Verifying your password reset link for Track2311 investment account. Please wait while we confirm your request."
          keywords="reset password, verify link, password recovery"
          robots="noindex, nofollow"
        />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying your reset link...</p>
          </div>
        </div>
      </>
    );
  }

  if (!isTokenValid) {
    return (
      <>
        <SEO 
          title="Invalid Reset Link - Track2311"
          description="This password reset link is invalid or has expired. Please request a new password reset link for your Track2311 investment account."
          keywords="invalid reset link, expired link, password reset"
          robots="noindex, nofollow"
        />
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-3">Invalid or Expired Link</h2>
                <p className="text-gray-600 mb-6">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <Link to="/forgot-password" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition">
                  Request New Reset Link
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isSubmitted) {
    return (
      <>
        <SEO 
          title="Password Reset Successful - Track2311"
          description="Your Track2311 account password has been successfully reset. You can now log in with your new password and continue managing your investments."
          keywords="password reset success, password changed, account updated"
          robots="noindex, nofollow"
        />
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-primary mb-3">Password Reset Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Your password has been changed successfully. You will be redirected to login page.
                </p>
                <Link to="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition">
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Reset Password - Track2311"
        description="Create a new password for your Track2311 investment account. Enter your new password to regain access to your dashboard and investments."
        keywords="reset password, new password, create password, account recovery"
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
                <FaLock className="text-accent text-2xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Create New Password</h1>
              <p className="text-gray-500 mt-2">Enter your new password below</p>
            </motion.div>

            {/* Reset Password Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">New Password</label>
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
                    <p className="text-xs text-gray-500 mt-2">
                      Password must be at least 6 characters
                    </p>
                  </div>

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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Resetting Password...' : 'Reset Password'}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition">
                <FaArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>

            {/* Security Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8"
            >
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaShieldAlt className="text-accent" />
                <span>Secure encrypted connection</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;