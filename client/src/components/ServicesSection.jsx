import { motion } from 'framer-motion';
import { 
  FaTractor, FaChartLine, FaHandHoldingUsd, FaDatabase, 
  FaUniversity, FaRuler, FaChalkboardTeacher, FaHardHat,
  FaLeaf, FaChartBar, FaHandshake, FaLightbulb
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    { icon: <FaTractor className="text-4xl" />, id: "agriculture", iconBg: "from-primary to-green-700" },
    { icon: <FaChartLine className="text-4xl" />, id: "taxes", iconBg: "from-secondary to-red-700" },
    { icon: <FaHandHoldingUsd className="text-4xl" />, id: "microfinance", iconBg: "from-primary to-green-700" },
    { icon: <FaDatabase className="text-4xl" />, id: "research", iconBg: "from-secondary to-red-700" },
    { icon: <FaUniversity className="text-4xl" />, id: "collateralLoans", iconBg: "from-primary to-green-700" },
    { icon: <FaRuler className="text-4xl" />, id: "surveying", iconBg: "from-secondary to-red-700" },
    { icon: <FaChalkboardTeacher className="text-4xl" />, id: "education", iconBg: "from-primary to-green-700" },
    { icon: <FaHardHat className="text-4xl" />, id: "construction", iconBg: "from-secondary to-red-700" },
    { icon: <FaLeaf className="text-4xl" />, id: "capacityBuilding", iconBg: "from-primary to-green-700" },
    { icon: <FaChartBar className="text-4xl" />, id: "investmentAdvisory", iconBg: "from-secondary to-red-700" },
    { icon: <FaHandshake className="text-4xl" />, id: "businessConsulting", iconBg: "from-primary to-green-700" },
    { icon: <FaLightbulb className="text-4xl" />, id: "innovationHub", iconBg: "from-secondary to-red-700" },
  ];

  // Get translated title with fallback
  const getTitle = (id) => {
    const titles = {
      agriculture: "Agriculture",
      taxes: "Taxes & Efficiency",
      microfinance: "Micro-finance",
      research: "Research & Data Analysis",
      collateralLoans: "Collateral-based Loans",
      surveying: "Quantity & Surveying",
      education: "Education & Marketing",
      construction: "General Construction",
      capacityBuilding: "Capacity Building",
      investmentAdvisory: "Investment Advisory",
      businessConsulting: "Business Consulting",
      innovationHub: "Innovation Hub"
    };
    return t.services?.[id] || titles[id];
  };

  // Get translated description with fallback
  const getDescription = (id) => {
    const descriptions = {
      agriculture: "Modern farming solutions and agribusiness investments",
      taxes: "Strategic tax planning and operational efficiency",
      microfinance: "Accessible financial services for small businesses",
      research: "Data-driven insights for better decisions",
      collateralLoans: "Secure loans backed by valuable assets",
      surveying: "Professional measurement and property surveying",
      education: "Training programs and market expansion",
      construction: "Quality construction and project management",
      capacityBuilding: "Empowering businesses through training",
      investmentAdvisory: "Expert guidance for wealth growth",
      businessConsulting: "Strategic business development services",
      innovationHub: "Cutting-edge business solutions"
    };
    return t.services?.[`${id}Desc`] || descriptions[id];
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            {t.services?.sectionTitle || "OUR SERVICES"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
            {t.services?.sectionHeading || "Best Solutions For Your Business"}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t.services?.sectionDescription || "Comprehensive services tailored to meet your business needs"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 group cursor-pointer border-b-4 border-transparent hover:border-accent"
            >
              <div className={`bg-gradient-to-br ${service.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white text-2xl">{service.icon}</div>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {getTitle(service.id)}
              </h3>
              <p className="text-gray-500 text-sm">
                {getDescription(service.id)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;