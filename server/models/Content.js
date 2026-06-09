const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  // Global Contact/Footer Metadata
  contactPhone: { type: String, default: '+1 (901) 608-0131' },
  contactEmail: { type: String, default: 'egsmithjr@track2311investments.org' },
  aboutCompanyMission: { type: String, default: 'Empowering Liberian Farmers, Connecting Global Markets' },

  // Homepage Carousel Slider Keys
  homeSlide1Title: { type: String, default: "Growing Liberia's Agricultural Future" },
  homeSlide1Subtitle: { type: String, default: "Empowering local farmers with modern techniques and global market access" },
  homeSlide2Title: { type: String, default: "Smart Farm Investments, Real Returns" },
  homeSlide2Subtitle: { type: String, default: "Building wealth through strategic agricultural investments and modern farming" },
  homeSlide3Title: { type: String, default: "From Local Farms to Global Markets" },
  homeSlide3Subtitle: { type: String, default: "Connecting Liberian agriculture with international opportunities" },

  // Homepage About Us Layout Strings
  homeAboutHeading: { type: String, default: "Growing Liberia Through Agriculture & Smart Investments" },
  homeAboutQuote: { type: String, default: '"If you can\'t fly then run, if you can\'t run then walk, if you can\'t walk then crawl, but whatever you do you have to keep moving forward." - Dr. Martin Luther King, Jr.' },
  homeAboutDescription1: { type: String, default: "Track2311 Investment and Consultancy is committed to transforming Liberia's agricultural sector while providing smart investment solutions. We empower local farmers, create sustainable opportunities, and drive economic growth." },
  homeAboutDescription2: { type: String, default: "Our mission is to bridge the gap between local farmers and global markets, providing modern farming techniques, equipment access, and investment opportunities that benefit both farmers and investors." },

  // Homepage Call To Action Block Keys
  homeCtaTitle: { type: String, default: "Ready to Grow With Us?" },
  homeCtaDescription: { type: String, default: "Join the agricultural revolution in Liberia. Whether you're a farmer or investor, Track2311 is your partner in growth." }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);