import React from "react";

interface ScoreProps {
  score: number;
  percentage: number;
}

const Score: React.FC<ScoreProps> = ({ score, percentage }) => {
  const getScoreColor = () => {
    if (percentage >= 80) {
      return "text-green-600"; // Green for high score
    } else if (percentage >= 50) {
      return "text-yellow-600"; // Yellow for moderate score
    } else {
      return "text-red-600"; // Red for low score
    }
  };

  return (
    <div className="text-center bg-slate-50 rounded-md p-4 shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-black">Quiz Score</h2>
      <div className="mb-2">
        <span className="text-gray-600">Your Score:</span>{" "}
        <span className={`font-bold ${getScoreColor()}`}>{score}</span>
      </div>
      <div className="mb-4">
        <span className="text-gray-600">Percentage Correct:</span>{" "}
        <span className={`font-bold ${getScoreColor()}`}>{percentage}%</span>
      </div>
      <p className="text-gray-700">
        {percentage >= 80
          ? "Great job! You did excellent!"
          : percentage >= 50
          ? "Not bad! You're doing well."
          : "Keep practicing! You can do better."}
      </p>
    </div>
  );
};

export default Score;
