import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBuilding, FaShippingFast, FaHandHoldingUsd, FaChartLine, FaHardHat, 
  FaArrowRight, FaCheckCircle, FaGlobe, FaClock, FaShieldAlt, FaSeedling, FaLeaf, FaSpinner
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import apiClient from '../utils/axiosConfig';

const Services = () => {
  const { t } = useLanguage();
  const [cms, setCms] = useState(null);
  const [loadingCms, setLoadingCms] = useState(true);

  useEffect(() => {
    apiClient.get('/api/admin/content')
      .then(res => setCms(res.data))
      .catch(err => console.error("Error fetching Services CMS data:", err))
      .finally(() => setLoadingCms(false));
  }, []);

  if (loadingCms) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  const services = [
    {
      id: 1,
      icon: <FaSeedling className="text-5xl" />,
      titleKey: "agriculture",
      descriptionKey: "agricultureFullDesc",
      featuresKeys: ["modernFarming", "cropManagement", "agribusiness", "supplyChain", "exportQuality"],
      color: "from-primary to-green-700"
    },
    {
      id: 2,
      icon: <FaBuilding className="text-5xl" />,
      titleKey: "realEstate",
      descriptionKey: "realEstateFullDesc",
      featuresKeys: ["farmlandAcquisition", "agriculturalLand", "propertyDevelopment", "farmInfrastructure"],
      color: "from-secondary to-red-700"
    },
    {
      id: 3,
      icon: <FaShippingFast className="text-5xl" />,
      titleKey: "importExport",
      descriptionKey: "importExportFullDesc",
      featuresKeys: ["globalMarketAccess", "logisticsSupport", "agriculturalExports", "qualityControl"],
      color: "from-primary to-green-700"
    },
    {
      id: 4,
      icon: <FaHandHoldingUsd className="text-5xl" />,
      titleKey: "microfinance",
      descriptionKey: "microfinanceFullDesc",
      featuresKeys: ["farmerLoans", "equipmentFinancing", "agriculturalCredit", "flexibleTerms"],
      color: "from-secondary to-red-700"
    },
    {
      id: 5,
      icon: <FaChartLine className="text-5xl" />,
      titleKey: "businessConsultancy",
      descriptionKey: "consultancyFullDesc",
      featuresKeys: ["farmBusinessPlanning", "marketAnalysis", "agribusinessStrategy", "investmentAdvisory"],
      color: "from-primary to-green-700"
    },
    {
      id: 6,
      icon: <FaHardHat className="text-5xl" />,
      titleKey: "construction",
      descriptionKey: "constructionFullDesc",
      featuresKeys: ["farmStructures", "irrigationSystems", "storageFacilities", "processingPlants"],
      color: "from-secondary to-red-700"
    }
  ];

  const process = [
    { step: "01", titleKey: "consultation", descriptionKey: "consultationDesc" },
    { step: "02", titleKey: "strategy", descriptionKey: "strategyDesc" },
    { step: "03", titleKey: "execution", descriptionKey: "executionDesc" },
    { step: "04", titleKey: "support", descriptionKey: "supportDesc" }
  ];

  const getServiceTitle = (key) => {
    const titles = {
      agriculture: "Agriculture & Agribusiness",
      realEstate: "Agricultural Land & Farm Development",
      importExport: "Agricultural Export & Trade",
      microfinance: "Farmers' Micro-finance",
      businessConsultancy: "Agribusiness Consultancy",
      construction: "Farm Infrastructure & Construction"
    };
    return t.servicesPage?.services?.[key] || titles[key];
  };

  const getServiceDescription = (key) => {
    const descs = {
      agricultureFullDesc: "Comprehensive agricultural solutions including modern farming techniques, crop management, high-yield seed varieties, and agribusiness investment opportunities across Liberia.",
      realEstateFullDesc: "Professional agricultural land services including farmland acquisition, lease agreements, and development of commercial farming properties for crop production.",
      importExportFullDesc: "International trade services for Liberian agricultural products, connecting local farmers to global markets with full logistics support and quality certification.",
      microfinanceFullDesc: "Accessible financial services tailored for farmers, including crop financing, equipment loans, and collateral-based agricultural credit with flexible repayment terms.",
      consultancyFullDesc: "Strategic agribusiness advisory services including farm business planning, market analysis, investment strategies, and operational efficiency optimization.",
      constructionFullDesc: "Quality farm infrastructure construction including irrigation systems, storage facilities, processing plants, and agricultural buildings for modern farming operations."
    };
    return t.servicesPage?.descriptions?.[key] || descs[key];
  };

  const getFeature = (key) => {
    const features = {
      modernFarming: "Modern farming techniques",
      cropManagement: "Crop management & rotation",
      agribusiness: "Agribusiness investment",
      supplyChain: "Supply chain optimization",
      exportQuality: "Export quality certification",
      farmlandAcquisition: "Farmland acquisition",
      agriculturalLand: "Agricultural land leasing",
      propertyDevelopment: "Farm property development",
      farmInfrastructure: "Farm infrastructure",
      globalMarketAccess: "Global market access",
      logisticsSupport: "Full logistics support",
      agriculturalExports: "Agricultural exports",
      qualityControl: "Quality control & certification",
      farmerLoans: "Farmer loans & credit",
      equipmentFinancing: "Equipment financing",
      agriculturalCredit: "Agricultural credit lines",
      flexibleTerms: "Flexible repayment terms",
      farmBusinessPlanning: "Farm business planning",
      marketAnalysis: "Market analysis & research",
      agribusinessStrategy: "Agribusiness strategy",
      investmentAdvisory: "Investment advisory",
      farmStructures: "Farm structures",
      irrigationSystems: "Irrigation systems",
      storageFacilities: "Storage facilities",
      processingPlants: "Processing plants"
    };
    return t.servicesPage?.features?.[key] || features[key];
  };

  return (
    <>
      <SEO 
        title="Agricultural & Investment Services - Track2311"
        description="Track2311 offers comprehensive agricultural services including modern farming, farmland development, agricultural export, farmers' micro-finance, agribusiness consultancy, and farm infrastructure construction in Liberia."
        keywords="agricultural services, farming services, farmland development, agricultural export, micro-finance for farmers, agribusiness consultancy"
      />
      
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.servicesPage?.hero?.badge || "What We Offer"}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                {cms?.servicesHeroTitle || t.servicesPage?.hero?.title || "Agricultural & Investment Services"}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {cms?.servicesHeroSubtitle || t.servicesPage?.hero?.subtitle || "Comprehensive agricultural solutions and investment opportunities..."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.servicesPage?.grid?.badge || "Core Offerings"}</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {cms?.servicesGridTitle || t.servicesPage?.grid?.title || "Agricultural Services We Provide"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {cms?.servicesGridSubtitle || t.servicesPage?.grid?.subtitle || "Supporting Liberian farmers and agribusinesses from farm to global market"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                    <div className="text-accent group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                    <h3 className="text-2xl font-bold mt-4">{getServiceTitle(service.titleKey)}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{getServiceDescription(service.descriptionKey)}</p>
                    <div className="space-y-2 mb-6">
                      {service.featuresKeys.map((featureKey, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <FaCheckCircle className="text-green-500 text-sm" />
                          <span className="text-gray-600 text-sm">{getFeature(featureKey)}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/contact" className="inline-flex items-center text-primary font-semibold hover:text-accent transition-colors group">
                      {t.servicesPage?.buttons?.learnMore || "Learn More"}
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.servicesPage?.whyChooseUs?.badge || "Why Trust Us"}</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-primary">{t.servicesPage?.whyChooseUs?.title || "Why Choose Our Agricultural Services?"}</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaGlobe className="text-accent text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{t.servicesPage?.whyChooseUs?.internationalReach || "International Market Access"}</h3>
                      <p className="text-gray-600">{t.servicesPage?.whyChooseUs?.internationalReachDesc || "Connect your farm products to buyers across West Africa, Europe, and beyond"}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaLeaf className="text-accent text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{t.servicesPage?.whyChooseUs?.expertTeam || "Agricultural Experts"}</h3>
                      <p className="text-gray-600">{t.servicesPage?.whyChooseUs?.expertTeamDesc || "Experienced agronomists and farming professionals dedicated to your success"}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-accent text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{t.servicesPage?.whyChooseUs?.timelyDelivery || "Season-Ready Delivery"}</h3>
                      <p className="text-gray-600">{t.servicesPage?.whyChooseUs?.timelyDeliveryDesc || "Committed to meeting planting and harvest deadlines"}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt className="text-accent text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{t.servicesPage?.whyChooseUs?.transparentProcess || "Fair & Transparent"}</h3>
                      <p className="text-gray-600">{t.servicesPage?.whyChooseUs?.transparentProcessDesc || "Clear terms, honest dealings, and fair prices for farmers"}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="bg-gray-50 rounded-xl p-8">
                <div className="text-center mb-6">
                  <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.servicesPage?.ourApproach?.badge || "Our Approach"}</span>
                  <h3 className="text-2xl font-bold text-primary mt-2">{t.servicesPage?.ourApproach?.title || "How We Work With Farmers"}</h3>
                </div>
                <div className="space-y-6">
                  {process.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-accent text-primary rounded-full flex items-center justify-center font-bold text-lg">{item.step}</div>
                      <div>
                        <h4 className="font-bold text-primary">{t.servicesPage?.process?.[item.titleKey] || item.titleKey}</h4>
                        <p className="text-gray-600 text-sm">{t.servicesPage?.process?.[`${item.descriptionKey}`] || item.descriptionKey}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Global Presence Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.servicesPage?.globalPresence?.badge || "Global Reach"}</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{t.servicesPage?.globalPresence?.title || "Exporting Liberian Agriculture Worldwide"}</h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">{t.servicesPage?.globalPresence?.subtitle || "Connecting Liberian farmers to international markets across Africa and beyond"}</p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="font-semibold">🇱🇷 {t.servicesPage?.countries?.liberia || "Liberia"}</span>
                  <span className="text-xs ml-1 text-accent">(Headquarters)</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="font-semibold">🇲🇦 {t.servicesPage?.countries?.morocco || "Morocco"}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <div className="text-6xl mb-4">🌾</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                {cms?.servicesCtaTitle || t.servicesPage?.cta?.title || "Ready to Transform Your Farming Business?"}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {cms?.servicesCtaSubtitle || t.servicesPage?.cta?.subtitle || "Let's discuss how our agricultural services can help you grow more..."}
              </p>
              <div className="space-x-4">
                <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-all inline-block transform hover:scale-105">
                  {t.servicesPage?.buttons?.contactUs || "Contact Our Agricultural Team"}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;