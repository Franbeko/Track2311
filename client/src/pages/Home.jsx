import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaChartLine, FaShieldAlt, FaUsers, FaArrowRight,
    FaHeadset, FaGlobe, FaCheckCircle,
    FaAward, FaTractor, FaSeedling
} from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import ServicesSection from '../components/ServicesSection';
import ClientReviews from '../components/ClientReviews';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import CookieConsent from '../components/CookieConsent';
import SEO from '../components/SEO';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home = () => {
    const { t } = useLanguage();
    const { openLoginModal, isAuthenticated } = useAuth();

    // Check if user is logged in to hide Get Started button
    const isGetStartedButtonVisible = !isAuthenticated;

    // Updated features with agriculture focus
    const features = [
        { 
            icon: <FaSeedling className="text-4xl" />, 
            title: t.features?.highReturns || "High Farm Returns", 
            description: t.features?.highReturnsDesc || "Earn competitive returns from agricultural investments", 
            color: "text-primary" 
        },
        { 
            icon: <FaShieldAlt className="text-4xl" />, 
            title: t.features?.securePlatform || "Secure Platform", 
            description: t.features?.securePlatformDesc || "Bank-level security for your peace of mind", 
            color: "text-secondary" 
        },
        { 
            icon: <FaTractor className="text-4xl" />, 
            title: t.features?.fastWithdrawals || "Modern Farming", 
            description: t.features?.fastWithdrawalsDesc || "Access to modern equipment and techniques", 
            color: "text-accent" 
        },
        { 
            icon: <FaUsers className="text-4xl" />, 
            title: t.features?.community || "Farmer Network", 
            description: t.features?.communityDesc || "Join thousands of successful farmers and investors", 
            color: "text-primary" 
        },
    ];

    // Updated stats with agriculture focus
    const stats = [
        { value: "5000+", label: t.stats?.farmersSupported || "Farmers Supported", icon: <FaUsers /> },
        { value: "10+", label: t.stats?.countriesExported || "Countries Exported To", icon: <FaGlobe /> },
        { value: "50%", label: t.stats?.avgYieldIncrease || "Avg Yield Increase", icon: <FaChartLine /> },
        { value: "98%", label: t.stats?.satisfactionRate || "Farmer Satisfaction", icon: <FaAward /> },
    ];

    // Updated slides to use language context
    const slides = [
        {
            title: t.hero?.slide1Title || "Growing Liberia's Agricultural Future",
            subtitle: t.hero?.slide1Subtitle || "Empowering local farmers with modern techniques and global market access",
            image: "/images/slider/slide1.jpg",
            buttonText: t.hero?.getStarted || "Get Started",
            isModalButton: true
        },
        {
            title: t.hero?.slide2Title || "Smart Farm Investments, Real Returns",
            subtitle: t.hero?.slide2Subtitle || "Building wealth through strategic agricultural investments and modern farming",
            image: "/images/slider/slide2.jpg",
            buttonText: t.hero?.learnMore || "Learn More",
            link: "/about"
        },
        {
            title: t.hero?.slide3Title || "From Local Farms to Global Markets",
            subtitle: t.hero?.slide3Subtitle || "Connecting Liberian agriculture with international opportunities",
            image: "/images/slider/slide3.jpg",
            buttonText: t.hero?.contactUs || "Contact Us",
            link: "/contact"
        }
    ];

    // Team Members
    const teamMembers = [
        {
            name: "Michael Bobby Bull",
            position: t.team?.boardMember || "Chairman of the Board of Directors",
            description: t.team?.michaelDesc || "Our distinguished board chair Mr. Michael B. Bull a proven policy and project analyst holds a BA Degree in Business Administration from Allen University.",
            image: "/images/team/team3.jpg",
        },
        {
            name: "Hon. Richard Fatorma Ngafuan",
            position: t.team?.boardMember || "Board Member",
            description: t.team?.richardDesc || "Expert in portfolio management and strategic investment planning with years of global experience.",
            image: "/images/team/team4.jpg",
        },
        {
            name: "Mrs. Precious N. Onumah-Haizel",
            position: t.team?.boardMember || "Board Member",
            description: t.team?.preciousDesc || "Our distinguished board chair Mr. Michael B. Bull a proven policy and project analyst holds a BA Degree in Business Administration from Allen University.",
            image: "/images/team/team1.jpg",
        },
        {
            name: "Ernest Garnark Smith Jr",
            position: t.team?.ceo || "Founder & CEO",
            description: t.team?.ernestDesc || "",
            image: "/images/team/team2.jpg",
        },
    ];

    // Partners data
    const partners = [
        { name: "Liberia Bank for Development", logo: "/images/partners/partner1.png" },
        { name: "Ministry of Agriculture", logo: "/images/partners/partner2.png" },
        { name: "West African Farmers Association", logo: "/images/partners/partner3.png" },
        { name: "African Development Group", logo: "/images/partners/partner4.png" },
        { name: "International Agri-Trade", logo: "/images/partners/partner5.png" },
        { name: "World Business Alliance", logo: "/images/partners/partner6.png" },
    ];

    // Achievements data
    const achievements = [
        { icon: "🏆", title: "Best Agri-Investment Platform", year: "2023", description: "Awarded for agricultural excellence" },
        { icon: "⭐", title: "Top Rated Service", year: "2024", description: "5-star farmer satisfaction" },
        { icon: "🌱", title: "Sustainable Farming", year: "2024", description: "Eco-friendly practices" },
        { icon: "🌍", title: "Global Recognition", year: "2024", description: "International trade partners" },
    ];

    return (
        <>
            <SEO 
                title="Home"
                description="Track2311 Investments offers secure agricultural investments, real estate opportunities, and business consultancy in Liberia. Earn up to 50% ROI with our proven investment plans."
                keywords="investment, agriculture, Liberia, real estate, ROI, business consultancy, import export, micro-finance, construction, farming, agribusiness"
            />
            
            <div>
                {/* Hero Slider Section */}
                <Swiper
                    modules={[Autoplay, Pagination, Navigation, EffectFade]}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    navigation={true}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    loop={true}
                    className="h-[80vh] md:h-screen w-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="h-full w-full bg-cover bg-center bg-no-repeat relative"
                                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${slide.image}')` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>

                                <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="text-center text-white max-w-4xl"
                                    >
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "80px" }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                            className="h-1 bg-accent mx-auto mb-6 rounded-full"
                                        ></motion.div>

                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                            className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                                        >
                                            {slide.title}
                                        </motion.h1>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.5 }}
                                            className="text-base md:text-xl lg:text-2xl mb-8 text-gray-200"
                                        >
                                            {slide.subtitle}
                                        </motion.p>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.7 }}
                                        >
                                            {slide.isModalButton ? (
                                                isGetStartedButtonVisible && (
                                                    <button
                                                        onClick={openLoginModal}
                                                        className="inline-flex items-center bg-accent text-primary px-8 md:px-10 py-3 md:py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group text-base md:text-lg"
                                                    >
                                                        {slide.buttonText}
                                                        <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                                    </button>
                                                )
                                            ) : (
                                                <Link
                                                    to={slide.link}
                                                    className="inline-flex items-center bg-accent text-primary px-8 md:px-10 py-3 md:py-4 rounded-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group text-base md:text-lg"
                                                >
                                                    {slide.buttonText}
                                                    <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                                </Link>
                                            )}
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Stats Section */}
                <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl text-accent flex justify-center mb-3">{stat.icon}</div>
                                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                                    <div className="text-sm text-gray-200">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Us Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                    {t.about?.aboutUs || "About Us"}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-primary">
                                    {t.about?.title || "Growing Liberia Through Agriculture & Smart Investments"}
                                </h2>
                                <div className="space-y-4 text-gray-600">
                                    <p className="italic text-gray-500 border-l-4 border-accent pl-4">
                                        {t.about?.quote || '"If you can\'t fly then run, if you can\'t run then walk, if you can\'t walk then crawl, but whatever you do you have to keep moving forward." - Dr. Martin Luther King, Jr.'}
                                    </p>
                                    <p>
                                        {t.about?.description1 || "Track2311 Investment and Consultancy is committed to transforming Liberia's agricultural sector while providing smart investment solutions. We empower local farmers, create sustainable opportunities, and drive economic growth."}
                                    </p>
                                    <p>
                                        {t.about?.description2 || "Our mission is to bridge the gap between local farmers and global markets, providing modern farming techniques, equipment access, and investment opportunities that benefit both farmers and investors."}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 pt-4">
                                        <div className="flex items-center space-x-2">
                                            <FaCheckCircle className="text-green-500" />
                                            <span>{t.about?.trusted || "Trusted by 5000+ farmers & investors"}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaCheckCircle className="text-green-500" />
                                            <span>{t.about?.global || "Global agricultural exports"}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaCheckCircle className="text-green-500" />
                                            <span>{t.about?.support || "24/7 farmer support"}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaCheckCircle className="text-green-500" />
                                            <span>{t.about?.transparent || "Secure & transparent investments"}</span>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/about" className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 mt-6 group">
                                    {t.about?.learnMore || "Learn More About Our Mission"}
                                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className="bg-gradient-to-br from-primary to-green-700 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                                    <FaTractor className="text-4xl text-accent mx-auto mb-3" />
                                    <div className="text-2xl font-bold">{t.about?.years || "5+ Years"}</div>
                                    <div className="text-sm">{t.about?.experience || "In Agriculture"}</div>
                                </div>
                                <div className="bg-gradient-to-br from-secondary to-red-700 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                                    <FaGlobe className="text-4xl text-accent mx-auto mb-3" />
                                    <div className="text-2xl font-bold">10+</div>
                                    <div className="text-sm">{t.about?.countries || "Countries Exported To"}</div>
                                </div>
                                <div className="bg-gradient-to-br from-primary to-green-700 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                                    <FaUsers className="text-4xl text-accent mx-auto mb-3" />
                                    <div className="text-2xl font-bold">5000+</div>
                                    <div className="text-sm">{t.about?.clients || "Farmers & Investors"}</div>
                                </div>
                                <div className="bg-gradient-to-br from-secondary to-red-700 rounded-xl p-6 text-white text-center transform hover:scale-105 transition-transform duration-300">
                                    <FaHeadset className="text-4xl text-accent mx-auto mb-3" />
                                    <div className="text-2xl font-bold">24/7</div>
                                    <div className="text-sm">{t.about?.supportLabel || "Farmer Support"}</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <ServicesSection />

                {/* Why Choose Us Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                {t.whyChooseUs?.title || "Why Choose Track2311"}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                                {t.whyChooseUs?.heading || "Your Trusted Partner in Agriculture & Investment"}
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                {t.whyChooseUs?.description || "With years of experience in Liberian agriculture and global investment markets, we deliver real results"}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 group"
                                >
                                    <div className={`${feature.color} flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Investment Plans Preview - UPDATED */}
                <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                {t.investmentPlans?.title || "Investment Plans"}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                                {t.investmentPlans?.heading || "Choose Your Investment Path"}
                            </h2>
                            <p className="text-gray-200 max-w-2xl mx-auto">
                                {t.investmentPlans?.description || "Flexible plans designed to meet your financial goals"}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-white text-gray-900 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-5xl mb-3">🌾</div>
                                <h3 className="text-2xl font-bold text-primary mb-2">Farm Starter</h3>
                                <div className="text-4xl font-bold text-accent mb-4">10% ROI</div>
                                <p className="text-gray-600 mb-6">Duration: 30 days</p>
                                <Link to="/plans" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
                                    Start Farming
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-white text-gray-900 rounded-xl p-6 text-center border-2 border-accent transform scale-105 shadow-xl relative"
                            >
                                <div className="absolute top-0 right-0 bg-accent text-primary px-4 py-1 rounded-bl-lg rounded-tr-lg font-semibold text-sm">
                                    {t.investmentPlans?.popular || "Most Popular"}
                                </div>
                                <div className="text-5xl mb-3">🚜</div>
                                <h3 className="text-2xl font-bold text-primary mb-2">Agri-Growth</h3>
                                <div className="text-4xl font-bold text-accent mb-4">20% ROI</div>
                                <p className="text-gray-600 mb-6">Duration: 60 days</p>
                                <Link to="/plans" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
                                    Expand Now
                                </Link>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-white text-gray-900 rounded-xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-5xl mb-3">🌍</div>
                                <h3 className="text-2xl font-bold text-primary mb-2">Export Premium</h3>
                                <div className="text-4xl font-bold text-accent mb-4">35% ROI</div>
                                <p className="text-gray-600 mb-6">Duration: 90 days</p>
                                <Link to="/contact" className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
                                    Go Global
                                </Link>
                            </motion.div>
                        </div>

                        <div className="text-center mt-8">
                            <Link to="/plans" className="inline-flex items-center text-accent font-semibold hover:underline group">
                                {t.investmentPlans?.viewAll || "View All Plans"} 
                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Team Preview Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                {t.teamSection?.title || "Our Team"}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                                {t.teamSection?.heading || "Meet Our Agricultural Experts"}
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                {t.teamSection?.description || "Dedicated professionals committed to Liberia's agricultural growth"}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    <div className="h-64 overflow-hidden">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x400?text=Team+Member';
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                                        <p className="text-accent font-semibold mb-3">{member.position}</p>
                                        <p className="text-gray-600 text-sm">{member.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link to="/team" className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 group">
                                {t.teamSection?.viewFullTeam || "Meet Our Full Team"}
                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Client Reviews Section */}
                <ClientReviews />

                {/* Partners & Clients Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-10"
                        >
                            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                {t.partners?.title || "Our Partners"}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-primary">
                                {t.partners?.heading || "Trusted By Leading Agricultural Organizations"}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {t.partners?.description || "We collaborate with industry leaders to promote Liberian agriculture"}
                            </p>
                        </motion.div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
                            {partners.map((partner, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl">🌾</span>
                                    </div>
                                    <p className="text-xs font-semibold text-gray-700 mt-2">{partner.name}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Achievements & Badges Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-10"
                        >
                            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                {t.achievementsSection?.title || "Achievements"}
                            </span>
                            <h2 className="text-2xl md:text-3xl font-bold mt-2 text-primary">
                                {t.achievementsSection?.heading || "Recognized For Agricultural Excellence"}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                {t.achievementsSection?.description || "Awards and recognition for transforming Liberian agriculture"}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">{achievement.icon}</div>
                                    <h3 className="font-bold text-primary text-lg">{achievement.title}</h3>
                                    <p className="text-accent font-semibold text-sm mt-1">{achievement.year}</p>
                                    <p className="text-xs text-gray-500 mt-2">{achievement.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Market Insights & Opportunities Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                                {t.opportunities?.title || "Investment Opportunities"}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
                                {t.opportunities?.heading || "Recent Market Insights"}
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                {t.opportunities?.description || "Explore the latest investment opportunities and market trends"}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Agriculture Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src="/images/gallery/gallery12.jpg" 
                                        alt="Agriculture"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-primary">
                                            {t.opportunities?.agriculture || "Agriculture"}
                                        </h3>
                                        <span className="text-accent font-semibold text-sm">
                                            {t.opportunities?.highDemand || "High Demand"}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        {t.opportunities?.agricultureDesc || "Import & Export of Agriculture Products & Minerals in Liberia. Lucrative opportunities in the agricultural sector."}
                                    </p>
                                    <Link to="/plans" className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center group">
                                        {t.opportunities?.learnMore || "Learn More"} 
                                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Real Estate Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src="/images/gallery/gallery14.jpg" 
                                        alt="Real Estate"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-primary">
                                            {t.opportunities?.realEstate || "Real Estate"}
                                        </h3>
                                        <span className="text-accent font-semibold text-sm">
                                            {t.opportunities?.growingMarket || "Growing Market"}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        {t.opportunities?.realEstateDesc || "Real Estate Investment In Liberia. Prime properties and development opportunities available."}
                                    </p>
                                    <Link to="/contact" className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center group">
                                        {t.opportunities?.learnMore || "Learn More"} 
                                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* International Trade Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img 
                                        src="/images/gallery/gallery15.jpg" 
                                        alt="International Trade"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-primary">
                                            {t.opportunities?.internationalTrade || "International Trade"}
                                        </h3>
                                        <span className="text-accent font-semibold text-sm">
                                            {t.opportunities?.globalAccess || "Global Access"}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4">
                                        {t.opportunities?.tradeDesc || "International opportunities in what we know best. Leverage our expertise for global success."}
                                    </p>
                                    <Link to="/contact" className="text-primary font-semibold hover:text-accent transition-colors inline-flex items-center group">
                                        {t.opportunities?.learnMore || "Learn More"} 
                                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        <div className="text-center mt-10">
                            <Link to="/plans" className="inline-flex items-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary transition-all duration-300 group">
                                {t.opportunities?.viewAll || "View All Investment Opportunities"}
                                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gradient-to-r from-primary via-secondary to-primary text-white">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="text-6xl mb-4">🌱</div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                {t.cta?.title || "Ready to Grow With Us?"}
                            </h2>
                            <p className="text-xl mb-8 max-w-2xl mx-auto">
                                {t.cta?.description || "Join the agricultural revolution in Liberia. Whether you're a farmer or investor, Track2311 is your partner in growth."}
                            </p>
                            <div className="space-x-4">
                                <Link to="/contact" className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-block transform hover:scale-105">
                                    {t.cta?.contactUs || "Contact Us"}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Cookie Consent Modal */}
                <CookieConsent />
            </div>
        </>
    );
};

export default Home;