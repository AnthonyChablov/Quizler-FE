import React from "react";

interface ScoreProps {
  score: number;
  percentage: number;
  onTryAgain: () => void;
}

const Score: React.FC<ScoreProps> = ({ score, onTryAgain, percentage }) => {
  return (
    <div className="text-center">
      <div className="mb-4"></div>
      <div className="mb-4">Your Score: {score}</div>
      <div className="mb-4">You got : {score}% correct.</div>
      <button
        onClick={onTryAgain}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Play Again
      </button>
    </div>
  );
};

export default Score;
