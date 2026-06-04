import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBuilding, FaShippingFast,
  FaGlobe, FaShieldAlt, FaPercentage, FaFileInvoiceDollar, 
  FaUserTie, FaHandshake, FaSeedling, FaLeaf
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Shareholders = () => {
  const { t } = useLanguage();

  // Why Invest With Us
  const reasons = [
    { icon: <FaSeedling className="text-3xl" />, titleKey: "strongReturns", descKey: "strongReturnsDesc" },
    { icon: <FaShieldAlt className="text-3xl" />, titleKey: "secureInvestment", descKey: "secureInvestmentDesc" },
    { icon: <FaHandshake className="text-3xl" />, titleKey: "trustedPartner", descKey: "trustedPartnerDesc" },
    { icon: <FaLeaf className="text-3xl" />, titleKey: "growingNetwork", descKey: "growingNetworkDesc" },
  ];

  // Shareholder Benefits
  const benefits = [
    { icon: <FaPercentage className="text-2xl" />, titleKey: "quarterlyDividends", descKey: "quarterlyDividendsDesc" },
    { icon: <FaFileInvoiceDollar className="text-2xl" />, titleKey: "annualReports", descKey: "annualReportsDesc" },
    { icon: <FaUserTie className="text-2xl" />, titleKey: "votingRights", descKey: "votingRightsDesc" },
    { icon: <FaGlobe className="text-2xl" />, titleKey: "globalNetwork", descKey: "globalNetworkDesc" },
  ];

  // Investment Tiers for Shareholders
  const tiers = [
    { level: "Bronze", levelKey: "bronze", min: "$5,000", benefitsKey: "bronzeBenefits", roi: "15-20%", focus: "Small Farm Support" },
    { level: "Silver", levelKey: "silver", min: "$25,000", benefitsKey: "silverBenefits", roi: "20-25%", focus: "Farm Expansion" },
    { level: "Gold", levelKey: "gold", min: "$100,000", benefitsKey: "goldBenefits", roi: "25-30%", focus: "Agri-Business" },
    { level: "Platinum", levelKey: "platinum", min: "$500,000+", benefitsKey: "platinumBenefits", roi: "30-35%", focus: "Export Partnership" },
  ];

  // Helper functions for translations
  const getReasonTitle = (key) => {
    const titles = {
      strongReturns: "Strong Agricultural Returns",
      secureInvestment: "Secure Farm Investment",
      trustedPartner: "Trusted Agri-Partner",
      growingNetwork: "Growing Farm Network"
    };
    return t.shareholders?.reasons?.[key] || titles[key];
  };

  const getReasonDesc = (key) => {
    const descs = {
      strongReturnsDesc: "Competitive returns from agricultural and farm investments",
      secureInvestmentDesc: "Your capital is protected with transparent farm operations",
      trustedPartnerDesc: "Registered and regulated agricultural investment partner",
      growingNetworkDesc: "Join 5000+ farmers and agricultural investors"
    };
    return t.shareholders?.reasons?.[`${key}Desc`] || descs[`${key}Desc`];
  };

  const getBenefitTitle = (key) => {
    const titles = {
      quarterlyDividends: "Quarterly Farm Dividends",
      annualReports: "Annual Farm Reports",
      votingRights: "Farm Advisory Rights",
      globalNetwork: "Global Agri-Network"
    };
    return t.shareholders?.benefits?.[key] || titles[key];
  };

  const getBenefitDesc = (key) => {
    const descs = {
      quarterlyDividendsDesc: "Regular profit sharing from farm harvests every quarter",
      annualReportsDesc: "Comprehensive farm performance and financial reporting",
      votingRightsDesc: "Have a say in farm expansion and agricultural decisions",
      globalNetworkDesc: "Connect with international agricultural partners"
    };
    return t.shareholders?.benefits?.[`${key}Desc`] || descs[`${key}Desc`];
  };

  const getTierLevel = (key) => {
    const levels = {
      bronze: "Bronze",
      silver: "Silver",
      gold: "Gold",
      platinum: "Platinum"
    };
    return t.shareholders?.tiers?.[key] || levels[key];
  };

  const getTierBenefits = (key) => {
    const benefitsList = {
      bronzeBenefits: "Quarterly farm reports, Basic agricultural support",
      silverBenefits: "Monthly farm reports, Priority support, Farm advisory rights",
      goldBenefits: "Weekly farm updates, Dedicated farm manager, Board meeting access",
      platinumBenefits: "Real-time harvest updates, VIP farm events, Strategic export partnership"
    };
    return t.shareholders?.tiers?.[`${key}Benefits`] || benefitsList[`${key}Benefits`];
  };

  return (
    <>
      <SEO 
        title="Agricultural Investment Opportunities - Track2311 Shareholders"
        description="Invest in Liberian agriculture with Track2311. Join our agricultural investment community offering attractive returns from crop farming, farmland development, and agri-export. Become a shareholder today."
        keywords="agricultural investment, farm investment, Liberian agriculture, crop farming investment, farmland investment, agri-export, Track2311 shareholders"
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
                {t.shareholders?.hero?.badge || "Invest in Liberian Agriculture"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                {t.shareholders?.hero?.title || "Farm & Agriculture Investors"}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {t.shareholders?.hero?.subtitle || "Join our growing community of agricultural investors and be part of Liberia's farming revolution"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Overview Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  {t.shareholders?.overview?.badge || "Overview"}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-primary">
                  {t.shareholders?.overview?.title || "Why Invest in Liberian Agriculture?"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {t.shareholders?.overview?.desc1 || "Track2311 Investment and Consultancy is transforming Liberia's agricultural sector, connecting local farmers to global markets and creating sustainable investment opportunities."}
                </p>
                <p className="text-gray-600 mb-6">
                  {t.shareholders?.overview?.desc2 || "We offer unique agricultural investment opportunities across crop farming, farmland development, and agri-export sectors, providing our shareholders with attractive returns and sustainable growth from Liberia's rich agricultural potential."}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {reasons.map((reason, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="text-primary">{reason.icon}</div>
                      <div>
                        <h3 className="font-bold text-sm">{getReasonTitle(reason.titleKey)}</h3>
                        <p className="text-xs text-gray-500">{getReasonDesc(reason.descKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {t.shareholders?.snapshot?.title || "Agricultural Investment Snapshot"}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.shareholders?.snapshot?.founded || "Founded"}</span>
                    <span className="font-semibold">2020</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.shareholders?.snapshot?.headquarters || "Headquarters"}</span>
                    <span className="font-semibold">{t.shareholders?.snapshot?.liberia || "Liberia"}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.shareholders?.snapshot?.globalPresence || "Export Markets"}</span>
                    <span className="font-semibold">10+ Countries</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.shareholders?.snapshot?.activeInvestors || "Active Farm Investors"}</span>
                    <span className="font-semibold">5000+</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">{t.shareholders?.snapshot?.totalInvestment || "Total Farm Investment"}</span>
                    <span className="font-semibold text-primary">$10M+</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-600">Farmland Under Management</span>
                    <span className="font-semibold text-primary">5,000+ Acres</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Shareholder Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.shareholders?.benefitsSection?.badge || "Benefits"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.shareholders?.benefitsSection?.title || "Agricultural Investor Benefits"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.shareholders?.benefitsSection?.subtitle || "What you get as a valued agricultural investor with Track2311"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="text-primary mb-4 group-hover:text-accent transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{getBenefitTitle(benefit.titleKey)}</h3>
                  <p className="text-gray-500 text-sm">{getBenefitDesc(benefit.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Tiers Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.shareholders?.tiersSection?.badge || "Investment Levels"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.shareholders?.tiersSection?.title || "Agricultural Investment Tiers"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.shareholders?.tiersSection?.subtitle || "Choose your farm investment level and enjoy corresponding benefits"}
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                  <tr>
                    <th className="py-4 px-6 text-left">{t.shareholders?.table?.tier || "Tier"}</th>
                    <th className="py-4 px-6 text-left">Focus Area</th>
                    <th className="py-4 px-6 text-left">{t.shareholders?.table?.minInvestment || "Minimum Investment"}</th>
                    <th className="py-4 px-6 text-left">{t.shareholders?.table?.expectedROI || "Expected ROI"}</th>
                    <th className="py-4 px-6 text-left">{t.shareholders?.table?.benefits || "Benefits"}</th>
                    <th className="py-4 px-6 text-center">{t.shareholders?.table?.action || "Action"}</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((tier, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-primary">{getTierLevel(tier.levelKey)}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{tier.focus}</td>
                      <td className="py-4 px-6">{tier.min}</td>
                      <td className="py-4 px-6 text-accent font-semibold">{tier.roi}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{getTierBenefits(tier.benefitsKey)}</td>
                      <td className="py-4 px-6 text-center">
                        <Link to="/contact" className="text-primary hover:text-accent font-semibold text-sm">
                          {t.shareholders?.table?.inquire || "Invest Now"} →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Current Investment Opportunities Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.shareholders?.opportunities?.badge || "Opportunities"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.shareholders?.opportunities?.title || "Current Agricultural Investment Opportunities"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.shareholders?.opportunities?.subtitle || "Explore our active farm projects seeking agricultural investors"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
                  <FaSeedling className="text-3xl mb-2" />
                  <h3 className="text-xl font-bold">Crop Farm Expansion</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">Investment in high-yield rice, cassava, cocoa, and rubber farming with modern techniques</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target ROI:</span>
                      <span className="font-semibold text-primary">25-30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span>24 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Minimum:</span>
                      <span>$10,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Acres:</span>
                      <span>500+ acres</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-secondary to-primary p-4 text-white">
                  <FaBuilding className="text-3xl mb-2" />
                  <h3 className="text-xl font-bold">Farmland Development</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">Acquisition and development of prime agricultural land for commercial farming</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target ROI:</span>
                      <span className="font-semibold text-primary">20-25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span>36 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Minimum:</span>
                      <span>$25,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Locations:</span>
                      <span>Lofa, Bong, Nimba</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
                  <FaShippingFast className="text-3xl mb-2" />
                  <h3 className="text-xl font-bold">Agri-Export Trade</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">International export of Liberian agricultural products to Europe, USA, and West Africa</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target ROI:</span>
                      <span className="font-semibold text-primary">30-35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span>18 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Minimum:</span>
                      <span>$15,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Markets:</span>
                      <span>EU, USA, ECOWAS</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials from Shareholders */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.shareholders?.testimonials?.badge || "Success Stories"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.shareholders?.testimonials?.title || "What Our Agricultural Investors Say"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.shareholders?.testimonials?.subtitle || "Real experiences from our valued farm investors"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { nameKey: "john", textKey: "johnText", roleKey: "goldShareholder", name: "John K.", text: "Investing in Liberian agriculture through Track2311 has been life-changing. The returns from the rice farms have exceeded my expectations.", role: "Gold Agricultural Investor" },
                { nameKey: "mary", textKey: "maryText", roleKey: "silverShareholder", name: "Mary S.", text: "I've been with Track2311 for 3 years now. The quarterly dividends from cocoa exports have helped me grow my portfolio significantly.", role: "Silver Farm Investor" },
                { nameKey: "david", textKey: "davidText", roleKey: "bronzeShareholder", name: "David W.", text: "The transparency from the farm management team is outstanding. I can track my investment in real-time. Highly recommended!", role: "Bronze Agricultural Investor" },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-accent text-3xl mb-3">"</div>
                  <p className="text-gray-600 italic mb-4">"{t.shareholders?.testimonials?.[testimonial.textKey] || testimonial.text}"</p>
                  <div className="font-bold text-primary">{t.shareholders?.testimonials?.[testimonial.nameKey] || testimonial.name}</div>
                  <div className="text-sm text-gray-500">{t.shareholders?.testimonials?.[testimonial.roleKey] || testimonial.role}</div>
                </motion.div>
              ))}
            </div>
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
              <div className="text-6xl mb-4">🌾</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.shareholders?.cta?.title || "Ready to Invest in Liberian Agriculture?"}
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {t.shareholders?.cta?.subtitle || "Join our growing community of agricultural investors and be part of Liberia's farming success story"}
              </p>
              <div className="space-x-4">
                <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-block transform hover:scale-105">
                  {t.shareholders?.cta?.contactButton || "Contact Agricultural Investment Team"}
                </Link>
                {/* <Link to="/register" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all inline-block">
                  {t.shareholders?.cta?.createButton || "Start Investing in Farms"}
                </Link> */}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Shareholders;