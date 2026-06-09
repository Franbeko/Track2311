import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaClock, FaBriefcase, FaArrowRight, 
  FaSeedling, FaTractor, FaLeaf, FaHandshake, FaChartLine, FaUsers, 
  FaHeart, FaFileAlt, FaEnvelope, FaSpinner 
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import apiClient from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const Careers = () => {
  const { t } = useLanguage();
  const [cms, setCms] = useState(null);
  const [loadingCms, setLoadingCms] = useState(true);
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', location: '', education: '', coverLetter: '', linkedin: '', portfolio: '', resumeFile: null
  });

  useEffect(() => {
    apiClient.get('/api/admin/content')
      .then(res => setCms(res.data))
      .catch(err => console.error("Error fetching Careers CMS text:", err))
      .finally(() => setLoadingCms(false));
  }, []);

  if (loadingCms) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  const jobOpenings = [
    { id: 1, titleKey: "seniorAgronomist", departmentKey: "agServices", locationKey: "monrovia", typeKey: "fulltime", experience: "5+ years", education: "Master's in Agronomy or related field", postedKey: "postedPrefix", deadline: "2026-07-15", descriptionKey: "seniorAgronomist", responsibilities: ["Develop and implement sustainable farming strategies", "Conduct soil analysis and recommend crop selections", "Train farmers on modern agricultural techniques", "Monitor crop health and yield performance", "Collaborate with research institutions on agricultural innovations"], requirements: ["Master's degree in Agronomy, Crop Science, or related field", "Minimum 5 years experience in agricultural advisory roles", "Deep knowledge of tropical farming systems", "Experience working with smallholder farmers", "Strong communication and training skills"], benefits: ["Competitive salary package", "Health insurance", "Professional development opportunities", "Company vehicle for field visits", "Annual performance bonus"], icon: <FaSeedling /> },
    { id: 2, titleKey: "farmOperationsManager", departmentKey: "operations", locationKey: "lofa", typeKey: "fulltime", experience: "7+ years", education: "Bachelor's in Agriculture or Business", postedKey: "postedPrefix", deadline: "2026-07-30", descriptionKey: "farmOperationsManager", responsibilities: ["Manage all farm operations and production schedules", "Supervise farm staff and coordinate daily activities", "Implement pest management and irrigation systems", "Monitor budget and operational costs", "Ensure compliance with safety and environmental standards"], requirements: ["Bachelor's degree in Agriculture, Business Management, or related", "7+ years farm management experience", "Knowledge of modern farming equipment", "Strong leadership and team management skills", "Experience with budget management"], benefits: ["Competitive salary with housing allowance", "Comprehensive health coverage", "Vehicle allowance", "Annual leave and training opportunities", "Performance-based incentives"], icon: <FaTractor /> },
    { id: 3, titleKey: "agExtensionOfficer", departmentKey: "farmerServices", locationKey: "multiple", typeKey: "fulltime", experience: "3+ years", education: "Bachelor's in Agriculture Extension", postedKey: "postedPrefix", deadline: "2026-07-20", descriptionKey: "agExtensionOfficer", responsibilities: ["Conduct field demonstrations and training sessions", "Provide one-on-one advisory services to farmers", "Collect and report agricultural data", "Facilitate farmer cooperative meetings", "Distribute agricultural inputs and resources"], requirements: ["Bachelor's degree in Agriculture Extension or related", "3+ years experience in farmer outreach", "Ability to speak local languages (Kpelle, Bassa, or Mano)", "Passion for community development", "Valid driver's license"], benefits: ["Competitive salary", "Field allowance", "Health insurance", "Motorcycle for field work", "Career advancement opportunities"], icon: <FaLeaf /> },
    { id: 4, titleKey: "agriFinanceSpecialist", departmentKey: "finance", locationKey: "monrovia", typeKey: "fulltime", experience: "4+ years", education: "Bachelor's in Finance, Economics, or Agribusiness", postedKey: "postedPrefix", deadline: "2026-07-25", descriptionKey: "agriFinanceSpecialist", responsibilities: ["Develop farm financial models and investment plans", "Facilitate farmer access to agricultural loans", "Conduct financial literacy training for farmers", "Analyze farm profitability and ROI", "Build relationships with financial institutions"], requirements: ["Bachelor's degree in Finance, Economics, or Agribusiness", "4+ years experience in agricultural finance", "Understanding of microfinance and rural banking", "Strong analytical and communication skills", "Proficiency in financial software"], benefits: ["Competitive salary package", "Performance bonus", "Health and life insurance", "Professional certification support", "Flexible work arrangements"], icon: <FaChartLine /> },
    { id: 5, titleKey: "irrigationEngineer", departmentKey: "technicalServices", locationKey: "bong", typeKey: "contract", experience: "5+ years", education: "Bachelor's in Agricultural or Civil Engineering", postedKey: "postedPrefix", deadline: "2026-08-01", descriptionKey: "irrigationEngineer", responsibilities: ["Design efficient irrigation systems for various crop types", "Supervise installation and maintenance of irrigation equipment", "Train farmers on water conservation techniques", "Monitor water usage and system performance", "Troubleshoot and repair irrigation issues"], requirements: ["Bachelor's degree in Agricultural or Civil Engineering", "5+ years experience in irrigation system design", "Knowledge of drip, sprinkler, and surface irrigation", "Experience with solar-powered irrigation systems", "Strong project management skills"], benefits: ["Competitive contract rate", "Accommodation allowance", "Transportation provided", "Equipment and tools provided", "Potential for permanent position"], icon: <FaHandshake /> },
    { id: 6, titleKey: "agDataAnalyst", departmentKey: "research", locationKey: "monrovia", typeKey: "fulltime", experience: "3+ years", education: "Bachelor's in Statistics, Data Science, or Agricultural Economics", postedKey: "postedPrefix", deadline: "2026-07-18", descriptionKey: "agDataAnalyst", responsibilities: ["Collect and analyze crop yield and market data", "Develop predictive models for harvest forecasts", "Create dashboards for farm performance tracking", "Prepare reports for stakeholders and partners", "Support research on agricultural trends"], requirements: ["Bachelor's degree in Statistics, Data Science, or related", "3+ years experience in data analysis", "Proficiency in Excel, SQL, and data visualization tools", "Knowledge of agricultural systems preferred", "Strong attention to detail"], benefits: ["Competitive salary", "Modern office environment", "Health insurance", "Continuous learning opportunities", "Hybrid work options"], icon: <FaUsers /> }
  ];

  const getJobTitle = (key) => t.careers?.jobTitles?.[key] || key;
  const getDepartment = (key) => t.careers?.jobDepartments?.[key] || key;
  const getLocation = (key) => t.careers?.jobLocations?.[key] || key;
  const getJobType = (key) => t.careers?.jobTypes?.[key] || key;
  const getDescription = (key) => t.careers?.jobDescriptions?.[key] || key;

  const handleApply = (job) => {
    setSelectedJob(job);
    setFormData({ fullName: '', email: '', phone: '', location: '', education: '', coverLetter: '', linkedin: '', portfolio: '', resumeFile: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resumeFile: e.target.files[0] }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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
      const response = await apiClient.post('/api/applications', applicationData);
      if (response.data.success) {
        toast.success('Application submitted successfully!');
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
      console.error('Error submitting application form:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Careers at Track2311 | Agricultural Jobs in Liberia"
        description="Join Track2311's agricultural team in Liberia. Grow your career in sustainable farming."
        keywords="agricultural jobs Liberia, farming careers, Track2311 careers"
      />
      
      <div>
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.careers?.hero?.badge || "🌱 Join Our Mission"}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">{cms?.careersHeroTitle || t.careers?.hero?.title || "Grow Your Career With Us"}</h1>
              <p className="text-xl max-w-3xl mx-auto">{cms?.careersHeroSubtitle || t.careers?.hero?.subtitle || "Help us transform Liberian agriculture. Join a team dedicated to sustainable farming."}</p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.careers?.whyJoinUs?.badge || "Why Work With Us"}</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">More Than Just a Job</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t.careers?.whyJoinUs?.subtitle || "At Track2311, you'll make a real difference in the lives of Liberian farmers"}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300">
                <FaSeedling className="text-3xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-3">Sustainable Impact</h3>
                <p className="text-gray-600">Your work directly improves food security across Liberia</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300">
                <FaUsers className="text-3xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-3">Collaborative Culture</h3>
                <p className="text-gray-600">Join a team of passionate agricultural professionals</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300">
                <FaHeart className="text-3xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-3">Farmer-Centric</h3>
                <p className="text-gray-600">Everything we do puts our local farmers first</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300">
                <FaChartLine className="text-3xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary mb-3">Growth Mindset</h3>
                <p className="text-gray-600">We invest in your professional development assets</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">{t.careers?.openPositions?.badge || "Current Opportunities"}</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">{cms?.careersJobsTitle || "Open Agricultural Positions"}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{cms?.careersJobsSubtitle || "Join our growing team of agricultural experts and help shape the future of Liberian farming"}</p>
            </motion.div>
            <div className="max-w-5xl mx-auto space-y-4">
              {jobOpenings.map((job, index) => (
                <motion.div key={job.id} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer" onClick={() => handleApply(job)}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-primary text-3xl group-hover:text-accent transition-colors">{job.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary mb-2">{getJobTitle(job.titleKey)}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1"><FaBriefcase className="text-accent" /> {getDepartment(job.departmentKey)}</span>
                          <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-accent" /> {getLocation(job.locationKey)}</span>
                          <span className="flex items-center gap-1"><FaClock className="text-accent" /> {getJobType(job.typeKey)}</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{getDescription(job.descriptionKey)}</p>
                      </div>
                    </div>
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent hover:text-primary transition-all flex items-center gap-2">Apply Now <FaArrowRight /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {selectedJob && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-primary">Apply for {getJobTitle(selectedJob.titleKey)}</h2>
                  <p className="text-gray-600 text-sm">{getLocation(selectedJob.locationKey)} • {getJobType(selectedJob.typeKey)}</p>
                </div>
                <button onClick={() => setSelectedJob(null)} className="text-gray-500 hover:text-primary text-2xl">×</button>
              </div>
              {applicationSubmitted ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Application Submitted!</h3>
                  <p className="text-gray-600">Thank you for your interest. Our HR team will review your credentials soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-bold text-primary text-lg flex items-center gap-2"><FaFileAlt /> Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border rounded-lg p-3" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full border rounded-lg p-3" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Letter *</label>
                      <textarea name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} rows="4" required className="w-full border rounded-lg p-3" placeholder="Why would you be great for this role..."></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Upload CV *</label>
                      <input type="file" required onChange={handleFileChange} className="w-full border rounded-lg p-3" />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-all">{isSubmitting ? 'Submitting...' : 'Submit Application'}</button>
                    <button type="button" onClick={() => setSelectedJob(null)} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg">Cancel</button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}

        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{cms?.careersCtaTitle || "Have Questions About Careers?"}</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{cms?.careersCtaSubtitle || "Our HR team is here to help. Reach out to us for any inquiries about job opportunities."}</p>
            <div className="flex justify-center gap-4">
              <a href="mailto:egsmithjr@track2311investments.org" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"><FaEnvelope /> Email HR Team</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Careers;