import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHeadset, FaChartLine, FaClock, FaShieldAlt, FaEnvelope, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import SEO from '../components/SEO';

const InvestmentPlans = () => {
  const plans = [
    {
      name: "Starter",
      roi: 10,
      duration: 30,
      features: ["10% ROI after 30 days", "Daily profit sharing", "24/7 support", "Basic analytics", "Email notifications"],
      color: "from-primary to-secondary",
      icon: "🌱"
    },
    {
      name: "Growth",
      roi: 20,
      duration: 60,
      features: ["20% ROI after 60 days", "Priority support", "Advanced analytics", "Monthly reports", "Dedicated account manager"],
      popular: true,
      color: "from-secondary to-primary",
      icon: "🚜"
    },
    {
      name: "Premium",
      roi: 35,
      duration: 90,
      features: ["35% ROI after 90 days", "Dedicated manager", "Real-time tracking", "Weekly reports", "Early withdrawal option"],
      color: "from-primary to-secondary",
      icon: "🌟"
    },
    {
      name: "Elite",
      roi: 50,
      duration: 120,
      features: ["50% ROI after 120 days", "VIP support", "Custom strategies", "Quarterly bonuses", "Exclusive farm visits"],
      color: "from-secondary to-primary",
      icon: "👑"
    }
  ];

  // Why Invest Section
  const whyInvest = [
    { icon: <FaChartLine className="text-2xl" />, title: "High Returns", description: "Competitive ROI on all investment plans" },
    { icon: <FaShieldAlt className="text-2xl" />, title: "Secure Investment", description: "Your capital is protected and transparent" },
    { icon: <FaClock className="text-2xl" />, title: "Flexible Terms", description: "Choose duration that suits your goals" },
    { icon: <FaHeadset className="text-2xl" />, title: "24/7 Support", description: "Dedicated customer support team" },
  ];

  // How It Works Section
  const steps = [
    { step: "01", title: "Choose Your Plan", description: "Select an investment plan that matches your goals" },
    { step: "02", title: "Contact Our Team", description: "Reach out to our investment advisors" },
    { step: "03", title: "Complete Agreement", description: "Sign the investment agreement" },
    { step: "04", title: "Start Earning", description: "Receive returns as per your plan" },
  ];

  // WhatsApp number (format: country code + number without spaces or +)
  // USA number: 19016080131
  const whatsappNumber = "19016080131";
  const whatsappMessage = "Hello%20Track2311%2C%20I'm%20interested%20in%20your%20agricultural%20investment%20plans.%20Can%20you%20please%20send%20me%20more%20information%3F";

  return (
    <>
      <SEO 
        title="Investment Plans - Agricultural Investment Opportunities"
        description="Explore Track2311's agricultural investment plans with ROI from 10% to 50%. Choose from Starter, Growth, Premium, and Elite plans to grow your wealth through Liberian agriculture investments."
        keywords="investment plans, agricultural investment, ROI, starter plan, growth plan, premium plan, elite plan, farm investment, Liberia investment"
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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Investment Plans</h1>
              <p className="text-xl max-w-2xl mx-auto opacity-90">
                Choose the perfect plan that fits your investment goals
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Invest Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Invest With Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">Smart Agricultural Investments</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Backed by years of experience in Liberian agriculture and global markets
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {whyInvest.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-primary">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Investment Plans Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    plan.popular ? 'ring-2 ring-accent transform scale-105 z-10' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-accent text-primary px-4 py-1 rounded-bl-lg rounded-tr-lg font-semibold text-sm z-10">
                      Most Popular
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className="pt-6 text-center">
                    <span className="text-5xl">{plan.icon}</span>
                  </div>
                  
                  {/* Card Header */}
                  <div className={`bg-gradient-to-r ${plan.color} mx-6 mt-4 p-4 rounded-xl text-white text-center`}>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="text-3xl font-bold mt-2">{plan.roi}%</div>
                    <p className="text-xs opacity-90">Expected ROI</p>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <p className="text-gray-400 text-xs">{plan.duration} days duration</p>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <FaCheckCircle className="text-accent text-xs flex-shrink-0" />
                          <span className="text-gray-600 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      to="/contact"
                      className="block text-center bg-primary text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-secondary transition-all duration-300 w-full"
                    >
                      Request Information
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Start your agricultural investment journey in four easy steps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center relative"
                >
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/30 to-accent/30"></div>
                  )}
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-primary font-bold text-xl">{step.step}</span>
                  </div>
                  <h3 className="font-bold text-primary">{step.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section - Updated with WhatsApp */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
                <p className="text-xl mb-8 opacity-90">
                  Our agricultural investment advisors are ready to guide you through the process
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group">
                    <FaEnvelope /> Contact Investment Team
                  </Link>
                  <a 
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="text-xl" /> Chat on WhatsApp
                  </a>
                </div>
                <p className="text-sm mt-6 opacity-75">
                  Our team typically responds within 24 hours
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Common Questions</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Have questions? We've got answers
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-primary mb-2">How do I start investing?</h3>
                <p className="text-gray-600 text-sm">Simply contact our investment team through the form above, chat with us on WhatsApp, or call our hotline. We'll guide you through the entire process and answer all your questions.</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-primary mb-2">What is the minimum investment amount?</h3>
                <p className="text-gray-600 text-sm">Please contact our investment team for detailed information about minimum investment amounts and available plans.</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-primary mb-2">How are returns calculated?</h3>
                <p className="text-gray-600 text-sm">Returns are calculated based on your chosen investment plan. Our team will provide detailed projections before you commit to any investment.</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-primary mb-2">How do I receive my returns?</h3>
                <p className="text-gray-600 text-sm">Returns are paid directly to your registered bank account or mobile money wallet. Our team will arrange the payment method that works best for you.</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link to="/faq" className="text-primary hover:text-accent font-semibold inline-flex items-center gap-2">
                View All FAQs <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default InvestmentPlans;