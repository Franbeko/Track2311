import { useState, useRef, useEffect } from 'react';
import { FaComment, FaTimes, FaPaperPlane, FaUser, FaEnvelope, FaMinus, FaArrowUp } from 'react-icons/fa';
import { useChat } from '../context/ChatContext';
import apiClient from '../utils/axiosConfig';
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

  // Comprehensive AI Response System
  const getAIResponse = (message) => {
    const msg = message.toLowerCase().trim();
    
    // ============ GREETINGS ============
    if (msg === 'hi' || msg === 'hello' || msg === 'hey' || msg === 'hi there' || msg === 'hello there') {
      return "👋 Hello! Welcome to Track2311! I'm your AI assistant. How can I help you today? Feel free to ask me about our agricultural services, investment opportunities, registration, company info, location, or anything else about Track2311!";
    }
    
    if (msg === 'good morning') {
      return "☀️ Good morning! Hope you're having a wonderful start to your day. How can I help you with Track2311 today?";
    }
    
    if (msg === 'good afternoon') {
      return "🌤️ Good afternoon! Great to have you here. What can I help you with?";
    }
    
    if (msg === 'good evening') {
      return "🌙 Good evening! Thanks for stopping by. How can I assist you today?";
    }
    
    if (msg === 'how are you' || msg === 'how are you?' || msg === 'how r u') {
      return "😊 I'm doing great, thank you for asking! I'm here and ready to help you with any questions about Track2311. How can I assist you today?";
    }
    
    // ============ COMPANY INFORMATION ============
    if (msg.includes('what is the company about') || msg.includes('what is track2311') || msg.includes('about the company') || msg.includes('tell me about the company')) {
      return "🌾 **About Track2311**\n\nTrack2311 is a Liberian-based agricultural investment firm founded in 2020.\n\n**What We Do:**\n• Modern farming and crop production (cocoa, rice, cassava, rubber, palm oil)\n• Farmland acquisition and development\n• Agricultural export to global markets\n• Farmer training and capacity building\n• Agribusiness consulting\n\n**Our Mission:** To transform Liberia's agriculture by empowering farmers with modern techniques and global market access.\n\n**Our Vision:** To become West Africa's leading agricultural investment firm.\n\nIs there anything specific you'd like to know?";
    }
    
    // ============ LOCATION ============
    if (msg.includes('location') || msg.includes('where are you') || msg.includes('address') || msg.includes('headquarters')) {
      return "📍 **Track2311 Headquarters:**\n\nAdj. St. Philip's Lutheran Church\nDuport Road\nMonrovia, Liberia\n1100\n\n**Farming Regions We Serve:**\n• Lofa County - Rice and cassava\n• Bong County - Rubber and palm oil\n• Nimba County - Cocoa and coffee\n\nOur agricultural experts are available for on-site farm visits across these regions!";
    }
    
    // ============ CONTACT ============
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('reach us')) {
      return "📞 **Contact Track2311:**\n\n**Email:** egsmithjr@track2311investments.org\n\n**Phone:**\n📞 +1 (901) 608-0131 - International line\n📱 +231 88 651 1666 - Liberia mobile\n\n**Hours:** Mon-Fri 8AM-4PM (Liberia time), Sat 9AM-1PM\n\n💬 I'm available 24/7! How can I help?";
    }
    
    // ============ HOW TO JOIN / CAREERS ============
    if (msg.includes('join the company') || msg.includes('work for') || msg.includes('career') || msg.includes('job')) {
      return "💼 **Join Our Team!**\n\nTo apply for a position at Track2311:\n\n1️⃣ Visit our **Careers page** (click 'Careers' in the menu)\n2️⃣ Browse our current openings\n3️⃣ Click 'Apply Now' on any position\n4️⃣ Fill out the application form with your details and resume\n\n**Our hiring process:**\n• Submit application\n• Initial screening (phone call)\n• Technical interview\n• Offer & onboarding\n\nWe review applications within 5-7 business days. Good luck! 🍀";
    }
    
    // ============ INVESTMENTS ============
    if (msg.includes('invest') || msg.includes('investment') || msg.includes('roi') || msg.includes('returns')) {
      return "📈 **Investment Plans at Track2311:**\n\n🌾 **Farm Starter** - 10% ROI (30 days)\n🚜 **Agri-Growth** - 20% ROI (60 days) - Most Popular\n🌍 **Export Premium** - 35% ROI (90 days)\n\n**How to invest:**\n1️⃣ Register for an account (free)\n2️⃣ Login to your dashboard\n3️⃣ Choose your investment plan\n4️⃣ Make your deposit\n5️⃣ Start earning returns!\n\nWould you like me to help you get started?";
    }
    
    // ============ REGISTRATION ============
    if (msg.includes('register') || msg.includes('sign up') || msg.includes('create account')) {
      return "📝 **How to Register on Track2311:**\n\n1️⃣ Click the 'Login' button at the top right\n2️⃣ Switch to the 'Register' tab\n3️⃣ Fill in your information:\n   • Full Name\n   • Email Address\n   • Phone Number (optional)\n   • Password (minimum 6 characters)\n4️⃣ Click 'Create Account'\n\n✅ Registration is **FREE** and takes less than 3 minutes!\n\nWould you like me to guide you through the process?";
    }
    
    // ============ SERVICES ============
    if (msg.includes('services') || msg.includes('what do you do') || msg.includes('offer')) {
      return "📋 **Track2311 Services:**\n\n🌾 **Agriculture** - Modern farming and crop production\n💰 **Investment Advisory** - Expert guidance for wealth growth\n🏗️ **General Construction** - Quality construction services\n📚 **Education & Marketing** - Training programs\n💼 **Business Consulting** - Strategic business development\n📊 **Research & Data Analysis** - Data-driven insights\n\nWant to learn more about any specific service? Just ask!";
    }
    
    // ============ TEAM ============
    if (msg.includes('team') || msg.includes('leadership') || msg.includes('founder')) {
      return "👥 **Track2311 Leadership Team:**\n\n• **Ernest Garnark Smith Jr** - Founder & CEO\n• **Mrs. Precious N. Onumah-Haizel** - Board Member\n• **Michael Bobby Bull** - Chairman of the Board\n• **Hon. Richard Fatorma Ngafuan** - Board Member\n\nVisit our 'Team' page to learn more about each member.";
    }
    
    // ============ HELP ============
    if (msg.includes('help') || msg.includes('support')) {
      return "🆘 **How can I help you?**\n\nYou can ask me about:\n• Company information and location\n• Investment plans and returns\n• Registration and login\n• Services we offer\n• Career opportunities\n• Contact information\n• Our team\n\nWhat would you like to know? 😊";
    }
    
    // ============ DEFAULT ============
    return "🌾 Thanks for your question! I'm here to help with information about Track2311. You can ask me about:\n\n📌 Company info & location\n📌 Investment plans & returns\n📌 Registration & login\n📌 Our services\n📌 Career opportunities\n📌 Contact information\n📌 Our team\n\nWhat would you like to know about Track2311? 😊";
  };

  const sendToBackend = async (name, email, message) => {
    try {
      await apiClient.post('/api/chat', {
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

        {/* Chat Button with Tooltip - Hidden on mobile */}
        <div className="relative group">
          <button
            onClick={openChat}
            className="bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:bg-secondary transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Live Chat"
          >
            <FaComment className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          {/* Tooltip on hover - ONLY visible on desktop (hidden on mobile) */}
          <span className="hidden sm:block absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50 shadow-lg">
            Chat with our AI Chatbot
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[85vw] sm:w-96 h-[60vh] sm:h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/logo/logo.png" 
                  alt="Track2311 Logo" 
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span className="text-primary text-xl font-bold">T</span>';
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base">Track2311 AI Chatbot</h3>
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
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
                          style={{ fontSize: '16px' }}
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
                          className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
                          style={{ fontSize: '16px' }}
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
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-base"
                      style={{ fontSize: '16px' }}
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