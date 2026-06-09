import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHeadset, FaChartLine, FaClock, FaShieldAlt, FaEnvelope, FaWhatsapp, FaSpinner } from 'react-icons/fa';
import SEO from '../components/SEO';
import apiClient from '../utils/axiosConfig';

const InvestmentPlans = () => {
  const [cms, setCms] = useState(null);
  const [loadingCms, setLoadingCms] = useState(true);

  useEffect(() => {
    apiClient.get('/api/admin/content')
      .then(res => setCms(res.data))
      .catch(err => console.error("Error fetching Investment plans CMS:", err))
      .finally(() => setLoadingCms(false));
  }, []);

  if (loadingCms) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  const plans = [
    { name: "Starter", roi: 10, duration: 30, features: ["10% ROI after 30 days", "Daily profit sharing", "24/7 support", "Basic analytics", "Email notifications"], color: "from-primary to-secondary", icon: "🌱" },
    { name: "Growth", roi: 20, duration: 60, features: ["20% ROI after 60 days", "Priority support", "Advanced analytics", "Monthly reports", "Dedicated account manager"], popular: true, color: "from-secondary to-primary", icon: "🚜" },
    { name: "Premium", roi: 35, duration: 90, features: ["35% ROI after 90 days", "Dedicated manager", "Real-time tracking", "Weekly reports", "Early withdrawal option"], color: "from-primary to-secondary", icon: "🌟" },
    { name: "Elite", roi: 50, duration: 120, features: ["50% ROI after 120 days", "VIP support", "Custom strategies", "Quarterly bonuses", "Exclusive farm visits"], color: "from-secondary to-primary", icon: "👑" }
  ];

  const whyInvest = [
    { icon: <FaChartLine className="text-2xl" />, title: "High Returns", description: "Competitive ROI on all investment plans" },
    { icon: <FaShieldAlt className="text-2xl" />, title: "Secure Investment", description: "Your capital is protected and transparent" },
    { icon: <FaClock className="text-2xl" />, title: "Flexible Terms", description: "Choose duration that suits your goals" },
    { icon: <FaHeadset className="text-2xl" />, title: "24/7 Support", description: "Dedicated customer support team" },
  ];

  const whatsappNumber = "19016080131";
  const whatsappMessage = "Hello%20Track2311%2C%20I'm%20interested%20in%20your%20agricultural%20investment%20plans.";

  return (
    <>
      <SEO 
        title="Investment Plans - Agricultural Investment Opportunities"
        description="Explore Track2311's agricultural investment plans with ROI from 10% to 50%."
        keywords="investment plans, agricultural investment, ROI, farm investment"
      />
      
      <div>
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{cms?.investPlansHeroTitle || "Investment Plans"}</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-90">{cms?.investPlansHeroSubtitle || "Choose the perfect plan that fits your investment goals"}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {whyInvest.map((item, index) => (
                <div key={index} className="text-center p-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">{item.icon}</div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <div key={index} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${plan.popular ? 'ring-2 ring-accent transform scale-105 z-10' : ''}`}>
                  <div className="pt-6 text-center"><span className="text-5xl">{plan.icon}</span></div>
                  <div className={`bg-gradient-to-r ${plan.color} mx-6 mt-4 p-4 rounded-xl text-white text-center`}>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="text-3xl font-bold mt-2">{plan.roi}%</div>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <FaCheckCircle className="text-accent text-xs" />
                          <span className="text-gray-600 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="block text-center bg-primary text-white py-2.5 rounded-lg text-sm font-semibold">Request Information</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{cms?.investPlansCtaTitle || "Ready to Start Your Investment Journey?"}</h2>
            <p className="text-xl mb-8 opacity-90">{cms?.investPlansCtaSubtitle || "Our agricultural investment advisors are ready to guide you through the process"}</p>
            <div className="flex gap-4 justify-center">
              <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold flex items-center gap-2"><FaEnvelope /> Contact Team</Link>
              <a href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2"><FaWhatsapp /> WhatsApp Chat</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvestmentPlans;