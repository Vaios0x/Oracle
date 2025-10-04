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
    <div className="space-y-2">
      <div className="text-sm text-gray-400 mb-2">Preguntas rápidas:</div>
      <div className="grid grid-cols-1 gap-2">
        {quickQuestions.map((question, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onQuestionClick(question)}
            className="text-left p-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-300 hover:text-white border border-gray-700"
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
