import React, { useState } from 'react';

interface QuizPromptProps {
  onStartQuiz: () => void;
}

const QuizPrompt: React.FC<QuizPromptProps> = ({ onStartQuiz }) => {
  const [showPrompt, setShowPrompt] = useState(true);

  const handleStartQuiz = () => {
    setShowPrompt(false);
    onStartQuiz();
  };

  const handleRestartQuiz = () => {
    setShowPrompt(false);
    onStartQuiz();
  };

  return (
    <div>
      {showPrompt ? (
        <div>
          <p>Welcome to the Quiz! Are you ready?</p>
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      ) : (
        <div>
          <p>Do you want to restart the Quiz?</p>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizPrompt;
