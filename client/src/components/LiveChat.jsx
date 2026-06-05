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

  // AI Responses function (keep your existing getAIResponse)
  const getAIResponse = (message) => {
    const msg = message.toLowerCase().trim();
    
    if (msg === 'hi' || msg === 'hello' || msg === 'hey' || msg === 'hi there' || msg === 'hello there') {
      return "👋 Hello! Welcome to Track2311! I'm your AI assistant. How can I help you today?";
    }
    // Add all your other responses here
    return "🌾 I can help with questions about Track2311! Ask me about registration, investments, services, or our team.";
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
      
      const welcomeMessageText = `Nice to meet you, ${userName}! 👨‍🌾 I'm your Track2311 AI Chatbot assistant. What would you like to know?`;
      
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
        <div className="fixed bottom-24 right-6 z-50 w-[85vw] sm:w-96 h-[60vh] sm:h-[550px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <FaComment className="text-primary" />
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