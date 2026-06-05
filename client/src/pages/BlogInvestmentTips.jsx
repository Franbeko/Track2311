import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowRight, FaCalendarAlt, FaUser, FaSearch, FaTag, 
  FaEye, FaClock, FaHeart,
  FaShieldAlt, FaHandHoldingUsd,
  FaCalculator, FaTractor, FaSeedling, FaQuestionCircle,
  FaCheckCircle, FaDownload, FaBookOpen, FaVideo, FaPodcast
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const BlogInvestmentTips = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTip, setSelectedTip] = useState(null);
  const [activeResourceTab, setActiveResourceTab] = useState('guides');

  // Investment Tips Data - Focused on Agricultural Investment
  const investmentTips = [
    {
      id: 1,
      titleKey: "tip1Title",
      excerptKey: "tip1Excerpt",
      contentKey: "tip1Content",
      date: "May 28, 2024",
      author: "Ernest Garnark Smith Jr",
      authorAvatar: "/images/team/team2.jpg",
      authorBioKey: "authorBio1",
      categoryKey: "farmInvestment",
      readTime: "8 min read",
      views: 3452,
      likes: 289,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
      tipsKeys: ["tip1_1", "tip1_2", "tip1_3", "tip1_4", "tip1_5"]
    },
    {
      id: 2,
      titleKey: "tip2Title",
      excerptKey: "tip2Excerpt",
      contentKey: "tip2Content",
      date: "May 25, 2024",
      author: "Mrs. Precious N. Onumah-Haizel",
      authorAvatar: "/images/team/team1.jpg",
      authorBioKey: "authorBio2",
      categoryKey: "cropSelection",
      readTime: "6 min read",
      views: 2189,
      likes: 167,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"
    },
    {
      id: 3,
      titleKey: "tip3Title",
      excerptKey: "tip3Excerpt",
      contentKey: "tip3Content",
      date: "May 22, 2024",
      author: "Michael Bobby Bull",
      authorAvatar: "/images/team/team3.jpg",
      authorBioKey: "authorBio3",
      categoryKey: "landAcquisition",
      readTime: "7 min read",
      views: 1876,
      likes: 145,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    },
    {
      id: 4,
      titleKey: "tip4Title",
      excerptKey: "tip4Excerpt",
      contentKey: "tip4Content",
      date: "May 20, 2024",
      author: "Hon. Richard Fatorma Ngafuan",
      authorAvatar: "/images/team/team4.jpg",
      authorBioKey: "authorBio4",
      categoryKey: "farmInvestment",
      readTime: "5 min read",
      views: 4231,
      likes: 378,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800"
    },
    {
      id: 5,
      titleKey: "tip5Title",
      excerptKey: "tip5Excerpt",
      contentKey: "tip5Content",
      date: "May 18, 2024",
      author: "Ernest Garnark Smith Jr",
      authorAvatar: "/images/team/team2.jpg",
      authorBioKey: "authorBio1",
      categoryKey: "exportMarket",
      readTime: "9 min read",
      views: 1567,
      likes: 112,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800"
    },
    {
      id: 6,
      titleKey: "tip6Title",
      excerptKey: "tip6Excerpt",
      contentKey: "tip6Content",
      date: "May 15, 2024",
      author: "Mrs. Precious N. Onumah-Haizel",
      authorAvatar: "/images/team/team1.jpg",
      authorBioKey: "authorBio2",
      categoryKey: "riskManagement",
      readTime: "6 min read",
      views: 5123,
      likes: 456,
      image: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=800"
    }
  ];

  // Categories
  const categories = [
    { name: "All", key: "all", count: investmentTips.length, icon: "🌾", color: "bg-primary" },
    { name: "Farm Investment", key: "farmInvestment", count: 2, icon: "💰", color: "bg-green-600" },
    { name: "Crop Selection", key: "cropSelection", count: 1, icon: "🌱", color: "bg-emerald-600" },
    { name: "Land Acquisition", key: "landAcquisition", count: 1, icon: "🏞️", color: "bg-amber-600" },
    { name: "Export Market", key: "exportMarket", count: 1, icon: "🚢", color: "bg-blue-600" },
    { name: "Risk Management", key: "riskManagement", count: 1, icon: "🛡️", color: "bg-red-600" }
  ];

  // Resource Library Items
  const resourceLibrary = {
    guides: [
      { title: "Liberian Agriculture Investment Guide", icon: "📘", pages: 45, downloads: 1234 },
      { title: "Crop Selection Handbook for Liberia", icon: "🌱", pages: 28, downloads: 892 },
      { title: "Farmland Acquisition Checklist", icon: "📋", pages: 15, downloads: 567 },
      { title: "Agricultural Export Documentation Guide", icon: "📄", pages: 32, downloads: 445 }
    ],
    videos: [
      { title: "How to Start Farm Investment", duration: "15:30", views: 2341 },
      { title: "Understanding Crop Seasons in Liberia", duration: "22:15", views: 1892 },
      { title: "Exporting Liberian Cocoa to Europe", duration: "18:45", views: 1456 },
      { title: "Farm Risk Management Strategies", duration: "25:00", views: 1123 }
    ],
    podcasts: [
      { title: "The Liberian Farmer's Podcast", episode: "S2 E12", duration: "45 min", listens: 2345 },
      { title: "Agri-Investment Insights", episode: "S1 E8", duration: "38 min", listens: 1876 },
      { title: "Export Success Stories", episode: "S1 E5", duration: "42 min", listens: 1567 }
    ]
  };

  // Quick Tips Cards
  const quickTips = [
    { icon: <FaSeedling className="text-3xl" />, key: "startSmall" },
    { icon: <FaTractor className="text-3xl" />, key: "modernFarming" },
    { icon: <FaShieldAlt className="text-3xl" />, key: "landSecurity" },
    { icon: <FaHandHoldingUsd className="text-3xl" />, key: "reinvestHarvest" }
  ];

  // Expert Advice
  const expertAdvice = [
    { quoteKey: "quote1", author: "Ernest Garnark Smith Jr", role: "CEO, Agri-Investment Expert", authorKey: "ernest" },
    { quoteKey: "quote2", author: "Mrs. Precious N. Onumah-Haizel", role: "Board Member, Agricultural Finance", authorKey: "precious" },
    { quoteKey: "quote3", author: "Michael Bobby Bull", role: "Chairman, Farmland Expert", authorKey: "michael" }
  ];

  // Helper functions
  const getTipTitle = (key) => {
    const titles = {
      tip1Title: "10 Essential Tips for Investing in Liberian Agriculture",
      tip2Title: "How to Choose the Right Crops for Your Farm Investment",
      tip3Title: "Farmland Acquisition: A Complete Guide for Investors",
      tip4Title: "Top 5 Reasons to Invest in Liberian Agriculture Now",
      tip5Title: "Understanding Export Markets for Liberian Agricultural Products",
      tip6Title: "Managing Risks in Agricultural Investments"
    };
    return t.investmentTips?.posts?.[key] || titles[key];
  };

  const getTipExcerpt = (key) => {
    const excerpts = {
      tip1Excerpt: "Learn the fundamental principles of successful agricultural investment in Liberia, from land selection to market access...",
      tip2Excerpt: "Discover which crops offer the best returns for investors, including cocoa, rice, cassava, and rubber...",
      tip3Excerpt: "A comprehensive guide to acquiring farmland in Liberia, including legal considerations and due diligence...",
      tip4Excerpt: "New to agricultural investment? Here are 5 compelling reasons to invest in Liberia's growing farming sector...",
      tip5Excerpt: "Essential information on exporting Liberian agricultural products to international markets...",
      tip6Excerpt: "Understanding and mitigating risks in agricultural investments, from weather to market fluctuations..."
    };
    return t.investmentTips?.posts?.[key] || excerpts[key];
  };

  const getCategoryName = (key) => {
    const names = {
      farmInvestment: "Farm Investment",
      cropSelection: "Crop Selection",
      landAcquisition: "Land Acquisition",
      exportMarket: "Export Market",
      riskManagement: "Risk Management"
    };
    return t.investmentTips?.categories?.[key] || names[key];
  };

  const getAuthorBio = (key) => {
    const bios = {
      authorBio1: "Founder & CEO with 15+ years of agricultural investment experience in West Africa.",
      authorBio2: "Board Member with expertise in agricultural banking and farmer financing.",
      authorBio3: "Chairman of the Board, farmland acquisition and development expert.",
      authorBio4: "Board Member and agricultural economist specializing in export markets."
    };
    return t.investmentTips?.authorBios?.[key] || bios[key];
  };

  const getQuickTipTitle = (key) => {
    const titles = {
      startSmall: "Start Small, Scale Gradually",
      modernFarming: "Use Modern Techniques",
      landSecurity: "Secure Land Rights",
      reinvestHarvest: "Reinvest Profits"
    };
    return t.investmentTips?.quickTips?.[key] || titles[key];
  };

  const getQuickTipDesc = (key) => {
    const descs = {
      startSmall: "Begin with manageable acreage and expand as you gain experience",
      modernFarming: "Adopt irrigation, high-yield seeds, and sustainable practices",
      landSecurity: "Ensure proper documentation and legal land ownership",
      reinvestHarvest: "Reinvest harvest profits to grow your farming operation"
    };
    return t.investmentTips?.quickTips?.[`${key}Desc`] || descs[`${key}Desc`];
  };

  const getExpertQuote = (key) => {
    const quotes = {
      quote1: "The best time to invest in Liberian agriculture was five years ago. The second best time is today.",
      quote2: "Diversification across different crops and regions is key to successful farm investment.",
      quote3: "Risk in agriculture comes from not understanding the land, the climate, and the market."
    };
    return t.investmentTips?.expertAdvice?.[key] || quotes[key];
  };

  const getTipListItem = (key) => {
    const items = {
      tip1_1: "Research farmland locations and soil quality before investing",
      tip1_2: "Diversify across multiple crops to spread risk",
      tip1_3: "Partner with experienced local farmers",
      tip1_4: "Invest in proper irrigation and storage facilities",
      tip1_5: "Secure export contracts before large-scale production"
    };
    return t.investmentTips?.tipLists?.[key] || items[key];
  };

  // Filter posts
  const filteredTips = selectedCategory === 'All' 
    ? investmentTips 
    : investmentTips.filter(tip => tip.categoryKey === selectedCategory);

  const searchedTips = filteredTips.filter(tip => 
    getTipTitle(tip.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getTipExcerpt(tip.excerptKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryName(tip.categoryKey).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO 
        title="Agricultural Investment Tips"
        description="Expert agricultural investment tips for Liberian farming. Learn about crop selection, farmland acquisition, export markets, and risk management strategies to maximize your farm investment returns."
        keywords="agricultural investment tips, farm investment Liberia, crop selection, farmland acquisition, export markets, risk management, agribusiness investment"
      />
      
      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-20 right-10 opacity-10">
            <FaTractor className="text-8xl" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-white/10 skew-y-3"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 bg-accent/20 rounded-full text-accent text-sm mb-4">
                🌾 {t.investmentTips?.hero?.badge || "Agricultural Investment Guide"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t.investmentTips?.hero?.title || "Farm Investment Tips & Strategies"}
              </h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                {t.investmentTips?.hero?.subtitle || "Expert advice, proven strategies, and practical tips for successful agricultural investment in Liberia"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Tips Cards */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.investmentTips?.quickTipsSection?.badge || "Quick Tips"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.investmentTips?.quickTipsSection?.title || "Start Your Farm Investment Journey"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.investmentTips?.quickTipsSection?.subtitle || "Four essential principles every agricultural investor should know"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 group border-b-4 border-transparent hover:border-accent cursor-pointer"
                >
                  <div className="text-primary mb-4 group-hover:text-accent transition-colors">
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{getQuickTipTitle(tip.key)}</h3>
                  <p className="text-gray-600 text-sm">{getQuickTipDesc(tip.key)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-accent text-sm mb-4">
                  <FaCalculator /> Interactive Tool
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  Farm Investment ROI Calculator
                </h2>
                <p className="text-gray-600 mb-6">
                  Estimate your potential returns from agricultural investments in Liberia. Calculate based on crop type, acreage, and investment duration.
                </p>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Amount ($)</label>
                      <input type="range" min="1000" max="100000" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$1,000</span>
                        <span>$50,000</span>
                        <span>$100,000</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Type</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Cocoa</option>
                        <option>Rice</option>
                        <option>Cassava</option>
                        <option>Rubber</option>
                        <option>Palm Oil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Size (Acres)</label>
                      <input type="range" min="1" max="100" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 acre</span>
                        <span>50 acres</span>
                        <span>100+ acres</span>
                      </div>
                    </div>
                    <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition">
                      Calculate Estimated ROI →
                    </button>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-8 shadow-lg text-center"
              >
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Sample ROI Estimates</h3>
                <div className="space-y-4 mt-6">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Cocoa (5 acres)</span>
                    <span className="font-bold text-green-600">25-30% ROI</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Rice (10 acres)</span>
                    <span className="font-bold text-green-600">20-25% ROI</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Cassava (5 acres)</span>
                    <span className="font-bold text-green-600">30-35% ROI</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Rubber (20 acres)</span>
                    <span className="font-bold text-green-600">15-20% ROI</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4">*Based on historical data from Liberian farms</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Tips Content */}
              <div className="lg:col-span-2">
                {/* Search and Filter */}
                <div className="bg-white rounded-xl p-4 shadow-sm mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder={t.investmentTips?.search?.placeholder || "Search farm investment tips..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {categories.map((cat, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCategory(cat.name === 'All' ? 'All' : cat.key)}
                      className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                        (selectedCategory === 'All' && cat.name === 'All') || selectedCategory === cat.key
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name === 'All' ? 'All' : getCategoryName(cat.key)}</span>
                      <span className={`text-xs ${(selectedCategory === 'All' && cat.name === 'All') || selectedCategory === cat.key ? 'text-accent' : 'text-gray-400'}`}>
                        ({cat.count})
                      </span>
                    </button>
                  ))}
                </div>

                {/* Tips Grid - Card Style Different from Latest News */}
                {searchedTips.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {searchedTips.map((tip, index) => (
                      <motion.article
                        key={tip.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <span className={`px-2 py-1 text-white text-xs font-semibold rounded ${
                              categories.find(c => c.key === tip.categoryKey)?.color || 'bg-primary'
                            }`}>
                              {getCategoryName(tip.categoryKey)}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              <FaCalendarAlt className="text-accent text-xs" />
                              {tip.date}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              <FaClock className="text-accent text-xs" />
                              {tip.readTime}
                            </span>
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold text-primary mb-3 hover:text-accent transition cursor-pointer"
                              onClick={() => setSelectedTip(tip)}>
                            {getTipTitle(tip.titleKey)}
                          </h2>
                          <p className="text-gray-600 mb-4">{getTipExcerpt(tip.excerptKey)}</p>
                          
                          {/* Key Takeaways Preview */}
                          {tip.tipsKeys && (
                            <div className="bg-primary/5 rounded-xl p-4 mb-4">
                              <p className="text-sm font-semibold text-primary mb-2">Key Takeaways:</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {tip.tipsKeys.slice(0, 4).map((tipKey, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                    <FaCheckCircle className="text-accent text-xs" />
                                    <span>{getTipListItem(tipKey)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={tip.authorAvatar} 
                                alt={tip.author}
                                className="w-8 h-8 rounded-full object-cover"
                                loading="lazy"
                              />
                              <span className="text-sm text-gray-600">{tip.author}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition">
                                <FaHeart />
                                <span className="text-sm">{tip.likes}</span>
                              </button>
                              <button 
                                onClick={() => setSelectedTip(tip)}
                                className="bg-primary text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-secondary transition inline-flex items-center gap-2"
                              >
                                Read Full Guide <FaArrowRight className="text-xs" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🌾</div>
                    <p className="text-gray-500 text-lg">{t.investmentTips?.search?.noResults || "No farm investment tips found matching your search."}</p>
                    <button 
                      onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                      className="mt-4 text-primary hover:text-accent font-semibold"
                    >
                      {t.investmentTips?.buttons?.clearFilters || "Clear filters"}
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Expert Advice Section */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
                  <div className="text-3xl mb-3">👨‍🌾</div>
                  <h3 className="text-xl font-bold mb-4">Expert Agricultural Advice</h3>
                  <div className="space-y-4">
                    {expertAdvice.map((advice, index) => (
                      <div key={index} className="border-b border-white/20 pb-3 last:border-0">
                        <p className="text-sm italic mb-2">"{getExpertQuote(advice.quoteKey)}"</p>
                        <p className="text-xs text-accent font-semibold">{advice.author}</p>
                        <p className="text-xs opacity-75">{advice.role}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resource Library */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FaBookOpen className="text-accent" /> Free Resource Library
                  </h3>
                  
                  {/* Tab Buttons */}
                  <div className="flex gap-2 mb-4 border-b border-gray-200">
                    <button
                      onClick={() => setActiveResourceTab('guides')}
                      className={`px-4 py-2 font-semibold text-sm transition relative ${
                        activeResourceTab === 'guides' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
                      }`}
                    >
                      📘 Guides
                    </button>
                    <button
                      onClick={() => setActiveResourceTab('videos')}
                      className={`px-4 py-2 font-semibold text-sm transition relative ${
                        activeResourceTab === 'videos' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
                      }`}
                    >
                      🎬 Videos
                    </button>
                    <button
                      onClick={() => setActiveResourceTab('podcasts')}
                      className={`px-4 py-2 font-semibold text-sm transition relative ${
                        activeResourceTab === 'podcasts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-primary'
                      }`}
                    >
                      🎙️ Podcasts
                    </button>
                  </div>

                  {/* Guides Tab */}
                  {activeResourceTab === 'guides' && (
                    <div className="space-y-3">
                      {resourceLibrary.guides.map((guide, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{guide.icon}</span>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{guide.title}</p>
                              <p className="text-xs text-gray-400">{guide.pages} pages • {guide.downloads} downloads</p>
                            </div>
                          </div>
                          <FaDownload className="text-gray-400 group-hover:text-primary transition" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Videos Tab */}
                  {activeResourceTab === 'videos' && (
                    <div className="space-y-3">
                      {resourceLibrary.videos.map((video, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FaVideo className="text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{video.title}</p>
                              <p className="text-xs text-gray-400">{video.duration} • {video.views} views</p>
                            </div>
                          </div>
                          <FaArrowRight className="text-gray-400 group-hover:text-primary transition" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Podcasts Tab */}
                  {activeResourceTab === 'podcasts' && (
                    <div className="space-y-3">
                      {resourceLibrary.podcasts.map((podcast, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition group cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FaPodcast className="text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{podcast.title}</p>
                              <p className="text-xs text-gray-400">{podcast.episode} • {podcast.duration} • {podcast.listens} listens</p>
                            </div>
                          </div>
                          <FaArrowRight className="text-gray-400 group-hover:text-primary transition" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Categories Sidebar */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FaTag className="text-accent" /> Investment Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.slice(1).map((cat, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(cat.key)}
                        className="w-full flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition group"
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span className="text-gray-600 group-hover:text-primary transition">
                            {getCategoryName(cat.key)}
                          </span>
                        </span>
                        <span className="text-accent font-semibold text-sm">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* FAQ Teaser - NEW */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <FaQuestionCircle className="text-accent text-2xl" />
                    <h3 className="text-xl font-bold text-primary">Common Questions</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="cursor-pointer hover:text-primary transition">
                      <p className="font-semibold text-gray-800">How do I start investing in farmland?</p>
                      <p className="text-xs text-gray-500 mt-1">Learn about the step-by-step process...</p>
                    </div>
                    <div className="cursor-pointer hover:text-primary transition">
                      <p className="font-semibold text-gray-800">What crops offer the best returns?</p>
                      <p className="text-xs text-gray-500 mt-1">Compare ROI across different crops...</p>
                    </div>
                    <div className="cursor-pointer hover:text-primary transition">
                      <p className="font-semibold text-gray-800">How are returns paid to investors?</p>
                      <p className="text-xs text-gray-500 mt-1">Understand our payment structure...</p>
                    </div>
                  </div>
                  <Link to="/faq" className="inline-block mt-4 text-primary text-sm font-semibold hover:text-accent transition">
                    View All FAQs →
                  </Link>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
                  <div className="text-3xl mb-3">🌱</div>
                  <h3 className="text-xl font-bold mb-2">Weekly Agri-Investment Tips</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Get expert agricultural investment advice delivered to your inbox every week.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="w-full bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                    Subscribe to Agri-Tips
                  </button>
                  <p className="text-xs mt-3 opacity-75">Free agricultural tips, no spam.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tip Modal */}
        {selectedTip && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-primary">{getTipTitle(selectedTip.titleKey)}</h2>
                <button 
                  onClick={() => setSelectedTip(null)}
                  className="text-gray-500 hover:text-red-500 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <img 
                  src={selectedTip.image} 
                  alt={getTipTitle(selectedTip.titleKey)} 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  loading="lazy"
                />
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {selectedTip.date}</span>
                  <span className="flex items-center gap-1"><FaUser /> {selectedTip.author}</span>
                  <span className="flex items-center gap-1"><FaClock /> {selectedTip.readTime}</span>
                  <span className="flex items-center gap-1"><FaEye /> {selectedTip.views} views</span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{getTipExcerpt(selectedTip.excerptKey)}</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Liberia's agricultural sector offers tremendous opportunities for investors. With fertile land, favorable climate, and growing demand for Liberian products internationally, now is an excellent time to invest in farming.
                  </p>
                  
                  {selectedTip.tipsKeys && (
                    <div className="bg-green-50 rounded-xl p-6 my-6 border-l-4 border-accent">
                      <h3 className="text-lg font-bold text-primary mb-3">📋 Key Investment Takeaways:</h3>
                      <ul className="space-y-2">
                        {selectedTip.tipsKeys.map((tipKey, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-accent">✓</span>
                            <span className="text-gray-700">{getTipListItem(tipKey)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Author Bio */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8 flex gap-4">
                  <img 
                    src={selectedTip.authorAvatar} 
                    alt={selectedTip.author} 
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-primary">{selectedTip.author}</h4>
                    <p className="text-sm text-gray-600">{getAuthorBio(selectedTip.authorBioKey)}</p>
                    <div className="flex gap-2 mt-2">
                      <a href="#" className="text-gray-500 hover:text-primary text-sm">Twitter</a>
                      <a href="#" className="text-gray-500 hover:text-primary text-sm">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section - Updated */}
        <section className="py-16 bg-gradient-to-r from-primary via-secondary to-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-6xl mb-4">🚜</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Farm Investment?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Apply these agricultural investment tips and start your journey with Track2311 today. Our experts are ready to guide you.
            </p>
            <div className="space-x-4">
              <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block transform hover:scale-105">
                Talk to an Agri-Expert
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogInvestmentTips;