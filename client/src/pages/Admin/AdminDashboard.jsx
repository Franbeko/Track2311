import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { 
  FaUsers, FaEnvelope, FaBriefcase, FaChartLine, 
  FaCheckCircle, FaTrash, FaSpinner, FaEdit, FaSave, FaUserShield
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, openLoginModal } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  // System Administration States
  const [users, setUsers] = useState([]);
  const [siteContent, setSiteContent] = useState({
    contactPhone: '',
    contactEmail: '',
    aboutCompanyMission: '',
    homeSlide1Title: '',
    homeSlide1Subtitle: '',
    homeSlide2Title: '',
    homeSlide2Subtitle: '',
    homeSlide3Title: '',
    homeSlide3Subtitle: '',
    homeAboutHeading: '',
    homeAboutQuote: '',
    homeAboutDescription1: '',
    homeAboutDescription2: '',
    homeCtaTitle: '',
    homeCtaDescription: ''
  });
  const [isSavingContent, setIsSavingContent] = useState(false);
  
  const adminEmails = ['egsmithjr@track2311investments.org', 'franciskhhaizel@gmail.com'];
  const isAdmin = user && adminEmails.includes(user.email);

  const [stats, setStats] = useState({
    totalContacts: 0,
    totalApplications: 0,
    totalSubscribers: 0,
    unreadContacts: 0,
    totalUsers: 0
  });

  useEffect(() => {
    if (user && !isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (!user || !isAdmin) return;

    const loadAllData = () => {
      setLoading(true);
      
      Promise.all([
        apiClient.get('/api/admin/contacts'),
        apiClient.get('/api/admin/applications'),
        apiClient.get('/api/admin/newsletter'),
        apiClient.get('/api/admin/stats'),
        apiClient.get('/api/admin/users'),
        apiClient.get('/api/admin/content')
      ])
        .then(([contactsRes, appsRes, subsRes, statsRes, usersRes, contentRes]) => {
          setContacts(contactsRes?.data || []);
          setApplications(appsRes?.data || []);
          setSubscribers(subsRes?.data || []);
          setUsers(usersRes?.data || []);
          
          if (contentRes?.data) {
            setSiteContent(prev => ({ ...prev, ...contentRes.data }));
          }
          
          setStats(statsRes?.data || { 
            totalContacts: 0, unreadContacts: 0, totalApplications: 0, totalSubscribers: 0, totalUsers: 0 
          });
        })
        .catch((err) => {
          console.error("API Fetch Error:", err);
          toast.error(`Failed to load server modules: ${err?.response?.data?.message || 'Network Error'}`);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    
    loadAllData();
  }, [user, isAdmin]);

  const handleContentChange = (key, value) => {
    setSiteContent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveWebsiteContent = async () => {
    try {
      setIsSavingContent(true);
      await apiClient.put('/api/admin/content', siteContent);
      toast.success('Website CMS values successfully pushed live!');
    } catch (err) {
      console.error("CMS Save failure:", err);
      toast.error('Failed to update live text properties');
    } finally {
      setIsSavingContent(false);
    }
  };

  const deleteUserAccount = async (id) => {
    if (!window.confirm('Permanently wipe this user account entry?')) return;
    try {
      await apiClient.delete(`/api/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      setStats(prev => ({ ...prev, totalUsers: Math.max(0, prev.totalUsers - 1) }));
      toast.success('Account removed');
    } catch {
      toast.error('Failed to remove targeted user account');
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiClient.put(`/api/admin/contacts/${id}/read`);
      setContacts(contacts.map(c => c._id === id ? { ...c, isRead: true } : c));
      setStats(prev => ({ ...prev, unreadContacts: Math.max(0, prev.unreadContacts - 1) }));
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to update message status');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await apiClient.delete(`/api/admin/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete contact');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await apiClient.put(`/api/admin/applications/${id}/status`, { status: newStatus });
      setApplications(applications.map(a => a._id === id ? { ...a, status: newStatus } : a));
      toast.success(`Status updated to: ${newStatus}`);
    } catch {
      toast.error('Failed to change application status');
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await apiClient.delete(`/api/admin/applications/${id}`);
      setApplications(applications.filter(a => a._id !== id));
      toast.success('Deleted');
    } catch {
      toast.error('Failed to delete application');
    }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return;
    try {
      await apiClient.delete(`/api/admin/newsletter/${id}`);
      setSubscribers(subscribers.filter(s => s._id !== id));
      toast.success('Removed');
    } catch {
      toast.error('Failed to remove subscriber');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal Locked</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Authorized Webmaster accounts only.
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={openLoginModal} className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200">
              Authenticate Console Session
            </button>
            <button onClick={() => navigate('/')} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 text-sm">
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">Webmaster Management Center</h1>
            <p className="text-sm opacity-90">Live CMS Editing Workspace enabled</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs opacity-75">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaChartLine className="inline mr-2" /> Overview
            </button>
            <button onClick={() => setActiveTab('cms')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'cms' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaEdit className="inline mr-2" /> Edit Homepage Text
            </button>
            <button onClick={() => setActiveTab('users')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaUserShield className="inline mr-2" /> Manage Users ({stats.totalUsers || 0})
            </button>
            <button onClick={() => setActiveTab('contacts')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'contacts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaEnvelope className="inline mr-2" /> Inquiries ({stats.unreadContacts})
            </button>
            <button onClick={() => setActiveTab('applications')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'applications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaBriefcase className="inline mr-2" /> Job Applications
            </button>
            <button onClick={() => setActiveTab('subscribers')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'subscribers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaUsers className="inline mr-2" /> Subscribers
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid View Content Panels */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Overview Panel */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between">
                  <div><p className="text-gray-500 text-sm">System Users</p><p className="text-3xl font-bold">{stats.totalUsers || 0}</p></div>
                  <FaUsers className="text-4xl text-gray-300" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between">
                  <div><p className="text-gray-500 text-sm">Messages</p><p className="text-3xl font-bold">{stats.totalContacts}</p></div>
                  <FaEnvelope className="text-4xl text-gray-300" />
                </div>
                {stats.unreadContacts > 0 && <p className="text-sm text-red-500 mt-2">{stats.unreadContacts} unread</p>}
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between">
                  <div><p className="text-gray-500 text-sm">Job Applications</p><p className="text-3xl font-bold">{stats.totalApplications}</p></div>
                  <FaBriefcase className="text-4xl text-gray-300" />
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between">
                  <div><p className="text-gray-500 text-sm">Subscribers</p><p className="text-3xl font-bold">{stats.totalSubscribers}</p></div>
                  <FaUsers className="text-4xl text-gray-300" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Recent Dashboard Form Messages</h2>
              {!contacts || contacts.length === 0 ? <p className="text-gray-500">No messages found</p> : contacts.slice(0, 5).map(c => (
                <div key={c._id} className="flex justify-between items-center p-3 border-b">
                  <div><p className="font-semibold">{c.name}</p><p className="text-sm text-gray-500">{c.email}</p></div>
                  {!c.isRead && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">New</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Core CMS Webmaster Panel Tab */}
        {activeTab === 'cms' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Dynamic UI Text Copywriter Management</h2>
                <p className="text-sm text-gray-500">Instantly update text blocks displaying across the public Homepage container modules.</p>
              </div>
              <button 
                onClick={saveWebsiteContent} 
                disabled={isSavingContent}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow flex items-center gap-2 transition-all disabled:opacity-50"
              >
                {isSavingContent ? <FaSpinner className="animate-spin" /> : <FaSave />} Push Live Updates
              </button>
            </div>

            <div className="space-y-6">
              {/* Carousel Slider Panel Sections */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-primary mb-4 border-b pb-2 text-base">🎪 Hero Slider Items Content</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border shadow-inner space-y-3">
                    <span className="text-xs font-extrabold text-accent tracking-wider uppercase">Slide Card #1</span>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Slide Header Title</label>
                      <input type="text" value={siteContent.homeSlide1Title} onChange={(e) => handleContentChange('homeSlide1Title', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Slide Subtitle Paragraph</label>
                      <textarea rows="2" value={siteContent.homeSlide1Subtitle} onChange={(e) => handleContentChange('homeSlide1Subtitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border shadow-inner space-y-3">
                    <span className="text-xs font-extrabold text-accent tracking-wider uppercase">Slide Card #2</span>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Slide Header Title</label>
                      <input type="text" value={siteContent.homeSlide2Title} onChange={(e) => handleContentChange('homeSlide2Title', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Slide Subtitle Paragraph</label>
                      <textarea rows="2" value={siteContent.homeSlide2Subtitle} onChange={(e) => handleContentChange('homeSlide2Subtitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border shadow-inner space-y-3">
                    <span className="text-xs font-extrabold text-accent tracking-wider uppercase">Slide Card #3</span>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Slide Header Title</label>
                      <input type="text" value={siteContent.homeSlide3Title} onChange={(e) => handleContentChange('homeSlide3Title', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Slide Subtitle Paragraph</label>
                      <textarea rows="2" value={siteContent.homeSlide3Subtitle} onChange={(e) => handleContentChange('homeSlide3Subtitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Homepage About Us String Content Configuration Forms */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-primary mb-4 border-b pb-2 text-base">📖 About Us Panel Strings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">MAIN SECTION HEADING TITLE</label>
                    <input type="text" value={siteContent.homeAboutHeading} onChange={(e) => handleContentChange('homeAboutHeading', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm font-semibold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">FEATURED QUOTATION CAPTION BLOCK</label>
                    <input type="text" value={siteContent.homeAboutQuote} onChange={(e) => handleContentChange('homeAboutQuote', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm italic" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">CORE DESCRIPTION PARAGRAPH BLOCK #1</label>
                    <textarea rows="3" value={siteContent.homeAboutDescription1} onChange={(e) => handleContentChange('homeAboutDescription1', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">CORE DESCRIPTION PARAGRAPH BLOCK #2</label>
                    <textarea rows="3" value={siteContent.homeAboutDescription2} onChange={(e) => handleContentChange('homeAboutDescription2', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                  </div>
                </div>
              </div>

              {/* Call To Action Block Fields */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-primary mb-4 border-b pb-2 text-base">📢 Bottom CTA Section Text</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">CTA BOX HEADER HEADING</label>
                    <input type="text" value={siteContent.homeCtaTitle} onChange={(e) => handleContentChange('homeCtaTitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">CTA BOX SUMMARY PARAGRAPH DESCRIPTION</label>
                    <textarea rows="2" value={siteContent.homeCtaDescription} onChange={(e) => handleContentChange('homeCtaDescription', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                  </div>
                </div>
              </div>

              {/* Header/Footer Global Company Information Configurations */}
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-primary mb-4 border-b pb-2 text-base">📞 Corporate Global Metadata Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">OFFICIAL FARMER SUPPORT TELEPHONE LINE</label>
                    <input type="text" value={siteContent.contactPhone} onChange={(e) => handleContentChange('contactPhone', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">SUPPORT RECEPTOR SYSTEM EMAIL</label>
                    <input type="email" value={siteContent.contactEmail} onChange={(e) => handleContentChange('contactEmail', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1">GLOBAL COMPANY MISSION STATEMENT LAYOUT</label>
                    <textarea rows="2" value={siteContent.aboutCompanyMission} onChange={(e) => handleContentChange('aboutCompanyMission', e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* User Directory Matrix */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">User Administration Accounts</h2>
            </div>
            {!users || users.length === 0 ? <div className="p-12 text-center text-gray-500">No registered user entries found</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Email Address</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">System Role</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Registered Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(u => (
                      <tr key={u._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{u.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                            {u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {adminEmails.includes(u.email) ? (
                            <span className="text-xs text-gray-400 italic">Protected Master Admin</span>
                          ) : (
                            <button onClick={() => deleteUserAccount(u._id)} className="text-red-600 hover:text-red-900 transition-colors" title="Delete User Account">
                              <FaTrash />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Inquiries Messages Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50"><h2 className="text-xl font-bold">Contact Messages</h2></div>
            {!contacts || contacts.length === 0 ? <div className="p-12 text-center text-gray-500">No messages</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Message</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(c => (
                      <tr key={c._id} className={!c.isRead ? 'bg-blue-50' : ''}>
                        <td className="px-6 py-4">{c.name}</td>
                        <td className="px-6 py-4">{c.email}</td>
                        <td className="px-6 py-4 max-w-xs truncate">{c.message}</td>
                        <td className="px-6 py-4">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-6 py-4 space-x-2">
                          {!c.isRead && <button onClick={() => markAsRead(c._id)} className="text-green-600"><FaCheckCircle /></button>}
                          <button onClick={() => deleteContact(c._id)} className="text-red-600"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Job Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50"><h2 className="text-xl font-bold">Job Applications</h2></div>
            {!applications || applications.length === 0 ? <div className="p-12 text-center text-gray-500">No applications</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Position</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(a => (
                      <tr key={a._id}>
                        <td className="px-6 py-4">{a.fullName}</td>
                        <td className="px-6 py-4">{a.email}</td>
                        <td className="px-6 py-4">{a.jobTitle}</td>
                        <td className="px-6 py-4">
                          <select value={a.status || 'pending'} onChange={(e) => updateStatus(a._id, e.target.value)} className="text-xs px-2 py-1 rounded-full bg-yellow-100">
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteApplication(a._id)} className="text-red-600"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Newsletter Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50"><h2 className="text-xl font-bold">Newsletter Subscribers</h2></div>
            {!subscribers || subscribers.length === 0 ? <div className="p-12 text-center text-gray-500">No subscribers</div> : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Date</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map(s => (
                      <tr key={s._id}>
                        <td className="px-6 py-4">{s.email}</td>
                        <td className="px-6 py-4">{s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : 'N/A'}</td>
                        <td className="px-6 py-4">
                          <button onClick={() => deleteSubscriber(s._id)} className="text-red-600"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;