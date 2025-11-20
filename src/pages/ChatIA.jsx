import { useState, useRef, useEffect } from 'react';
import './ChatIA.css';
import imagemArty from '../assets/imagemArty.png';
import perfilLogado from '../assets/perfilLogado.png';
import { generateAIResponse } from '../api/chatbotAI';

const ChatIA = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      text: 'OLÁ! EU SOU A ARTY, SUA ASSISTENTE VIRTUAL DA ARTEMYS. COMO POSSO AJUDAR SEU PET HOJE? 🐾',
      suggestions: []
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Função para enviar mensagem e obter resposta da IA
   */
  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessageText = messageText.trim();

    // Adiciona mensagem do usuário
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: userMessageText,
      suggestions: []
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setSuggestions([]);
    setIsLoading(true);

    // Adiciona mensagem de "digitando..."
    const typingMessage = {
      id: Date.now() + 1,
      type: 'ai',
      text: 'Digitando...',
      suggestions: [],
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Atualiza o histórico da conversa
      const updatedHistory = [
        ...conversationHistory,
        {
          role: 'user',
          content: userMessageText
        }
      ];

      // Chama a API para gerar resposta
      const aiResponse = await generateAIResponse(userMessageText, updatedHistory);

      // Remove a mensagem de "digitando..." e adiciona a resposta da IA
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [
          ...filtered,
          {
            id: Date.now() + 2,
            type: 'ai',
            text: aiResponse,
            suggestions: []
          }
        ];
      });

      // Atualiza o histórico da conversa
      setConversationHistory([
        ...updatedHistory,
        {
          role: 'assistant',
          content: aiResponse
        }
      ]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      // Remove a mensagem de "digitando..." e adiciona mensagem de erro
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isTyping);
        return [
          ...filtered,
          {
            id: Date.now() + 2,
            type: 'ai',
            text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
            suggestions: []
          }
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para enviar ao pressionar Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputMessage);
    }
  };

  // Função para usar sugestão
  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="chat-ia-container">
      {/* Banner */}
      <div className="chat-ia-banner">
        <h1 className="chat-ia-title">ARTY IA</h1>
      </div>

      {/* Área de mensagens */}
      <div className="chat-ia-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.type === 'ai' ? 'message-ai' : 'message-user'}`}
          >
            <div className="message-avatar">
              {message.type === 'ai' ? (
                <img src={imagemArty} alt="PetCare IA" className="avatar-ai" />
              ) : (
                <img src={perfilLogado} alt="Usuário" className="avatar-user" />
              )}
            </div>
            <div className="message-content">
              <div className={`message-bubble ${message.type === 'ai' ? 'bubble-ai' : 'bubble-user'} ${message.isTyping ? 'typing' : ''}`}>
                {message.isTyping ? (
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <p className="message-text">{message.text}</p>
                )}
              </div>
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="message-suggestions">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-button"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Sugestões ativas */}
        {suggestions.length > 0 && (
          <div className="active-suggestions">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-button"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Área de input */}
      <div className="chat-ia-input-container">
        <input
          ref={inputRef}
          type="text"
          className="chat-ia-input"
          placeholder="DIGITE SUA MENSAGEM..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="chat-ia-send-button"
          onClick={() => handleSendMessage(inputMessage)}
          disabled={!inputMessage.trim() || isLoading}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="send-icon"
          >
            <path
              d="M2 21L23 12L2 3V10L17 12L2 14V21Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatIA;

