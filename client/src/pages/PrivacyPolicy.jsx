import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaShieldAlt, FaUserSecret, FaCookie, FaDatabase, 
  FaChartLine, FaArrowRight,
  FaCheckCircle, FaGlobe, FaLock, FaUserShield,
  FaRegClock, FaRegEnvelope
} from 'react-icons/fa';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "1. Information We Collect",
      icon: <FaDatabase className="text-accent" />,
      content: "We collect information you provide directly to us, including but not limited to: name, email address, phone number, postal address, financial information, and investment preferences. We also automatically collect certain information when you visit our website, such as your IP address, browser type, operating system, and browsing behavior."
    },
    {
      id: 2,
      title: "2. How We Use Your Information",
      icon: <FaChartLine className="text-accent" />,
      content: "We use your information to provide, maintain, and improve our services; process your investment transactions; communicate with you about your account; send you technical notices and support messages; respond to your comments and questions; and for internal analytics and research purposes."
    },
    {
      id: 3,
      title: "3. Information Sharing and Disclosure",
      icon: <FaUserShield className="text-accent" />,
      content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our website, conducting our business, or servicing you, provided that those parties agree to keep this information confidential. We may also release your information when required by law."
    },
    {
      id: 4,
      title: "4. Data Security",
      icon: <FaLock className="text-accent" />,
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. This includes SSL encryption, firewalls, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure."
    },
    {
      id: 5,
      title: "5. Cookies and Tracking Technologies",
      icon: <FaCookie className="text-accent" />,
      content: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookies through your browser settings. However, disabling cookies may affect the functionality of our website."
    },
    {
      id: 6,
      title: "6. Third-Party Links",
      icon: <FaGlobe className="text-accent" />,
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any linked websites you visit."
    },
    {
      id: 7,
      title: "7. Your Rights and Choices",
      icon: <FaUserSecret className="text-accent" />,
      content: "You have the right to access, correct, update, or delete your personal information. You may also object to the processing of your data, request data portability, or withdraw your consent at any time. To exercise these rights, please contact our privacy team."
    },
    {
      id: 8,
      title: "8. Data Retention",
      icon: <FaRegClock className="text-accent" />,
      content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. We will securely delete your information when it is no longer needed."
    },
    {
      id: 9,
      title: "9. Children's Privacy",
      icon: <FaUserSecret className="text-accent" />,
      content: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information."
    },
    {
      id: 10,
      title: "10. International Data Transfers",
      icon: <FaGlobe className="text-accent" />,
      content: "Your information may be transferred to and maintained on servers located outside of your country of residence. By using our services, you consent to the transfer of your data to countries that may have different data protection laws."
    },
    {
      id: 11,
      title: "11. Email Communications",
      icon: <FaRegEnvelope className="text-accent" />,
      content: "We may send you promotional emails about new features, investment opportunities, or important updates. You can opt out of receiving promotional emails by following the unsubscribe instructions included in each email or by contacting us directly."
    },
    {
      id: 12,
      title: "12. Changes to This Privacy Policy",
      icon: <FaShieldAlt className="text-accent" />,
      content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date. You are advised to review this Privacy Policy periodically for any changes."
    }
  ];

  return (
    <>
      <SEO 
        title="Privacy Policy - Track2311"
        description="Track2311 Investment and Consultancy's Privacy Policy explains how we collect, use, protect, and handle your personal information. Learn about your data protection rights and our security measures."
        keywords="privacy policy, data protection, personal information, GDPR compliance, data security, Track2311 privacy, investment privacy"
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
                <FaShieldAlt className="text-4xl text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Your privacy is important to us. Learn how we protect and handle your personal information
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
                At Track2311 Investment and Consultancy, we are committed to protecting your privacy and ensuring 
                the security of your personal information. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our website and investment services.
              </p>
            </div>
          </div>
        </section>

        {/* Key Principles Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              >
                <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaLock className="text-primary text-xl" />
                  </div>
                  <h3 className="font-bold text-primary mb-2">Data Protection</h3>
                  <p className="text-xs text-gray-500">Industry-standard security measures</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaUserShield className="text-primary text-xl" />
                  </div>
                  <h3 className="font-bold text-primary mb-2">Your Rights</h3>
                  <p className="text-xs text-gray-500">Access, correct, or delete your data</p>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaRegClock className="text-primary text-xl" />
                  </div>
                  <h3 className="font-bold text-primary mb-2">Data Retention</h3>
                  <p className="text-xs text-gray-500">We keep your data only as needed</p>
                </div>
              </motion.div>

              <div className="space-y-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    <div className="border-l-4 border-accent p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{section.icon}</div>
                        <h2 className="text-xl font-bold text-primary">{section.title}</h2>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{section.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* GDPR Compliance Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/20"
              >
                <h3 className="font-bold text-primary text-lg mb-3 flex items-center gap-2">
                  <FaGlobe className="text-accent" />
                  GDPR Compliance
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you are a resident of the European Economic Area (EEA), you have certain data protection rights. 
                  Track2311 Investment and Consultancy aims to take reasonable steps to allow you to correct, amend, delete, 
                  or limit the use of your personal information.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-accent text-sm mt-0.5" />
                    <span className="text-sm text-gray-600">Right to access your data</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-accent text-sm mt-0.5" />
                    <span className="text-sm text-gray-600">Right to rectification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-accent text-sm mt-0.5" />
                    <span className="text-sm text-gray-600">Right to erasure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaCheckCircle className="text-accent text-sm mt-0.5" />
                    <span className="text-sm text-gray-600">Right to data portability</span>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 bg-white rounded-xl p-6 border border-gray-200 text-center"
              >
                <h3 className="font-bold text-primary text-lg mb-3">Contact Our Privacy Team</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    📧 <a href="mailto:track2311.investments@gmail.com" className="text-primary hover:text-accent transition">track2311.investments@gmail.com</a>
                  </p>
                  <p className="text-gray-600">
                    📞 <a href="tel:+19016080131" className="text-primary hover:text-accent transition">+1 (901) 608-0131</a>
                  </p>
                  <p className="text-gray-600">
                    📍 Monrovia, Liberia
                  </p>
                </div>
              </motion.div>

              {/* Footer Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8 text-center"
              >
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/" className="text-primary hover:text-accent transition font-semibold">
                    Return to Home
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/terms" className="text-primary hover:text-accent transition font-semibold">
                    Terms & Conditions
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/contact" className="text-primary hover:text-accent transition font-semibold">
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Have Privacy Concerns?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                We take your privacy seriously. Contact our privacy team for any concerns or questions
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition group">
                Contact Privacy Team
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;