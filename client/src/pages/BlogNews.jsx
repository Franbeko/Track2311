import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaUser, FaSearch, FaTag, 
  FaEye, FaClock, FaFacebook, FaTwitter,
  FaComment, FaInstagram, FaRegHeart, FaSeedling,
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const BlogNews = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');

  // Blog Posts Data - Updated for Agriculture Focus
  const blogPosts = [
    {
      id: 1,
      titleKey: "post1Title",
      excerptKey: "post1Excerpt",
      contentKey: "post1Content",
      date: "May 28, 2024",
      author: "Ernest Garnark Smith Jr",
      authorAvatar: "/images/team/team2.jpg",
      authorBioKey: "authorBio1",
      categoryKey: "agricultureNews",
      readTime: "5 min read",
      views: 1245,
      likes: 89,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      tags: ["Agriculture", "Cocoa", "Rice", "Export"]
    },
    {
      id: 2,
      titleKey: "post2Title",
      excerptKey: "post2Excerpt",
      contentKey: "post2Content",
      date: "May 25, 2024",
      author: "Mrs. Precious N. Onumah-Haizel",
      authorAvatar: "/images/team/team1.jpg",
      authorBioKey: "authorBio2",
      categoryKey: "farmingTips",
      readTime: "4 min read",
      views: 892,
      likes: 67,
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      tags: ["Farming", "Modern Techniques", "Crop Management"]
    },
    {
      id: 3,
      titleKey: "post3Title",
      excerptKey: "post3Excerpt",
      contentKey: "post3Content",
      date: "May 22, 2024",
      author: "Michael Bobby Bull",
      authorAvatar: "/images/team/team3.jpg",
      authorBioKey: "authorBio3",
      categoryKey: "marketUpdates",
      readTime: "6 min read",
      views: 1567,
      likes: 112,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      tags: ["Farmland", "Land Investment", "Liberia"]
    },
    {
      id: 4,
      titleKey: "post4Title",
      excerptKey: "post4Excerpt",
      contentKey: "post4Content",
      date: "May 20, 2024",
      author: "Hon. Richard Fatorma Ngafuan",
      authorAvatar: "/images/team/team4.jpg",
      authorBioKey: "authorBio4",
      categoryKey: "successStories",
      readTime: "3 min read",
      views: 2341,
      likes: 245,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
      tags: ["Farmer Success", "Harvest", "Community Impact"]
    },
    {
      id: 5,
      titleKey: "post5Title",
      excerptKey: "post5Excerpt",
      contentKey: "post5Content",
      date: "May 18, 2024",
      author: "Ernest Garnark Smith Jr",
      authorAvatar: "/images/team/team2.jpg",
      authorBioKey: "authorBio1",
      categoryKey: "agribusiness",
      readTime: "7 min read",
      views: 678,
      likes: 45,
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800",
      tags: ["Agribusiness", "Export", "Global Markets"]
    },
    {
      id: 6,
      titleKey: "post6Title",
      excerptKey: "post6Excerpt",
      contentKey: "post6Content",
      date: "May 15, 2024",
      author: "Mrs. Precious N. Onumah-Haizel",
      authorAvatar: "/images/team/team1.jpg",
      authorBioKey: "authorBio2",
      categoryKey: "investmentTips",
      readTime: "4 min read",
      views: 3421,
      likes: 378,
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
      tags: ["Agri-Investment", "Farm Returns", "Wealth"]
    }
  ];

  // Helper functions for translations
  const getPostTitle = (key) => {
    const titles = {
      post1Title: "Record Cocoa and Rice Harvest Expected in Lofa County",
      post2Title: "Modern Farming Techniques Transforming Liberian Agriculture",
      post3Title: "Prime Farmland Investment Opportunities in Liberia",
      post4Title: "Success Story: How a Local Farmer Tripled His Harvest",
      post5Title: "Liberian Agricultural Exports Reach New Markets in Europe",
      post6Title: "Top 5 Reasons to Invest in Liberian Agriculture"
    };
    return t.blogNews?.posts?.[key] || titles[key];
  };

  const getPostExcerpt = (key) => {
    const excerpts = {
      post1Excerpt: "Farmers in Lofa County are celebrating what promises to be a record-breaking harvest season for cocoa and rice, thanks to modern farming techniques and improved seed varieties...",
      post2Excerpt: "Discover how modern irrigation systems, high-yield seeds, and sustainable farming practices are revolutionizing agriculture in Liberia...",
      post3Excerpt: "A comprehensive guide to prime farmland investment opportunities across Liberia's most fertile regions, including Lofa, Bong, and Nimba counties...",
      post4Excerpt: "Read about how a small-scale farmer from Bong County transformed his 5-acre farm into a thriving agribusiness with support from Track2311...",
      post5Excerpt: "Liberian agricultural products including cocoa, rubber, and palm oil are gaining traction in European markets, opening new opportunities for local farmers...",
      post6Excerpt: "Essential advice for those looking to invest in Liberia's growing agricultural sector, covering crop selection, land acquisition, and export potential..."
    };
    return t.blogNews?.posts?.[key] || excerpts[key];
  };

  const getCategoryName = (key) => {
    const categories = {
      agricultureNews: "Agriculture News",
      farmingTips: "Farming Tips",
      marketUpdates: "Market Updates",
      successStories: "Farmer Stories",
      agribusiness: "Agribusiness",
      investmentTips: "Agri-Investment"
    };
    return t.blogNews?.categories?.[key] || categories[key];
  };

  const getAuthorBio = (key) => {
    const bios = {
      authorBio1: "Founder & CEO of Track2311 Investments with over 15 years of experience in agricultural finance and farming.",
      authorBio2: "Board Member with extensive experience in agricultural banking and farmer support programs.",
      authorBio3: "Chairman of the Board with expertise in agricultural land development and farm infrastructure.",
      authorBio4: "Board Member and agricultural statistician specializing in crop yield analysis."
    };
    return t.blogNews?.authorBios?.[key] || bios[key];
  };

  // Categories
  const categories = [
    { name: "All", key: "all", count: blogPosts.length, icon: "🌾" },
    { name: "Agriculture News", key: "agricultureNews", count: 1, icon: "🌱" },
    { name: "Farming Tips", key: "farmingTips", count: 1, icon: "🚜" },
    { name: "Market Updates", key: "marketUpdates", count: 1, icon: "📈" },
    { name: "Farmer Stories", key: "successStories", count: 1, icon: "⭐" },
    { name: "Agribusiness", key: "agribusiness", count: 1, icon: "🏢" },
    { name: "Agri-Investment", key: "investmentTips", count: 1, icon: "💰" }
  ];

  // Popular tags - Updated for Agriculture
  const popularTags = ["Agriculture", "Cocoa", "Rice", "Farming", "Harvest", "Farmland", "Export", "Liberia", "Agri-Investment"];

  // Recent Posts
  const recentPosts = [...blogPosts].slice(0, 4);

  // Filter posts
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.categoryKey === selectedCategory);

  const searchedPosts = filteredPosts.filter(post => 
    getPostTitle(post.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getPostExcerpt(post.excerptKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      postId: 1,
      name: "Joseph Farmer",
      email: "joseph@example.com",
      textKey: "comment1",
      date: "May 29, 2024",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      likes: 5
    },
    {
      id: 2,
      postId: 1,
      name: "Martha Kerkula",
      email: "martha@example.com",
      textKey: "comment2",
      date: "May 29, 2024",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      likes: 3
    }
  ]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentName && commentText && selectedPost) {
      const newComment = {
        id: comments.length + 1,
        postId: selectedPost.id,
        name: commentName,
        email: commentEmail,
        text: commentText,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        likes: 0
      };
      setComments([...comments, newComment]);
      setCommentName('');
      setCommentEmail('');
      setCommentText('');
      alert(t.blogNews?.alerts?.commentSuccess || 'Comment added successfully!');
    }
  };

  const postComments = comments.filter(c => c.postId === selectedPost?.id);

  const getCommentText = (key) => {
    const texts = {
      comment1: "Great article! As a rice farmer in Lofa, this gives me hope for the upcoming season. When will the new seeds be available?",
      comment2: "This is excellent news for Liberian agriculture. Looking forward to seeing more farmers benefit from modern techniques!"
    };
    return t.blogNews?.comments?.[key] || texts[key];
  };

  return (
    <>
      <SEO 
        title="Agricultural News & Farming Insights"
        description="Latest agricultural news, farming tips, success stories, and agribusiness insights from Liberia. Stay updated with Track2311's agricultural blog for farmers and agri-investors."
        keywords="agricultural news Liberia, farming tips, agribusiness, farmer success stories, crop farming, Liberian agriculture, cocoa news, rice farming"
      />
      
      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 bg-accent/20 rounded-full text-accent text-sm mb-4">
                🌾 {t.blogNews?.hero?.badge || "Agricultural News & Insights"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t.blogNews?.hero?.title || "Latest Agricultural News"}
              </h1>
              <p className="text-xl max-w-2xl mx-auto opacity-90">
                {t.blogNews?.hero?.subtitle || "Stay updated with the latest news, farming insights, and success stories from Liberia's agricultural sector"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Main Blog Posts */}
              <div className="lg:col-span-2">
                {/* Search and Filter Bar */}
                <div className="bg-white rounded-xl p-4 shadow-sm mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder={t.blogNews?.search?.placeholder || "Search agricultural news, farming tips..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                      {categories.slice(0, 6).map((cat, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedCategory(cat.name === 'All' ? 'All' : cat.key)}
                          className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                            (selectedCategory === 'All' && cat.name === 'All') || selectedCategory === cat.key
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {cat.icon} {t.blogNews?.categories?.[cat.key] || cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Featured Post Banner */}
                {searchedPosts.length > 0 && !searchTerm && selectedCategory === 'All' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
                  >
                    <div className="relative h-64 md:h-80">
                      <img 
                        src={blogPosts[0].image} 
                        alt={getPostTitle(blogPosts[0].titleKey)}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full mb-3">
                          🌾 {t.blogNews?.featured?.badge || "Featured Agricultural Story"}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">{getPostTitle(blogPosts[0].titleKey)}</h2>
                        <p className="text-gray-200 mb-4">{getPostExcerpt(blogPosts[0].excerptKey).substring(0, 150)}...</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center space-x-1">
                            <FaCalendarAlt />
                            <span>{blogPosts[0].date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FaClock />
                            <span>{blogPosts[0].readTime}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Blog Posts Grid */}
                {searchedPosts.length > 0 ? (
                  <div className="space-y-8">
                    {searchedPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                          <div className="md:col-span-1 h-56 md:h-full overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={getPostTitle(post.titleKey)}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                              loading="lazy"
                            />
                          </div>
                          <div className="md:col-span-2 p-6">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                                {getCategoryName(post.categoryKey)}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500 text-sm flex items-center gap-1">
                                <FaCalendarAlt className="text-accent text-xs" />
                                {post.date}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500 text-sm flex items-center gap-1">
                                <FaClock className="text-accent text-xs" />
                                {post.readTime}
                              </span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-3 hover:text-accent transition">
                              {getPostTitle(post.titleKey)}
                            </h2>
                            <p className="text-gray-600 mb-4">{getPostExcerpt(post.excerptKey).substring(0, 120)}...</p>
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img 
                                  src={post.authorAvatar} 
                                  alt={post.author}
                                  className="w-8 h-8 rounded-full object-cover"
                                  loading="lazy"
                                />
                                <span className="text-sm text-gray-600">{post.author}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition">
                                  <FaRegHeart />
                                  <span className="text-sm">{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-500 hover:text-accent transition">
                                  <FaComment />
                                  <span className="text-sm">{postComments.length}</span>
                                </button>
                                <button 
                                  onClick={() => setSelectedPost(post)}
                                  className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-secondary transition"
                                >
                                  {t.blogNews?.buttons?.readMore || "Read Full Story"}
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
                    <p className="text-gray-500 text-lg">{t.blogNews?.search?.noResults || "No agricultural articles found matching your search."}</p>
                    <button 
                      onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                      className="mt-4 text-primary hover:text-accent font-semibold"
                    >
                      {t.blogNews?.buttons?.clearFilters || "Clear filters"}
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Author/About Card */}
                <div className="bg-white rounded-2xl p-6 shadow-md text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                    <FaSeedling className="text-4xl text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Track2311 Agri-Blog</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Your trusted source for agricultural news, farming insights, and success stories from Liberia's growing farming sector.
                  </p>
                  <div className="flex justify-center space-x-3">
                    <a href="https://www.facebook.com/people/Track2311-Investments-Consultancy-Ltd/100082914168655/" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
                      <FaFacebook className="w-4 h-4" />
                    </a>
                    <a href="https://twitter.com/track2311invest?t=f14zVsNckZU3eMYNLRXwnw&s=09" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
                      <FaTwitter className="w-4 h-4" />
                    </a>
                    <a href="https://www.instagram.com/p/C578FUKuLBV/?igsh=MWQwcDFwMWp1eW5idA%3D%3D" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FaClock className="text-accent" /> Recent Agricultural News
                  </h3>
                  <div className="space-y-4">
                    {recentPosts.map((post, index) => (
                      <div key={index} className="block group cursor-pointer" onClick={() => setSelectedPost(post)}>
                        <div className="flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={post.image} alt={getPostTitle(post.titleKey)} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 group-hover:text-primary transition line-clamp-2">
                              {getPostTitle(post.titleKey).length > 50 ? getPostTitle(post.titleKey).substring(0, 50) + '...' : getPostTitle(post.titleKey)}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FaTag className="text-accent" /> Agricultural Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCategory(cat.name === 'All' ? 'All' : cat.key)}
                        className="w-full flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition group"
                      >
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span className="text-gray-600 group-hover:text-primary transition">
                            {cat.name === 'All' ? 'All Agricultural News' : (t.blogNews?.categories?.[cat.key] || cat.name)}
                          </span>
                        </span>
                        <span className="text-accent font-semibold text-sm">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FaTag className="text-accent" /> Popular Agricultural Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-primary hover:text-white transition"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
                  <div className="text-3xl mb-3">🌱</div>
                  <h3 className="text-xl font-bold mb-2">Farmer's Newsletter</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Subscribe to get the latest agricultural insights and farming tips directly in your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="w-full bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                    Subscribe for Agricultural Updates
                  </button>
                  <p className="text-xs mt-3 opacity-75">No spam, unsubscribe anytime.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-primary">{getPostTitle(selectedPost.titleKey)}</h2>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-500 hover:text-red-500 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <img 
                  src={selectedPost.image} 
                  alt={getPostTitle(selectedPost.titleKey)} 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  loading="lazy"
                />
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {selectedPost.date}</span>
                  <span className="flex items-center gap-1"><FaUser /> {selectedPost.author}</span>
                  <span className="flex items-center gap-1"><FaClock /> {selectedPost.readTime}</span>
                  <span className="flex items-center gap-1"><FaEye /> {selectedPost.views} views</span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">{getPostExcerpt(selectedPost.excerptKey)}</p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t.blogNews?.modal?.loremIpsum1 || "Liberia's agricultural sector is experiencing unprecedented growth, with modern farming techniques and improved seed varieties driving higher yields across the country. Farmers are now able to produce more food for local consumption while also meeting export demands."}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {t.blogNews?.modal?.loremIpsum2 || "The success of these agricultural initiatives demonstrates the potential for Liberia to become a major food producer in West Africa. With continued investment and support, the future of Liberian agriculture looks brighter than ever."}
                  </p>
                </div>

                {/* Author Bio */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8 flex gap-4">
                  <img 
                    src={selectedPost.authorAvatar} 
                    alt={selectedPost.author} 
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-primary">{selectedPost.author}</h4>
                    <p className="text-sm text-gray-600">{getAuthorBio(selectedPost.authorBioKey)}</p>
                    <div className="flex gap-2 mt-2">
                      <a href="#" className="text-gray-500 hover:text-primary">Twitter</a>
                      <a href="#" className="text-gray-500 hover:text-primary">LinkedIn</a>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FaComment /> Farmer Comments ({postComments.length})
                  </h3>
                  
                  <form onSubmit={handleCommentSubmit} className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="font-semibold mb-3">Share Your Farming Experience</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Your Email *"
                        value={commentEmail}
                        onChange={(e) => setCommentEmail(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <textarea
                      rows="4"
                      placeholder="Share your thoughts on this agricultural story..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                      required
                    ></textarea>
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition">
                      Post Comment
                    </button>
                  </form>

                  <div className="space-y-4">
                    {postComments.map(comment => (
                      <div key={comment.id} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
                        <img src={comment.avatar} alt={comment.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-primary">{comment.name}</span>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                          </div>
                          <p className="text-gray-600 text-sm">{getCommentText(comment.textKey)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary via-secondary to-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="text-6xl mb-4">🌾</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Invest in Liberian Agriculture?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join the agricultural revolution in Liberia. Whether you're a farmer or investor, Track2311 is your partner in growth.
            </p>
            <div className="space-x-4">
              <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block transform hover:scale-105">
                Contact Our Agri-Team
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogNews;