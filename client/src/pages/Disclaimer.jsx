import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaExclamationTriangle, FaShieldAlt, FaChartLine, 
  FaArrowRight, FaCheckCircle, FaGlobe,
  FaBalanceScale, FaFileContract, FaGavel
} from 'react-icons/fa';
import SEO from '../components/SEO';

const Disclaimer = () => {
  return (
    <>
      <SEO 
        title="Legal Disclaimer"
        description="Read Track2311 Investment and Consultancy's legal disclaimer. Important information about investment risks, financial advice limitations, accuracy of information, and liability terms."
        keywords="disclaimer, legal disclaimer, investment risks, financial advice, liability, terms of use, Track2311 disclaimer"
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
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaExclamationTriangle className="text-4xl text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Disclaimer</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Important legal information about our services and content
              </p>
              <div className="mt-6 text-sm opacity-75">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-600 leading-relaxed">
                The information provided by Track2311 Investment and Consultancy on our website is for general informational 
                purposes only. All information on the site is provided in good faith, however we make no representation or 
                warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, 
                or completeness of any information on the site.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Investment Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaChartLine className="text-3xl text-accent" />
                  <h2 className="text-2xl font-bold text-primary">Investment Disclaimer</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  All investments involve risk, including the possible loss of principal. Past performance does not guarantee 
                  future results. The value of your investment may go down as well as up, and you may not get back the full 
                  amount invested. Before making any investment decision, you should carefully consider your financial situation, 
                  investment objectives, and risk tolerance.
                </p>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-red-700 text-sm font-semibold">
                    ⚠️ Warning: Investing in financial markets carries a high level of risk. You should never invest money 
                    that you cannot afford to lose.
                  </p>
                </div>
              </motion.div>

              {/* No Financial Advice Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaBalanceScale className="text-3xl text-accent" />
                  <h2 className="text-2xl font-bold text-primary">No Financial Advice</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  The information on this website does not constitute financial advice, investment advice, or any other type 
                  of professional advice. You should consult with qualified professionals for advice tailored to your 
                  individual situation. Track2311 Investment and Consultancy is not a registered financial advisor.
                </p>
              </motion.div>

              {/* Accuracy of Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaShieldAlt className="text-3xl text-accent" />
                  <h2 className="text-2xl font-bold text-primary">Accuracy of Information</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  While we strive to provide accurate and up-to-date information, we make no warranties or representations 
                  about the completeness, reliability, or accuracy of the information on our website. Any reliance you place 
                  on such information is strictly at your own risk.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                    <span className="text-gray-600 text-sm">Information may contain errors or inaccuracies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                    <span className="text-gray-600 text-sm">Market data is subject to change without notice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                    <span className="text-gray-600 text-sm">Past performance data may not be indicative of future results</span>
                  </li>
                </ul>
              </motion.div>

              {/* External Links Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaGlobe className="text-3xl text-accent" />
                  <h2 className="text-2xl font-bold text-primary">External Links Disclaimer</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our website may contain links to external websites that are not provided or maintained by us. We do not 
                  guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. 
                  The inclusion of any link does not imply our endorsement of the site.
                </p>
              </motion.div>

              {/* Professional Consultation Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaGavel className="text-3xl text-accent" />
                  <h2 className="text-2xl font-bold text-primary">Professional Consultation</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Nothing on this website should be considered a substitute for professional legal, financial, or tax advice. 
                  We strongly recommend that you consult with appropriate professionals before making any investment decisions.
                </p>
                <div className="bg-primary/5 rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <span className="font-bold text-primary">Recommendation:</span> Always seek the advice of a qualified 
                    financial advisor with any questions you may have regarding an investment or financial matter.
                  </p>
                </div>
              </motion.div>

              {/* Limitation of Liability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-primary/5 rounded-xl p-6 border border-primary/20 mb-6"
              >
                <h3 className="font-bold text-primary text-lg mb-3 flex items-center gap-2">
                  <FaFileContract className="text-accent" />
                  Limitation of Liability
                </h3>
                <p className="text-gray-600 text-sm">
                  In no event shall Track2311 Investment and Consultancy, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including 
                  without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your 
                  use of our website or services.
                </p>
              </motion.div>

              {/* "As Is" Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-accent/10 rounded-xl p-6 border-l-4 border-accent mb-6"
              >
                <h3 className="font-bold text-primary text-lg mb-2">"AS IS" Disclaimer</h3>
                <p className="text-gray-600 text-sm">
                  Our website and services are provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, 
                  expressed or implied, regarding the operation or availability of our website, or the information, 
                  content, materials, or products included on our website.
                </p>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white text-center"
              >
                <h3 className="font-bold text-xl mb-3">Have Questions About This Disclaimer?</h3>
                <p className="text-gray-200 mb-4">
                  If you have any questions about our disclaimer, please contact us
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                  Contact Us
                  <FaArrowRight />
                </Link>
              </motion.div>

              {/* Footer Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 text-center"
              >
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/" className="text-primary hover:text-accent transition font-semibold">Home</Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/terms" className="text-primary hover:text-accent transition font-semibold">Terms & Conditions</Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/privacy-policy" className="text-primary hover:text-accent transition font-semibold">Privacy Policy</Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/refund-policy" className="text-primary hover:text-accent transition font-semibold">Refund Policy</Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Disclaimer;