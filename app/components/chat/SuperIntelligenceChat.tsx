'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassButton } from '@/components/ui/GlassButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { NeuralGradient } from '@/components/ui/NeuralGradient';
import { aiService } from '@/services/aiService';
import { QuickQuestions } from './QuickQuestions';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface SuperIntelligenceChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuperIntelligenceChat({ isOpen, onClose }: SuperIntelligenceChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '¡Hola! Soy tu asistente de superinteligencia experto en Oracle y mercados de predicción. Estoy actualizado hasta octubre 2025 y puedo ayudarte con cualquier consulta sobre DeFi, Solana, mercados de predicción, y mucho más. ¿En qué puedo asistirte?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      // Usar el servicio de IA avanzado
      const response = await aiService.generateResponse(userMessage);
      
      // Simular delay de procesamiento realista
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
      
      return response.content;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return `Lo siento, hubo un error al procesar tu consulta con mi sistema de inteligencia artificial. Por favor, reformula tu pregunta o inténtalo de nuevo.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await generateResponse(inputValue);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu consulta. Por favor, inténtalo de nuevo.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 mobile-p-2 mobile-chatbot"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Container */}
      <GlassCard
        variant="neural"
        neural 
        glow 
        floating
        className="relative w-full max-w-sm sm:max-w-md h-[400px] sm:h-[500px] flex flex-col mobile-card mobile-chatbot"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 sm:p-4 border-b border-gray-200/20 mobile-p-2">
          <div className="flex items-center gap-2 sm:gap-3 mobile-gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-100 mobile-text-xs">SuperIntelligence AI</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-full p-1 sm:p-2 transition-all duration-200 text-lg sm:text-xl font-bold mobile-touch"
            title="Cerrar chatbot"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 mobile-p-2 mobile-gap-2 mobile-chatbot-messages">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-xl sm:rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500/20 text-gray-100 border border-blue-500/30'
                    : 'bg-gray-800/50 text-gray-200 border border-gray-700/50'
                } mobile-p-2`}
              >
                <div className="whitespace-pre-wrap text-xs sm:text-sm mobile-text-xs">
                  {message.content}
                </div>
                <div className="text-xs opacity-60 mt-1 mobile-text-xs">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-800/50 text-gray-200 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-gray-700/50 mobile-p-2">
                <div className="flex items-center gap-1 sm:gap-2 mobile-gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs sm:text-sm mobile-text-xs">Pensando...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Quick Questions - Solo mostrar si no hay mensajes del usuario */}
          {messages.length === 1 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <QuickQuestions onQuestionClick={(question) => setInputValue(question)} />
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-2 sm:p-4 border-t border-gray-200/20 mobile-p-2">
          <div className="flex gap-1 sm:gap-2 mobile-gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu consulta aquí..."
              className="flex-1 bg-gray-800/30 border border-gray-600/30 rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-colors text-xs sm:text-sm mobile-input mobile-touch mobile-chatbot-input"
              disabled={isTyping}
            />
            <GlassButton
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              variant="neural"
              size="sm"
              className="mobile-btn mobile-touch mobile-chatbot-button"
            >
              <span className="hidden sm:inline">Enviar</span>
              <span className="sm:hidden">→</span>
            </GlassButton>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
