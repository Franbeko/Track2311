import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, 
  FaEdit, FaSave, FaTimes, FaArrowRight,
  FaShieldAlt, FaHeadset, FaChartLine, FaCheckCircle,
  FaHistory, FaBriefcase,
  FaQuestionCircle, FaMapMarkerAlt,
  FaUsers, FaHandshake, FaSeedling, FaKey
} from 'react-icons/fa';
import { useAuth } from '../context/useAuth';
import apiClient from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const Account = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Profile form state
  const [name, setName] = useState(user?.name || '');
  const email = user?.email || '';
  const [phone, setPhone] = useState(user?.phone || '');
  const [country, setCountry] = useState('Liberia');
  const [city, setCity] = useState('Monrovia');
  const [occupation, setOccupation] = useState('');
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [messagesLoaded, setMessagesLoaded] = useState(false);

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Member since
  const createdAt = user.createdAt;
  const memberSinceDate = createdAt ? new Date(createdAt) : new Date();
  const memberSince = memberSinceDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Load messages on demand when activity tab is clicked
  const loadMessages = async () => {
    if (!messagesLoaded && user?.email) {
      try {
        const response = await apiClient.get('/api/contact/user', {
          params: { email: user.email }
        });
        setUserMessages(response.data.slice(0, 5));
        setMessagesLoaded(true);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  // Load messages when activity tab becomes active
  if (activeTab === 'activity' && !messagesLoaded) {
    loadMessages();
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.put('/api/auth/update-profile', {
        name,
        phone,
        country,
        city,
        occupation
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.data.success) {
        toast.success('Profile updated successfully');
        const updatedUser = { ...user, name, phone };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await apiClient.put('/api/auth/change-password', {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      if (response.data.success) {
        toast.success('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setIsChangingPassword(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick stats cards
  const quickStats = [
    { icon: <FaSeedling className="text-lg" />, label: "Active Investments", value: "0", bgColor: "bg-emerald-50", textColor: "text-emerald-600" },
    { icon: <FaHandshake className="text-lg" />, label: "Partnerships", value: "0", bgColor: "bg-blue-50", textColor: "text-blue-600" },
    { icon: <FaUsers className="text-lg" />, label: "Referrals", value: "0", bgColor: "bg-purple-50", textColor: "text-purple-600" },
    { icon: <FaCalendarAlt className="text-lg" />, label: "Member Since", value: memberSince.split(',')[0], bgColor: "bg-amber-50", textColor: "text-amber-600" }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaChartLine /> },
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'activity', label: 'Activity', icon: <FaHistory /> }
  ];

  return (
    <>
      <SEO 
        title="My Account - Track2311"
        description="Manage your Track2311 account, view your profile, and track your agricultural investment journey."
        keywords="my account, profile, account settings, Track2311 account"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <FaUser className="text-3xl text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{name}</h1>
                  <div className="flex flex-wrap items-center gap-2 text-white/80 text-sm mt-1">
                    <FaCalendarAlt className="text-accent text-xs" />
                    <span>Member since {memberSince}</span>
                    <span className="w-1 h-1 bg-white/50 rounded-full hidden sm:inline-block"></span>
                    <FaCheckCircle className="text-green-400 text-xs" />
                    <span>Verified Account</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                      <FaUser className="text-white text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{name}</p>
                      <p className="text-xs text-gray-500 truncate">{email}</p>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1 ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <Link to="/faq" className="flex items-center gap-3 text-gray-500 hover:text-primary transition text-sm">
                    <FaQuestionCircle /> Help Center
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Quick Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickStats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className={`w-10 h-10 ${stat.bgColor} ${stat.textColor} rounded-lg flex items-center justify-center mb-3`}>
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">Welcome back, {name.split(' ')[0]}! 👋</h2>
                        <p className="text-gray-500 text-sm mt-1">
                          Track your agricultural investment journey from your personal dashboard.
                        </p>
                      </div>
                      <Link to="/plans" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition inline-flex items-center justify-center gap-2">
                        Explore Investments <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-5">
                      <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
                      <button 
                        onClick={() => setActiveTab('activity')}
                        className="text-accent text-sm hover:underline"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUser className="text-green-600 text-sm" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">Account Created</p>
                          <p className="text-xs text-gray-400 mt-1">{memberSince}</p>
                        </div>
                      </div>
                      {userMessages.length > 0 && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaEnvelope className="text-blue-600 text-sm" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">Contact Form Submitted</p>
                            <p className="text-xs text-gray-500 mt-0.5">{userMessages[0]?.message?.substring(0, 60)}...</p>
                            <p className="text-xs text-gray-400 mt-1">{new Date(userMessages[0]?.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Link to="/plans" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-primary/10 transition group">
                        <FaChartLine className="text-primary" />
                        <span className="text-sm text-gray-700">Investment Plans</span>
                      </Link>
                      <Link to="/contact" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-primary/10 transition group">
                        <FaHeadset className="text-primary" />
                        <span className="text-sm text-gray-700">Contact Support</span>
                      </Link>
                      <Link to="/faq" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-primary/10 transition group">
                        <FaQuestionCircle className="text-primary" />
                        <span className="text-sm text-gray-700">FAQs</span>
                      </Link>
                      <Link to="/team" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-primary/10 transition group">
                        <FaUsers className="text-primary" />
                        <span className="text-sm text-gray-700">Meet Our Team</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-accent hover:text-primary transition text-sm"
                      >
                        <FaEdit /> Edit Profile
                      </button>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FaUser className="text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Full Name</p>
                            <p className="font-medium text-gray-800">{name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FaEnvelope className="text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Email Address</p>
                            <p className="font-medium text-gray-800">{email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FaPhone className="text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Phone Number</p>
                            <p className="font-medium text-gray-800">{phone || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FaMapMarkerAlt className="text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="font-medium text-gray-800">{city}, {country}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FaBriefcase className="text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Occupation</p>
                            <p className="font-medium text-gray-800">{occupation || 'Not specified'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FaCalendarAlt className="text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Member Since</p>
                            <p className="font-medium text-gray-800">{memberSince}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProfile} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                          />
                          <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Optional"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">Country</label>
                          <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">City</label>
                          <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">Occupation</label>
                          <input
                            type="text"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            placeholder="e.g., Farmer, Investor, Agribusiness"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition flex items-center gap-2"
                        >
                          {isLoading ? 'Saving...' : <><FaSave /> Save Changes</>}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setName(user.name || '');
                            setPhone(user.phone || '');
                            setCountry('Liberia');
                            setCity('Monrovia');
                            setOccupation('');
                          }}
                          className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h2>
                  
                  {!isChangingPassword ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FaKey className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Password</p>
                            <p className="text-xs text-gray-500">••••••••</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsChangingPassword(true)}
                          className="text-accent text-sm font-semibold hover:underline"
                        >
                          Change Password
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FaShieldAlt className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">KYC Verification</p>
                            <p className="text-xs text-green-600">✓ Verified</p>
                          </div>
                        </div>
                        <Link to="/contact" className="text-accent text-sm font-semibold hover:underline">
                          Update Documents
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleChangePassword} className="space-y-5">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Current Password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                        <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition"
                        >
                          {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsChangingPassword(false);
                            setCurrentPassword('');
                            setNewPassword('');
                            setConfirmPassword('');
                          }}
                          className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-6">Activity History</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <p className="font-medium text-gray-800">Account Created</p>
                          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Completed</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">Your account was successfully created</p>
                        <p className="text-xs text-gray-400 mt-2">{memberSince}</p>
                      </div>
                    </div>
                    
                    {userMessages.length > 0 ? (
                      userMessages.map((msg, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaEnvelope className="text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap justify-between items-start gap-2">
                              <p className="font-medium text-gray-800">Contact Form Submission</p>
                              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Received</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{msg.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <FaHistory className="text-gray-300 text-4xl mx-auto mb-3" />
                        <p className="text-gray-500">No messages sent yet</p>
                        <Link to="/contact" className="text-primary text-sm hover:underline mt-2 inline-block">
                          Send your first inquiry →
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;