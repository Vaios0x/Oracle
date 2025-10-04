'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SuperIntelligenceChat } from './SuperIntelligenceChat';

export function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-gray-700 rounded-full shadow-2xl flex items-center justify-center group border border-gray-600/30 mobile-touch"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 sm:w-8 sm:h-8"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
        
        {/* Pulse Effect */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-blue-500 rounded-full"
        />
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-1 sm:mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <div className="bg-gray-800 text-gray-100 text-xs px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg whitespace-nowrap border border-gray-700/50 mobile-text-xs">
            SuperIntelligence AI
            <div className="absolute top-full right-3 sm:right-4 w-0 h-0 border-l-3 sm:border-l-4 border-r-3 sm:border-r-4 border-t-3 sm:border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <SuperIntelligenceChat 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
