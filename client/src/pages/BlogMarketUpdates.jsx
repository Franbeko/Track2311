import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaUser, FaSearch, FaEye, FaClock,
  FaHeart, FaComment, FaChartLine, FaChartPie,
  FaDollarSign, FaBell, FaShareAlt, FaSeedling, FaTractor,
  FaLeaf, FaShippingFast, FaWarehouse, FaTemperatureHigh,
  FaRainbow, FaDownload, FaPodcast
} from 'react-icons/fa';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const BlogMarketUpdates = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [alertEmail, setAlertEmail] = useState('');

  // Market Indicators Data - Agricultural Focus
  const marketIndicators = [
    { nameKey: "cocoaPrice", value: "$2,845.00", change: "+3.2%", positive: true, icon: <FaSeedling /> },
    { nameKey: "ricePrice", value: "$620.00", change: "+1.8%", positive: true, icon: <FaLeaf /> },
    { nameKey: "rubberPrice", value: "$1,450.00", change: "-0.5%", positive: false, icon: <FaTractor /> },
    { nameKey: "palmOil", value: "$890.00", change: "+2.1%", positive: true, icon: <FaWarehouse /> },
    { nameKey: "cassavaPrice", value: "$320.00", change: "+4.5%", positive: true, icon: <FaSeedling /> },
    { nameKey: "coffeePrice", value: "$1,890.00", change: "+1.2%", positive: true, icon: <FaLeaf /> }
  ];

  // Agricultural Commodity Price Chart Data
  const commodityChartData = [
    { month: 'Jan', cocoa: 2450, rice: 580, rubber: 1420 },
    { month: 'Feb', cocoa: 2520, rice: 590, rubber: 1430 },
    { month: 'Mar', cocoa: 2600, rice: 595, rubber: 1440 },
    { month: 'Apr', cocoa: 2680, rice: 600, rubber: 1445 },
    { month: 'May', cocoa: 2750, rice: 610, rubber: 1450 },
    { month: 'Jun', cocoa: 2845, rice: 620, rubber: 1450 }
  ];

  // Export Market Share Data
  const exportData = [
    { nameKey: "cocoa", value: 45, color: '#8B4513' },
    { nameKey: "rubber", value: 25, color: '#4CAF50' },
    { nameKey: "palmOil", value: 15, color: '#FF9800' },
    { nameKey: "coffee", value: 10, color: '#795548' },
    { nameKey: "other", value: 5, color: '#9E9E9E' }
  ];

  // Market Updates Data - Agricultural Focus
  const marketUpdates = [
    {
      id: 1,
      titleKey: "update1Title",
      excerptKey: "update1Excerpt",
      contentKey: "update1Content",
      date: "May 28, 2024",
      author: "Ernest Garnark Smith Jr",
      authorAvatar: "/images/team/team2.jpg",
      authorBioKey: "authorBio1",
      categoryKey: "agriculture",
      readTime: "5 min read",
      views: 3452,
      likes: 289,
      image: "/images/logo/image2.jpg",
      impact: "High",
      sentiment: "Positive",
      crop: "Cocoa"
    },
    {
      id: 2,
      titleKey: "update2Title",
      excerptKey: "update2Excerpt",
      contentKey: "update2Content",
      date: "May 25, 2024",
      author: "Mrs. Precious N. Onumah-Haizel",
      authorAvatar: "/images/team/team1.jpg",
      authorBioKey: "authorBio2",
      categoryKey: "export",
      readTime: "4 min read",
      views: 2189,
      likes: 167,
      image: "/images/logo/image3.jpg",
      impact: "Medium",
      sentiment: "Positive",
      crop: "Rice"
    },
    {
      id: 3,
      titleKey: "update3Title",
      excerptKey: "update3Excerpt",
      contentKey: "update3Content",
      date: "May 22, 2024",
      author: "Michael Bobby Bull",
      authorAvatar: "/images/team/team3.jpg",
      authorBioKey: "authorBio3",
      categoryKey: "weather",
      readTime: "6 min read",
      views: 1876,
      likes: 145,
      image: "/images/logo/image4.jpg",
      impact: "High",
      sentiment: "Neutral",
      crop: "Multiple"
    },
    {
      id: 4,
      titleKey: "update4Title",
      excerptKey: "update4Excerpt",
      contentKey: "update4Content",
      date: "May 20, 2024",
      author: "Hon. Richard Fatorma Ngafuan",
      authorAvatar: "/images/team/team4.jpg",
      authorBioKey: "authorBio4",
      categoryKey: "marketAnalysis",
      readTime: "5 min read",
      views: 4231,
      likes: 378,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      impact: "High",
      sentiment: "Positive",
      crop: "Cassava"
    },
    {
      id: 5,
      titleKey: "update5Title",
      excerptKey: "update5Excerpt",
      contentKey: "update5Content",
      date: "May 18, 2024",
      author: "Ernest Garnark Smith Jr",
      authorAvatar: "/images/team/team2.jpg",
      authorBioKey: "authorBio1",
      categoryKey: "policy",
      readTime: "7 min read",
      views: 1567,
      likes: 112,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      impact: "Medium",
      sentiment: "Positive",
      crop: "General"
    },
    {
      id: 6,
      titleKey: "update6Title",
      excerptKey: "update6Excerpt",
      contentKey: "update6Content",
      date: "May 15, 2024",
      author: "Mrs. Precious N. Onumah-Haizel",
      authorAvatar: "/images/team/team1.jpg",
      authorBioKey: "authorBio2",
      categoryKey: "commodities",
      readTime: "6 min read",
      views: 5123,
      likes: 456,
      image: "/images/logo/image1.jpg",
      impact: "Medium",
      sentiment: "Positive",
      crop: "Palm Oil"
    }
  ];

  // Categories
  const categories = [
    { name: "All", key: "all", count: marketUpdates.length, icon: "🌍" },
    { name: "Crop Prices", key: "agriculture", count: 1, icon: "🌾" },
    { name: "Export Markets", key: "export", count: 1, icon: "🚢" },
    { name: "Weather Updates", key: "weather", count: 1, icon: "☀️" },
    { name: "Market Analysis", key: "marketAnalysis", count: 1, icon: "📊" },
    { name: "Policy & Trade", key: "policy", count: 1, icon: "📜" },
    { name: "Commodities", key: "commodities", count: 1, icon: "💰" }
  ];

  // Upcoming Agricultural Events
  const upcomingEvents = [
    { title: "West Africa Agricultural Trade Fair", date: "June 15-17, 2024", location: "Monrovia, Liberia", type: "Trade Show" },
    { title: "Cocoa Export Summit", date: "June 22, 2024", location: "Virtual", type: "Webinar" },
    { title: "Farmers Training Workshop", date: "July 5-7, 2024", location: "Lofa County", type: "Training" },
    { title: "Agricultural Investment Forum", date: "July 20, 2024", location: "Monrovia", type: "Conference" }
  ];

  // Helper functions
  const getIndicatorName = (key) => {
    const names = {
      cocoaPrice: "Cocoa Price",
      ricePrice: "Rice Price",
      rubberPrice: "Rubber Price",
      palmOil: "Palm Oil",
      cassavaPrice: "Cassava Price",
      coffeePrice: "Coffee Price"
    };
    return t.marketUpdates?.indicators?.[key] || names[key];
  };

  const getExportName = (key) => {
    const names = {
      cocoa: "Cocoa",
      rubber: "Rubber",
      palmOil: "Palm Oil",
      coffee: "Coffee",
      other: "Other Products"
    };
    return t.marketUpdates?.exports?.[key] || names[key];
  };

  const getUpdateTitle = (key) => {
    const titles = {
      update1Title: "Cocoa Prices Surge to 5-Year High Amid Strong Global Demand",
      update2Title: "Liberian Rice Exports to EU Increase by 35% in Q2 2024",
      update3Title: "Favorable Weather Forecast Boosts Crop Production Outlook",
      update4Title: "Cassava Market Analysis: Rising Demand for Industrial Processing",
      update5Title: "New Agricultural Export Policies Announced by Government",
      update6Title: "Palm Oil Prices Rally as Supply Concerns Mount"
    };
    return t.marketUpdates?.posts?.[key] || titles[key];
  };

  const getUpdateExcerpt = (key) => {
    const excerpts = {
      update1Excerpt: "Cocoa prices have reached their highest level since 2019, driven by strong demand from European chocolate manufacturers and supply constraints in West Africa...",
      update2Excerpt: "Liberia's rice exports to European markets have seen remarkable growth, with new trade agreements opening doors for local farmers...",
      update3Excerpt: "Meteorological forecasts predict favorable rainfall patterns for the upcoming growing season, potentially increasing crop yields by 20-25%...",
      update4Excerpt: "The cassava market is experiencing a transformation with growing demand for industrial processing into starch, flour, and ethanol...",
      update5Excerpt: "New government policies aim to streamline agricultural exports, reduce paperwork, and provide tax incentives for agribusinesses...",
      update6Excerpt: "Palm oil prices continue their upward trajectory as supply concerns from major producers create opportunities for Liberian exporters..."
    };
    return t.marketUpdates?.posts?.[key] || excerpts[key];
  };

  const getCategoryName = (key) => {
    const names = {
      agriculture: "Crop Prices",
      export: "Export Markets",
      weather: "Weather Updates",
      marketAnalysis: "Market Analysis",
      policy: "Policy & Trade",
      commodities: "Commodities"
    };
    return t.marketUpdates?.categories?.[key] || names[key];
  };

  const getAuthorBio = (key) => {
    const bios = {
      authorBio1: "CEO & Agricultural Market Strategist with 15+ years experience",
      authorBio2: "Board Member & Agricultural Economist",
      authorBio3: "Chairman & Commodity Market Analyst",
      authorBio4: "Board Member & Trade Policy Expert"
    };
    return t.marketUpdates?.authorBios?.[key] || bios[key];
  };

  // Filter updates
  const filteredUpdates = selectedCategory === 'All' 
    ? marketUpdates 
    : marketUpdates.filter(update => update.categoryKey === selectedCategory);

  const searchedUpdates = filteredUpdates.filter(update => 
    getUpdateTitle(update.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getUpdateExcerpt(update.excerptKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getCategoryName(update.categoryKey).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get sentiment badge color
  const getSentimentColor = (sentiment) => {
    if (sentiment === 'Positive') return 'bg-green-600';
    if (sentiment === 'Negative') return 'bg-red-600';
    return 'bg-yellow-600';
  };

  const getSentimentText = (sentiment) => {
    return t.marketUpdates?.sentiment?.[sentiment.toLowerCase()] || sentiment;
  };

  const getImpactText = (impact) => {
    return t.marketUpdates?.impact?.[impact.toLowerCase()] || impact;
  };

  const handleAlertSubscribe = (e) => {
    e.preventDefault();
    if (alertEmail) {
      alert(`Market alerts will be sent to ${alertEmail}`);
      setAlertEmail('');
    }
  };

  return (
    <>
      <SEO 
        title="Agricultural Market Updates"
        description="Stay informed with real-time agricultural commodity prices, crop market analysis, export data, and weather forecasts for Liberian farmers and agribusiness investors. Get daily market insights."
        keywords="agricultural market updates, commodity prices Liberia, crop prices, cocoa price, rice price, rubber price, export markets, agricultural analysis, farming market news"
      />
      
      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-20 right-10 opacity-10">
            <FaSeedling className="text-8xl" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-white/10 skew-y-3"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 bg-accent/20 rounded-full text-accent text-sm mb-4">
                🌾 {t.marketUpdates?.hero?.badge || "Agricultural Market Intelligence"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t.marketUpdates?.hero?.title || "Agricultural Market Updates & Analysis"}
              </h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                {t.marketUpdates?.hero?.subtitle || "Stay informed with real-time agricultural commodity prices, export market data, and expert insights for Liberian farmers and agribusinesses"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Commodity Price Ticker */}
        <section className="py-6 bg-white border-b border-gray-200 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <FaDollarSign className="text-accent" /> Agricultural Commodity Prices
              </h2>
              <span className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {marketIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-3 text-center hover:shadow-md transition cursor-pointer"
                >
                  <div className="text-primary text-xl mb-1">{indicator.icon}</div>
                  <p className="text-xs text-gray-500">{getIndicatorName(indicator.nameKey)}</p>
                  <p className="font-bold text-sm">{indicator.value}</p>
                  <p className={`text-xs font-semibold ${indicator.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {indicator.change}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Agricultural Charts Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Commodity Price Trends Chart */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <FaChartLine className="text-accent" /> Crop Price Trends (2024)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={commodityChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="cocoa" stroke="#8B4513" fill="#8B4513" fillOpacity={0.3} name="Cocoa" />
                    <Area type="monotone" dataKey="rice" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.3} name="Rice" />
                    <Area type="monotone" dataKey="rubber" stroke="#FF9800" fill="#FF9800" fillOpacity={0.3} name="Rubber" />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Export Market Share Chart */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-md"
              >
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <FaChartPie className="text-accent" /> Liberian Agricultural Exports
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={exportData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ nameKey }) => getExportName(nameKey)}
                    >
                      {exportData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, nameKey) => [value + '%', getExportName(nameKey)]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                  {exportData.map((sector, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
                      <span className="text-xs text-gray-600">{getExportName(sector.nameKey)} ({sector.value}%)</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Weather Impact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-amber-50 to-green-50 rounded-2xl p-8 border border-accent/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaRainbow className="text-3xl text-accent" />
                <h2 className="text-2xl font-bold text-primary">Weather Impact on Crop Production</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <FaTemperatureHigh className="text-3xl text-accent mx-auto mb-2" />
                  <h3 className="font-bold text-primary">Temperature Outlook</h3>
                  <p className="text-sm text-gray-600 mt-2">Normal to above-average temperatures expected for the growing season, favorable for most crops.</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <FaRainbow className="text-3xl text-accent mx-auto mb-2" />
                  <h3 className="font-bold text-primary">Rainfall Forecast</h3>
                  <p className="text-sm text-gray-600 mt-2">Above-average rainfall predicted for Lofa and Bong counties, beneficial for rice production.</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <FaSeedling className="text-3xl text-accent mx-auto mb-2" />
                  <h3 className="font-bold text-primary">Crop Yield Outlook</h3>
                  <p className="text-sm text-gray-600 mt-2">Expected 15-20% increase in crop yields due to favorable weather conditions.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Updates Content */}
              <div className="lg:col-span-2">
                {/* Search and Alert Bar */}
                <div className="bg-white rounded-xl p-4 shadow-sm mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search agricultural market updates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <form onSubmit={handleAlertSubscribe} className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Get price alerts via email"
                        value={alertEmail}
                        onChange={(e) => setAlertEmail(e.target.value)}
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64"
                      />
                      <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition flex items-center gap-2">
                        <FaBell /> Alerts
                      </button>
                    </form>
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

                {/* Updates Grid */}
                {searchedUpdates.length > 0 ? (
                  <div className="space-y-8">
                    {searchedUpdates.map((update, index) => (
                      <motion.article
                        key={update.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                          <div className="md:col-span-1 h-56 md:h-full overflow-hidden">
                            <img 
                              src={update.image} 
                              alt={getUpdateTitle(update.titleKey)}
                              className="w-full h-full object-cover hover:scale-105 transition duration-500"
                              loading="lazy"
                            />
                          </div>
                          <div className="md:col-span-2 p-6">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                                {getCategoryName(update.categoryKey)}
                              </span>
                              {update.crop && (
                                <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                                  {update.crop}
                                </span>
                              )}
                              <span className={`px-2 py-1 text-white text-xs font-semibold rounded ${getSentimentColor(update.sentiment)}`}>
                                {getSentimentText(update.sentiment)}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500 text-sm flex items-center gap-1">
                                <FaCalendarAlt className="text-accent text-xs" />
                                {update.date}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500 text-sm flex items-center gap-1">
                                <FaClock className="text-accent text-xs" />
                                {update.readTime}
                              </span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3 hover:text-accent transition cursor-pointer"
                                onClick={() => setSelectedUpdate(update)}>
                              {getUpdateTitle(update.titleKey)}
                            </h2>
                            <p className="text-gray-600 mb-4">{getUpdateExcerpt(update.excerptKey)}</p>
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={update.authorAvatar} 
                                  alt={update.author}
                                  className="w-8 h-8 rounded-full object-cover"
                                  loading="lazy"
                                />
                                <span className="text-sm text-gray-600">{update.author}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition">
                                  <FaHeart />
                                  <span className="text-sm">{update.likes}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-500 hover:text-accent transition">
                                  <FaComment />
                                  <span className="text-sm">12</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition">
                                  <FaShareAlt />
                                </button>
                                <button 
                                  onClick={() => setSelectedUpdate(update)}
                                  className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-secondary transition"
                                >
                                  Read Full Analysis
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🌾</div>
                    <p className="text-gray-500 text-lg">No agricultural market updates found matching your search.</p>
                    <button 
                      onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                      className="mt-4 text-primary hover:text-accent font-semibold"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar - Agricultural Focus with New Sections */}
              <div className="space-y-8">
                {/* Upcoming Agricultural Events */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FaCalendarAlt className="text-accent" /> Upcoming Agri-Events
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, idx) => (
                      <div key={idx} className="border-b border-white/20 pb-3 last:border-0">
                        <p className="font-semibold text-sm">{event.title}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs opacity-80">{event.date}</span>
                          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{event.type}</span>
                        </div>
                        <p className="text-xs opacity-70 mt-1">{event.location}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Downloadable Market Reports */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FaDownload className="text-accent" /> Free Market Reports
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition cursor-pointer group">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">Liberia Cocoa Market Report 2024</p>
                        <p className="text-xs text-gray-400">PDF • 28 pages</p>
                      </div>
                      <FaDownload className="text-gray-400 group-hover:text-primary transition" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition cursor-pointer group">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">West African Rice Export Analysis</p>
                        <p className="text-xs text-gray-400">PDF • 35 pages</p>
                      </div>
                      <FaDownload className="text-gray-400 group-hover:text-primary transition" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-primary/5 transition cursor-pointer group">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">Agricultural Investment Guide 2024</p>
                        <p className="text-xs text-gray-400">PDF • 42 pages</p>
                      </div>
                      <FaDownload className="text-gray-400 group-hover:text-primary transition" />
                    </div>
                  </div>
                </div>

                {/* Top Export Destinations */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FaShippingFast className="text-accent" /> Top Export Destinations
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🇪🇺</span>
                        <span className="text-sm font-semibold">European Union</span>
                      </div>
                      <span className="text-accent font-bold">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🇺🇸</span>
                        <span className="text-sm font-semibold">United States</span>
                      </div>
                      <span className="text-accent font-bold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🇨🇳</span>
                        <span className="text-sm font-semibold">China</span>
                      </div>
                      <span className="text-accent font-bold">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🌍</span>
                        <span className="text-sm font-semibold">ECOWAS Region</span>
                      </div>
                      <span className="text-accent font-bold">15%</span>
                    </div>
                  </div>
                </div>

                {/* Market Podcast */}
                <div className="bg-gradient-to-r from-amber-50 to-green-50 rounded-2xl p-6 border border-accent/20">
                  <div className="flex items-center gap-2 mb-3">
                    <FaPodcast className="text-2xl text-accent" />
                    <h3 className="text-xl font-bold text-primary">Market Insights Podcast</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Weekly agricultural market analysis from our experts</p>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-semibold text-sm">Latest Episode: Cocoa Market Outlook</p>
                      <p className="text-xs text-gray-400">Duration: 32 min</p>
                    </div>
                    <button className="bg-primary text-white px-3 py-1 rounded-lg text-sm hover:bg-secondary transition">Listen Now →</button>
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
                  <div className="text-3xl mb-3">📧</div>
                  <h3 className="text-xl font-bold mb-2">Daily Agri-Market Updates</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Get the latest commodity prices and market insights delivered to your inbox daily.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="w-full bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                    Subscribe for Daily Updates
                  </button>
                  <p className="text-xs mt-3 opacity-75">Free agricultural market updates, no spam.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Update Modal */}
        {selectedUpdate && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-primary">{getUpdateTitle(selectedUpdate.titleKey)}</h2>
                <button 
                  onClick={() => setSelectedUpdate(null)}
                  className="text-gray-500 hover:text-red-500 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <img 
                  src={selectedUpdate.image} 
                  alt={getUpdateTitle(selectedUpdate.titleKey)} 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  loading="lazy"
                />
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {selectedUpdate.date}</span>
                  <span className="flex items-center gap-1"><FaUser /> {selectedUpdate.author}</span>
                  <span className="flex items-center gap-1"><FaClock /> {selectedUpdate.readTime}</span>
                  <span className="flex items-center gap-1"><FaEye /> {selectedUpdate.views} views</span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{getUpdateExcerpt(selectedUpdate.excerptKey)}</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This market update provides comprehensive analysis of current trends in Liberian agricultural commodities, including price movements, supply-demand dynamics, and export opportunities. Farmers and investors can use this information to make informed decisions about crop selection, timing of sales, and market entry strategies.
                  </p>
                  <div className="bg-primary/10 rounded-xl p-6 my-6 border-l-4 border-accent">
                    <h3 className="text-lg font-bold text-primary mb-3">📊 Market Impact Analysis:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-accent">📈</span>
                        <span className="text-gray-700">Market Impact: {getImpactText(selectedUpdate.impact)}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">💭</span>
                        <span className="text-gray-700">Market Sentiment: {getSentimentText(selectedUpdate.sentiment)}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">⏰</span>
                        <span className="text-gray-700">Timeframe: Short to Medium Term</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent">🌾</span>
                        <span className="text-gray-700">Crops Affected: {selectedUpdate.crop || 'Multiple'}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8 flex gap-4">
                  <img 
                    src={selectedUpdate.authorAvatar} 
                    alt={selectedUpdate.author} 
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-primary">{selectedUpdate.author}</h4>
                    <p className="text-sm text-gray-600">{getAuthorBio(selectedUpdate.authorBioKey)}</p>
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

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary via-secondary to-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-6xl mb-4">📈</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Capitalize on Market Trends?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our agricultural market updates and stay ahead of commodity price movements, export opportunities, and industry trends.
            </p>
            <div className="space-x-4">
              <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block transform hover:scale-105">
                Contact Our Agri-Analysts
              </Link>
              <Link to="/plans" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition inline-block">
                Explore Farm Investment Plans
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogMarketUpdates;