import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTimes, FaSearch, FaCamera, FaCalendarAlt, FaMapMarkerAlt, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Gallery Images Data
  const galleryImages = [
    // Events & Conferences
    {
      id: 1,
      titleKey: "event1Title",
      descriptionKey: "event1Desc",
      category: "events",
      subcategoryKey: "conferences",
      image: "/images/gallery/gallery1.jpg",
      date: "March 15, 2024",
      location: "Monrovia, Liberia",
      photographer: "Track2311 Media Team"
    },
    {
      id: 2,
      titleKey: "event2Title",
      descriptionKey: "event2Desc",
      category: "events",
      subcategoryKey: "meetings",
      image: "/images/gallery/gallery2.jpg",
      date: "February 10, 2024",
      location: "Monrovia, Liberia",
      photographer: "Track2311 Media Team"
    },
    {
      id: 3,
      titleKey: "event3Title",
      descriptionKey: "event3Desc",
      category: "events",
      subcategoryKey: "celebrations",
      image: "/images/gallery/gallery3.jpg",
      date: "December 5, 2023",
      location: "Monrovia, Liberia",
      photographer: "Track2311 Media Team"
    },
    // Team & Office
    {
      id: 4,
      titleKey: "team1Title",
      descriptionKey: "team1Desc",
      category: "team",
      subcategoryKey: "leadership",
      image: "/images/gallery/gallery4.jpg",
      date: "January 20, 2024",
      location: "Track2311 Headquarters",
      photographer: "Track2311 Media Team"
    },
    {
      id: 5,
      titleKey: "team2Title",
      descriptionKey: "team2Desc",
      category: "team",
      subcategoryKey: "workplace",
      image: "/images/gallery/gallery5.jpg",
      date: "January 15, 2024",
      location: "Monrovia, Liberia",
      photographer: "Track2311 Media Team"
    },
    {
      id: 6,
      titleKey: "team3Title",
      descriptionKey: "team3Desc",
      category: "team",
      subcategoryKey: "activities",
      image: "/images/gallery/gallery6.jpg",
      date: "November 12, 2023",
      location: "Monrovia, Liberia",
      photographer: "Track2311 Media Team"
    },
    // Projects & Investments
    {
      id: 7,
      titleKey: "project1Title",
      descriptionKey: "project1Desc",
      category: "projects",
      subcategoryKey: "agriculture",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
      date: "March 5, 2024",
      location: "Lofa County, Liberia",
      photographer: "Track2311 Media Team"
    },
    {
      id: 8,
      titleKey: "project2Title",
      descriptionKey: "project2Desc",
      category: "projects",
      subcategoryKey: "realEstate",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      date: "February 20, 2024",
      location: "Montserrado, Liberia",
      photographer: "Track2311 Media Team"
    },
    {
      id: 9,
      titleKey: "project3Title",
      descriptionKey: "project3Desc",
      category: "projects",
      subcategoryKey: "trade",
      image: "/images/gallery/gallery7.jpg",
      date: "January 25, 2024",
      location: "Accra, Ghana",
      photographer: "Track2311 Media Team"
    },
    // Community & CSR
    {
      id: 10,
      titleKey: "community1Title",
      descriptionKey: "community1Desc",
      category: "community",
      subcategoryKey: "csr",
      image: "/images/gallery/gallery8.jpg",
      date: "February 28, 2024",
      location: "Bong County, Liberia",
      photographer: "Track2311 Media Team"
    },
    {
      id: 11,
      titleKey: "community2Title",
      descriptionKey: "community2Desc",
      category: "community",
      subcategoryKey: "education",
      image: "/images/gallery/gallery9.jpg",
      date: "January 10, 2024",
      location: "Monrovia, Liberia",
      photographer: "Track2311 Media Team"
    },
    {
      id: 12,
      titleKey: "community3Title",
      descriptionKey: "community3Desc",
      category: "community",
      subcategoryKey: "workshops",
      image: "/images/gallery/gallery10.jpg",
      date: "March 8, 2024",
      location: "Monrovia, Liberia",
      photographer: "Track2311 Media Team"
    }
  ];

  // Categories
  const categories = [
    { id: "all", nameKey: "allPhotos", icon: "📸", count: galleryImages.length },
    { id: "events", nameKey: "events", icon: "🎉", count: galleryImages.filter(img => img.category === "events").length },
    { id: "team", nameKey: "team", icon: "👥", count: galleryImages.filter(img => img.category === "team").length },
    { id: "projects", nameKey: "projects", icon: "🏗️", count: galleryImages.filter(img => img.category === "projects").length },
    { id: "community", nameKey: "community", icon: "🤝", count: galleryImages.filter(img => img.category === "community").length }
  ];

  // Helper functions for translations
  const getImageTitle = (key) => {
    const titles = {
      event1Title: "Annual Investment Summit 2024",
      event2Title: "Board of Directors Meeting",
      event3Title: "Client Appreciation Gala",
      team1Title: "Our Leadership Team",
      team2Title: "Office Environment",
      team3Title: "Team Building Event",
      project1Title: "Agricultural Project Site Visit",
      project2Title: "Real Estate Development",
      project3Title: "International Trade Exhibition",
      community1Title: "Community Empowerment Program",
      community2Title: "Scholarship Award Ceremony",
      community3Title: "Women in Business Workshop"
    };
    return t.gallery?.images?.[key] || titles[key];
  };

  const getImageDescription = (key) => {
    const descriptions = {
      event1Desc: "Track2311 hosted its annual investment summit bringing together industry leaders and investors.",
      event2Desc: "Strategic planning session with our board of directors.",
      event3Desc: "Celebrating our valued clients and their success stories.",
      team1Desc: "Meet the dedicated professionals behind Track2311.",
      team2Desc: "Our modern workspace designed for collaboration and innovation.",
      team3Desc: "Strengthening bonds through team building activities.",
      project1Desc: "Inspecting the progress of our agricultural investment projects.",
      project2Desc: "Luxury residential development project underway.",
      project3Desc: "Showcasing Liberian products at international trade fair.",
      community1Desc: "Empowering local communities through skills training.",
      community2Desc: "Supporting education through our scholarship program.",
      community3Desc: "Empowering women entrepreneurs through business training."
    };
    return t.gallery?.descriptions?.[key] || descriptions[key];
  };

  const getSubcategoryName = (key) => {
    const subcategories = {
      conferences: "Conferences",
      meetings: "Meetings",
      celebrations: "Celebrations",
      leadership: "Leadership",
      workplace: "Workplace",
      activities: "Activities",
      agriculture: "Agriculture",
      realEstate: "Real Estate",
      trade: "Trade",
      csr: "CSR",
      education: "Education",
      workshops: "Workshops"
    };
    return t.gallery?.subcategories?.[key] || subcategories[key];
  };

  const getCategoryName = (key) => {
    const names = {
      allPhotos: "All Photos",
      events: "Events",
      team: "Team",
      projects: "Projects",
      community: "Community"
    };
    return t.gallery?.categories?.[key] || names[key];
  };

  // Filter images based on category and search
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = activeCategory === 'all' || image.category === activeCategory;
    const matchesSearch = getImageTitle(image.titleKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getImageDescription(image.descriptionKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get category background color
  const getCategoryColor = (category) => {
    const colors = {
      events: "bg-blue-500",
      team: "bg-green-500",
      projects: "bg-purple-500",
      community: "bg-orange-500"
    };
    return colors[category] || "bg-primary";
  };

  return (
    <>
      <SEO 
        title="Photo Gallery - Track2311 Events & Projects"
        description="Browse Track2311's photo gallery featuring investment summits, community events, agricultural projects, team activities, and corporate social responsibility initiatives in Liberia."
        keywords="Track2311 gallery, investment events, community outreach, agricultural projects, team photos, CSR activities, Liberia investment photos"
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
                {t.gallery?.hero?.badge || "Visual Journey"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                {t.gallery?.hero?.title || "Our Gallery"}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {t.gallery?.hero?.subtitle || "Explore moments from our events, projects, and community impact"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{galleryImages.length}+</div>
                <div className="text-sm text-gray-500">{t.gallery?.stats?.momentsCaptured || "Moments Captured"}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-gray-500">{t.gallery?.stats?.majorEvents || "Major Events"}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">3+</div>
                <div className="text-sm text-gray-500">{t.gallery?.stats?.countries || "Countries"}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-gray-500">{t.gallery?.stats?.communityMembers || "Community Members"}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.gallery?.search?.placeholder || "Search gallery..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
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
                  <span>{category.icon}</span>
                  <span>{getCategoryName(category.nameKey)}</span>
                  <span className={`text-xs ${activeCategory === category.id ? 'text-accent' : 'text-gray-400'}`}>
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>

            {/* Results Count */}
            {searchTerm && (
              <p className="text-center text-sm text-gray-500 mb-6">
                {t.gallery?.search?.found || "Found"} {filteredImages.length} {t.gallery?.search?.results || "results for"} "{searchTerm}"
              </p>
            )}

            {/* Masonry Grid */}
            {filteredImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={image.image} 
                          alt={getImageTitle(image.titleKey)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <h3 className="font-bold text-lg">{getImageTitle(image.titleKey)}</h3>
                            <p className="text-sm opacity-90">{image.location}</p>
                          </div>
                        </div>
                        <div className={`absolute top-4 right-4 ${getCategoryColor(image.category)} text-white px-2 py-1 rounded-lg text-xs font-semibold`}>
                          {getSubcategoryName(image.subcategoryKey)}
                        </div>
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-accent text-xs" />
                            {image.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-accent text-xs" />
                            {image.location.split(',')[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg">{t.gallery?.search?.noResults || "No images found matching your search."}</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                  className="mt-4 text-primary hover:text-accent font-semibold"
                >
                  {t.gallery?.buttons?.clearFilters || "Clear filters"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Instagram Feed Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.gallery?.social?.badge || "Social Media"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.gallery?.social?.title || "Follow Our Journey"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.gallery?.social?.subtitle || "Stay connected with us on social media for the latest updates and behind-the-scenes content"}
              </p>
            </motion.div>

            <div className="flex justify-center gap-6 mb-12">
              <a href="https://www.instagram.com/p/C578FUKuLBV/?igsh=MWQwcDFwMWp1eW5idA%3D%3D" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full hover:scale-110 transition-transform duration-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/people/Track2311-Investments-Consultancy-Ltd/100082914168655/" className="bg-blue-600 text-white p-4 rounded-full hover:scale-110 transition-transform duration-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com/track2311invest?t=f14zVsNckZU3eMYNLRXwnw&s=09" className="bg-sky-500 text-white p-4 rounded-full hover:scale-110 transition-transform duration-300">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>

            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                  <img 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1511795409834-ef04bbd61622' : item === 2 ? '1528605248644-14dd04022da1' : item === 3 ? '1557804506-669a67965ba0' : '1523240795612-9a054b0db644'}?w=400`}
                    alt={`Instagram post ${item}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaInstagram className="text-white text-3xl" />
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.gallery?.cta?.title || "Want to Be Part of Our Journey?"}
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {t.gallery?.cta?.subtitle || "Join our community and stay updated with our latest events and success stories"}
              </p>
              <div className="space-x-4">
                <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block">
                  {t.gallery?.buttons?.contactUs || "Contact Us Today"}
                </Link>
                {/* <Link to="/register" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition inline-block">
                  {t.gallery?.buttons?.getStarted || "Get Started"}
                </Link> */}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full bg-white rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
                
                <img 
                  src={selectedImage.image} 
                  alt={getImageTitle(selectedImage.titleKey)}
                  className="w-full h-auto max-h-[70vh] object-contain"
                  loading="lazy"
                />
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">{getImageTitle(selectedImage.titleKey)}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-accent" />
                      {selectedImage.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-accent" />
                      {selectedImage.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCamera className="text-accent" />
                      {selectedImage.photographer}
                    </span>
                  </div>
                  <p className="text-gray-600">{getImageDescription(selectedImage.descriptionKey)}</p>
                  
                  <div className="mt-4 pt-4 border-t flex gap-3">
                    <span className={`px-3 py-1 ${getCategoryColor(selectedImage.category)} text-white rounded-full text-xs font-semibold`}>
                      {getSubcategoryName(selectedImage.subcategoryKey)}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Gallery;