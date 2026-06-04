/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldOpenChat, setShouldOpenChat] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
    setShouldOpenChat(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setShouldOpenChat(false);
  };

  const resetChatTrigger = () => {
    setShouldOpenChat(false);
  };

  return (
    <ChatContext.Provider value={{ 
      isChatOpen, 
      shouldOpenChat, 
      openChat, 
      closeChat, 
      resetChatTrigger 
    }}>
      {children}
    </ChatContext.Provider>
  );
};