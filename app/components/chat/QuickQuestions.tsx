'use client';

import { motion } from 'framer-motion';

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const quickQuestions = [
  "¿Cómo funciona Oracle?",
  "¿Qué es Solana?",
  "¿Cómo crear un mercado?",
  "¿Cuáles son las tendencias DeFi?",
  "¿Qué es un DAO?",
  "¿Cómo funciona la gobernanza?"
];

export function QuickQuestions({ onQuestionClick }: QuickQuestionsProps) {
  return (
    <div className="space-y-1 sm:space-y-2 mobile-gap-2">
      <div className="text-xs text-gray-400 mb-2 sm:mb-3 mobile-text-xs">Preguntas rápidas:</div>
      <div className="grid grid-cols-1 gap-1 sm:gap-2 mobile-grid-1 mobile-gap-2">
        {quickQuestions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onQuestionClick(question)}
            className="text-left p-1.5 sm:p-2 text-xs bg-gray-800/30 hover:bg-gray-700/40 rounded-md sm:rounded-lg transition-colors duration-200 text-gray-300 hover:text-gray-100 border border-gray-700/30 hover:border-gray-600/50 mobile-touch mobile-text-xs"
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
