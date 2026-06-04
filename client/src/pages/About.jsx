import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHandshake, FaArrowRight, 
  FaUsers, FaGlobe, FaSeedling, FaTractor,
  FaCheckCircle, FaBuilding, FaUniversity, FaTree,
  FaBalanceScale, FaGraduationCap, FaHardHat, FaChartLine
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const About = () => {
  const { t } = useLanguage();

  // Company values
  const values = [
    { 
      icon: <FaSeedling className="text-4xl" />, 
      titleKey: "integrity", 
      descriptionKey: "integrityDesc" 
    },
    { 
      icon: <FaUsers className="text-4xl" />, 
      titleKey: "clientFirst", 
      descriptionKey: "clientFirstDesc" 
    },
    { 
      icon: <FaTractor className="text-4xl" />, 
      titleKey: "excellence", 
      descriptionKey: "excellenceDesc" 
    },
    { 
      icon: <FaGlobe className="text-4xl" />, 
      titleKey: "globalVision", 
      descriptionKey: "globalVisionDesc" 
    },
  ];

  // Core business areas
  const businessAreas = [
    { icon: <FaTree className="text-3xl" />, titleKey: "agriculture", descriptionKey: "agricultureDesc" },
    { icon: <FaBuilding className="text-3xl" />, titleKey: "realEstate", descriptionKey: "realEstateDesc" },
    { icon: <FaUniversity className="text-3xl" />, titleKey: "microfinance", descriptionKey: "microfinanceDesc" },
    { icon: <FaBalanceScale className="text-3xl" />, titleKey: "consultancy", descriptionKey: "consultancyDesc" },
    { icon: <FaGraduationCap className="text-3xl" />, titleKey: "capacityBuilding", descriptionKey: "capacityBuildingDesc" },
    { icon: <FaHardHat className="text-3xl" />, titleKey: "construction", descriptionKey: "constructionDesc" },
  ];

  // Milestones
  const milestones = [
    { year: "2019", titleKey: "founded", descriptionKey: "foundedDesc" },
    { year: "2020", titleKey: "firstInvestment", descriptionKey: "firstInvestmentDesc" },
    { year: "2022", titleKey: "expansion", descriptionKey: "expansionDesc" },
    { year: "2023", titleKey: "investorsMilestone", descriptionKey: "investorsMilestoneDesc" },
    { year: "2024", titleKey: "globalRecognition", descriptionKey: "globalRecognitionDesc" },
  ];

  // Why choose us points
  const whyChooseUsPoints = [
    "localExpertise",
    "provenTrackRecord",
    "transparentPractices",
    "dedicatedTeam",
    "personalizedStrategies",
    "roundSupport"
  ];

  // Helper function to get translated text
  const getValueTitle = (key) => {
    const titles = {
      integrity: "Sustainable Farming",
      clientFirst: "Farmer First",
      excellence: "Agricultural Excellence",
      globalVision: "Global Market Access"
    };
    return t.about?.values?.[key] || titles[key];
  };

  const getValueDesc = (key) => {
    const descs = {
      integrityDesc: "Promoting eco-friendly and sustainable agricultural practices",
      clientFirstDesc: "Our farmers' and investors' success is our priority",
      excellenceDesc: "Delivering the highest quality agricultural products and services",
      globalVisionDesc: "Connecting Liberian farmers to international markets"
    };
    return t.about?.values?.[`${key}Desc`] || descs[`${key}Desc`];
  };

  const getBusinessTitle = (key) => {
    const titles = {
      agriculture: "Agriculture & Agribusiness",
      realEstate: "Real Estate Development",
      microfinance: "Agricultural Micro-finance",
      consultancy: "Farm & Business Consultancy",
      capacityBuilding: "Farmer Capacity Building",
      construction: "Agricultural Construction"
    };
    return t.about?.business?.[key] || titles[key];
  };

  const getBusinessDesc = (key) => {
    const descs = {
      agricultureDesc: "Modern farming, crop management, and export of agricultural products",
      realEstateDesc: "Farmland acquisition and agricultural property development",
      microfinanceDesc: "Accessible loans and financial services for farmers",
      consultancyDesc: "Strategic agricultural and investment advisory",
      capacityBuildingDesc: "Training programs for modern farming techniques",
      constructionDesc: "Farm infrastructure and agricultural facility construction"
    };
    return t.about?.business?.[`${key}Desc`] || descs[`${key}Desc`];
  };

  const getMilestoneTitle = (key) => {
    const titles = {
      founded: "Company Founded",
      firstInvestment: "First Agricultural Investment",
      expansion: "Farm Network Expansion",
      investorsMilestone: "5,000+ Farmers & Investors",
      globalRecognition: "International Export Recognition"
    };
    return t.about?.milestones?.[key] || titles[key];
  };

  const getMilestoneDesc = (key) => {
    const descs = {
      foundedDesc: "Track2311 Investments established in Liberia with focus on agriculture",
      firstInvestmentDesc: "Successful launch of agricultural export program to West Africa",
      expansionDesc: "Expanded to farmlands, real estate, and construction sectors",
      investorsMilestoneDesc: "Reached milestone of 5,000+ farmers and investors",
      globalRecognitionDesc: "Awarded Best Agricultural Investment Platform in Liberia"
    };
    return t.about?.milestones?.[`${key}Desc`] || descs[`${key}Desc`];
  };

  const getWhyChooseUsText = (key) => {
    const texts = {
      localExpertise: "Deep understanding of Liberia's agricultural landscape",
      provenTrackRecord: "Proven success in connecting farmers to global markets",
      transparentPractices: "Transparent and ethical farming partnerships",
      dedicatedTeam: "Dedicated team of agricultural experts",
      personalizedStrategies: "Customized farming and investment strategies",
      roundSupport: "24/7 farmer support and field assistance"
    };
    return t.about?.whyChooseUs?.[key] || texts[key];
  };

  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about Track2311 Investments - our mission to transform Liberian agriculture, vision for sustainable farming, and team of agricultural experts dedicated to farmer success and global market access."
        keywords="about Track2311, agricultural investment Liberia, sustainable farming, farmer empowerment, agribusiness Liberia, Track2311 mission, Track2311 vision"
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
                {t.about?.hero?.badge || "Company Profile"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                {t.about?.hero?.title || "About Track2311 Investments"}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {t.about?.hero?.subtitle || "Your trusted partner in Liberian agriculture, investment, and sustainable growth"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  {t.about?.whoWeAre?.badge || "Who We Are"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-primary">
                  {t.about?.whoWeAre?.title || "Growing Liberia's Agricultural Future"}
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    {t.about?.whoWeAre?.desc1 || "Track2311 Investment and Consultancy is a premier agricultural investment firm dedicated to transforming Liberia's farming sector and facilitating quality business ventures."}
                  </p>
                  <p>
                    {t.about?.whoWeAre?.desc2 || "With a team of experienced agricultural experts and strategic partners, we provide comprehensive farming solutions, investment opportunities, and market access across multiple sectors."}
                  </p>
                  <p className="italic text-gray-500 border-l-4 border-accent pl-4">
                    {t.about?.whoWeAre?.quote || '"If you can\'t fly then run, if you can\'t run then walk, if you can\'t walk then crawl, but whatever you do you have to keep moving forward." - Dr. Martin Luther King, Jr.'}
                  </p>
                  <p>
                    {t.about?.whoWeAre?.desc3 || "Our philosophy is simple: keep moving forward with our farmers and investors, providing expert guidance and agricultural solutions that drive sustainable growth and financial success."}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-gradient-to-br from-primary to-green-700 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <FaSeedling className="text-4xl text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold">6+ Years</div>
                  <div className="text-sm">{t.about?.stats?.experience || "In Agriculture"}</div>
                </div>
                <div className="bg-gradient-to-br from-secondary to-red-700 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <FaHandshake className="text-4xl text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold">5000+</div>
                  <div className="text-sm">{t.about?.stats?.investors || "Farmers & Investors"}</div>
                </div>
                <div className="bg-gradient-to-br from-primary to-green-700 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <FaChartLine className="text-4xl text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm">{t.about?.stats?.successRate || "Success Rate"}</div>
                </div>
                <div className="bg-gradient-to-br from-secondary to-red-700 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                  <FaTractor className="text-4xl text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm">{t.about?.stats?.support || "Farmer Support"}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FaSeedling className="text-3xl text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {t.about?.mission?.title || "Our Mission"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.about?.mission?.text || "To transform Liberia's agricultural sector by empowering local farmers with modern techniques, connecting them to global markets, and providing sustainable investment opportunities that drive economic growth and food security."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FaGlobe className="text-3xl text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {t.about?.vision?.title || "Our Vision"}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t.about?.vision?.text || "To become West Africa's leading agricultural investment and consultancy firm, recognized for empowering farmers, creating sustainable food systems, and connecting Liberian agriculture to international markets."}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.about?.values?.badge || "Our Principles"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.about?.values?.title || "Our Core Values"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.about?.values?.subtitle || "The principles that guide our agricultural mission"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-primary group-hover:text-accent transition-colors duration-300 flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{getValueTitle(value.titleKey)}</h3>
                  <p className="text-gray-600">{getValueDesc(value.descriptionKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Business Areas Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.about?.business?.badge || "What We Do"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                {t.about?.business?.title || "Our Agricultural & Business Services"}
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto">
                {t.about?.business?.subtitle || "Comprehensive services supporting farmers, investors, and agribusiness"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{getBusinessTitle(area.titleKey)}</h3>
                  <p className="text-gray-200 text-sm">{getBusinessDesc(area.descriptionKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Milestones Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.about?.milestones?.badge || "Our Journey"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.about?.milestones?.title || "Our Agricultural Journey"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.about?.milestones?.subtitle || "Key moments in our mission to transform Liberian agriculture"}
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-accent/30"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-accent rounded-full z-10"></div>
                  
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                      <span className="text-accent font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-primary mt-1">{getMilestoneTitle(milestone.titleKey)}</h3>
                      <p className="text-gray-600 mt-2">{getMilestoneDesc(milestone.descriptionKey)}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="/images/about/why-choose-us.jpg" 
                  alt="Why Choose Track2311 - Liberian Agriculture"
                  className="rounded-xl shadow-lg w-full"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=Growing+Liberia+Through+Agriculture';
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  {t.about?.whyChooseUs?.badge || "Why Choose Us"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-primary">
                  {t.about?.whyChooseUs?.title || "Your Trusted Agricultural Partner"}
                </h2>
                <div className="space-y-4">
                  {whyChooseUsPoints.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-600">{getWhyChooseUsText(item)}</p>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 mt-8 group"
                >
                  {t.about?.whyChooseUs?.button || "Partner With Us"}
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
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
                {t.about?.cta?.title || "Ready to Grow With Us?"}
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {t.about?.cta?.subtitle || "Join us in transforming Liberian agriculture. Whether you're a farmer or investor, Track2311 is your partner in growth."}
              </p>
              <div className="space-x-4">
                <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-block transform hover:scale-105">
                  {t.about?.cta?.contactButton || "Partner With Us Today"}
                </Link>
                <Link to="/plans" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all inline-block">
                  {t.about?.cta?.exploreButton || "Explore Agricultural Investments"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;