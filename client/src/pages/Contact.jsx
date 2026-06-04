import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, FaPhone, FaMapMarker, FaClock, FaFacebook, 
  FaTwitter, FaInstagram, FaHeadset, FaArrowRight, 
  FaCheckCircle, FaGlobe, FaSeedling, FaTractor,
  FaRobot, FaLeaf
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useChat } from '../context/ChatContext';
import SEO from '../components/SEO';

const Contact = () => {
  const { t } = useLanguage();
  const { openChat } = useChat();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      
      if (response.data.success) {
        toast.success(t.contact?.alerts?.success || 'Message sent successfully! Our agricultural team will get back to you soon.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error(response.data.message || 'Failed to send message. Please try again.');
      }
      
    } catch (error) {
      console.error('Error:', error);
      toast.error(t.contact?.alerts?.error || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key press on any input/textarea
  const handleKeyPress = (e) => {
    // Check if Enter key is pressed
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Office locations
  const offices = [
    {
      countryKey: "liberia",
      addressKey: "liberiaAddress",
      phone: "+231-777-511-666 / +231-886-511-666",
      email: "track2311.investments@gmail.com",
      icon: <FaSeedling className="text-3xl" />,
      farmingRegions: ["Lofa", "Bong", "Nimba", "Grand Gedeh"]
    },
    {
      countryKey: "morocco",
      addressKey: "moroccoAddress",
      phone: "+212 5 22 123 456",
      email: "track2311.investments@gmail.com",
      icon: <FaGlobe className="text-3xl" />,
      farmingRegions: ["Rabat-Salé", "Casablanca-Settat"]
    }
  ];

  // Business hours
  const businessHours = [
    { dayKey: "monFri", hoursKey: "monFriHours" },
    { dayKey: "saturday", hoursKey: "saturdayHours" },
    { dayKey: "sunday", hoursKey: "sundayHours" }
  ];

  // Quick contact options
  const quickOptions = [
    { icon: <FaHeadset className="text-4xl text-accent mx-auto mb-3" />, titleKey: "farmerSupport", descKey: "farmerSupportDesc", delay: 0.1 },
    { icon: <FaRobot className="text-4xl text-accent mx-auto mb-3" />, titleKey: "aiChatbot", descKey: "aiChatbotDesc", delay: 0.2 },
    { icon: <FaTractor className="text-4xl text-accent mx-auto mb-3" />, titleKey: "fieldVisits", descKey: "fieldVisitsDesc", delay: 0.3 }
  ];

  // FAQ items
  const faqItems = [
    { questionKey: "faq1Question", answerKey: "faq1Answer" },
    { questionKey: "faq2Question", answerKey: "faq2Answer" },
    { questionKey: "faq3Question", answerKey: "faq3Answer" },
    { questionKey: "faq4Question", answerKey: "faq4Answer" }
  ];

  // Helper functions for translations
  const getHeroBadge = () => {
    return t.contact?.hero?.badge || "🌾 Connect With Our Agricultural Team";
  };

  const getHeroTitle = () => {
    return t.contact?.hero?.title || "Contact Our Agricultural Experts";
  };

  const getHeroSubtitle = () => {
    return t.contact?.hero?.subtitle || "Whether you're a farmer seeking support or an investor looking for agricultural opportunities, our team is here to help";
  };

  const getQuickTitle = (key) => {
    return t.contact?.quickOptions?.[key] || key;
  };

  const getQuickDesc = (key) => {
    return t.contact?.quickOptions?.[key] || key;
  };

  const getFormTitle = () => {
    return t.contact?.form?.title || "Send us a message";
  };

  const getFormSubtitle = () => {
    return t.contact?.form?.subtitle || "Fill out the form below and our agricultural team will get back to you shortly";
  };

  const getNameLabel = () => {
    return t.contact?.form?.nameLabel || "Your Name *";
  };

  const getNamePlaceholder = () => {
    return t.contact?.form?.namePlaceholder || "John Doe";
  };

  const getEmailLabel = () => {
    return t.contact?.form?.emailLabel || "Email Address *";
  };

  const getEmailPlaceholder = () => {
    return t.contact?.form?.emailPlaceholder || "john@example.com";
  };

  const getPhoneLabel = () => {
    return t.contact?.form?.phoneLabel || "Phone Number";
  };

  const getPhonePlaceholder = () => {
    return t.contact?.form?.phonePlaceholder || "+231 77 123 4567";
  };

  const getMessageLabel = () => {
    return t.contact?.form?.messageLabel || "Your Message *";
  };

  const getMessagePlaceholder = () => {
    return t.contact?.form?.messagePlaceholder || "How can our agricultural team help you?";
  };

  const getSendButton = () => {
    return t.contact?.form?.sendButton || "Send Message to Agri-Team";
  };

  const getSendingText = () => {
    return t.contact?.form?.sending || "Sending...";
  };

  const getInfoTitle = () => {
    return t.contact?.info?.title || "Contact Information";
  };

  const getEmailTitle = () => {
    return t.contact?.info?.emailTitle || "Email Our Agri-Team";
  };

  const getPhoneTitle = () => {
    return t.contact?.info?.phoneTitle || "Our Support Hotline";
  };

  const getAddressTitle = () => {
    return t.contact?.info?.addressTitle || "Head Office";
  };

  const getHoursTitle = () => {
    return t.contact?.info?.hoursTitle || "Our Support Hours";
  };

  const getAiChatbotTitle = () => {
    return t.contact?.info?.aiChatbotTitle || "AI Chatbot Assistant";
  };

  const getAiChatbotDesc = () => {
    return t.contact?.info?.aiChatbotDesc || "Available 24/7 on our website";
  };

  const getAiChatbotSubtext = () => {
    return t.contact?.info?.aiChatbotSubtext || "Instant answers to your questions";
  };

  const getSocialTitle = () => {
    return t.contact?.social?.title || "Connect With Us";
  };

  const getSocialSubtitle = () => {
    return t.contact?.social?.subtitle || "Follow us on social media for updates and insights";
  };

  const getOfficesBadge = () => {
    return t.contact?.officesSection?.badge || "GLOBAL PRESENCE";
  };

  const getOfficesTitle = () => {
    return t.contact?.officesSection?.title || "Our International Agricultural Offices";
  };

  const getOfficesSubtitle = () => {
    return t.contact?.officesSection?.subtitle || "We have a growing presence across Africa to better serve our clients";
  };

  const getFaqBadge = () => {
    return t.contact?.faqSection?.badge || "❓ Common Questions";
  };

  const getFaqTitle = () => {
    return t.contact?.faqSection?.title || "Frequently Asked Questions";
  };

  const getFaqSubtitle = () => {
    return t.contact?.faqSection?.subtitle || "Find quick answers to common questions about our agricultural services and farming support programs.";
  };

  const getViewAllFaqs = () => {
    return t.contact?.buttons?.viewAllFaqs || "View All FAQs";
  };

  const getStartChat = () => {
    return t.contact?.buttons?.startChat || "Start AI Chat Now";
  };

  const getCallHotline = () => {
    return t.contact?.buttons?.callHotline || "Call Our Hotline";
  };

  const getCtaTitle = () => {
    return t.contact?.cta?.title || "Ready to Grow With Our Agricultural Team?";
  };

  const getCtaSubtitle = () => {
    return t.contact?.cta?.subtitle || "Join hundreds of successful Liberian farmers who have transformed their agricultural businesses with Track2311";
  };

//   const getStartJourney = () => {
//     return t.contact?.buttons?.startJourney || "Start Your Journey";
//   };

  const getExplorePlans = () => {
    return t.contact?.buttons?.explorePlans || "Explore Our Investment Plans";
  };

  const getOfficeCountry = (key) => {
    const countries = {
      liberia: "Liberia",
      morocco: "Morocco"
    };
    return t.contact?.offices?.[key] || countries[key];
  };

  const getOfficeAddress = (key) => {
    const addresses = {
      liberiaAddress: "Adj. St. Philip's Lutheran Church, Duport Road., Monrovia, Liberia, 1100",
      moroccoAddress: "Apartment 26, Building 46,\nRue Aguelmane Sidi Ali, Agdal\nRabat, The Kingdom of Morocco"
    };
    return t.contact?.offices?.[key] || addresses[key];
  };

  const getBusinessDay = (key) => {
    return t.contact?.hours?.[key] || key;
  };

  const getBusinessHours = (key) => {
    return t.contact?.hours?.[key] || key;
  };

  const getFaqQuestion = (key) => {
    return t.contact?.faq?.[key] || key;
  };

  const getFaqAnswer = (key) => {
    return t.contact?.faq?.[key] || key;
  };

  return (
    <>
      <SEO 
        title="Contact Track2311 Agricultural Team"
        description="Contact Track2311's agricultural experts for farming support, investment opportunities, and agribusiness inquiries. Call our farmer hotline or use our 24/7 AI chatbot for instant assistance."
        keywords="contact Track2311, farmer support, agricultural help, farming inquiries, agribusiness contact, Track2311 phone number, farmer hotline"
      />
      
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {getHeroBadge()}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                {getHeroTitle()}
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                {getHeroSubtitle()}
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
                  <h3 className="text-xl font-bold mb-2">{getQuickTitle(option.titleKey)}</h3>
                  <p className="text-gray-200">{getQuickDesc(option.descKey)}</p>
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
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    {getFormTitle()}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {getFormSubtitle()}
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {getNameLabel()}
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder={getNamePlaceholder()}
                        value={formData.name}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {getEmailLabel()}
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder={getEmailPlaceholder()}
                        value={formData.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {getPhoneLabel()}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={getPhonePlaceholder()}
                        value={formData.phone}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        {getMessageLabel()}
                      </label>
                      <textarea
                        name="message"
                        placeholder={getMessagePlaceholder()}
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                        required
                      ></textarea>
                      <p className="text-xs text-gray-400 mt-1">Press Enter to send</p>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                    >
                      {isSubmitting ? (
                        getSendingText()
                      ) : (
                        <>
                          {getSendButton()}
                          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Contact Details Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    {getInfoTitle()}
                  </h2>
                  <div className="space-y-5">
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaEnvelope className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{getEmailTitle()}</h3>
                        <p className="text-gray-600">track2311.investments@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaPhone className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{getPhoneTitle()}</h3>
                        <p className="text-gray-600">+1 (901) 608-0131</p>
                        <p className="text-gray-600">+231 88 651 1666</p>
                        <p className="text-gray-600 text-sm">{t.contact?.info?.available247 || "Available 24/7"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaRobot className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{getAiChatbotTitle()}</h3>
                        <p className="text-gray-600">{getAiChatbotDesc()}</p>
                        <p className="text-gray-600 text-sm">{getAiChatbotSubtext()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <FaMapMarker className="text-primary text-xl group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{getAddressTitle()}</h3>
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
                        <h3 className="font-semibold text-lg">{getHoursTitle()}</h3>
                        {businessHours.map((item, index) => (
                          <p key={index} className="text-gray-600">
                            {getBusinessDay(item.dayKey)}: <span className="text-gray-500">{getBusinessHours(item.hoursKey)}</span>
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
                  <h3 className="text-xl font-bold mb-4">{getSocialTitle()}</h3>
                  <p className="text-gray-200 mb-6">{getSocialSubtitle()}</p>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {getOfficesBadge()}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {getOfficesTitle()}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {getOfficesSubtitle()}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="text-primary mb-4 flex justify-center">{office.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-3">{getOfficeCountry(office.countryKey)}</h3>
                  <p className="text-gray-600 text-sm mb-3 whitespace-pre-line">{getOfficeAddress(office.addressKey)}</p>
                  <p className="text-gray-600 text-sm">{office.phone}</p>
                  <p className="text-accent text-sm mt-2">{office.email}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500 font-semibold mb-1">{t.contact?.officesSection?.farmingRegions || "Farming Regions Served:"}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {office.farmingRegions.map((region, idx) => (
                        <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Support Stats */}
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

        {/* FAQ Preview Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  {getFaqBadge()}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                  {getFaqTitle()}
                </h2>
                <p className="text-gray-600 mb-6">
                  {getFaqSubtitle()}
                </p>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1" />
                      <div>
                        <h3 className="font-semibold">{getFaqQuestion(item.questionKey)}</h3>
                        <p className="text-gray-500 text-sm">{getFaqAnswer(item.answerKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/faq" className="inline-flex items-center text-primary font-semibold mt-6 hover:text-accent transition group">
                  {getViewAllFaqs()}
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center"
              >
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-2xl font-bold mb-3">{t.contact?.aiChat?.title || "Chat With Our AI Assistant"}</h3>
                <p className="text-gray-200 mb-6">
                  {t.contact?.aiChat?.description || "Get instant answers to your farming questions 24/7 using our intelligent AI chatbot"}
                </p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={openChat}
                    className="inline-block bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    {getStartChat()}
                  </button>
                  <a href="tel:+231886511666" className="inline-block border-2 border-white text-white px-6 py-3 
                  rounded-lg font-semibold hover:bg-white hover:text-primary transition">
                    {getCallHotline()}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🌾</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                {getCtaTitle()}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {getCtaSubtitle()}
              </p>
              <div className="space-x-4">
                {/* <Link to="/plans" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary 
                transition inline-block">
                  {getStartJourney()}
                </Link> */}
                <Link to="/plans" className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold 
                 hover:bg-primary hover:text-white transition inline-block">
                  {getExplorePlans()}
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