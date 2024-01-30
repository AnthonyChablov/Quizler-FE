import React from 'react';
import { motion } from 'framer-motion';

interface AnswerButtonProps {
  label: string;
  onClick: () => void;
  answerState: 'correct' | 'incorrect' | null;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({
  label,
  onClick,
  answerState,
}) => {
  let buttonClassName =
    'text-white font-semibold py-2 px-4 rounded-lg text-md sm:text-md ';

  let gradientClassName = '';
  if (answerState === 'correct') {
    gradientClassName =
      'bg-gradient-to-r from-green-400 via-green-500 to-green-400';
  } else if (answerState === 'incorrect') {
    gradientClassName = 'bg-gradient-to-r from-red-400 via-red-500 to-red-400';
  } else {
    gradientClassName =
      'bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500';
  }

  buttonClassName += gradientClassName;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={buttonClassName}
      onClick={onClick}
    >
      {label}
    </motion.button>
  );
};

export default AnswerButton;
