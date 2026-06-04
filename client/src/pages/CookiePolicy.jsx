import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaCookie, FaRegClock, FaChartLine, FaShieldAlt, 
  FaUserSecret, FaArrowRight, FaCheckCircle, FaGlobe,
  FaDatabase
} from 'react-icons/fa';
import SEO from '../components/SEO';

const CookiePolicy = () => {
  const cookieTypes = [
    {
      type: "Essential Cookies",
      icon: <FaShieldAlt className="text-accent" />,
      description: "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.",
      duration: "Session"
    },
    {
      type: "Performance Cookies",
      icon: <FaChartLine className="text-accent" />,
      description: "These cookies collect information about how visitors use our website, such as which pages are visited most often. This helps us improve our website performance.",
      duration: "1 year"
    },
    {
      type: "Functional Cookies",
      icon: <FaUserSecret className="text-accent" />,
      description: "These cookies allow our website to remember choices you make (such as your username, language, or region) and provide enhanced, more personal features.",
      duration: "6 months"
    },
    {
      type: "Marketing Cookies",
      icon: <FaGlobe className="text-accent" />,
      description: "These cookies are used to deliver relevant advertisements to you based on your interests. They also limit the number of times you see an ad.",
      duration: "2 years"
    }
  ];

  return (
    <>
      <SEO 
        title="Cookie Policy"
        description="Track2311 Investment and Consultancy's Cookie Policy explains how we use cookies and similar tracking technologies to enhance your browsing experience, analyze website usage, and personalize content."
        keywords="cookie policy, cookies, tracking technologies, website cookies, privacy, data collection, Track2311 cookies"
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
                <FaCookie className="text-4xl text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Learn about how we use cookies to enhance your browsing experience
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
                At Track2311 Investment and Consultancy, we use cookies and similar tracking technologies to 
                enhance your experience on our website, analyze usage patterns, and personalize content. 
                This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
              </p>
            </div>
          </div>
        </section>

        {/* What Are Cookies Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaCookie className="text-3xl text-accent" />
                  <h2 className="text-2xl font-bold text-primary">What Are Cookies?</h2>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Cookies are small text files that websites place on your computer or mobile device when you visit. 
                  They are widely used to make websites work more efficiently and provide information to the website owners.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Cookies help us remember your preferences, understand how you interact with our site, and improve 
                  your overall experience. They do not contain personal information that can identify you directly.
                </p>
              </motion.div>

              {/* Types of Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-6">Types of Cookies We Use</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cookieTypes.map((cookie, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{cookie.icon}</div>
                        <h3 className="font-bold text-primary text-lg">{cookie.type}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{cookie.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-accent font-semibold">{cookie.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* How We Use Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <FaDatabase className="text-accent" />
                  How We Use Cookies
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600 text-sm">To remember your login preferences</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600 text-sm">To analyze website traffic and usage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600 text-sm">To personalize your browsing experience</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600 text-sm">To improve website performance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600 text-sm">To deliver targeted content and offers</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1" />
                    <span className="text-gray-600 text-sm">To enhance security features</span>
                  </div>
                </div>
              </motion.div>

              {/* Third-Party Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-primary/5 rounded-xl p-6 border border-primary/20 mb-8"
              >
                <h3 className="font-bold text-primary text-lg mb-3 flex items-center gap-2">
                  <FaGlobe className="text-accent" />
                  Third-Party Cookies
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  We may also use third-party cookies from trusted partners such as Google Analytics, social media platforms, 
                  and advertising networks. These cookies help us understand user behavior and improve our marketing efforts.
                </p>
                <p className="text-gray-600 text-sm">
                  Third-party cookies are governed by the respective privacy policies of these providers. We do not have 
                  direct control over these cookies.
                </p>
              </motion.div>

              {/* Managing Cookies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl p-8 shadow-sm mb-8"
              >
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <FaRegClock className="text-accent" />
                  Managing Your Cookie Preferences
                </h2>
                <p className="text-gray-600 mb-4">
                  Most web browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                    <span className="text-gray-600 text-sm">View the cookies stored on your device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                    <span className="text-gray-600 text-sm">Delete all or specific cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                    <span className="text-gray-600 text-sm">Block cookies from specific websites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-green-500 mt-1 text-sm" />
                    <span className="text-gray-600 text-sm">Set your browser to block all cookies</span>
                  </li>
                </ul>
                <p className="text-gray-600 text-sm">
                  Please note that disabling cookies may affect the functionality of our website and your user experience.
                </p>
              </motion.div>

              {/* Cookie Consent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-accent/10 rounded-xl p-6 border-l-4 border-accent mb-8"
              >
                <h3 className="font-bold text-primary text-lg mb-2">Cookie Consent</h3>
                <p className="text-gray-600 text-sm">
                  When you first visit our website, we will ask for your consent to use non-essential cookies. 
                  You can change your cookie preferences at any time by adjusting your browser settings or by 
                  contacting our support team.
                </p>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white text-center"
              >
                <h3 className="font-bold text-xl mb-3">Questions About Cookies?</h3>
                <p className="text-gray-200 mb-4">
                  If you have any questions about our use of cookies, please contact us
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
                transition={{ duration: 0.6, delay: 0.7 }}
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

export default CookiePolicy;