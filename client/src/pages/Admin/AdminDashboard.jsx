import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import apiClient from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { 
  FaUsers, FaEnvelope, FaBriefcase, FaChartLine, 
  FaCheckCircle, FaTrash, FaUserCircle,
  FaEye, FaSpinner, FaSignOutAlt
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // All Hooks MUST be called before any conditional returns
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

  // List of admin emails
  const adminEmails = [
    'egsmithjr@track2311investments.org',
    'franciskhhaizel@gmail.com'
  ];
  
  const isAdmin = user && adminEmails.includes(user.email);

  // Load data function
  const loadData = () => {
    Promise.all([
      apiClient.get('/api/admin/contacts'),
      apiClient.get('/api/admin/applications'),
      apiClient.get('/api/admin/newsletter'),
      apiClient.get('/api/admin/stats')
    ])
      .then(([contactsRes, appsRes, subsRes, statsRes]) => {
        setContacts(contactsRes.data);
        setApplications(appsRes.data);
        setSubscribers(subsRes.data);
        setStats(statsRes.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Failed to load dashboard data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Use a ref to track if data has been loaded
  const dataLoadedRef = React.useRef(false);

  useEffect(() => {
    if (!dataLoadedRef.current) {
      dataLoadedRef.current = true;
      loadData();
    }
  }, []); // Empty dependency array - runs once on mount

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  // Handle redirects AFTER all hooks (but before rendering content)
  if (!user) {
    navigate('/');
    return null;
  }
  
  if (!isAdmin) {
    toast.error('Access denied. Admin only.');
    navigate('/');
    return null;
  }

  const markAsRead = async (id) => {
    try {
      await apiClient.put(`/api/admin/contacts/${id}/read`);
      setContacts(prev => prev.map(c => 
        c._id === id ? { ...c, isRead: true } : c
      ));
      setStats(prev => ({
        ...prev,
        unreadContacts: prev.unreadContacts - 1
      }));
      toast.success('Marked as read');
    } catch (error) {
      console.error('Error marking as read:', error);
      toast.error('Failed to mark as read');
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await apiClient.delete(`/api/admin/contacts/${id}`);
        setContacts(prev => prev.filter(c => c._id !== id));
        setStats(prev => ({
          ...prev,
          totalContacts: prev.totalContacts - 1,
          unreadContacts: prev.unreadContacts - (contacts.find(c => c._id === id && !c.isRead) ? 1 : 0)
        }));
        toast.success('Message deleted');
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete message');
      }
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      await apiClient.put(`/api/admin/applications/${id}/status`, { status });
      setApplications(prev => prev.map(a => 
        a._id === id ? { ...a, status } : a
      ));
      toast.success(`Application marked as ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const deleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await apiClient.delete(`/api/admin/applications/${id}`);
        setApplications(prev => prev.filter(a => a._id !== id));
        setStats(prev => ({
          ...prev,
          totalApplications: prev.totalApplications - 1
        }));
        toast.success('Application deleted');
      } catch (error) {
        console.error('Error deleting application:', error);
        toast.error('Failed to delete application');
      }
    }
  };

  const deleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to remove this subscriber?')) {
      try {
        await apiClient.delete(`/api/admin/newsletter/${id}`);
        setSubscribers(prev => prev.filter(s => s._id !== id));
        setStats(prev => ({
          ...prev,
          totalSubscribers: prev.totalSubscribers - 1
        }));
        toast.success('Subscriber removed');
      } catch (error) {
        console.error('Error deleting subscriber:', error);
        toast.error('Failed to remove subscriber');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FaChartLine />, count: 0 },
    { id: 'contacts', label: 'Contact Messages', icon: <FaEnvelope />, count: stats.unreadContacts },
    { id: 'applications', label: 'Job Applications', icon: <FaBriefcase />, count: 0 },
    { id: 'subscribers', label: 'Newsletter Subscribers', icon: <FaUsers />, count: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm opacity-90">Welcome back, {user?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-2xl" />
                <div className="text-right">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs opacity-75">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-primary'
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.count > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Contact Messages</p>
                    <p className="text-3xl font-bold text-primary">{stats.totalContacts}</p>
                  </div>
                  <FaEnvelope className="text-4xl text-primary opacity-30" />
                </div>
                {stats.unreadContacts > 0 && (
                  <p className="text-sm text-red-500 mt-2">{stats.unreadContacts} unread</p>
                )}
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-secondary">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Job Applications</p>
                    <p className="text-3xl font-bold text-primary">{stats.totalApplications}</p>
                  </div>
                  <FaBriefcase className="text-4xl text-primary opacity-30" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-accent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Newsletter Subscribers</p>
                    <p className="text-3xl font-bold text-primary">{stats.totalSubscribers}</p>
                  </div>
                  <FaUsers className="text-4xl text-primary opacity-30" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Admin Status</p>
                    <p className="text-3xl font-bold text-green-500">Active</p>
                  </div>
                  <FaEye className="text-4xl text-green-500 opacity-30" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Recent Contact Messages</h2>
              <div className="space-y-4">
                {contacts.slice(0, 5).map((contact) => (
                  <div key={contact._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                      <p className="text-xs text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!contact.isRead && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">New</span>}
                      <FaEnvelope className="text-gray-400" />
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No messages yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-primary">Contact Messages</h2>
              <p className="text-gray-500 text-sm">View and manage customer inquiries</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className={!contact.isRead ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{contact.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{contact.phone || 'Not provided'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{contact.message}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(contact.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm space-x-2 whitespace-nowrap">
                        {!contact.isRead && (
                          <button
                            onClick={() => markAsRead(contact._id)}
                            className="text-green-600 hover:text-green-800"
                            title="Mark as read"
                          >
                            <FaCheckCircle />
                          </button>
                        )}
                        <button
                          onClick={() => deleteContact(contact._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        No contact messages yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-primary">Job Applications</h2>
              <p className="text-gray-500 text-sm">Review and manage job applications</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app._id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{app.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{app.jobTitle}</td>
                      <td className="px-6 py-4">
                        <select
                          value={app.status || 'pending'}
                          onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full ${
                            app.status === 'approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteApplication(app._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                        No job applications yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-primary">Newsletter Subscribers</h2>
              <p className="text-gray-500 text-sm">Manage email subscribers</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {subscribers.map((sub) => (
                    <tr key={sub._id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{sub.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteSubscriber(sub._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Remove"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {subscribers.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                        No subscribers yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;