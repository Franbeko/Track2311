import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { 
  FaUsers, FaEnvelope, FaBriefcase, FaChartLine, 
  FaCheckCircle, FaTrash,
  FaSpinner, FaSignOutAlt
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, logout, openLoginModal } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  
  const adminEmails = ['egsmithjr@track2311investments.org', 'franciskhhaizel@gmail.com'];
  const isAdmin = user && adminEmails.includes(user.email);

  // FIX: This initializes loading to true ONLY if there is a valid logged-in admin.
  // If there is no user, it initializes to false immediately, preventing the linter warning entirely.
  const [loading, setLoading] = useState(!!(user && isAdmin));
  
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalApplications: 0,
    totalSubscribers: 0,
    unreadContacts: 0
  });

  // 1. Handle Navigation Redirect Safely
  useEffect(() => {
    if (user && !isAdmin) {
      toast.error('Access denied. Admin only.');
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  // 2. Main API Processing Loop - WARNING COMPLETELY RESOLVED
  useEffect(() => {
    // If the session isn't an authorized admin, do nothing. 
    // Loading is already false from our initial state assignment above, so no setLoading(false) is needed here!
    if (!user || !isAdmin) return;

    const loadAllData = () => {
      setLoading(true);
      
      Promise.all([
        apiClient.get('/api/admin/contacts'),
        apiClient.get('/api/admin/applications'),
        apiClient.get('/api/admin/newsletter'),
        apiClient.get('/api/admin/stats')
      ])
        .then(([contactsRes, appsRes, subsRes, statsRes]) => {
          setContacts(contactsRes?.data || []);
          setApplications(appsRes?.data || []);
          setSubscribers(subsRes?.data || []);
          setStats(statsRes?.data || { totalContacts: 0, unreadContacts: 0, totalApplications: 0, totalSubscribers: 0 });
        })
        .catch((err) => {
          console.error("API Fetch Error:", err);
          toast.error(`Failed to load server data: ${err?.response?.data?.message || 'Network Error'}`);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    
    loadAllData();
  }, [user, isAdmin]);

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out');
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

  // State A: Component background processing spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data modules...</p>
        </div>
      </div>
    );
  }

  // State B: Missing Credentials Fallback
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal Locked</h2>
          <p className="text-gray-500 mb-6 text-sm">
            You must be signed in with an authorized corporate administrative account to access these system data logs.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={openLoginModal} 
              className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all duration-200"
            >
              Sign In to Management Console
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 text-sm"
            >
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
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm opacity-90">Welcome back, {user?.name || 'Admin'}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs opacity-75">{user?.email}</p>
            </div>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 font-semibold ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaChartLine className="inline mr-2" /> Overview
            </button>
            <button onClick={() => setActiveTab('contacts')} className={`px-6 py-3 font-semibold ${activeTab === 'contacts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaEnvelope className="inline mr-2" /> Messages ({stats.unreadContacts})
            </button>
            <button onClick={() => setActiveTab('applications')} className={`px-6 py-3 font-semibold ${activeTab === 'applications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaBriefcase className="inline mr-2" /> Applications
            </button>
            <button onClick={() => setActiveTab('subscribers')} className={`px-6 py-3 font-semibold ${activeTab === 'subscribers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
              <FaUsers className="inline mr-2" /> Subscribers
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between">
                  <div><p className="text-gray-500 text-sm">Messages</p><p className="text-3xl font-bold">{stats.totalContacts}</p></div>
                  <FaEnvelope className="text-4xl text-gray-300" />
                </div>
                {stats.unreadContacts > 0 && <p className="text-sm text-red-500 mt-2">{stats.unreadContacts} unread</p>}
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between">
                  <div><p className="text-gray-500 text-sm">Applications</p><p className="text-3xl font-bold">{stats.totalApplications}</p></div>
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
              <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
              {!contacts || contacts.length === 0 ? <p className="text-gray-500">No messages found</p> : contacts.slice(0, 5).map(c => (
                <div key={c._id} className="flex justify-between items-center p-3 border-b">
                  <div><p className="font-semibold">{c.name}</p><p className="text-sm text-gray-500">{c.email}</p></div>
                  {!c.isRead && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">New</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacts */}
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

        {/* Applications */}
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

        {/* Subscribers */}
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