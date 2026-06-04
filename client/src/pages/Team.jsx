import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUsers, FaTrophy, FaHandshake, FaAward, FaChartLine, FaSeedling, FaTractor, FaLeaf, FaWater, FaWarehouse } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Team = () => {
  const { t } = useLanguage();

  const allTeamMembers = [
    {
      nameKey: "michaelName",
      positionKey: "boardMember",
      descriptionKey: "michaelDesc",
      image: "/images/team/team3.jpg",
      email: "#",
      category: "leadership",
    },
    {
      nameKey: "richardName",
      positionKey: "boardMember",
      descriptionKey: "richardDesc",
      image: "/images/team/team4.jpg",
      email: "rfngafuan@track2311investments.org",
      category: "leadership",
    },
    {
      nameKey: "preciousName",
      positionKey: "boardMember",
      descriptionKey: "preciousDesc",
      image: "/images/team/team1.jpg",
      email: "pohaizel@track2311investments.org",
      category: "leadership",
    },
    {
      nameKey: "ernestName",
      positionKey: "ceo",
      descriptionKey: "ernestDesc",
      image: "/images/team/team2.jpg",
      email: "#",
      category: "leadership",
    },
    {
      nameKey: "oliveName",
      positionKey: "boardMember",
      descriptionKey: "oliveDesc",
      image: "/images/team/team5.jpg",
      linkedin: "#",
      twitter: "#",
      email: "oktarpeh@track2311investments.org",
      category: "leadership",
    },
    {
      nameKey: "rooseveltName",
      positionKey: "administrator",
      descriptionKey: "rooseveltDesc",
      image: "/images/team/team6.jpg",
      linkedin: "#",
      twitter: "#",
      email: "#",
      category: "leadership",
    },
    {
      nameKey: "christineName",
      positionKey: "directorMarketing",
      descriptionKey: "christineDesc",
      image: "/images/team/team7.jpg",
      email: "codolo@track2311investments.org",
      category: "leadership",
    },
    {
      nameKey: "stephenName",
      positionKey: "directorTrade",
      descriptionKey: "stephenDesc",
      image: "/images/team/team8.jpg",
      linkedin: "#",
      twitter: "#",
      email: "#",
      category: "leadership",
    },
    {
      nameKey: "puchuName",
      positionKey: "directorTechnical",
      descriptionKey: "puchuDesc",
      image: "/images/team/team9.jpg",
      linkedin: "#",
      twitter: "#",
      email: "#",
      category: "leadership",
    },
    {
      nameKey: "georgestoneName",
      positionKey: "coordinatorRural",
      descriptionKey: "georgestoneDesc",
      image: "/images/team/team10.jpg",
      email: "gwilson@track2311investments.org",
      category: "leadership",
    },
    {
      nameKey: "nyeakehName",
      positionKey: "technicalAnalyst",
      descriptionKey: "nyeakehDesc",
      image: "/images/team/team11.jpg",
      email: "#",
      category: "leadership",
    },
    {
      nameKey: "jeremiahName",
      positionKey: "adminAssistant",
      descriptionKey: "jeremiahDesc",
      image: "/images/team/team12.jpg",
      email: "#",
      category: "leadership",
    }
  ];

  // Leadership Team
  const leadershipTeam = allTeamMembers;

  // Agricultural Expertise Sections
  const expertiseAreas = [
    { icon: <FaSeedling className="text-3xl" />, title: "Crop Science", count: "6 Experts", description: "Soil analysis, crop selection, and yield optimization" },
    { icon: <FaTractor className="text-3xl" />, title: "Farm Technology", count: "4 Experts", description: "Modern irrigation, equipment, and sustainable farming" },
    { icon: <FaLeaf className="text-3xl" />, title: "Agri-Finance", count: "5 Experts", description: "Farm investment, loans, and financial planning" },
    { icon: <FaWarehouse className="text-3xl" />, title: "Export & Trade", count: "3 Experts", description: "International market access and export documentation" },
    { icon: <FaWater className="text-3xl" />, title: "Irrigation", count: "3 Experts", description: "Water management and irrigation systems" },
    { icon: <FaHandshake className="text-3xl" />, title: "Farmer Training", count: "4 Experts", description: "Capacity building and community outreach" }
  ];

  // Helper functions
  const getMemberName = (key) => {
    const names = {
      preciousName: "Mrs. Precious N. Onumah-Haizel",
      ernestName: "Ernest Garnark Smith Jr",
      michaelName: "Michael Bobby Bull",
      richardName: "Hon. Richard Fatorma Ngafuan",
      oliveName: "Ms. Olive K. Tarpeh",
      rooseveltName: "M. Roosevelt Zuahdyu, Sr",
      christineName: "Mrs. Christine Outland-Dolo",
      stephenName: "Stephen Lee",
      puchuName: "Puchu B. Peabody",
      georgestoneName: "Georgestone P. Wilson",
      nyeakehName: "Nyeakeh Dweh",
      jeremiahName: "Jeremiah D. Henry"
    };
    return t.team?.page?.members?.[key] || names[key];
  };

  const getMemberPosition = (key) => {
    const positions = {
      boardMember: "Board Member",
      ceo: "Founder & CEO",
      chairman: "Chairman of the Board",
      administrator: "Administrator",
      directorMarketing: "Director of Marketing and Social Corporate Responsibility",
      directorTrade: "Director for International Trade & Investments",
      directorTechnical: "Director for Technical Services",
      coordinatorRural: "Coordinator of Rural Trade & Investments",
      technicalAnalyst: "Technical Analyst & Surveyor",
      adminAssistant: "Administrative Assistant"
    };
    return t.team?.page?.positions?.[key] || positions[key];
  };

  const getMemberDescription = (key) => {
    const descriptions = {
      preciousDesc: "Established professional banker with over two decades of experience in agricultural finance. Successful entrepreneur and advocate for women's empowerment in farming communities.",
      ernestDesc: "Expert in farm investment portfolio management and strategic agricultural planning with years of global experience in the agri-finance sector.",
      michaelDesc: "Distinguished policy and project analyst specializing in agricultural land development. Holds a BA Degree in Business Administration from Allen University.",
      richardDesc: "Seasoned statistician, demographer, and educator specializing in agricultural data and crop forecasting. Currently serves as Director General of LISGIS.",
      oliveDesc: "Professional agribusiness entrepreneur and accountant. Expert in farm business management and rural enterprise development.",
      rooseveltDesc: "Farm operations specialist with expertise in agricultural logistics and supply chain management for Liberian farming communities.",
      christineDesc: "Agricultural marketing expert with proven experience in export promotion and international market access for Liberian farm products.",
      stephenDesc: "International trade specialist focusing on agricultural exports, documentation, and market access for Liberian farmers.",
      puchuDesc: "Agricultural technology expert specializing in modern irrigation systems, farm equipment, and sustainable crop management practices.",
      georgestoneDesc: "Rural development coordinator with extensive experience in farmer training, community outreach, and agricultural extension services.",
      nyeakehDesc: "Technical analyst and farm surveyor specializing in soil analysis, crop science, and agricultural land assessment.",
      jeremiahDesc: "Farm administration specialist providing essential support for farmer record keeping, documentation, and farm management systems."
    };
    return t.team?.page?.descriptions?.[key] || descriptions[key];
  };

  // Company Stats
  const stats = [
    { value: "15+", labelKey: "yearsAgriExperience", icon: <FaTrophy className="text-3xl" />, label: "Years in Agriculture" },
    { value: "12", labelKey: "agriSpecialists", icon: <FaUsers className="text-3xl" />, label: "Agricultural Specialists" },
    { value: "5000+", labelKey: "farmersSupported", icon: <FaHandshake className="text-3xl" />, label: "Farmers Supported" },
    { value: "98%", labelKey: "farmerSatisfaction", icon: <FaAward className="text-3xl" />, label: "Farmer Satisfaction" }
  ];

  return (
    <>
      <SEO 
        title="Agricultural Leadership Team - Track2311 Experts"
        description="Meet Track2311's team of agricultural experts, agronomists, farm managers, and agri-finance specialists dedicated to transforming Liberian farming and supporting farming communities."
        keywords="agricultural team, agronomists, farm experts, agricultural leadership, farming specialists, Track2311 team, Liberian agriculture experts"
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
                🌾 Meet Our Agricultural Experts
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                Our Agricultural Leadership Team
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Dedicated agricultural professionals committed to transforming Liberian farming and supporting our farming communities
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-primary flex justify-center mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Agricultural Expertise Areas */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Our Specializations
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                Agricultural Expertise Areas
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our team brings specialized knowledge across all aspects of Liberian agriculture
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-primary mb-4 group-hover:text-accent transition-colors">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{area.title}</h3>
                  <p className="text-accent font-semibold text-sm mb-2">{area.count}</p>
                  <p className="text-gray-600 text-sm">{area.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team Section - SOCIAL ICONS REMOVED */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                👨‍🌾 Our Leaders
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                Meet Our Agricultural Leadership
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Seasoned agricultural professionals guiding our vision and strategy for Liberian farming
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadershipTeam.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={getMemberName(member.nameKey)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400?text=Team+Member';
                      }}
                    />
                    {/* Social icons have been removed - only the hover gradient remains */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-primary mb-1">{getMemberName(member.nameKey)}</h3>
                    <p className="text-accent font-semibold text-sm mb-3">{getMemberPosition(member.positionKey)}</p>
                    <p className="text-gray-600 text-sm line-clamp-3">{getMemberDescription(member.descriptionKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  🌱 Our Agricultural Values
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                  What Drives Our Agricultural Team
                </h2>
                <p className="text-gray-200 mb-6">
                  At Track2311, our agricultural team is united by a shared commitment to sustainable farming, farmer success, and agricultural excellence.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaSeedling className="text-accent text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Sustainable Farming</h3>
                      <p className="text-gray-300 text-sm">Promoting eco-friendly and sustainable agricultural practices for future generations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaHandshake className="text-accent text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Farmer First</h3>
                      <p className="text-gray-300 text-sm">Every decision starts with our farmers' best interests and community impact</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaChartLine className="text-accent text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Agricultural Excellence</h3>
                      <p className="text-gray-300 text-sm">Constantly evolving to provide cutting-edge farming solutions and market access</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">👨‍🌾</div>
                  <h3 className="text-2xl font-bold">Join Our Agricultural Team</h3>
                  <p className="text-gray-200 mt-2">
                    We're always looking for passionate agricultural professionals to join our growing farming team
                  </p>
                </div>
                <Link 
                  to="/careers" 
                  className="block text-center bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition group"
                >
                  View Agricultural Positions
                  <FaArrowRight className="inline ml-2 group-hover:translate-x-1 transition" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Farmer Support Commitment */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                🤝 Our Commitment
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                Dedicated to Liberian Farmers
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our team is committed to providing ongoing support and expertise to farming communities across Liberia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="text-4xl mb-3">📞</div>
                <h3 className="font-bold text-primary">24/7 Farmer Support</h3>
                <p className="text-sm text-gray-600 mt-2">Round-the-clock assistance for farming queries</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="text-4xl mb-3">🌾</div>
                <h3 className="font-bold text-primary">On-Site Training</h3>
                <p className="text-sm text-gray-600 mt-2">Regular farmer training workshops in rural communities</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="text-4xl mb-3">🚜</div>
                <h3 className="font-bold text-primary">Equipment Access</h3>
                <p className="text-sm text-gray-600 mt-2">Modern farming equipment and irrigation systems</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="text-4xl mb-3">📊</div>
                <h3 className="font-bold text-primary">Market Access</h3>
                <p className="text-sm text-gray-600 mt-2">Connecting farmers to local and international markets</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-secondary to-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🌾</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Work With Our Agricultural Experts?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Let our experienced agricultural professionals help you transform your farming business and achieve greater harvests
              </p>
              <div className="space-x-4">
                <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-block transform hover:scale-105">
                  Contact Our Agri-Team
                </Link>
                <Link to="/plans" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition inline-block">
                  Explore Our Investment Plans
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Team;