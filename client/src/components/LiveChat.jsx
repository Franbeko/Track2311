import { useState, useRef, useEffect } from 'react';
import { FaComment, FaTimes, FaPaperPlane, FaUser, FaEnvelope, FaMinus, FaArrowUp } from 'react-icons/fa';
import { useChat } from '../context/ChatContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const LiveChat = () => {
  const { isChatOpen: externalIsOpen, shouldOpenChat, openChat, closeChat, resetChatTrigger } = useChat();
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "🌾 Hello! Welcome to Track2311. I'm your AI Chatbot assistant. I can answer questions about our farming services, investments, registration, and company info. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isNameCollected, setIsNameCollected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isOpen = externalIsOpen;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && isNameCollected) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized, isNameCollected]);

  useEffect(() => {
    if (shouldOpenChat) {
      resetChatTrigger();
    }
  }, [shouldOpenChat, resetChatTrigger]);

  // AI Responses
  const getAIResponse = (message) => {
    const msg = message.toLowerCase().trim();
    
    // ============ SIMPLE GREETINGS ============
    if (msg === 'hi' || msg === 'hello' || msg === 'hey' || msg === 'hi there' || msg === 'hello there') {
      return "👋 Hello! Welcome to Track2311! I'm your AI assistant. How can I help you today? Feel free to ask me about our agricultural services, investment opportunities, registration, or anything else about the company!";
    }
    
    if (msg === 'how are you' || msg === 'how are you?' || msg === 'how r u' || msg === 'how are u') {
      return "😊 I'm doing great, thank you for asking! I'm here and ready to help you with any questions about Track2311. How can I assist you today?";
    }
    
    if (msg === 'good morning' || msg === 'morning') {
      return "☀️ Good morning! Hope you're having a wonderful start to your day. How can I help you with Track2311 today?";
    }
    
    if (msg === 'good afternoon' || msg === 'afternoon') {
      return "🌤️ Good afternoon! Great to have you here. What can I help you with about Track2311?";
    }
    
    if (msg === 'good evening' || msg === 'evening') {
      return "🌙 Good evening! Thanks for stopping by. How can I assist you with our agricultural services or investment opportunities today?";
    }
    
    if (msg === 'what\'s up' || msg === 'sup' || msg === 'whats up') {
      return "🙂 Not much, just here waiting to help you! What brings you to Track2311 today? I can tell you about our farming services, investment opportunities, or how to get started with us!";
    }
    
    if (msg === 'howdy') {
      return "🤠 Howdy partner! Welcome to Track2311! Ready to learn about Liberian agriculture and investment opportunities?";
    }
    
    if (msg === 'yo' || msg === 'hiya') {
      return "👋 Hey there! Welcome to Track2311. What can I do for you today? Feel free to ask me anything about our company!";
    }
    
    // ============ GREETING + QUESTION COMBINATIONS ============
    if (msg.includes('hi') && (msg.includes('about') || msg.includes('tell'))) {
      return "👋 Hello! Thanks for your interest in Track2311. I'd be happy to tell you about our company. We are a Liberian-based agricultural investment firm founded in 2020. We help farmers with modern farming techniques, connect them to global markets, and offer agricultural investment opportunities. What specific aspect would you like to know more about?";
    }
    
    // ============ FAQ SECTION - Common Questions ============
    if (msg.includes('faq') || msg.includes('frequently asked')) {
      return "❓ Frequently Asked Questions:\n\n📌 How to start investing?\n📌 Minimum investment amount?\n📌 How are returns calculated?\n📌 Can I withdraw early?\n📌 Is my money safe?\n📌 What payment methods?\n\nWhich question would you like me to answer?";
    }
    
    // ============ TAX INFORMATION ============
    if (msg.includes('tax') || msg.includes('taxes')) {
      return "💰 Tax Information:\n\nInvestment returns may be subject to taxes depending on your jurisdiction. We recommend consulting with a tax professional for advice specific to your situation. Track2311 provides all necessary documentation for tax reporting purposes.";
    }
    
    // ============ ACCOUNT VERIFICATION ============
    if (msg.includes('verify') || msg.includes('verification') || msg.includes('kyc')) {
      return "🔐 Account Verification (KYC):\n\nTo comply with regulations, we require:\n1. Government-issued ID (Passport/Driver's License)\n2. Proof of address (Utility bill)\n3. Source of funds documentation\n\nVerification typically takes 24-48 hours. Once verified, you'll have full access to all investment features!";
    }
    
    // ============ REFERRAL PROGRAM ============
    if (msg.includes('refer') || msg.includes('affiliate') || msg.includes('referral')) {
      return "🤝 Referral Program:\n\nEarn bonuses by referring friends!\n• 5% commission on their first investment\n• 2% commission on subsequent investments\n• Share your unique referral link\n• No limit on referrals\n\nAsk our support team for your personal referral link!";
    }
    
    // ============ MOBILE APP ============
    if (msg.includes('app') || msg.includes('mobile') || msg.includes('android') || msg.includes('ios')) {
      return "📱 Mobile App:\n\nOur mobile app is coming soon! Currently, our website is fully optimized for mobile browsers. You can access all features from your phone's browser. We'll notify you when the app launches!";
    }
    
    // ============ CUSTOMER SUPPORT HOURS ============
    if (msg.includes('support hours') || msg.includes('customer service hours')) {
      return "🕐 Customer Support Hours:\n\n📞 Phone Support: Mon-Fri, 8AM-4PM (Liberia time)\n💬 Live Chat: 24/7 AI assistant\n📧 Email: 24/7 response within 2 hours\n\nEmergency support available via phone at +1 (901) 608-0131";
    }
    
    // ============ INVESTMENT PERFORMANCE ============
    if (msg.includes('performance') || msg.includes('historical returns')) {
      return "📊 Historical Performance:\n\nOur investment plans have consistently delivered projected returns:\n• Starter: 10% ROI (98% success rate)\n• Growth: 20% ROI (95% success rate)\n• Premium: 35% ROI (92% success rate)\n• Elite: 50% ROI (90% success rate)\n\nPast performance doesn't guarantee future results, but we maintain transparent reporting.";
    }
    
    // ============ RISK MANAGEMENT ============
    if (msg.includes('risk') || msg.includes('risks')) {
      return "⚠️ Understanding Investment Risks:\n\nAll investments carry some risk. We minimize risks through:\n• Diversified portfolio strategy\n• Expert market analysis\n• Regular portfolio rebalancing\n• Conservative leverage usage\n\nWe recommend investing only what you can afford to lose and diversifying your investments.";
    }
    
    // ============ COMPANY INFORMATION - Direct answers ============
    // Handle "What is the company about?" type questions
    if (msg.includes('what is the company about') || 
        msg.includes('what is the company') || 
        msg.includes('tell me about the company') || 
        msg.includes('company information') ||
        msg.includes('company details') ||
        (msg.includes('company') && msg.includes('about')) ||
        (msg.includes('track2311') && msg.includes('about'))) {
      return "🌾 **About Track2311**\n\nTrack2311 is a Liberian-based agricultural investment firm founded in 2020.\n\n**What We Do:**\n• Modern farming and crop production (cocoa, rice, cassava, rubber, palm oil)\n• Farmland acquisition and development\n• Agricultural export to global markets\n• Farmer training and capacity building\n• Agribusiness consulting\n\n**Our Mission:** To transform Liberia's agriculture by empowering farmers with modern techniques and global market access.\n\n**Our Vision:** To become West Africa's leading agricultural investment firm.\n\n**Our Core Values:**\n• Sustainable Farming\n• Farmer First\n• Agricultural Excellence\n• Global Vision\n• Integrity & Transparency\n\n**Headquarters:** Adj. St. Philip's Lutheran Church, Duport Road, Monrovia, Liberia\n\nIs there anything specific about the company you'd like to know more about?";
    }
    
    // Handle "Tell me everything about the company"
    if (msg.includes('everything about') || (msg.includes('tell me') && msg.includes('all about')) || (msg.includes('everything') && msg.includes('company'))) {
      return "🌾 **Complete Overview of Track2311**\n\n📌 **Basic Info:**\n• Founded: 2020\n• Headquarters: Monrovia, Liberia\n• Industry: Agricultural Investment & Farming\n\n🌱 **What We Do:**\n• Modern crop farming (cocoa, rice, cassava, rubber, palm oil, coffee)\n• Farmland acquisition and development\n• Agricultural export to Europe, USA, China, and West Africa\n• Farmer training and capacity building\n• Agribusiness consulting\n• Farm infrastructure (irrigation, storage, processing)\n\n🎯 **Mission:** To transform Liberia's agriculture by empowering farmers with modern techniques and global market access.\n\n👁️ **Vision:** To become West Africa's leading agricultural investment firm.\n\n🌟 **Values:** Sustainable Farming, Farmer First, Agricultural Excellence, Global Vision, Integrity\n\n👥 **Leadership:**\n• Ernest Garnark Smith Jr - Founder & CEO\n• Mrs. Precious N. Onumah-Haizel - Board Member\n• Michael Bobby Bull - Chairman\n• Hon. Richard Fatorma Ngafuan - Board Member\n\n📍 **Location:** Adj. St. Philip's Lutheran Church, Duport Road, Monrovia, Liberia\n\n📞 **Contact:** +1 (901) 608-0131 | track2311.investments@gmail.com\n\nIs there any specific area you'd like to dive deeper into?";
    }
    
    // Handle "What is Track2311?" or just "Track2311?"
    if (msg === 'track2311' || msg === 'what is track2311' || msg === 'what is track2311?' || (msg.includes('track2311?') && !msg.includes('about'))) {
      return "🌾 **Track2311** is a Liberian-based agricultural investment firm that helps farmers with modern farming techniques, connects them to global markets, and offers agricultural investment opportunities.\n\n**Quick Facts:**\n• Founded in 2020\n• Based in Monrovia, Liberia\n• Specializes in cocoa, rice, cassava, rubber, and palm oil\n• Exports to Europe, USA, and China\n\nWould you like to know more about our services, investment opportunities, or how to get started?";
    }
    
    // ============ HOW THE WEBSITE WORKS ============
    if (msg.includes('how the website works') || msg.includes('how does this website work') || msg.includes('how to use the website') || msg.includes('website guide') || msg.includes('how to navigate')) {
      return "🌐 **How to Use the Track2311 Website:**\n\n📍 **Main Navigation Menu:**\n• **Home** - Latest updates and featured content\n• **Company Profile** - Learn about our mission, values, and history\n• **Services** - Agricultural services we offer\n• **Shareholders & Investors** - Investment opportunities\n• **Blog** - News, farming tips, market updates, success stories\n• **Team** - Meet our agricultural experts\n• **Gallery** - Photos of our farming projects\n• **Contact** - Get in touch with our team\n\n📝 **Getting Started:**\n1️⃣ Click 'Register' to create your free account\n2️⃣ Fill in your name, email, and password\n3️⃣ Login to access your dashboard\n4️⃣ Explore investment opportunities or farming services\n\n🔍 **Need Something Specific?**\n• Use the search bar on blog pages to find articles\n• Check our FAQ section for common questions\n• Use the contact form to reach our agricultural team\n• Chat with me anytime for instant help!\n\n💡 **Tip:** Registering gives you access to personalized investment opportunities and farming resources!\n\nWhat specific feature would you like to learn more about?";
    }
    
    // ============ REGISTRATION ============
    if (msg.includes('how to register') || msg.includes('register') || msg.includes('sign up') || msg.includes('create account')) {
      return "📝 **How to Register on Track2311:**\n\n1️⃣ Click the 'Register' button at the top right of our website\n2️⃣ Fill in your information:\n   • Full Name\n   • Email Address\n   • Phone Number (optional)\n   • Password (minimum 6 characters)\n   • Confirm your password\n3️⃣ Click 'Create Account'\n4️⃣ You're done!\n\n✅ Registration is **FREE** and takes less than 3 minutes!\n\nAfter registering, you can login anytime with your email and password to access investment opportunities and farming resources.\n\nNeed help? Just let me know!";
    }
    
    if (msg.includes('registration fee') || msg.includes('cost to register') || msg.includes('free registration')) {
      return "✅ **Registration is completely FREE!**\n\nThere are no fees to create an account with Track2311. You can sign up anytime at no cost. Fees only apply when you decide to invest in our agricultural projects or purchase farming services.\n\nGo ahead and register - it costs nothing to get started!";
    }
    
    if (msg.includes('what do i need to register') || msg.includes('requirements')) {
      return "📋 **What You Need to Register:**\n\n• Full Name\n• Valid Email Address\n• Phone Number (optional)\n• Password (minimum 6 characters)\n\n**That's it!** No documents needed to register.\n\n**Why Register?**\n• Access investment opportunities\n• Get farming resources\n• Save your preferences\n• Contact our agricultural team\n\nReady to register? Click the Register button at the top of the page!";
    }
    
    // ============ LOGIN ============
    if (msg.includes('how to login') || msg.includes('sign in') || msg.includes('login')) {
      return "🔐 **How to Login to Track2311:**\n\n1️⃣ Click the 'Login' button at the top right of our website\n2️⃣ Enter your Email Address\n3️⃣ Enter your Password\n4️⃣ Click 'Login'\n\n💡 **Tip:** Check 'Remember me' to stay logged in on your personal device.\n\n**Forgot your password?** Click 'Forgot Password?' on the login page to reset it.\n\nHaving trouble? Make sure your email and password are correct, then try again. Contact support at +1 (901) 608-0131 if you need help!";
    }
    
    if (msg.includes('forgot password') || msg.includes('reset password')) {
      return "🔑 **Forgot Your Password?**\n\n1️⃣ Click 'Login' on our website\n2️⃣ Select 'Forgot Password?'\n3️⃣ Enter your registered email address\n4️⃣ Check your email for a reset link\n5️⃣ Create a new password (minimum 6 characters)\n\n**Still having issues?** Contact our support team at +1 (901) 608-0131 and we'll help you regain access to your account!";
    }
    
    // ============ COMPANY INFO (already handled above but keeping as backup) ============
    if (msg.includes('what is track2311') || msg.includes('about the company') || msg.includes('company info') || msg.includes('tell me about track2311') || msg.includes('who are you')) {
      return "🌾 **About Track2311**\n\nTrack2311 is a Liberian-based agricultural investment firm founded in 2020.\n\n**What We Do:**\n• Modern farming and crop production (cocoa, rice, cassava, rubber, palm oil)\n• Farmland acquisition and development\n• Agricultural export to global markets\n• Farmer training and capacity building\n• Agribusiness consulting\n\n**Our Mission:** To transform Liberia's agriculture by empowering farmers with modern techniques and global market access.\n\n**Our Vision:** To become West Africa's leading agricultural investment firm.\n\n**Headquarters:** Adj. St. Philip's Lutheran Church, Duport Road, Monrovia, Liberia\n\nWant to know more about any of our services? Just ask!";
    }
    
    if (msg.includes('mission') || msg.includes('vision')) {
      return "🎯 **Our Mission:**\nTo transform Liberia's agriculture by empowering farmers with modern techniques and global market access.\n\n👁️ **Our Vision:**\nTo become West Africa's leading agricultural investment firm, empowering farmers and connecting Liberian agriculture to international markets.\n\n**Our Core Values:**\n• Sustainable Farming\n• Farmer First\n• Agricultural Excellence\n• Global Vision\n• Integrity & Transparency";
    }
    
    // ============ SERVICES ============
    if (msg.includes('services') || msg.includes('what do you do') || msg.includes('offer')) {
      return "📋 **Track2311 Agricultural Services:**\n\n🌾 **Crop Farming** - Rice, cassava, cocoa, rubber, palm oil production\n🏞️ **Farmland Acquisition** - Help finding and acquiring agricultural land\n🚜 **Farmer Training** - Modern farming techniques and best practices\n📦 **Agricultural Export** - Connecting Liberian farmers to international buyers\n💼 **Agribusiness Consulting** - Strategic advice for farming businesses\n🏗️ **Farm Infrastructure** - Irrigation systems, storage facilities, processing plants\n\n**Want to learn more about any specific service? Just ask!**";
    }
    
    // ============ FARMING ============
    if (msg.includes('how to start farming') || msg.includes('become a farmer') || msg.includes('start farming')) {
      return "🌾 **How to Start Farming with Track2311:**\n\n1️⃣ Register on our website (free, takes 3 minutes)\n2️⃣ Login to your account\n3️⃣ Contact our agricultural team via the contact form\n4️⃣ Discuss your farming goals and land needs\n5️⃣ Receive training on modern farming techniques\n6️⃣ Access quality seeds, equipment, and irrigation\n7️⃣ Get connected to buyers and export markets\n\n**We support you every step of the way!** Our agricultural experts provide ongoing guidance.\n\nReady to start? Register today or ask me more questions!";
    }
    
    // ============ INVESTMENTS ============
    if (msg.includes('how to invest') || msg.includes('invest in agriculture') || msg.includes('agricultural investment')) {
      return "📈 **How to Invest in Liberian Agriculture with Track2311:**\n\n1️⃣ Register on our website (free)\n2️⃣ Login to your account\n3️⃣ Review agricultural investment opportunities\n4️⃣ Contact our investment team\n5️⃣ Choose your investment amount and crop focus\n6️⃣ Sign the investment agreement\n7️⃣ Start earning returns from farm harvests\n\n**Investment Options:**\n• Crop-specific investments (cocoa, rice, cassava, rubber, palm oil)\n• Farmland acquisition projects\n• Agricultural export ventures\n\nOur team will guide you through every step! Want specific details about any investment opportunity?";
    }
    
    // ============ CROPS ============
    if (msg.includes('crops') || msg.includes('what crops') || msg.includes('farm products')) {
      return "🌾 **Crops We Work With:**\n\n• **Cocoa** - High export demand to Europe\n• **Rice** - Staple food, growing local and export demand\n• **Cassava** - Industrial processing potential\n• **Rubber** - Established export market\n• **Palm Oil** - Growing international demand\n• **Coffee** - Specialty market opportunity\n\nEach crop has different growing seasons, investment requirements, and return potentials.\n\n**Which crop interests you most?** I can provide more specific information!";
    }
    
    // ============ FARMER SUPPORT ============
    if (msg.includes('farmer support') || msg.includes('help for farmers') || msg.includes('support for farmers')) {
      return "🤝 **Farmer Support We Provide:**\n\n📚 **Training & Education** - Modern farming techniques, crop management, business skills\n🌱 **Quality Inputs** - High-yield seeds, organic fertilizers\n🚜 **Equipment Access** - Tractors, harvesters, irrigation systems\n📊 **Technical Assistance** - Ongoing agricultural extension services\n🌍 **Market Access** - Connections to local and international buyers\n💰 **Financing Options** - Flexible investment opportunities\n\n**All available after registration!** Our team is committed to your success.\n\nNeed specific support? Just let me know what you're looking for!";
    }
    
    // ============ EXPORT ============
    if (msg.includes('export') || msg.includes('sell internationally') || msg.includes('global market')) {
      return "🌍 **Export Markets We Serve:**\n\n🇪🇺 **European Union** - Primary destination for cocoa and rubber\n🇺🇸 **United States** - Specialty agricultural products\n🇨🇳 **China** - Growing market for Liberian products\n🇨🇮 **West Africa** - Regional trade within ECOWAS\n🇬🇭 **Ghana** - Processed agricultural goods\n\n**What We Handle:**\n• Quality control and certification\n• Logistics and shipping coordination\n• Export documentation\n• Customs clearance\n• Buyer connections\n\nWant to export your products? Contact our export team through the website!";
    }
    
    // ============ CONTACT ============
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach us')) {
      return "📞 **Contact Track2311:**\n\n**Email:**\n📧 track2311.investments@gmail.com - Main company email\n\n**Phone:**\n📞 +1 (901) 608-0131 - International line\n📱 +231 88 651 1666 - Liberia mobile\n\n**Address:**\n📍 Adj. St. Philip's Lutheran Church, Duport Road, Monrovia, Liberia, 1100\n\n**Hours:** Mon-Fri 8AM-4PM, Sat 9AM-1PM, Sun Closed\n\n💬 **AI Chatbot (me!)** is available 24/7!\n\nHow can I help you today?";
    }
    
    // ============ TEAM ============
    if (msg.includes('team') || msg.includes('leadership') || msg.includes('who runs')) {
      return "👥 **Track2311 Leadership Team:**\n\n• **Ernest Garnark Smith Jr** - Founder & CEO\n• **Mrs. Precious N. Onumah-Haizel** - Board Member\n• **Michael Bobby Bull** - Chairman of the Board\n• **Hon. Richard Fatorma Ngafuan** - Board Member\n\n**Our Agricultural Specialists:**\n• Crop Scientists - Soil analysis and crop selection\n• Farm Engineers - Irrigation and infrastructure\n• Agri-Finance Experts - Farm investment planning\n• Export Specialists - International market access\n• Farmer Trainers - Capacity building\n\nOur team is passionate about transforming Liberian agriculture!";
    }
    
    // ============ HOURS ============
    if (msg.includes('hours') || msg.includes('open') || msg.includes('available')) {
      return "🕐 **Track2311 Operating Hours:**\n\n• Monday - Friday: 8:00 AM - 4:00 PM (Liberia time)\n• Saturday: 9:00 AM - 1:00 PM\n• Sunday: Closed\n\n**Emergency Support:** Available via hotline outside hours\n\n🤖 **AI Chatbot (me!) is available 24/7** - I can answer your questions anytime!\n\n**Best times to call:** Tuesday-Thursday, 10AM-2PM for fastest response";
    }
    
    // ============ LOCATION ============
    if (msg.includes('location') || msg.includes('where are you') || msg.includes('address')) {
      return "📍 **Track2311 Headquarters:**\n\nAdj. St. Philip's Lutheran Church\nDuport Road\nMonrovia, Liberia\n1100\n\n**Farming Regions We Serve:**\n• Lofa County - Rice and cassava\n• Bong County - Rubber and palm oil\n• Nimba County - Cocoa and coffee\n• Grand Gedeh County - Rubber\n\nOur agricultural experts are available for on-site farm visits across these regions!";
    }
    
    // ============ DEFAULT - Company focused ============
    return "🌾 **I can help with questions about Track2311!**\n\n**Ask me about:**\n📝 Registration & Login\n🌱 Farming Services & Support\n📈 Agricultural Investments\n🌾 Crops (Cocoa, Rice, Cassava, etc.)\n🌍 Export Markets\n👥 Our Team\n📞 Contact & Location\n💡 How the website works\n💰 Taxes & Investment Returns\n🔐 Account Verification (KYC)\n🤝 Referral Program\n📱 Mobile App\n\n**Just type your question naturally** - for example:\n• \"What is the company about?\"\n• \"How do I register?\"\n• \"What crops do you work with?\"\n• \"How can I invest?\"\n• \"Where are you located?\"\n• \"What are the risks?\"\n• \"How do I verify my account?\"\n• Or just say \"Hi\" to get started!\n\nWhat would you like to know about Track2311? 😊";
  };

  const sendToBackend = async (name, email, message) => {
    try {
      await axios.post('http://localhost:5000/api/chat', {
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to save chat:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    const userQuestion = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponseText = getAIResponse(userQuestion);
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);

    if (isNameCollected && userName && userEmail) {
      await sendToBackend(userName, userEmail, userQuestion);
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() && userEmail.trim()) {
      setIsNameCollected(true);
      
      const welcomeMessageText = `Nice to meet you, ${userName}! 👨‍🌾 I'm your Track2311 AI Chatbot assistant. I can answer questions about our farming services, investments, registration, and company info. What would you like to know?`;
      
      const welcomeBotMessage = {
        id: messages.length + 1,
        type: 'bot',
        text: welcomeMessageText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, welcomeBotMessage]);
    } else {
      toast.error('Please enter both name and email');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        <button
          onClick={scrollToTop}
          className="bg-primary text-white w-10 h-10 rounded-full shadow-lg hover:bg-secondary transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <div className="relative group">
          <button
            onClick={openChat}
            className="bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-secondary transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Live Chat"
          >
            <FaComment className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Chat with our AI Chatbot
            <div className="absolute top-full right-3 w-2 h-2 bg-gray-800 transform rotate-45"></div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <FaComment className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Track2311 AI Chatbot</h3>
                <p className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online • 24/7
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-1 rounded transition"
              >
                <FaMinus className="w-4 h-4" />
              </button>
              <button
                onClick={closeChat}
                className="hover:bg-white/20 p-1 rounded transition"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
                {!isNameCollected ? (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-gray-600 text-sm mb-3">Please introduce yourself:</p>
                    <form onSubmit={handleNameSubmit} className="space-y-3">
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="text"
                          placeholder="Your name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          required
                        />
                      </div>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                          type="email"
                          placeholder="Your email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded-lg font-semibold text-sm hover:bg-secondary transition"
                      >
                        Start Chat
                      </button>
                      <div className="text-center text-xs text-gray-400 space-y-1 mt-2">
                        <p>💬 Free • No spam • Secure</p>
                        <p>🤖 AI-powered chatbot assistant</p>
                        <p>⏱️ Average response: &lt; 10 seconds</p>
                      </div>
                    </form>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-700 shadow-sm'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <span className={`text-xs mt-1 block ${message.type === 'user' ? 'text-gray-200' : 'text-gray-400'}`}>
                          {message.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {isNameCollected && (
                <div className="p-3 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about Track2311..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPaperPlane className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    🤖 Track2311 AI Chatbot • 24/7 • Ask me anything about the company
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default LiveChat;