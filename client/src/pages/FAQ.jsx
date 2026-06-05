import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaChevronDown, FaChevronUp, FaEnvelope, 
  FaPhone, FaQuestionCircle, FaUserGraduate,
  FaHandHoldingUsd, FaShieldAlt,
  FaWallet, FaComment
} from 'react-icons/fa';
import { useChat } from '../context/ChatContext';
import SEO from '../components/SEO';

const FAQ = () => {
  const { openChat } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  // FAQ Categories
  const categories = [
    { id: "all", name: "All Questions", icon: <FaQuestionCircle />, count: 24 },
    { id: "getting-started", name: "Getting Started", icon: <FaUserGraduate />, count: 6 },
    { id: "investments", name: "Investments & Returns", icon: <FaHandHoldingUsd />, count: 8 },
    { id: "security", name: "Security & Safety", icon: <FaShieldAlt />, count: 4 },
    { id: "account", name: "Account Management", icon: <FaWallet />, count: 6 }
  ];

  // FAQ Data
  const faqs = [
    // Getting Started
    {
      id: 1,
      category: "getting-started",
      question: "How do I create an account with Track2311?",
      answer: "Creating an account is simple! Click the 'Register' button on the top right corner, fill in your personal information including name, email, phone number, and create a secure password. Once registered, you'll receive a confirmation email. You can then log in and start exploring our investment options."
    },
    {
      id: 2,
      category: "getting-started",
      question: "What documents do I need to start investing?",
      answer: "To start investing, you'll need a valid government-issued ID (passport, driver's license, or national ID), proof of address (utility bill or bank statement), and your tax identification number (if applicable). These documents are required for KYC compliance."
    },
    {
      id: 3,
      category: "getting-started",
      question: "Is there a minimum age requirement to invest?",
      answer: "Yes, you must be at least 18 years old to open an investment account with Track2311. If you're under 18, a parent or guardian can open a custodial account on your behalf."
    },
    {
      id: 4,
      category: "getting-started",
      question: "How long does the verification process take?",
      answer: "The verification process typically takes 24-48 hours. Once your documents are submitted, our compliance team will review them and notify you via email once your account is fully verified."
    },
    // Investments & Returns
    {
      id: 5,
      category: "investments",
      question: "What is the minimum investment amount?",
      answer: "Our Starter plan begins at $100, making it accessible for new investors. The Growth plan starts at $1,000, Premium at $5,000, and Elite at $20,000. Choose the plan that best fits your investment goals."
    },
    {
      id: 6,
      category: "investments",
      question: "How are returns calculated and paid?",
      answer: "Returns are calculated based on your chosen investment plan. The ROI (Return on Investment) ranges from 10% to 50% depending on the plan and duration. Returns are paid directly to your registered bank account or digital wallet at the end of the investment term."
    },
    {
      id: 7,
      category: "investments",
      question: "Can I withdraw my investment early?",
      answer: "Early withdrawal options are available but may be subject to penalty fees depending on your investment plan. We recommend reviewing the terms and conditions of your specific plan before requesting early withdrawal."
    },
    {
      id: 8,
      category: "investments",
      question: "What happens if I miss a payment?",
      answer: "We understand that circumstances can change. If you miss a payment, please contact our support team immediately. We offer flexible payment arrangements and can discuss options to keep your investment on track."
    },
    {
      id: 9,
      category: "investments",
      question: "Are there any hidden fees?",
      answer: "No, Track2311 maintains complete transparency. All fees are clearly outlined in your investment agreement. There are no hidden charges. We believe in building trust through honest and transparent communication."
    },
    {
      id: 10,
      category: "investments",
      question: "How often can I add funds to my investment?",
      answer: "You can add funds to your investment account at any time. There's no limit on additional deposits. However, each additional deposit will be subject to the terms of your chosen investment plan."
    },
    // Security & Safety
    {
      id: 11,
      category: "security",
      question: "Is my money safe with Track2311?",
      answer: "Yes, your investments are secure with Track2311. We use bank-level security measures, including SSL encryption, two-factor authentication, and regular security audits. Your funds are held in segregated accounts with partner banks."
    },
    {
      id: 12,
      category: "security",
      question: "How does Track2311 protect my personal information?",
      answer: "We follow strict data protection protocols compliant with international standards. Your personal information is encrypted, stored securely, and never shared with third parties without your explicit consent."
    },
    {
      id: 13,
      category: "security",
      question: "What happens if Track2311 goes out of business?",
      answer: "Track2311 is a registered and regulated company with strong financial backing. However, in the unlikely event of business closure, client funds are protected and would be returned according to our terms and conditions."
    },
    // Account Management
    {
      id: 14,
      category: "account",
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page. Enter your registered email address, and we'll send you a password reset link. Follow the instructions to create a new secure password."
    },
    {
      id: 15,
      category: "account",
      question: "Can I have multiple investment accounts?",
      answer: "Yes, you can open multiple investment accounts under the same profile. This allows you to diversify your investments across different plans and strategies."
    },
    {
      id: 16,
      category: "account",
      question: "How do I update my personal information?",
      answer: "Log into your dashboard, go to 'Profile Settings', and update your information. For sensitive changes like address or bank details, you may need to provide supporting documentation."
    },
    {
      id: 17,
      category: "account",
      question: "Can I close my account at any time?",
      answer: "Yes, you can close your account at any time by contacting our support team. Any pending investments will be settled according to the terms of your plan before account closure."
    }
  ];

  // Toggle FAQ item
  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group FAQs by category for display
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <>
      <SEO 
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about investing with Track2311. Learn about account setup, investment plans, returns, security, and more. Your complete guide to investing in Liberia."
        keywords="FAQ, frequently asked questions, investment FAQ, account setup, investment returns, security, Track2311 help, investment guide"
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
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Help Center</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">Frequently Asked Questions</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Find answers to common questions about investing with Track2311
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                />
              </div>
              {searchTerm && (
                <p className="text-center text-gray-500 mt-3">
                  Found {filteredFaqs.length} result(s) for "{searchTerm}"
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Categories & FAQs Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  <span className={`text-xs ${activeCategory === category.id ? 'text-accent' : 'text-gray-400'}`}>
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="max-w-3xl mx-auto space-y-8">
                {activeCategory === 'all' ? (
                  Object.entries(groupedFaqs).map(([category, items]) => (
                    <div key={category}>
                      <h2 className="text-2xl font-bold text-primary mb-4 pb-2 border-b-2 border-accent inline-block">
                        {getCategoryName(category)}
                      </h2>
                      <div className="space-y-3 mt-4">
                        {items.map((faq) => (
                          <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                          >
                            <button
                              onClick={() => toggleItem(faq.id)}
                              className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-semibold text-gray-800">{faq.question}</span>
                              {openItems[faq.id] ? (
                                <FaChevronUp className="text-accent flex-shrink-0 ml-4" />
                              ) : (
                                <FaChevronDown className="text-accent flex-shrink-0 ml-4" />
                              )}
                            </button>
                            <AnimatePresence>
                              {openItems[faq.id] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="border-t border-gray-100"
                                >
                                  <div className="p-5 text-gray-600 leading-relaxed bg-gray-50">
                                    {faq.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-3 max-w-3xl mx-auto">
                    {filteredFaqs.map((faq) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-semibold text-gray-800">{faq.question}</span>
                          {openItems[faq.id] ? (
                            <FaChevronUp className="text-accent flex-shrink-0 ml-4" />
                          ) : (
                            <FaChevronDown className="text-accent flex-shrink-0 ml-4" />
                          )}
                        </button>
                        <AnimatePresence>
                          {openItems[faq.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-100"
                            >
                              <div className="p-5 text-gray-600 leading-relaxed bg-gray-50">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg">No questions found matching your search.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                  className="mt-4 text-primary hover:text-accent font-semibold"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center"
              >
                <FaEnvelope className="text-5xl text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Email Us</h3>
                <p className="text-gray-200 mb-4">Send us your questions anytime</p>
                <a href="mailto:track2311.investments@gmail.com" className="inline-block bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
                  track2311.investments@gmail.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-r from-secondary to-primary rounded-2xl p-8 text-white text-center"
              >
                <FaPhone className="text-5xl text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Call Us</h3>
                <p className="text-gray-200 mb-4">Speak directly with our support team</p>
                <a href="tel:+19016080131" className="inline-block bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">
                  +1 (901) 608-0131
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Live Chat CTA */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaComment className="text-4xl text-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Still Need Help?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our support team is ready to assist you with any questions about your investment journey
              </p>
              <div className="space-x-4">
                <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition inline-block">
                  Contact Support
                </Link>
                <button 
                  onClick={openChat}
                  className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition inline-block"
                >
                  Start Live Chat
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Investing?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied investors who trust Track2311 with their financial future
              </p>
              <div className="space-x-4">
                <Link to="/register" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block">
                  Create Account
                </Link>
                <Link to="/plans" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition inline-block">
                  View Investment Plans
                </Link>
              </div>
            </motion.div>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default FAQ;