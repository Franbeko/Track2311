import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaMoneyBillWave, FaUndoAlt, FaClock, FaHandHoldingUsd,
  FaShieldAlt, FaEnvelope, FaArrowRight, FaCheckCircle,
  FaExclamationTriangle, FaRegClock, FaCreditCard,
  FaPhone, FaQuestionCircle, FaFileInvoice
} from 'react-icons/fa';
import SEO from '../components/SEO';

const RefundPolicy = () => {
  const sections = [
    {
      id: 1,
      title: "1. Investment Refund Policy",
      icon: <FaHandHoldingUsd className="text-accent" />,
      content: "Investment amounts once committed to any of our investment plans are subject to the terms and conditions of the specific plan. Refunds for investments are generally not permitted during the active investment period. However, early withdrawal options may be available with applicable penalty fees as outlined in your investment agreement."
    },
    {
      id: 2,
      title: "2. Cooling-Off Period",
      icon: <FaRegClock className="text-accent" />,
      content: "New investors have a 7-day cooling-off period from the date of initial investment registration. During this period, you may request a full refund of your investment amount, provided no withdrawals or trades have been executed on your behalf. This cooling-off period applies only to first-time investors."
    },
    {
      id: 3,
      title: "3. Early Withdrawal Penalties",
      icon: <FaExclamationTriangle className="text-accent" />,
      content: "Early withdrawal from any investment plan before the maturity date may incur penalty fees. Penalty amounts vary based on the investment plan and the time remaining until maturity. Typical penalties range from 10% to 25% of the expected returns. Please refer to your specific investment plan for detailed penalty structure."
    },
    {
      id: 4,
      title: "4. Failed Transactions",
      icon: <FaCreditCard className="text-accent" />,
      content: "In the event of a failed transaction due to technical errors on our platform, we will process a full refund within 5-7 business days. For failed transactions caused by insufficient funds or incorrect banking information provided by the client, standard processing fees may apply."
    },
    {
      id: 5,
      title: "5. Refund Processing Time",
      icon: <FaClock className="text-accent" />,
      content: "Approved refunds are typically processed within 7-14 business days from the date of approval. The actual time to receive funds may vary depending on your financial institution and payment method. International transactions may take up to 21 business days."
    },
    {
      id: 6,
      title: "6. Non-Refundable Fees",
      icon: <FaMoneyBillWave className="text-accent" />,
      content: "The following fees are non-refundable: account setup fees, administrative fees, transaction processing fees, and any third-party service fees incurred during the investment process. These fees will be deducted from any refund amount."
    },
    {
      id: 7,
      title: "7. Disputed Transactions",
      icon: <FaShieldAlt className="text-accent" />,
      content: "If you believe a transaction was processed in error, please contact our support team immediately. We will investigate the matter and provide a resolution within 10 business days. Approved disputed transactions will be refunded in full."
    },
    {
      id: 8,
      title: "8. Return of Investment Principal",
      icon: <FaUndoAlt className="text-accent" />,
      content: "Upon maturity of your investment plan, your principal investment amount is returned to you along with any accrued returns. Returns are not guaranteed and depend on market performance as outlined in your investment agreement."
    }
  ];

  const refundProcess = [
    {
      step: "1",
      title: "Submit Request",
      description: "Contact our support team with your refund request and investment details",
      icon: <FaEnvelope className="text-2xl" />
    },
    {
      step: "2",
      title: "Verification",
      description: "Our team verifies your request and reviews applicable terms",
      icon: <FaCheckCircle className="text-2xl" />
    },
    {
      step: "3",
      title: "Approval",
      description: "Refund is approved based on your investment plan terms",
      icon: <FaFileInvoice className="text-2xl" />
    },
    {
      step: "4",
      title: "Processing",
      description: "Refund is processed to your original payment method",
      icon: <FaMoneyBillWave className="text-2xl" />
    }
  ];

  const exceptions = [
    "Investments made during promotional periods may have different refund terms",
    "Refunds cannot be processed for accounts under legal investigation",
    "Refunds for cryptocurrency investments are subject to market value fluctuations",
    "Minimum withdrawal amounts apply to all refund requests",
    "Accounts with active disputes are not eligible for refunds until resolution"
  ];

  return (
    <>
      <SEO 
        title="Refund Policy - Track2311 Investment Terms"
        description="Track2311's refund policy outlines investment refund terms, cooling-off period, early withdrawal penalties, and refund processing procedures. Understand your rights before investing."
        keywords="refund policy, investment refund, cooling-off period, early withdrawal, refund terms, Track2311 refund, investment protection"
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
                <FaUndoAlt className="text-4xl text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Refund Policy</h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                Clear guidelines on our refund process and investment protection
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
                At Track2311 Investment and Consultancy, we strive to provide transparent and fair refund policies. 
                This policy outlines the terms and conditions under which refunds may be issued for investments, 
                fees, and other transactions on our platform.
              </p>
            </div>
          </div>
        </section>

        {/* Key Information Banner */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-accent/10 rounded-xl p-6 border-l-4 border-accent">
                <div className="flex items-start gap-3">
                  <FaQuestionCircle className="text-accent text-xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-primary text-lg mb-1">Important Notice</h3>
                    <p className="text-gray-600 text-sm">
                      Please read this refund policy carefully before making any investment. Refund eligibility 
                      depends on the specific terms of your chosen investment plan and compliance with our policies. 
                      Contact our support team for any clarification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Refund Process Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Refund Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {refundProcess.map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 relative">
                        <span className="text-primary font-bold text-xl">{step.step}</span>
                      </div>
                      <h3 className="font-bold text-primary mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Policy Sections */}
              <div className="space-y-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
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

              {/* Exceptions Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 bg-primary/5 rounded-xl p-6 border border-primary/20"
              >
                <h3 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                  <FaExclamationTriangle className="text-accent" />
                  Exceptions & Special Cases
                </h3>
                <ul className="space-y-2">
                  {exceptions.map((exception, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheckCircle className="text-accent text-sm mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{exception}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* How to Request a Refund */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 bg-white rounded-xl p-6 border border-gray-200"
              >
                <h3 className="font-bold text-primary text-lg mb-4 flex items-center gap-2">
                  <FaQuestionCircle className="text-accent" />
                  How to Request a Refund
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-600 text-sm">
                    To request a refund, please follow these steps:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm ml-4">
                    <li>Log into your Track2311 investment account</li>
                    <li>Navigate to the "Support" or "Contact Us" section</li>
                    <li>Submit a refund request with your investment details</li>
                    <li>Include the reason for the refund request</li>
                    <li>Wait for confirmation from our support team</li>
                  </ol>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white text-center"
              >
                <h3 className="font-bold text-xl mb-3">Need Assistance?</h3>
                <p className="text-gray-200 mb-4">
                  Our support team is here to help with any refund-related questions
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="mailto:egsmithjr@track2311investments.org" className="inline-flex items-center gap-2 bg-accent text-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                    <FaEnvelope /> Email Support
                  </a>
                  <a href="tel:+19016080131" className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition">
                    <FaPhone /> Call Us
                  </a>
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
                  <Link to="/privacy-policy" className="text-primary hover:text-accent transition font-semibold">
                    Privacy Policy
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Still Have Questions?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our customer support team is available to clarify any questions about our refund policy
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition group">
                Contact Support
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default RefundPolicy;