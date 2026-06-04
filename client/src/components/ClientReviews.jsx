import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const ClientReviews = () => {
  const reviews = [
    {
      name: "John K. Doe",
      text: "Track2311 has completely transformed my investment portfolio. Their team is professional, responsive, and truly cares about client success. I've seen consistent returns and excellent customer service.",
      rating: 5,
      date: "March 2026"
    },
    {
      name: "Sarah Mensah",
      text: "The best investment decision I ever made was trusting Track2311. Their transparency and regular updates give me peace of mind. Highly recommended for anyone looking to grow their wealth.",
      rating: 5,
      date: "February 2026"
    },
    {
      name: "Michael T. Brown",
      text: "Professional, reliable, and results-driven. Track2311 has helped me achieve financial goals I thought were years away. Their investment strategies are solid and well-researched.",
      rating: 5,
      date: "January 2026"
    },
    {
      name: "Patience Okonkwo",
      text: "I've worked with several investment firms, but Track2311 stands out. Their customer support is exceptional, and my returns have consistently exceeded expectations.",
      rating: 5,
      date: "December 2025"
    },
    {
      name: "James Freeman",
      text: "Fast withdrawals and transparent processes. Track2311 makes investing easy and stress-free. The team keeps you informed every step of the way.",
      rating: 5,
      date: "November 2025"
    },
    {
      name: "Grace A. Williams",
      text: "Very reliable investment platform. My funds are secure, and the returns are paid directly to my account as promised. I'm very satisfied with their service.",
      rating: 5,
      date: "October 2025"
    },
    {
      name: "David O. Kwarteng",
      text: "The team at Track2311 really understands the African market. Their local expertise combined with global investment strategies has delivered amazing results for me.",
      rating: 5,
      date: "September 2025"
    },
    {
      name: "Mariam B. Conteh",
      text: "As a first-time investor, I was nervous. Track2311 walked me through everything and made me feel confident. My returns have been fantastic and the process is simple.",
      rating: 5,
      date: "August 2025"
    },
    {
      name: "Emmanuel C. Nkrumah",
      text: "What I appreciate most about Track2311 is their honesty. They set realistic expectations and consistently deliver. Best investment partner in West Africa.",
      rating: 5,
      date: "July 2025"
    },
    {
      name: "Fatima Z. Kamara",
      text: "The support team is always available when I have questions. Track2311 has helped me build wealth for my family's future. I couldn't be happier.",
      rating: 5,
      date: "June 2025"
    },
    {
      name: "Kwame A. Asare",
      text: "From agriculture to real estate, Track2311 offers diverse investment opportunities. Their research team really knows where to find value in emerging markets.",
      rating: 5,
      date: "May 2025"
    },
    {
      name: "Elizabeth S. Johnson",
      text: "I recommend Track2311 to all my friends and family. The returns are consistent, the platform is secure, and the team is always professional. A truly trusted partner.",
      rating: 5,
      date: "April 2025"
    }
  ];

  // Split reviews into two rows
  const firstRowReviews = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRowReviews = reviews.slice(Math.ceil(reviews.length / 2));

  // Duplicate reviews for seamless infinite scroll
  const duplicateFirstRow = [...firstRowReviews, ...firstRowReviews, ...firstRowReviews];
  const duplicateSecondRow = [...secondRowReviews, ...secondRowReviews, ...secondRowReviews];

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-primary">
            Real Client Experiences
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What our investors say about Track2311 Investment & Consultancy
          </p>
        </motion.div>

        {/* Rating Summary */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-accent text-xl" />
              ))}
            </div>
            <div className="text-2xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-gray-500">Based on 5,000+ investor reviews</div>
          </div>
        </div>

        {/* First Row - Moving Left */}
        <div className="mb-8 overflow-hidden">
          <div className="animate-marquee-left inline-flex gap-6">
            {duplicateFirstRow.map((review, index) => (
              <div
                key={`row1-${index}`}
                className="w-80 md:w-96 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 group cursor-pointer"
              >
                <FaQuoteLeft className="text-accent text-3xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-gray-600 mb-4 line-clamp-4 text-sm">{review.text.substring(0, 120)}...</p>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h4 className="font-bold text-primary">{review.name}</h4>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="text-accent text-sm" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Moving Right */}
        <div className="overflow-hidden">
          <div className="animate-marquee-right inline-flex gap-6">
            {duplicateSecondRow.map((review, index) => (
              <div
                key={`row2-${index}`}
                className="w-80 md:w-96 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 group cursor-pointer"
              >
                <FaQuoteLeft className="text-accent text-3xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                <p className="text-gray-600 mb-4 line-clamp-4 text-sm">{review.text.substring(0, 120)}...</p>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h4 className="font-bold text-primary">{review.name}</h4>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="text-accent text-sm" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;