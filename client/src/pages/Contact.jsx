import { useState, useEffect } from 'react';
import apiClient from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, FaPhone, FaMapMarker, FaClock, FaFacebook, 
  FaTwitter, FaInstagram, FaHeadset, FaArrowRight, 
  FaCheckCircle, FaGlobe, FaSeedling, FaTractor,
  FaRobot, FaLeaf, FaSpinner
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useChat } from '../context/ChatContext';
import SEO from '../components/SEO';

const Contact = () => {
  const { t } = useLanguage();
  const { openChat } = useChat();
  
  const [cms, setCms] = useState(null);
  const [loadingCms, setLoadingCms] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiClient.get('/api/admin/content')
      .then(res => setCms(res.data))
      .catch(err => console.error("Error fetching Contact CMS text:", err))
      .finally(() => setLoadingCms(false));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await apiClient.post('/api/contact', formData);
      if (response.data.success) {
        toast.success(t.contact?.alerts?.success || 'Message sent successfully! Our agricultural team will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(response.data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t.contact?.alerts?.error || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (loadingCms) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  const offices = [
    {
      countryKey: "liberia",
      addressKey: "liberiaAddress",
      phone: "+231-777-511-666 / +231-886-511-666",
      email: cms?.contactEmail || "egsmithjr@track2311investments.org",
      icon: <FaSeedling className="text-3xl" />,
      farmingRegions: ["Lofa", "Bong", "Nimba", "Grand Gedeh"]
    },
    {
      countryKey: "morocco",
      addressKey: "moroccoAddress",
      phone: "+212 5 22 123 456",
      email: cms?.contactEmail || "egsmithjr@track2311investments.org",
      icon: <FaGlobe className="text-3xl" />,
      farmingRegions: ["Rabat-Salé", "Casablanca-Settat"]
    }
  ];

  const businessHours = [
    { dayKey: "monFri", hoursKey: "monFriHours" },
    { dayKey: "saturday", hoursKey: "saturdayHours" },
    { dayKey: "sunday", hoursKey: "sundayHours" }
  ];

  const quickOptions = [
    { icon: <FaHeadset className="text-4xl text-accent mx-auto mb-3" />, titleKey: "farmerSupport", descKey: "farmerSupportDesc", delay: 0.1 },
    { icon: <FaRobot className="text-4xl text-accent mx-auto mb-3" />, titleKey: "aiChatbot", descKey: "aiChatbotDesc", delay: 0.2 },
    { icon: <FaTractor className="text-4xl text-accent mx-auto mb-3" />, titleKey: "fieldVisits", descKey: "fieldVisitsDesc", delay: 0.3 }
  ];

  const faqItems = [
    { questionKey: "faq1Question", answerKey: "faq1Answer" },
    { questionKey: "faq2Question", answerKey: "faq2Answer" },
    { questionKey: "faq3Question", answerKey: "faq3Answer" },
    { questionKey: "faq4Question", answerKey: "faq4Answer" }
  ];

  return (
    <>
      <SEO 
        title="Contact Track2311 Agricultural Team"
        description="Contact Track2311's agricultural experts for farming support, investment opportunities, and agribusiness inquiries."
        keywords="contact Track2311, farmer support, agricultural help, farming inquiries, agribusiness contact"
      />
      
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.contact?.hero?.badge || "🌾 Connect With Our Agricultural Team"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                {cms?.contactHeroTitle || t.contact?.hero?.title || "Contact Our Agricultural Experts"}
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                {cms?.contactHeroSubtitle || t.contact?.hero?.subtitle || "Whether you're a farmer seeking support or an investor looking for agricultural opportunities..."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Contact Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: option.delay }}
                  className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6 text-center hover:shadow-xl transition"
                >
                  {option.icon}
                  <h3 className="text-xl font-bold mb-2">{t.contact?.quickOptions?.[option.titleKey] || option.titleKey}</h3>
                  <p className="text-gray-200">{t.contact?.quickOptions?.[option.descKey] || option.descKey}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    {cms?.contactFormTitle || t.contact?.form?.title || "Send us a message"}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {cms?.contactFormSubtitle || t.contact?.form?.subtitle || "Fill out the form below..."}
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">{t.contact?.form?.nameLabel || "Your Name *"}</label>
                      <input
                        type="text"
                        name="name"
                        placeholder={t.contact?.form?.namePlaceholder || "John Doe"}
                        value={formData.name}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">{t.contact?.form?.emailLabel || "Email Address *"}</label>
                      <input
                        type="email"
                        name="email"
                        placeholder={t.contact?.form?.emailPlaceholder || "john@example.com"}
                        value={formData.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">{t.contact?.form?.phoneLabel || "Phone Number"}</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t.contact?.form?.phonePlaceholder || "+231 77 123 4567"}
                        value={formData.phone}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">{t.contact?.form?.messageLabel || "Your Message *"}</label>
                      <textarea
                        name="message"
                        placeholder={t.contact?.form?.messagePlaceholder || "How can our agricultural team help you?"}
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        t.contact?.form?.sending || "Sending..."
                      ) : (
                        <>
                          {t.contact?.form?.sendButton || "Send Message to Agri-Team"}
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">{t.contact?.info?.title || "Contact Information"}</h2>
                  <div className="space-y-5">
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaEnvelope className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{t.contact?.info?.emailTitle || "Email Our Agri-Team"}</h3>
                        <p className="text-gray-600">{cms?.contactEmail || "egsmithjr@track2311investments.org"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaPhone className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{t.contact?.info?.phoneTitle || "Our Support Hotline"}</h3>
                        <p className="text-gray-600">{cms?.contactPhone || "+1 (901) 608-0131"}</p>
                        <p className="text-gray-600">+231 88 651 1666</p>
                        <p className="text-gray-600 text-sm">{t.contact?.info?.available247 || "Available 24/7"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaRobot className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{t.contact?.info?.aiChatbotTitle || "AI Chatbot Assistant"}</h3>
                        <p className="text-gray-600">{t.contact?.info?.aiChatbotDesc || "Available 24/7 on our website"}</p>
                        <p className="text-gray-600 text-sm">{t.contact?.info?.aiChatbotSubtext || "Instant answers to your questions"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaMapMarker className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{t.contact?.info?.addressTitle || "Head Office"}</h3>
                        <p className="text-gray-600 whitespace-pre-line">
                          Adj. St. Philip's Lutheran Church, Duport Road., <br /> Monrovia, Liberia, 1100
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaClock className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{t.contact?.info?.hoursTitle || "Our Support Hours"}</h3>
                        {businessHours.map((item, index) => (
                          <p key={index} className="text-gray-600">
                            {t.contact?.hours?.[item.dayKey] || item.dayKey}: <span className="text-gray-500">{t.contact?.hours?.[item.hoursKey] || item.hoursKey}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Card */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-white text-center">
                  <div className="flex justify-center gap-2 mb-4">
                    <FaSeedling className="text-3xl text-accent" />
                    <FaTractor className="text-3xl text-accent" />
                    <FaLeaf className="text-3xl text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{t.contact?.social?.title || "Connect With Us"}</h3>
                  <p className="text-gray-200 mb-6">{t.contact?.social?.subtitle || "Follow us on social media for updates and insights"}</p>
                  <div className="flex justify-center space-x-4">
                    <a href="https://www.facebook.com/people/Track2311-Investments-Consultancy-Ltd/100082914168655/" className="bg-white/20 p-3 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                      <FaFacebook className="w-5 h-5" />
                    </a>
                    <a href="https://twitter.com/track2311invest?t=f14zVsNckZU3eMYNLRXwnw&s=09" className="bg-white/20 p-3 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                      <FaTwitter className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/p/C578FUKuLBV/?igsh=MWQwcDFwMWp1eW5idA%3D%3D" className="bg-white/20 p-3 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* International Offices Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.contact?.officesSection?.badge || "GLOBAL PRESENCE"}</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">{t.contact?.officesSection?.title || "Our International Agricultural Offices"}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.contact?.officesSection?.subtitle || "We have a growing presence across Africa to better serve our clients"}</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {offices.map((office, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 text-center">
                  <div className="text-primary mb-4 flex justify-center">{office.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-3">{t.contact?.offices?.[office.countryKey] || (office.countryKey === 'liberia' ? 'Liberia' : 'Morocco')}</h3>
                  <p className="text-gray-600 text-sm mb-3 whitespace-pre-line">
                    {t.contact?.offices?.[office.addressKey] || (office.addressKey === 'liberiaAddress' ? "Adj. St. Philip's Lutheran Church, Duport Road., Monrovia, Liberia, 1100" : "Apartment 26, Building 46,\nRue Aguelmane Sidi Ali, Agdal\nRabat, The Kingdom of Morocco")}
                  </p>
                  <p className="text-gray-600 text-sm">{office.phone}</p>
                  <p className="text-accent text-sm mt-2">{office.email}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-semibold mb-1">{t.contact?.officesSection?.farmingRegions || "Farming Regions Served:"}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {office.farmingRegions.map((region, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{region}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Stats */}
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl text-accent mb-2">🌾</div>
                <div className="text-2xl font-bold text-primary">500+</div>
                <p className="text-sm text-gray-600">{t.contact?.stats?.farmersSupported || "Farmers Supported"}</p>
              </div>
              <div>
                <div className="text-3xl text-accent mb-2">🤖</div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <p className="text-sm text-gray-600">{t.contact?.stats?.aiChatbot || "AI Chatbot Available"}</p>
              </div>
              <div>
                <div className="text-3xl text-accent mb-2">🚜</div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <p className="text-sm text-gray-600">{t.contact?.stats?.fieldExperts || "Field Experts"}</p>
              </div>
              <div>
                <div className="text-3xl text-accent mb-2">⏱️</div>
                <div className="text-2xl font-bold text-primary">&lt;2hrs</div>
                <p className="text-sm text-gray-600">{t.contact?.stats?.avgResponse || "Avg Response Time"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.contact?.faqSection?.badge || "❓ Common Questions"}</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">{t.contact?.faqSection?.title || "Frequently Asked Questions"}</h2>
                <p className="text-gray-600 mb-6">{t.contact?.faqSection?.subtitle || "Find quick answers to common questions about our agricultural services..."}</p>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{t.contact?.faq?.[item.questionKey] || item.questionKey}</h3>
                        <p className="text-gray-500 text-sm mt-1">{t.contact?.faq?.[item.answerKey] || item.answerKey}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/faq" className="inline-flex items-center text-primary font-semibold mt-6 hover:text-accent transition group">
                  {t.contact?.buttons?.viewAllFaqs || "View All FAQs"}
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-3">{t.contact?.aiChat?.title || "Chat With Our AI Assistant"}</h3>
                <p className="text-gray-200 mb-6">{t.contact?.aiChat?.description || "Get instant answers to your farming questions 24/7 using our intelligent AI chatbot"}</p>
                <div className="flex flex-col gap-3">
                  <button onClick={openChat} className="inline-block bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                    {t.contact?.buttons?.startChat || "Start AI Chat Now"}
                  </button>
                  <a href="tel:+231886511666" className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition">
                    {t.contact?.buttons?.callHotline || "Call Our Hotline"}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dynamic CTA Bottom Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <div className="text-6xl mb-4">🌾</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                {cms?.contactCtaTitle || t.contact?.cta?.title || "Ready to Grow With Our Agricultural Team?"}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {cms?.contactCtaSubtitle || t.contact?.cta?.subtitle || "Join hundreds of successful Liberian farmers who have transformed their agricultural businesses with Track2311"}
              </p>
              <div className="space-x-4">
                <Link to="/plans" className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition inline-block">
                  {t.contact?.buttons?.explorePlans || "Explore Our Investment Plans"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;