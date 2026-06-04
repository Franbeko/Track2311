import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaUser, FaSearch, 
  FaEye, FaHeart, FaStar, FaQuoteLeft,
  FaTrophy, FaHandHoldingUsd,
  FaArrowRight, FaMedal, FaRocket, FaSeedling,
  FaTractor, FaUsers
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const BlogSuccessStories = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);

  // Featured Success Stories - Agricultural Focus
  const featuredStories = [
    {
      id: 1,
      titleKey: "featured1Title",
      clientNameKey: "featured1Client",
      location: "Lofa County, Liberia",
      industryKey: "agriculture",
      initialInvestment: "$25,000",
      finalReturn: "$87,500",
      roi: "250%",
      duration: "18 months",
      challengeKey: "featured1Challenge",
      solutionKey: "featured1Solution",
      resultKey: "featured1Result",
      testimonialKey: "featured1Testimonial",
      clientRole: "Farm Director, Agro-Liberia Enterprises",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      date: "May 28, 2024",
      author: "Ernest Garnark Smith Jr",
      authorAvatar: "/images/team/team2.jpg",
      likes: 345,
      views: 5678,
      hectares: 50,
      jobsCreated: 15,
      familiesImpacted: 80
    },
    {
      id: 2,
      titleKey: "featured2Title",
      clientNameKey: "featured2Client",
      location: "Bong County, Liberia",
      industryKey: "cassava",
      initialInvestment: "$15,000",
      finalReturn: "$52,500",
      roi: "250%",
      duration: "14 months",
      challengeKey: "featured2Challenge",
      solutionKey: "featured2Solution",
      resultKey: "featured2Result",
      testimonialKey: "featured2Testimonial",
      clientRole: "Farm Manager, United Farmers Co-op",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800",
      date: "May 25, 2024",
      author: "Mrs. Precious N. Onumah-Haizel",
      authorAvatar: "/images/team/team1.jpg",
      likes: 278,
      views: 4321,
      hectares: 30,
      jobsCreated: 8,
      familiesImpacted: 45
    }
  ];

  // Quick Success Stories Grid - Agricultural Focus
  const quickStories = [
    {
      id: 3,
      titleKey: "quick1Title",
      clientNameKey: "quick1Client",
      industryKey: "rice",
      initialInvestment: "$8,000",
      roi: "180%",
      duration: "12 months",
      resultKey: "quick1Result",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
      date: "May 20, 2024",
      testimonialKey: "quick1Testimonial",
      hectares: 15,
      yieldIncrease: "200%"
    },
    {
      id: 4,
      titleKey: "quick2Title",
      clientNameKey: "quick2Client",
      industryKey: "cocoa",
      initialInvestment: "$12,000",
      roi: "220%",
      duration: "16 months",
      resultKey: "quick2Result",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      date: "May 18, 2024",
      testimonialKey: "quick2Testimonial",
      hectares: 20,
      yieldIncrease: "250%"
    },
    {
      id: 5,
      titleKey: "quick3Title",
      clientNameKey: "quick3Client",
      industryKey: "rubber",
      initialInvestment: "$10,000",
      roi: "150%",
      duration: "24 months",
      resultKey: "quick3Result",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
      date: "May 15, 2024",
      testimonialKey: "quick3Testimonial",
      hectares: 25,
      yieldIncrease: "175%"
    },
    {
      id: 6,
      titleKey: "quick4Title",
      clientNameKey: "quick4Client",
      industryKey: "palmOil",
      initialInvestment: "$20,000",
      roi: "300%",
      duration: "20 months",
      resultKey: "quick4Result",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      date: "May 12, 2024",
      testimonialKey: "quick4Testimonial",
      hectares: 40,
      yieldIncrease: "300%"
    }
  ];

  // Impact Numbers
  const impactStats = [
    { value: "500+", label: "Farmers Supported", icon: <FaUsers className="text-accent" /> },
    { value: "10,000+", label: "Acres Cultivated", icon: <FaSeedling className="text-accent" /> },
    { value: "250+", label: "Jobs Created", icon: <FaTractor className="text-accent" /> },
    { value: "2,000+", label: "Families Impacted", icon: <FaHandHoldingUsd className="text-accent" /> }
  ];

  // Helper functions for translations
  const getIndustryName = (key) => {
    const industries = {
      agriculture: "Crop Farming",
      cassava: "Cassava Production",
      rice: "Rice Farming",
      cocoa: "Cocoa Plantation",
      rubber: "Rubber Plantation",
      palmOil: "Palm Oil"
    };
    return t.successStories?.industries?.[key] || industries[key];
  };

  const getFeaturedTitle = (key) => {
    const titles = {
      featured1Title: "From Small Farm to Agricultural Powerhouse",
      featured2Title: "Cassava Farmer Transforms Community Economy"
    };
    return t.successStories?.featured?.[key] || titles[key];
  };

  const getFeaturedClient = (key) => {
    const clients = {
      featured1Client: "Agro-Liberia Enterprises",
      featured2Client: "United Farmers Co-op"
    };
    return t.successStories?.featured?.[key] || clients[key];
  };

  const getFeaturedChallenge = (key) => {
    const challenges = {
      featured1Challenge: "Limited access to modern farming equipment, irrigation systems, and export markets",
      featured2Challenge: "Poor crop yields due to outdated farming techniques and lack of quality seeds"
    };
    return t.successStories?.featured?.[key] || challenges[key];
  };

  const getFeaturedSolution = (key) => {
    const solutions = {
      featured1Solution: "Implemented modern irrigation systems, provided high-yield seeds, established international trade partnerships with European buyers",
      featured2Solution: "Introduced modern cassava processing techniques, provided organic fertilizers, connected to regional processing plants"
    };
    return t.successStories?.featured?.[key] || solutions[key];
  };

  const getFeaturedResult = (key) => {
    const results = {
      featured1Result: "300% increase in crop yield, secured export contracts with 5 international buyers, created 15 new jobs, expanded to 50 hectares",
      featured2Result: "250% increase in cassava production, established local processing facility, created 8 jobs, impacted 45 farming families"
    };
    return t.successStories?.featured?.[key] || results[key];
  };

  const getFeaturedTestimonial = (key) => {
    const testimonials = {
      featured1Testimonial: "Track2311 transformed our farm. We went from struggling to meet local demand to exporting across West Africa and Europe. Their expertise in modern farming and international trade is unmatched.",
      featured2Testimonial: "Our community's cassava production has tripled! Track2311's training and support have changed lives. We now have a processing facility right in our village."
    };
    return t.successStories?.featured?.[key] || testimonials[key];
  };

  const getQuickTitle = (key) => {
    const titles = {
      quick1Title: "Rice Farmer Achieves Record Harvest",
      quick2Title: "Cocoa Plantation Export Success",
      quick3Title: "Rubber Farm Revitalization Story",
      quick4Title: "Palm Oil Co-op Expands to Europe"
    };
    return t.successStories?.quick?.[key] || titles[key];
  };

  const getQuickClient = (key) => {
    const clients = {
      quick1Client: "Mamie's Rice Farm",
      quick2Client: "Liberian Cocoa Co-op",
      quick3Client: "Bong Rubber Plantation",
      quick4Client: "United Palm Oil Growers"
    };
    return t.successStories?.quick?.[key] || clients[key];
  };

  const getQuickResult = (key) => {
    const results = {
      quick1Result: "Harvest yield doubled, secured government contracts",
      quick2Result: "Exported first container to Netherlands",
      quick3Result: "Revitalized 25 hectares, created 12 jobs",
      quick4Result: "Exported to European markets, farmer incomes tripled"
    };
    return t.successStories?.quick?.[key] || results[key];
  };

  const getQuickTestimonial = (key) => {
    const testimonials = {
      quick1Testimonial: "My rice harvest has never been this abundant! Track2311's modern techniques and quality seeds made all the difference.",
      quick2Testimonial: "We just shipped our first cocoa container to Europe! Track2311 opened doors we never knew existed.",
      quick3Testimonial: "Our rubber plantation is thriving again. The team's expertise in sustainable farming is incredible.",
      quick4Testimonial: "Our cooperative's income has tripled. Track2311 truly cares about Liberian farmers."
    };
    return t.successStories?.quick?.[key] || testimonials[key];
  };

  // Filter quick stories based on search
  const searchedStories = quickStories.filter(story => 
    getQuickTitle(story.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getQuickClient(story.clientNameKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
    getIndustryName(story.industryKey).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO 
        title="Farmer Success Stories | Liberian Agriculture"
        description="Inspiring success stories of Liberian farmers who transformed their agricultural businesses with Track2311. Real results, real impact - from small farms to export success."
        keywords="farmer success stories, Liberian agriculture, farming success, crop yield increase, agribusiness success, cocoa farming, rice farming, cassava production"
      />
      
      <div>
        {/* Hero Section - Updated for Agriculture */}
        <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-20 right-10 opacity-10">
            <FaTrophy className="text-8xl" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-white/10 skew-y-3"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-accent/20 rounded-full text-accent text-sm mb-4">
                <FaMedal /> 🌾 Farming Success Stories
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Liberian Farmer Success Stories
              </h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Real results from real farmers who transformed their agricultural businesses with Track2311
              </p>
            </motion.div>
          </div>
        </section>

        {/* Impact Stats Section - NEW */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl flex justify-center mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Case Studies */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                🌟 Featured Farm Stories
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                Transformational Farming Journeys
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                In-depth case studies showcasing remarkable agricultural transformations
              </p>
            </div>

            <div className="space-y-16">
              {featuredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-80 lg:h-full">
                      <img 
                        src={story.image} 
                        alt={getFeaturedTitle(story.titleKey)} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r"></div>
                      {/* Impact Badge - NEW */}
                      <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            <div>
                              <p className="text-xs text-gray-500">Hectares</p>
                              <p className="font-bold text-primary">{story.hectares}+</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Jobs</p>
                              <p className="font-bold text-primary">{story.jobsCreated}+</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Families</p>
                              <p className="font-bold text-primary">{story.familiesImpacted}+</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 lg:p-10">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {getIndustryName(story.industryKey)}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <FaCalendarAlt className="text-accent" />
                          {story.date}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3">{getFeaturedTitle(story.titleKey)}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 flex items-center justify-center">
                          <FaSeedling className="text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{getFeaturedClient(story.clientNameKey)}</p>
                          <p className="text-sm text-gray-500">{story.location}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-bold text-primary mb-1">🌾 The Challenge</h4>
                          <p className="text-gray-600 text-sm">{getFeaturedChallenge(story.challengeKey)}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-primary mb-1">💡 Our Solution</h4>
                          <p className="text-gray-600 text-sm">{getFeaturedSolution(story.solutionKey)}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-primary mb-1">📈 The Result</h4>
                          <p className="text-gray-600 text-sm">{getFeaturedResult(story.resultKey)}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 mb-6">
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-xs text-gray-500">Investment</p>
                            <p className="font-bold text-primary text-sm">{story.initialInvestment}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Return</p>
                            <p className="font-bold text-accent text-sm">{story.roi}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="font-bold text-primary text-sm">{story.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Hectares</p>
                            <p className="font-bold text-primary text-sm">{story.hectares}+</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Client Testimonial */}
                      <div className="bg-green-50 rounded-xl p-4 mb-6 border-l-4 border-accent">
                        <FaQuoteLeft className="text-accent text-2xl mb-2" />
                        <p className="text-gray-700 text-sm italic">"{getFeaturedTestimonial(story.testimonialKey)}"</p>
                        <div className="mt-3 flex items-center gap-2">
                          <FaStar className="text-accent" />
                          <FaStar className="text-accent" />
                          <FaStar className="text-accent" />
                          <FaStar className="text-accent" />
                          <FaStar className="text-accent" />
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setSelectedStory(story)}
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition group"
                      >
                        Read Full Farm Story
                        <FaArrowRight className="group-hover:translate-x-1 transition" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Success Stories Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                📋 More Farm Successes
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                Quick Farming Success Highlights
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse through our collection of inspiring farmer success stories
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by farmer, crop, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {searchTerm && (
              <p className="text-center text-sm text-gray-500 mb-6">
                Found {searchedStories.length} results for "{searchTerm}"
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchedStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedStory(story)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={story.image} 
                      alt={getQuickTitle(story.titleKey)} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-primary px-2 py-1 rounded-lg text-xs font-bold">
                      {story.roi} ROI
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                        {getIndustryName(story.industryKey)}
                      </span>
                      <div className="flex items-center gap-1">
                        <FaHeart className="text-gray-400 text-sm" />
                        <span className="text-xs text-gray-500">234</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{getQuickTitle(story.titleKey)}</h3>
                    <p className="text-gray-600 text-sm mb-3">{getQuickClient(story.clientNameKey)}</p>
                    
                    {/* Yield Increase Badge - NEW */}
                    {story.yieldIncrease && (
                      <div className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full mb-3">
                        📈 Yield +{story.yieldIncrease}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Investment</p>
                        <p className="font-semibold text-sm">{story.initialInvestment}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="font-semibold text-sm">{story.duration}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hectares</p>
                        <p className="font-semibold text-sm">{story.hectares}+</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-accent mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 text-xs italic">"{getQuickResult(story.resultKey)}"</p>
                    <button className="mt-4 text-primary text-sm font-semibold hover:text-accent transition">
                      Read Farmer's Story →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Farmer Testimonials Wall */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                💚 Farmer Love
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                What Liberian Farmers Say
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                Real testimonials from farmers who achieved their agricultural goals with Track2311
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Joseph K.", village: "Lofa County", crop: "Cocoa & Rice Farmer", text: "Track2311 helped me double my cocoa harvest. Now I'm exporting to Europe!", rating: 5 },
                { name: "Martha S.", village: "Bong County", crop: "Cassava Farmer", text: "The training and support from Track2311 transformed my farm. My family's income has tripled!", rating: 5 },
                { name: "Samuel W.", village: "Nimba County", crop: "Palm Oil Producer", text: "I never thought my small farm could reach international markets. Track2311 made it happen!", rating: 5 }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition"
                >
                  <FaQuoteLeft className="text-accent text-3xl mb-4 opacity-50" />
                  <p className="mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm opacity-75">{testimonial.village}</p>
                      <p className="text-xs opacity-60">{testimonial.crop}</p>
                    </div>
                    <div className="flex text-accent">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <FaRocket className="text-5xl text-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Ready to Write Your Farm Success Story?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join hundreds of successful Liberian farmers who transformed their agricultural businesses with Track2311
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition inline-block">
                  Talk to our Expert
                </Link>
                <Link to="/plans" className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition inline-block">
                  Explore Our Investment Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Story Modal */}
        {selectedStory && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-primary">{selectedStory.titleKey ? getQuickTitle(selectedStory.titleKey) : getFeaturedTitle(selectedStory.titleKey)}</h2>
                <button 
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-500 hover:text-red-500 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <img 
                  src={selectedStory.image} 
                  alt="Farmer Success Story" 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                  loading="lazy"
                />
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1"><FaCalendarAlt /> {selectedStory.date}</span>
                  <span className="flex items-center gap-1"><FaUser /> {selectedStory.clientNameKey ? getQuickClient(selectedStory.clientNameKey) : getFeaturedClient(selectedStory.clientNameKey)}</span>
                  <span className="flex items-center gap-1"><FaEye /> {selectedStory.views || '1.2k'} views</span>
                </div>
                
                <div className="bg-primary/10 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-primary mb-4">Farm Investment Highlights</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Investment</p>
                      <p className="font-bold text-primary">{selectedStory.initialInvestment || '$10,000'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ROI</p>
                      <p className="font-bold text-accent">{selectedStory.roi || '180%'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-bold text-primary">{selectedStory.duration || '18 months'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Hectares</p>
                      <p className="font-bold text-primary">{selectedStory.hectares || '20'}+</p>
                    </div>
                  </div>
                </div>

                {selectedStory.testimonialKey && selectedStory.testimonialKey.startsWith('quick') && (
                  <div className="bg-green-50 rounded-xl p-6 my-6 border-l-4 border-accent">
                    <FaQuoteLeft className="text-accent text-3xl mb-3" />
                    <p className="text-gray-700 italic mb-4">"{getQuickTestimonial(selectedStory.testimonialKey)}"</p>
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                    <div className="mt-3 font-bold text-primary">{getQuickClient(selectedStory.clientNameKey)}</div>
                    <p className="text-sm text-gray-500">{selectedStory.location || 'Liberia'}</p>
                  </div>
                )}
                
                {/* For featured stories in modal */}
                {selectedStory.testimonialKey && selectedStory.testimonialKey.startsWith('featured') && (
                  <div className="bg-green-50 rounded-xl p-6 my-6 border-l-4 border-accent">
                    <FaQuoteLeft className="text-accent text-3xl mb-3" />
                    <p className="text-gray-700 italic mb-4">"{getFeaturedTestimonial(selectedStory.testimonialKey)}"</p>
                    <div className="flex items-center gap-1 text-accent">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>
                    <div className="mt-3 font-bold text-primary">{getFeaturedClient(selectedStory.clientNameKey)}</div>
                    <p className="text-sm text-gray-500">{selectedStory.location || 'Liberia'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogSuccessStories;