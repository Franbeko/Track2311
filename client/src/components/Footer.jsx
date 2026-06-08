import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebook, FaTwitter, FaInstagram,
    FaEnvelope, FaPhone, FaMapMarkerAlt,
    FaClock, FaArrowRight,
    FaWhatsapp
} from 'react-icons/fa';
import apiClient from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    const [email, setEmail] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('/api/newsletter/subscribe', { email });
            toast.success(t.footer?.alerts?.subscribeSuccess || 'Subscribed successfully!');
            setEmail('');
        } catch (error) {
            toast.error(error.response?.data?.message || t.footer?.alerts?.subscribeError || 'Subscription failed');
        }
    };

    // Quick links items
    const quickLinks = [
        { path: "/", key: "home" },
        { path: "/about", key: "companyProfile" },
        { path: "/services", key: "services" },
        { path: "/plans", key: "investmentPlans" },
        { path: "/team", key: "ourTeam" },
        { path: "/contact", key: "contactUs" }
    ];

    // Legal links items
    const legalLinks = [
        { path: "/terms", key: "terms" },
        { path: "/privacy-policy", key: "privacy" },
        { path: "/refund-policy", key: "refund" },
        { path: "/cookie-policy", key: "cookie" },
        { path: "/disclaimer", key: "disclaimer" }
    ];

    // Social media links
    const socialLinks = [
        { icon: <FaFacebook className="w-5 h-5" />, url: "https://www.facebook.com/people/Track2311-Investments-Consultancy-Ltd/100082914168655/", name: "Facebook" },
        { icon: <FaTwitter className="w-5 h-5" />, url: "https://twitter.com/track2311invest?t=f14zVsNckZU3eMYNLRXwnw&s=09", name: "Twitter" },
        { icon: <FaInstagram className="w-5 h-5" />, url: "https://www.instagram.com/p/C578FUKuLBV/?igsh=MWQwcDFwMWp1eW5idA%3D%3D", name: "Instagram" },
        { icon: <FaEnvelope className="w-5 h-5" />, url: "mailto:egsmithjr@track2311investments.org", name: "Email" }
    ];

    const getQuickLinkText = (key) => {
        const texts = {
            home: "Home",
            companyProfile: "Company Profile",
            services: "Services",
            investmentPlans: "Investment Plans",
            ourTeam: "Our Team",
            contactUs: "Contact Us"
        };
        return t.footer?.quickLinks?.[key] || texts[key];
    };

    const getLegalLinkText = (key) => {
        const texts = {
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            refund: "Refund Policy",
            cookie: "Cookie Policy",
            disclaimer: "Disclaimer"
        };
        return t.footer?.legal?.[key] || texts[key];
    };

    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Company Info Column */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            {/* Logo Image */}
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                                <img 
                                    src="/images/logo/logo.png" 
                                    alt="Track2311 Logo" 
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        // Fallback if logo doesn't load
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `
                                            <div class="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                                                <span class="text-primary font-bold text-xl">T</span>
                                            </div>
                                        `;
                                    }}
                                />
                            </div>
                            <h3 className="text-xl font-bold">Track2311</h3>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            {t.footer?.company?.description || "Building wealth through smart investments and business consultancy since 2023."}
                        </p>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-300 flex items-center space-x-2">
                                <FaEnvelope className="text-accent" />
                                <span>egsmithjr@track2311investments.org</span>
                            </p>
                            <p className="text-sm text-gray-300 flex items-center space-x-2">
                                <FaWhatsapp className="text-accent" />
                                <span>+1 (901) 608-0131</span>
                            </p>
                            <p className="text-sm text-gray-300 flex items-center space-x-2">
                                <FaPhone className="text-accent" />
                                <span>+231 88 651 1666</span>
                            </p>
                            <p className="text-sm text-gray-300 flex items-center space-x-2">
                                <FaMapMarkerAlt className="text-accent" />
                                <span>{t.footer?.company?.location || "Liberia"}</span>
                            </p>
                            <p className="text-sm text-gray-300 flex items-center space-x-2">
                                <FaClock className="text-accent" />
                                <span>{t.footer?.company?.hours || "Mon - Fri: 8:00 AM - 4:00 PM"}</span>
                            </p>
                        </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-accent border-b border-accent/30 pb-2 inline-block">
                            {t.footer?.quickLinks?.title || "Quick Links"}
                        </h4>
                        <ul className="space-y-3 mt-4">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="text-gray-300 hover:text-accent transition-colors flex items-center group">
                                        <FaArrowRight className="text-xs mr-2 group-hover:translate-x-1 transition-transform" />
                                        {getQuickLinkText(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-accent border-b border-accent/30 pb-2 inline-block">
                            {t.footer?.legal?.title || "Legal"}
                        </h4>
                        <ul className="space-y-3 mt-4">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path} className="text-gray-400 hover:text-accent transition-colors flex items-center group">
                                        <FaArrowRight className="text-xs mr-2 group-hover:translate-x-1 transition-transform" />
                                        {getLegalLinkText(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-accent border-b border-accent/30 pb-2 inline-block">
                            {t.footer?.newsletter?.title || "Newsletter"}
                        </h4>
                        <p className="text-gray-300 text-sm mb-4 mt-4">
                            {t.footer?.newsletter?.description || "Subscribe to get updates on investment opportunities and market insights."}
                        </p>
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <input
                                type="email"
                                placeholder={t.footer?.newsletter?.placeholder || "Your email address"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all hover:shadow-lg"
                            >
                                {t.footer?.newsletter?.button || "Subscribe"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="border-t border-gray-700 pt-8 pb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h4 className="text-accent font-semibold mb-2 text-center md:text-left">
                                {t.footer?.social?.title || "Follow Us On Social Media"}
                            </h4>
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {socialLinks.map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.url} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 p-2 rounded-full hover:bg-accent hover:text-primary transition-all duration-300"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-sm text-gray-400">
                                {t.footer?.copyright || "© 2026 Track2311 Investment & Consultancy. All rights reserved."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;