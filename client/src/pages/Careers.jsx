import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaClock, FaGraduationCap, FaBriefcase, 
  FaArrowRight, FaSeedling, FaTractor, FaLeaf, FaHandshake,
  FaChartLine, FaUsers, FaHeart, FaInstagram, FaFileAlt, FaEnvelope,
  FaPhone, FaTwitter, FaFacebook
} from 'react-icons/fa';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import axios from 'axios';
import toast from 'react-hot-toast';

const Careers = () => {
  const { t } = useLanguage();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '', // ADDED location field
    education: '',
    coverLetter: '',
    linkedin: '',
    portfolio: '',
    resumeFile: null
  });

  // Job openings with translation keys
  const jobOpenings = [
    {
      id: 1,
      titleKey: "seniorAgronomist",
      departmentKey: "agServices",
      locationKey: "monrovia",
      typeKey: "fulltime",
      experience: "5+ years",
      education: "Master's in Agronomy or related field",
      postedKey: "postedPrefix",
      deadline: "2026-07-15",
      descriptionKey: "seniorAgronomist",
      responsibilities: [
        "Develop and implement sustainable farming strategies",
        "Conduct soil analysis and recommend crop selections",
        "Train farmers on modern agricultural techniques",
        "Monitor crop health and yield performance",
        "Collaborate with research institutions on agricultural innovations"
      ],
      requirements: [
        "Master's degree in Agronomy, Crop Science, or related field",
        "Minimum 5 years experience in agricultural advisory roles",
        "Deep knowledge of tropical farming systems",
        "Experience working with smallholder farmers",
        "Strong communication and training skills"
      ],
      benefits: [
        "Competitive salary package",
        "Health insurance",
        "Professional development opportunities",
        "Company vehicle for field visits",
        "Annual performance bonus"
      ],
      icon: <FaSeedling />
    },
    {
      id: 2,
      titleKey: "farmOperationsManager",
      departmentKey: "operations",
      locationKey: "lofa",
      typeKey: "fulltime",
      experience: "7+ years",
      education: "Bachelor's in Agriculture or Business",
      postedKey: "postedPrefix",
      deadline: "2026-07-30",
      descriptionKey: "farmOperationsManager",
      responsibilities: [
        "Manage all farm operations and production schedules",
        "Supervise farm staff and coordinate daily activities",
        "Implement pest management and irrigation systems",
        "Monitor budget and operational costs",
        "Ensure compliance with safety and environmental standards"
      ],
      requirements: [
        "Bachelor's degree in Agriculture, Business Management, or related",
        "7+ years farm management experience",
        "Knowledge of modern farming equipment",
        "Strong leadership and team management skills",
        "Experience with budget management"
      ],
      benefits: [
        "Competitive salary with housing allowance",
        "Comprehensive health coverage",
        "Vehicle allowance",
        "Annual leave and training opportunities",
        "Performance-based incentives"
      ],
      icon: <FaTractor />
    },
    {
      id: 3,
      titleKey: "agExtensionOfficer",
      departmentKey: "farmerServices",
      locationKey: "multiple",
      typeKey: "fulltime",
      experience: "3+ years",
      education: "Bachelor's in Agriculture Extension",
      postedKey: "postedPrefix",
      deadline: "2026-07-20",
      descriptionKey: "agExtensionOfficer",
      responsibilities: [
        "Conduct field demonstrations and training sessions",
        "Provide one-on-one advisory services to farmers",
        "Collect and report agricultural data",
        "Facilitate farmer cooperative meetings",
        "Distribute agricultural inputs and resources"
      ],
      requirements: [
        "Bachelor's degree in Agriculture Extension or related",
        "3+ years experience in farmer outreach",
        "Ability to speak local languages (Kpelle, Bassa, or Mano)",
        "Passion for community development",
        "Valid driver's license"
      ],
      benefits: [
        "Competitive salary",
        "Field allowance",
        "Health insurance",
        "Motorcycle for field work",
        "Career advancement opportunities"
      ],
      icon: <FaLeaf />
    },
    {
      id: 4,
      titleKey: "agriFinanceSpecialist",
      departmentKey: "finance",
      locationKey: "monrovia",
      typeKey: "fulltime",
      experience: "4+ years",
      education: "Bachelor's in Finance, Economics, or Agribusiness",
      postedKey: "postedPrefix",
      deadline: "2026-07-25",
      descriptionKey: "agriFinanceSpecialist",
      responsibilities: [
        "Develop farm financial models and investment plans",
        "Facilitate farmer access to agricultural loans",
        "Conduct financial literacy training for farmers",
        "Analyze farm profitability and ROI",
        "Build relationships with financial institutions"
      ],
      requirements: [
        "Bachelor's degree in Finance, Economics, or Agribusiness",
        "4+ years experience in agricultural finance",
        "Understanding of microfinance and rural banking",
        "Strong analytical and communication skills",
        "Proficiency in financial software"
      ],
      benefits: [
        "Competitive salary package",
        "Performance bonus",
        "Health and life insurance",
        "Professional certification support",
        "Flexible work arrangements"
      ],
      icon: <FaChartLine />
    },
    {
      id: 5,
      titleKey: "irrigationEngineer",
      departmentKey: "technicalServices",
      locationKey: "bong",
      typeKey: "contract",
      experience: "5+ years",
      education: "Bachelor's in Agricultural or Civil Engineering",
      postedKey: "postedPrefix",
      deadline: "2026-08-01",
      descriptionKey: "irrigationEngineer",
      responsibilities: [
        "Design efficient irrigation systems for various crop types",
        "Supervise installation and maintenance of irrigation equipment",
        "Train farmers on water conservation techniques",
        "Monitor water usage and system performance",
        "Troubleshoot and repair irrigation issues"
      ],
      requirements: [
        "Bachelor's degree in Agricultural or Civil Engineering",
        "5+ years experience in irrigation system design",
        "Knowledge of drip, sprinkler, and surface irrigation",
        "Experience with solar-powered irrigation systems",
        "Strong project management skills"
      ],
      benefits: [
        "Competitive contract rate",
        "Accommodation allowance",
        "Transportation provided",
        "Equipment and tools provided",
        "Potential for permanent position"
      ],
      icon: <FaHandshake />
    },
    {
      id: 6,
      titleKey: "agDataAnalyst",
      departmentKey: "research",
      locationKey: "monrovia",
      typeKey: "fulltime",
      experience: "3+ years",
      education: "Bachelor's in Statistics, Data Science, or Agricultural Economics",
      postedKey: "postedPrefix",
      deadline: "2026-07-18",
      descriptionKey: "agDataAnalyst",
      responsibilities: [
        "Collect and analyze crop yield and market data",
        "Develop predictive models for harvest forecasts",
        "Create dashboards for farm performance tracking",
        "Prepare reports for stakeholders and partners",
        "Support research on agricultural trends"
      ],
      requirements: [
        "Bachelor's degree in Statistics, Data Science, or related",
        "3+ years experience in data analysis",
        "Proficiency in Excel, SQL, and data visualization tools",
        "Knowledge of agricultural systems preferred",
        "Strong attention to detail"
      ],
      benefits: [
        "Competitive salary",
        "Modern office environment",
        "Health insurance",
        "Continuous learning opportunities",
        "Hybrid work options"
      ],
      icon: <FaUsers />
    }
  ];

  // Helper function to get job title
  const getJobTitle = (key) => {
    return t.careers?.jobTitles?.[key] || key;
  };

  // Helper function to get department
  const getDepartment = (key) => {
    return t.careers?.jobDepartments?.[key] || key;
  };

  // Helper function to get location
  const getLocation = (key) => {
    return t.careers?.jobLocations?.[key] || key;
  };

  // Helper function to get job type
  const getJobType = (key) => {
    return t.careers?.jobTypes?.[key] || key;
  };

  // Helper function to get description
  const getDescription = (key) => {
    return t.careers?.jobDescriptions?.[key] || key;
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      education: '',
      coverLetter: '',
      linkedin: '',
      portfolio: '',
      resumeFile: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resumeFile: e.target.files[0] }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare data for API
    const applicationData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      education: formData.education,
      coverLetter: formData.coverLetter,
      linkedin: formData.linkedin,
      portfolio: formData.portfolio,
      jobTitle: getJobTitle(selectedJob.titleKey),
      jobLocation: getLocation(selectedJob.locationKey)
    };
    
    try {
      const response = await axios.post('http://localhost:5000/api/applications', applicationData);
      
      if (response.data.success) {
        toast.success('Application submitted successfully! Check your email for confirmation.');
        setApplicationSubmitted(true);
        setTimeout(() => {
          setSelectedJob(null);
          setApplicationSubmitted(false);
          setIsSubmitting(false);
        }, 3000);
      } else {
        toast.error('Submission failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Careers at Track2311 | Agricultural Jobs in Liberia"
        description="Join Track2311's agricultural team in Liberia. We're hiring agronomists, farm managers, agricultural extension officers, agri-finance specialists, and more. Grow your career in sustainable farming."
        keywords="agricultural jobs Liberia, farming careers, agronomist jobs, farm manager, agricultural extension, agri-finance, irrigation engineer, agricultural data analyst, Track2311 careers"
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
                {t.careers?.hero?.badge || "🌱 Join Our Mission"}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
                {t.careers?.hero?.title || "Grow Your Career With Us"}
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                {t.careers?.hero?.subtitle || "Help us transform Liberian agriculture. Join a team dedicated to sustainable farming, farmer success, and agricultural excellence."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.careers?.whyJoinUs?.badge || "Why Work With Us"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.careers?.whyJoinUs?.title || "More Than Just a Job"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.careers?.whyJoinUs?.subtitle || "At Track2311, you'll make a real difference in the lives of Liberian farmers while building a rewarding career"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-primary mb-4 group-hover:text-accent transition-colors flex justify-center">
                  <FaSeedling className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{t.careers?.whyJoinUs?.sustainableImpact || "Sustainable Impact"}</h3>
                <p className="text-gray-600">{t.careers?.whyJoinUs?.sustainableImpactDesc || "Your work directly improves food security and farmer livelihoods across Liberia"}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-primary mb-4 group-hover:text-accent transition-colors flex justify-center">
                  <FaUsers className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{t.careers?.whyJoinUs?.collaborativeCulture || "Collaborative Culture"}</h3>
                <p className="text-gray-600">{t.careers?.whyJoinUs?.collaborativeCultureDesc || "Join a team of passionate agricultural professionals supporting each other"}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-primary mb-4 group-hover:text-accent transition-colors flex justify-center">
                  <FaHeart className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{t.careers?.whyJoinUs?.farmerCentric || "Farmer-Centric"}</h3>
                <p className="text-gray-600">{t.careers?.whyJoinUs?.farmerCentricDesc || "Everything we do puts farmers first - from strategy to daily operations"}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-primary mb-4 group-hover:text-accent transition-colors flex justify-center">
                  <FaChartLine className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{t.careers?.whyJoinUs?.growthMindset || "Growth Mindset"}</h3>
                <p className="text-gray-600">{t.careers?.whyJoinUs?.growthMindsetDesc || "We invest in your professional development and career advancement"}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.careers?.openPositions?.badge || "Current Opportunities"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.careers?.openPositions?.title || "Open Agricultural Positions"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.careers?.openPositions?.subtitle || "Join our growing team of agricultural experts and help shape the future of Liberian farming"}
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-4">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => handleApply(job)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-primary text-3xl group-hover:text-accent transition-colors">
                        {job.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">{getJobTitle(job.titleKey)}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <FaBriefcase className="text-accent" /> {getDepartment(job.departmentKey)}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-accent" /> {getLocation(job.locationKey)}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock className="text-accent" /> {getJobType(job.typeKey)}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{getDescription(job.descriptionKey)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <span className="text-xs text-gray-500">{t.careers?.postedPrefix || "Posted"} {job.postedKey === "postedPrefix" ? "" : ""}</span>
                      <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent hover:text-primary transition-all group-hover:shadow-md flex items-center gap-2">
                        {t.careers?.form?.submitApplication || "Apply Now"} <FaArrowRight className="text-sm" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-gray-600">
                {t.careers?.openPositions?.noPosition || "Don't see the right position?"} <Link to="/contact" className="text-accent font-semibold hover:underline">{t.careers?.openPositions?.sendResume || "Send us your resume"}</Link> {t.careers?.openPositions?.sendResume ? "" : "and we'll keep you in mind for future opportunities."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Application Modal / Form */}
        {selectedJob && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-primary">{t.careers?.form?.applyFor || "Apply for"} {getJobTitle(selectedJob.titleKey)}</h2>
                  <p className="text-gray-600 text-sm">{getLocation(selectedJob.locationKey)} • {getJobType(selectedJob.typeKey)}</p>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-500 hover:text-primary text-2xl"
                >
                  ×
                </button>
              </div>

              {applicationSubmitted ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{t.careers?.form?.applicationSubmitted || "Application Submitted!"}</h3>
                  <p className="text-gray-600">{t.careers?.form?.thankYou || "Thank you for your interest. Our HR team will review your application and contact you within 5-7 business days."}</p>
                  <p className="text-sm text-gray-500 mt-2">A confirmation email has been sent to your inbox.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
                  {/* Job Details Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-primary mb-2">Position Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Experience:</span>
                        <p className="font-semibold">{selectedJob.experience}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Education:</span>
                        <p className="font-semibold">{selectedJob.education}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Deadline:</span>
                        <p className="font-semibold">{selectedJob.deadline}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Department:</span>
                        <p className="font-semibold">{getDepartment(selectedJob.departmentKey)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-primary text-lg flex items-center gap-2">
                      <FaFileAlt /> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                        <input 
                          type="text" 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required 
                          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required 
                          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Current Location *</label>
                        <input 
                          type="text" 
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required 
                          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                          placeholder="e.g., Monrovia, Liberia or Accra, Ghana"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-primary text-lg flex items-center gap-2">
                      <FaGraduationCap /> Professional Information
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Highest Education Level *</label>
                        <select 
                          name="education"
                          value={formData.education}
                          onChange={handleInputChange}
                          required 
                          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select education level</option>
                          <option>High School Diploma</option>
                          <option>Bachelor's Degree</option>
                          <option>Master's Degree</option>
                          <option>Doctorate</option>
                          <option>Professional Certification</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Letter / Why you're a good fit *</label>
                        <textarea 
                          name="coverLetter"
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          rows="4" 
                          required 
                          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                          placeholder="Tell us why you're passionate about agriculture and why you'd be great for this role..."
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Upload Resume/CV (PDF, DOC, DOCX) *</label>
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          required 
                          onChange={handleFileChange}
                          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                        <p className="text-xs text-gray-500 mt-1">Max file size: 5MB</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-primary text-lg">Additional Information (Optional)</h3>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn Profile</label>
                      <input 
                        type="url" 
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                        placeholder="https://linkedin.com/in/yourprofile" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Portfolio or Relevant Work Links</label>
                      <input 
                        type="url" 
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary" 
                        placeholder="https://..." 
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" required className="w-4 h-4 text-accent" />
                        <span className="text-sm text-gray-700">I confirm that the information provided is accurate and I agree to the privacy policy *</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-accent hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setSelectedJob(null)} 
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}

        {/* Hiring Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                {t.careers?.hiringProcess?.badge || "Our Process"}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                {t.careers?.hiringProcess?.title || "How to Join Our Team"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t.careers?.hiringProcess?.subtitle || "We've designed a transparent and straightforward hiring process to find the best talent"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-bold text-primary mb-2">{t.careers?.hiringProcess?.step1Title || "Submit Application"}</h3>
                <p className="text-sm text-gray-600">{t.careers?.hiringProcess?.step1Desc || "Apply online with your resume and cover letter"}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-bold text-primary mb-2">{t.careers?.hiringProcess?.step2Title || "Initial Screening"}</h3>
                <p className="text-sm text-gray-600">{t.careers?.hiringProcess?.step2Desc || "Phone interview to discuss your experience and goals"}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-bold text-primary mb-2">{t.careers?.hiringProcess?.step3Title || "Technical Interview"}</h3>
                <p className="text-sm text-gray-600">{t.careers?.hiringProcess?.step3Desc || "In-depth discussion with our agricultural experts"}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-bold text-primary mb-2">{t.careers?.hiringProcess?.step4Title || "Offer & Onboarding"}</h3>
                <p className="text-sm text-gray-600">{t.careers?.hiringProcess?.step4Desc || "Join our team and start making an impact"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t.careers?.contact?.title || "Have Questions About Careers?"}
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                {t.careers?.contact?.subtitle || "Our HR team is here to help. Reach out to us for any inquiries about job opportunities."}
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <a href={`mailto:${t.careers?.contact?.email || "track2311.investments@gmail.com"}`} className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition inline-flex items-center justify-center gap-2">
                  <FaEnvelope /> {t.careers?.contact?.email || "track2311.investments@gmail.com"}
                </a>
                <a href={`tel:${t.careers?.contact?.phone || "+231555123456"}`} className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition inline-flex items-center justify-center gap-2">
                  <FaPhone /> {t.careers?.contact?.phone || "+231 555 123 456"}
                </a>
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <a href="https://twitter.com/track2311invest?t=f14zVsNckZU3eMYNLRXwnw&s=09" className="bg-white/20 p-3 rounded-full hover:bg-accent hover:text-primary transition">
                  <FaTwitter />
                </a>
                <a href="https://www.facebook.com/people/Track2311-Investments-Consultancy-Ltd/100082914168655/" className="bg-white/20 p-3 rounded-full hover:bg-accent hover:text-primary transition">
                  <FaFacebook />
                </a>
                <a href="https://www.instagram.com/p/C578FUKuLBV/?igsh=MWQwcDFwMWp1eW5idA%3D%3D" className="bg-white/20 p-3 rounded-full hover:bg-accent hover:text-primary transition">
                  <FaInstagram />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Careers;