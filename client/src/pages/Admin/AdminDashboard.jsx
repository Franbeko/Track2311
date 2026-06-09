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

    // Administration State Fields
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
        homeCtaDescription: '',

        // About Section CMS Elements
        aboutHeroTitle: '',
        aboutHeroSubtitle: '',
        aboutWhoWeAreTitle: '',
        aboutWhoWeAreDesc1: '',
        aboutWhoWeAreDesc2: '',
        aboutWhoWeAreDesc3: '',
        aboutMissionText: '',
        aboutVisionText: '',
        aboutCtaTitle: '',
        aboutCtaSubtitle: '',

        // Services Section CMS Elements
        servicesHeroTitle: '',
        servicesHeroSubtitle: '',
        servicesGridTitle: '',
        servicesGridSubtitle: '',
        servicesCtaTitle: '',
        servicesCtaSubtitle: '',

        // Contact Section CMS Elements
        contactHeroTitle: '',
        contactHeroSubtitle: '',
        contactFormTitle: '',
        contactFormSubtitle: '',
        contactCtaTitle: '',
        contactCtaSubtitle: ''
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
                    console.error("API Fetch Failure Modules Error:", err);
                    toast.error(`System Module Load Fault: ${err?.response?.data?.message || 'Network Fail'}`);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        loadAllData();
    }, [user, isAdmin]);

    const handleContentChange = (key, value) => {
        setSiteContent(prev => ({ ...prev, [key]: value }));
    };

    const saveWebsiteContent = async () => {
        try {
            setIsSavingContent(true);
            await apiClient.put('/api/admin/content', siteContent);
            toast.success('All Custom CMS values pushed live successfully!');
        } catch (err) {
            console.error("CMS Push err:", err);
            toast.error('Failed to update live text assets properties');
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
            toast.success('Account wiped cleanly.');
        } catch {
            toast.error('Failed to clear targeted account entry');
        }
    };

    const markAsRead = async (id) => {
        try {
            await apiClient.put(`/api/admin/contacts/${id}/read`);
            setContacts(contacts.map(c => c._id === id ? { ...c, isRead: true } : c));
            setStats(prev => ({ ...prev, unreadContacts: Math.max(0, prev.unreadContacts - 1) }));
            toast.success('Message read');
        } catch {
            toast.error('Failed to sync tracking metrics status');
        }
    };

    const deleteContact = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        try {
            await apiClient.delete(`/api/admin/contacts/${id}`);
            setContacts(contacts.filter(c => c._id !== id));
            toast.success('Deleted');
        } catch {
            toast.error('Failed to clear message block');
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await apiClient.put(`/api/admin/applications/${id}/status`, { status: newStatus });
            setApplications(applications.map(a => a._id === id ? { ...a, status: newStatus } : a));
            toast.success(`Application updated to: ${newStatus}`);
        } catch {
            toast.error('Failed to shift target processing layer');
        }
    };

    const deleteApplication = async (id) => {
        if (!window.confirm('Delete this application?')) return;
        try {
            await apiClient.delete(`/api/admin/applications/${id}`);
            setApplications(applications.filter(a => a._id !== id));
            toast.success('Deleted');
        } catch {
            toast.error('Failed to clear application log data');
        }
    };

    const deleteSubscriber = async (id) => {
        if (!window.confirm('Remove this subscriber?')) return;
        try {
            await apiClient.delete(`/api/admin/newsletter/${id}`);
            setSubscribers(subscribers.filter(s => s._id !== id));
            toast.success('Removed');
        } catch {
            toast.error('Failed to slice roster metric record');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <FaSpinner className="text-4xl text-primary animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading comprehensive workspace console elements...</p>
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Portal Access Restrained</h2>
                    <p className="text-gray-500 mb-6 text-sm">Authorized master accounts verified only.</p>
                    <div className="flex flex-col gap-3">
                        <button onClick={openLoginModal} className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all">
                            Authenticate Admin Session
                        </button>
                        <button onClick={() => navigate('/')} className="w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-xl text-sm">
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Upper Brand Control Layout */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold">Webmaster Management Center</h1>
                        <p className="text-sm opacity-90">Live CMS Architecture Ecosystem Enabled</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs opacity-75">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Roster System Workspace Navigation Sub-Tabbing elements */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex gap-1 overflow-x-auto">
                        <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
                            <FaChartLine className="inline mr-2" /> Overview
                        </button>
                        <button onClick={() => setActiveTab('cms')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'cms' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
                            <FaEdit className="inline mr-2" /> Master CMS Platform Text
                        </button>
                        <button onClick={() => setActiveTab('users')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'users' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
                            <FaUserShield className="inline mr-2" /> System Accounts ({stats.totalUsers})
                        </button>
                        <button onClick={() => setActiveTab('contacts')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'contacts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
                            <FaEnvelope className="inline mr-2" /> Inquiries ({stats.unreadContacts})
                        </button>
                        <button onClick={() => setActiveTab('applications')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'applications' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
                            <FaBriefcase className="inline mr-2" /> Applications Log
                        </button>
                        <button onClick={() => setActiveTab('subscribers')} className={`px-6 py-3 font-semibold whitespace-nowrap ${activeTab === 'subscribers' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
                            <FaUsers className="inline mr-2" /> Subscribers
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Canvas Output Modules Display Panels */}
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Overview Layout Grid */}
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
                                    <div><p className="text-gray-500 text-sm">Messages Logs</p><p className="text-3xl font-bold">{stats.totalContacts}</p></div>
                                    <FaEnvelope className="text-4xl text-gray-300" />
                                </div>
                                {stats.unreadContacts > 0 && <p className="text-sm text-red-500 mt-2">{stats.unreadContacts} new items parsing</p>}
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <div className="flex justify-between">
                                    <div><p className="text-gray-500 text-sm">Job Submissions</p><p className="text-3xl font-bold">{stats.totalApplications}</p></div>
                                    <FaBriefcase className="text-4xl text-gray-300" />
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-md">
                                <div className="flex justify-between">
                                    <div><p className="text-gray-500 text-sm">Newsletter Subs</p><p className="text-3xl font-bold">{stats.totalSubscribers}</p></div>
                                    <FaUsers className="text-4xl text-gray-300" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-md">
                            <h2 className="text-xl font-bold mb-4">Recent Incoming Web Contact Postings</h2>
                            {!contacts || contacts.length === 0 ? <p className="text-gray-500">Roster collection completely empty</p> : contacts.slice(0, 5).map(c => (
                                <div key={c._id} className="flex justify-between items-center p-3 border-b">
                                    <div><p className="font-semibold">{c.name}</p><p className="text-sm text-gray-500">{c.email}</p></div>
                                    {!c.isRead && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Unread</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Master CMS Content Fields Tab */}
                {activeTab === 'cms' && (
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center border-b pb-4 mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Unified Webmaster Custom CMS Interface Engine</h2>
                                <p className="text-sm text-gray-500">Edit core copy structures across all dynamic text fields instantly.</p>
                            </div>
                            <button
                                onClick={saveWebsiteContent}
                                disabled={isSavingContent}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow flex items-center gap-2 transition"
                            >
                                {isSavingContent ? <FaSpinner className="animate-spin" /> : <FaSave />} Save & Push Live Changes
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* PAGE SEGMENTATION CONTROL CARD: HOMEPAGE */}
                            <div className="p-5 bg-gray-50 rounded-xl border">
                                <h3 className="font-bold text-primary mb-3 border-b pb-1 text-base">🏡 Homepage UI Text Layout Fields</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-white border rounded-lg">
                                        <div className="md:col-span-2 text-xs font-bold text-accent uppercase">Carousel Slide Module #1</div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600">Header Title text</label>
                                            <input type="text" value={siteContent.homeSlide1Title} onChange={(e) => handleContentChange('homeSlide1Title', e.target.value)} className="w-full px-3 py-1.5 border rounded text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600">Subtitle Description text</label>
                                            <input type="text" value={siteContent.homeSlide1Subtitle} onChange={(e) => handleContentChange('homeSlide1Subtitle', e.target.value)} className="w-full px-3 py-1.5 border rounded text-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">HOMEPAGE ABOUT SECTION HEADING TITLE</label>
                                        <input type="text" value={siteContent.homeAboutHeading} onChange={(e) => handleContentChange('homeAboutHeading', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">HOMEPAGE BOTTOM CTA CARDBOX TITLE</label>
                                        <input type="text" value={siteContent.homeCtaTitle} onChange={(e) => handleContentChange('homeCtaTitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">HOMEPAGE CTA PARAGRAPH DESCRIPTION</label>
                                        <textarea rows="2" value={siteContent.homeCtaDescription} onChange={(e) => handleContentChange('homeCtaDescription', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* PAGE SEGMENTATION CONTROL CARD: ABOUT US PAGE */}
                            <div className="p-5 bg-gray-50 rounded-xl border">
                                <h3 className="font-bold text-primary mb-3 border-b pb-1 text-base">📄 About Us View Page Dynamic Copy fields</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">ABOUT HERO BANNER MAIN TITLE</label>
                                            <input type="text" value={siteContent.aboutHeroTitle} onChange={(e) => handleContentChange('aboutHeroTitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">ABOUT HERO BANNER SUBTITLE</label>
                                            <input type="text" value={siteContent.aboutHeroSubtitle} onChange={(e) => handleContentChange('aboutHeroSubtitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">WHO WE ARE BLOCK TITLE HEADING</label>
                                        <input type="text" value={siteContent.aboutWhoWeAreTitle} onChange={(e) => handleContentChange('aboutWhoWeAreTitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">WHO WE ARE SUMMARY DESCRIPTION PARAGRAPH #1</label>
                                        <textarea rows="3" value={siteContent.aboutWhoWeAreDesc1} onChange={(e) => handleContentChange('aboutWhoWeAreDesc1', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">WHO WE ARE SUMMARY DESCRIPTION PARAGRAPH #2</label>
                                        <textarea rows="3" value={siteContent.aboutWhoWeAreDesc2} onChange={(e) => handleContentChange('aboutWhoWeAreDesc2', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">WHO WE ARE ITALICIZED BOTTOM QUOTATION FIELD</label>
                                        <input type="text" value={siteContent.aboutWhoWeAreDesc3} onChange={(e) => handleContentChange('aboutWhoWeAreDesc3', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm italic" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">CORPORATE MISSION STATEMENT CORE TEXT</label>
                                            <textarea rows="3" value={siteContent.aboutMissionText} onChange={(e) => handleContentChange('aboutMissionText', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">CORPORATE VISION STATEMENT CORE TEXT</label>
                                            <textarea rows="3" value={siteContent.aboutVisionText} onChange={(e) => handleContentChange('aboutVisionText', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PAGE SEGMENTATION CONTROL CARD: SERVICES PAGE */}
                            <div className="p-5 bg-gray-50 rounded-xl border">
                                <h3 className="font-bold text-primary mb-3 border-b pb-1 text-base">⚙️ Services Page Layout CMS Variables</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">SERVICES HERO MAIN TITLE HEADING</label>
                                            {/* Fixed variable pointer below to siteContent */}
                                            <input type="text" value={siteContent.servicesHeroTitle} onChange={(e) => handleContentChange('servicesHeroTitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">SERVICES HERO DESCRIPTOR SUBTITLE</label>
                                            <input type="text" value={siteContent.servicesHeroSubtitle} onChange={(e) => handleContentChange('servicesHeroSubtitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-700 mb-1">SERVICES COREGREED DISPLAY SUBTITLE DESCRIPTION</label>
                                        <input type="text" value={siteContent.servicesGridSubtitle} onChange={(e) => handleContentChange('servicesGridSubtitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                    </div>
                                </div>
                            </div>

                            {/* PAGE SEGMENTATION CONTROL CARD: CONTACT PAGE */}
                            <div className="p-5 bg-gray-50 rounded-xl border">
                                <h3 className="font-bold text-primary mb-3 border-b pb-1 text-base">📞 Contact Us View Section Strings Form Control</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">CONTACT VIEW BANNER MAIN TITLE</label>
                                            <input type="text" value={siteContent.contactHeroTitle} onChange={(e) => handleContentChange('contactHeroTitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">CONTACT VIEW BANNER SUBTITLE STRING</label>
                                            <input type="text" value={siteContent.contactHeroSubtitle} onChange={(e) => handleContentChange('contactHeroSubtitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">CONTACT FORM INTERFACE BLOCK MAIN TITLE</label>
                                            <input type="text" value={siteContent.contactFormTitle} onChange={(e) => handleContentChange('contactFormTitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 mb-1">CONTACT FORM INTERFACE BLOCK DESCRIPTION SUBTITLE</label>
                                            <input type="text" value={siteContent.contactFormSubtitle} onChange={(e) => handleContentChange('contactFormSubtitle', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* User Registry List Directory rendering modules */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b bg-gray-50"><h2 className="text-xl font-bold text-gray-800">User Registry Roster Directory</h2></div>
                        {!users || users.length === 0 ? <div className="p-12 text-center text-gray-500">No records parse matched inside matrix systems data layer</div> : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Email Address</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Role Access Security</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Registration Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {users.map(u => (
                                            <tr key={u._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{u.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                                                <td className="px-6 py-4"><span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>{u.role.toUpperCase()}</span></td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                <td className="px-6 py-4 text-sm">
                                                    {adminEmails.includes(u.email) ? (
                                                        <span className="text-xs text-gray-400 italic font-medium">Protected System Master Profile</span>
                                                    ) : (
                                                        <button onClick={() => deleteUserAccount(u._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
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

                {/* Contact Form Logs inquiries parsing display metrics */}
                {activeTab === 'contacts' && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b bg-gray-50"><h2 className="text-xl font-bold">Webmaster Contact Form Messages Log</h2></div>
                        {!contacts || contacts.length === 0 ? <div className="p-12 text-center text-gray-500">Inbox logs dry.</div> : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Sender Name</th>
                                            <th className="px-6 py-3 text-left">Email Endpoint</th>
                                            <th className="px-6 py-3 text-left">Message Context Body</th>
                                            <th className="px-6 py-3 text-left">Date Parsing</th>
                                            <th className="px-6 py-3 text-left">Actions Handler</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y text-sm">
                                        {contacts.map(c => (
                                            <tr key={c._id} className={!c.isRead ? 'bg-blue-50/70 font-semibold text-gray-900' : 'text-gray-600'}>
                                                <td className="px-6 py-4">{c.name}</td>
                                                <td className="px-6 py-4">{c.email}</td>
                                                <td className="px-6 py-4 max-w-xs truncate">{c.message}</td>
                                                <td className="px-6 py-4">{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                <td className="px-6 py-4 space-x-3">
                                                    {!c.isRead && <button onClick={() => markAsRead(c._id)} className="text-green-600 font-bold" title="Confirm Message Read"><FaCheckCircle className="inline" /></button>}
                                                    <button onClick={() => deleteContact(c._id)} className="text-red-600" title="Wipe Log Message"><FaTrash className="inline" /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Application logs tab container elements */}
                {activeTab === 'applications' && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b bg-gray-50"><h2 className="text-xl font-bold">Careers Job Submissions Logging Module</h2></div>
                        {!applications || applications.length === 0 ? <div className="p-12 text-center text-gray-500">No applications log modules parsed</div> : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b text-xs text-gray-500 font-bold uppercase">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Applicant name</th>
                                            <th className="px-6 py-3 text-left">Email address</th>
                                            <th className="px-6 py-3 text-left">Target Career title</th>
                                            <th className="px-6 py-3 text-left">Review status</th>
                                            <th className="px-6 py-3 text-left">Submission date</th>
                                            <th className="px-6 py-3 text-left">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {applications.map(a => (
                                            <tr key={a._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{a.fullName}</td>
                                                <td className="px-6 py-4 text-gray-500">{a.email}</td>
                                                <td className="px-6 py-4 font-semibold text-primary">{a.jobTitle}</td>
                                                <td className="px-6 py-4">
                                                    <select value={a.status || 'pending'} onChange={(e) => updateStatus(a._id, e.target.value)} className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-100 border border-yellow-300 focus:outline-none text-yellow-800">
                                                        <option value="pending">Pending</option>
                                                        <option value="approved">Approved</option>
                                                        <option value="rejected">Rejected</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">{a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                <td className="px-6 py-4"><button onClick={() => deleteApplication(a._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Newsletter list table layout container elements */}
                {activeTab === 'subscribers' && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="p-6 border-b bg-gray-50"><h2 className="text-xl font-bold">Marketing Newsletter distribution lists roster</h2></div>
                        {!subscribers || subscribers.length === 0 ? <div className="p-12 text-center text-gray-500">Roster subscription index empty</div> : (
                            <div className="overflow-x-auto max-w-2xl mx-auto py-4">
                                <table className="w-full text-sm border shadow-inner rounded-xl overflow-hidden">
                                    <thead className="bg-gray-100 border-b">
                                        <tr>
                                            <th className="px-6 py-3 text-left font-bold text-gray-600">Subscriber Email Endpoint</th>
                                            <th className="px-6 py-3 text-left font-bold text-gray-600">Joining Date</th>
                                            <th className="px-6 py-3 text-left font-bold text-gray-600">Wipe action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y text-gray-600">
                                        {subscribers.map(s => (
                                            <tr key={s._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-semibold">{s.email}</td>
                                                <td className="px-6 py-4">{s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : 'N/A'}</td>
                                                <td className="px-6 py-4"><button onClick={() => deleteSubscriber(s._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button></td>
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