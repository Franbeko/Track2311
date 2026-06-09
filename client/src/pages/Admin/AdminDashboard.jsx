import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { 
  FaUsers, FaEnvelope, FaBriefcase, FaChartLine, 
  FaCheckCircle, FaTrash, FaSpinner, FaSignOutAlt
} from 'react-icons/fa';

// Get user from localStorage DURING RENDER (not in useEffect)
function getUserFromLocalStorage() {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  
  if (!token) return null;
  
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Initialize user directly during render - NO useEffect needed!
  const [user] = useState(getUserFromLocalStorage);
  const [activeTab, setActiveTab] = useState('overview');
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalApplications: 0,
    totalSubscribers: 0,
    unreadContacts: 0
  });

  const adminEmails = ['egsmithjr@track2311investments.org', 'franciskhhaizel@gmail.com'];
  const isAdmin = user && adminEmails.includes(user.email);

  // Load all data - this useEffect is correct because it fetches from an external API
  useEffect(() => {
    if (!isAdmin || !user) return;
    
    console.log('Loading dashboard data for admin:', user.email);
    
    const loadAllData = async () => {
      setLoading(true);
      
      try {
        const [contactsRes, appsRes, subsRes, statsRes] = await Promise.all([
          apiClient.get('/api/admin/contacts'),
          apiClient.get('/api/admin/applications'),
          apiClient.get('/api/admin/newsletter'),
          apiClient.get('/api/admin/stats')
        ]);
        
        console.log('Data loaded successfully');
        setContacts(contactsRes.data || []);
        setApplications(appsRes.data || []);
        setSubscribers(subsRes.data || []);
        setStats(statsRes.data || { totalContacts: 0, unreadContacts: 0, totalApplications: 0, totalSubscribers: 0 });
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    
    loadAllData();
  }, [isAdmin, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    toast.success('Logged out successfully');
  };

  const markAsRead = async (id) => {
    try {
      await apiClient.put(`/api/admin/contacts/${id}/read`);
      setContacts(contacts.map(c => c._id === id ? { ...c, isRead: true } : c));
      setStats({ ...stats, unreadContacts: Math.max(0, stats.unreadContacts - 1) });
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await apiClient.delete(`/api/admin/contacts/${id}`);
      setContacts(contacts.filter(c => c._id !== id));
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await apiClient.put(`/api/admin/applications/${id}/status`, { status: newStatus });
      setApplications(applications.map(a => a._id === id ? { ...a, status: newStatus } : a));
      toast.success(`Status updated to ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await apiClient.delete(`/api/admin/applications/${id}`);
      setApplications(applications.filter(a => a._id !== id));
      toast.success('Application deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm('Remove this subscriber?')) return;
    try {
      await apiClient.delete(`/api/admin/newsletter/${id}`);
      setSubscribers(subscribers.filter(s => s._id !== id));
      toast.success('Subscriber removed');
    } catch {
      toast.error('Failed to remove');
    }
  };

  // Show loading while checking user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading session...</p>
        </div>
      </div>
    );
  }
  
  // Check admin access
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm opacity-90">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs opacity-75">{user?.email}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'overview' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaChartLine className="inline mr-2" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('contacts')} 
              className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'contacts' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaEnvelope className="inline mr-2" /> Messages ({stats.unreadContacts})
            </button>
            <button 
              onClick={() => setActiveTab('applications')} 
              className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'applications' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaBriefcase className="inline mr-2" /> Applications ({stats.totalApplications})
            </button>
            <button 
              onClick={() => setActiveTab('subscribers')} 
              className={`px-6 py-3 font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'subscribers' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaUsers className="inline mr-2" /> Subscribers ({stats.totalSubscribers})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Total Messages</p>
                    <p className="text-3xl font-bold">{stats.totalContacts}</p>
                  </div>
                  <FaEnvelope className="text-4xl text-blue-500" />
                </div>
                {stats.unreadContacts > 0 && (
                  <p className="text-sm text-red-500 mt-2">{stats.unreadContacts} unread</p>
                )}
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Applications</p>
                    <p className="text-3xl font-bold">{stats.totalApplications}</p>
                  </div>
                  <FaBriefcase className="text-4xl text-green-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Subscribers</p>
                    <p className="text-3xl font-bold">{stats.totalSubscribers}</p>
                  </div>
                  <FaUsers className="text-4xl text-purple-500" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
              {contacts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No messages yet</p>
              ) : (
                <div className="space-y-3">
                  {contacts.slice(0, 5).map(c => (
                    <div key={c._id} className="flex justify-between items-center p-3 border-b hover:bg-gray-50 rounded">
                      <div className="flex-1">
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-sm text-gray-500">{c.email}</p>
                        <p className="text-sm text-gray-600 mt-1">{c.message?.substring(0, 100)}</p>
                      </div>
                      {!c.isRead && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded ml-4">New</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold">Contact Messages ({contacts.length})</h2>
            </div>
            {contacts.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No messages yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Message</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(c => (
                      <tr key={c._id} className={!c.isRead ? 'bg-blue-50' : 'border-b hover:bg-gray-50'}>
                        <td className="px-6 py-4">{c.name}</td>
                        <td className="px-6 py-4">{c.email}</td>
                        <td className="px-6 py-4 max-w-md">{c.message}</td>
                        <td className="px-6 py-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 space-x-2">
                          {!c.isRead && (
                            <button 
                              onClick={() => markAsRead(c._id)} 
                              className="text-green-600 hover:text-green-800 transition-colors"
                              title="Mark as read"
                            >
                              <FaCheckCircle />
                            </button>
                          )}
                          <button 
                            onClick={() => deleteContact(c._id)} 
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold">Job Applications ({applications.length})</h2>
            </div>
            {applications.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No applications yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Position</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(a => (
                      <tr key={a._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{a.fullName}</td>
                        <td className="px-6 py-4">{a.email}</td>
                        <td className="px-6 py-4">{a.jobTitle}</td>
                        <td className="px-6 py-4">
                          <select 
                            value={a.status || 'pending'} 
                            onChange={(e) => updateStatus(a._id, e.target.value)} 
                            className={`text-xs px-2 py-1 rounded-full border-none ${
                              a.status === 'approved' ? 'bg-green-100 text-green-800' :
                              a.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">{new Date(a.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => deleteApplication(a._id)} 
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold">Newsletter Subscribers ({subscribers.length})</h2>
            </div>
            {subscribers.length === 0 ? (
              <div className="p-12 text-center text-gray-500">No subscribers yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Subscribed Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map(s => (
                      <tr key={s._id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4">{s.email}</td>
                        <td className="px-6 py-4">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => deleteSubscriber(s._id)} 
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Remove"
                          >
                            <FaTrash />
                          </button>
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