import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaGavel, FaShieldAlt, FaUserSecret, FaFileContract, 
  FaLock, FaMoneyBillWave, FaChartLine, FaArrowRight,
  FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import SEO from '../components/SEO';

const Terms = () => {
  const sections = [
    {
      id: 1,
      title: "1. Acceptance of Terms",
      icon: <FaGavel className="text-accent" />,
      content: "By accessing and using Track2311 Investment and Consultancy's website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services."
    },
    {
      id: 2,
      title: "2. Investment Risks",
      icon: <FaExclamationTriangle className="text-accent" />,
      content: "All investments carry inherent risks. Past performance does not guarantee future results. You should carefully consider your investment objectives, level of experience, and risk appetite before investing. Track2311 Investment and Consultancy does not guarantee any specific returns on investments."
    },
    {
      id: 3,
      title: "3. Account Registration",
      icon: <FaUserSecret className="text-accent" />,
      content: "To use our investment services, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete. You are solely responsible for maintaining the confidentiality of your account credentials."
    },
    {
      id: 4,
      title: "4. Investment Plans",
      icon: <FaChartLine className="text-accent" />,
      content: "We offer various investment plans with different terms, minimum investment amounts, and expected returns. All investment plans are subject to availability and may be modified, suspended, or discontinued at our discretion. The terms of each investment plan will be clearly communicated before you commit to an investment."
    },
    {
      id: 5,
      title: "5. Fees and Charges",
      icon: <FaMoneyBillWave className="text-accent" />,
      content: "Track2311 Investment and Consultancy is committed to transparency. All fees, charges, and commissions will be clearly disclosed before any transaction. We reserve the right to modify our fee structure with reasonable notice to our clients."
    },
    {
      id: 6,
      title: "6. Privacy and Data Protection",
      icon: <FaLock className="text-accent" />,
      content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to the collection and use of your information as described in our Privacy Policy."
    },
    {
      id: 7,
      title: "7. Withdrawals and Returns",
      icon: <FaMoneyBillWave className="text-accent" />,
      content: "Withdrawal requests are processed according to the terms of your chosen investment plan. Processing times may vary depending on the payment method and applicable regulations. Minimum withdrawal amounts may apply."
    },
    {
      id: 8,
      title: "8. Prohibited Activities",
      icon: <FaShieldAlt className="text-accent" />,
      content: "You agree not to engage in any illegal activities, money laundering, fraud, or any behavior that could harm Track2311 Investment and Consultancy, our partners, or other users. Violation of these terms may result in immediate account termination."
    },
    {
      id: 9,
      title: "9. Intellectual Property",
      icon: <FaFileContract className="text-accent" />,
      content: "All content on this website, including text, graphics, logos, images, and software, is the property of Track2311 Investment and Consultancy and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission."
    },
    {
      id: 10,
      title: "10. Limitation of Liability",
      icon: <FaGavel className="text-accent" />,
      content: "To the maximum extent permitted by law, Track2311 Investment and Consultancy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services."
    },
    {
      id: 11,
      title: "11. Termination",
      icon: <FaFileContract className="text-accent" />,
      content: "We reserve the right to terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms and Conditions."
    },
    {
      id: 12,
      title: "12. Changes to Terms",
      icon: <FaGavel className="text-accent" />,
      content: "We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the service after any such changes constitutes your acceptance of the new terms."
    }
  ];

  return (
    <>
      <SEO 
        title="Terms & Conditions - Track2311 Legal Agreement"
        description="Read Track2311 Investment and Consultancy's Terms and Conditions. Understand investment risks, account registration requirements, fees, and your legal obligations as an investor."
        keywords="terms and conditions, investment terms, legal agreement, Track2311 terms, investment risks, account terms, privacy policy"
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
                <FaFileContract className="text-4xl text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Terms & Conditions</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Please read these terms carefully before using our services
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
                These Terms and Conditions govern your use of the Track2311 Investment and Consultancy website, 
                investment services, and all related services. By accessing our platform, you agree to be bound 
                by these terms. If you do not agree with any part of these terms, please refrain from using our services.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 p-6 bg-accent/10 rounded-xl border-l-4 border-accent"
              >
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="text-accent text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-primary text-lg mb-1">Key Information</h3>
                    <p className="text-gray-600 text-sm">
                      These terms constitute a legally binding agreement between you and Track2311 Investment and Consultancy. 
                      By using our services, you confirm that you are at least 18 years old and have the legal capacity to enter into this agreement.
                    </p>
                  </div>
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

              {/* Governing Law Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/20"
              >
                <h3 className="font-bold text-primary text-lg mb-3 flex items-center gap-2">
                  <FaGavel className="text-accent" />
                  Governing Law
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  These terms shall be governed by and construed in accordance with the laws of Liberia, 
                  without regard to its conflict of law provisions. Any disputes arising under these terms 
                  shall be subject to the exclusive jurisdiction of the courts located in Liberia.
                </p>
                <p className="text-gray-600 text-sm">
                  For any questions regarding these Terms & Conditions, please contact our legal team at 
                  <a href="mailto:track2311.investments@gmail.com" className="text-primary font-semibold ml-1 hover:text-accent transition">
                    track2311.investments@gmail.com
                  </a>
                </p>
              </motion.div>

              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-600">
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  <Link to="/" className="text-primary hover:text-accent transition font-semibold">
                    Return to Home
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link to="/privacy-policy" className="text-primary hover:text-accent transition font-semibold">
                    Read Privacy Policy
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
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Have Questions About Our Terms?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team is here to clarify any questions you may have about our terms and conditions
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition group">
                Contact Our Legal Team
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Terms;