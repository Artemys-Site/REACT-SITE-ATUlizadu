import { useState } from 'react';
import './ChatBotButton.css';
import imagemArty from '../assets/imagemArty.png';
import ChatIA from '../pages/ChatIA';

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        className={`chatbot-button ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Abrir chat com Arty IA"
      >
        <img src={imagemArty} alt="Arty IA" className="chatbot-button-icon" />
        {!isOpen && <span className="chatbot-pulse"></span>}
      </button>

      {/* Modal do Chat */}
      {isOpen && (
        <div className="chatbot-modal-overlay" onClick={toggleChat}>
          <div className="chatbot-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="chatbot-modal-header">
              <div className="chatbot-header-info">
                <img src={imagemArty} alt="Arty IA" className="chatbot-header-avatar" />
                <div>
                  <h3 className="chatbot-header-title">Arty IA</h3>
                  <p className="chatbot-header-subtitle">Assistente Virtual Artemys</p>
                </div>
              </div>
              <button
                className="chatbot-close-button"
                onClick={toggleChat}
                aria-label="Fechar chat"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="chatbot-modal-body">
              <ChatIA onClose={toggleChat} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotButton;

