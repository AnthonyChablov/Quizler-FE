import React from "react";

interface ColorDotProps {
  isCorrect: boolean;
}

const ColorDot: React.FC<ColorDotProps> = ({ isCorrect }) => {
  const dotColor = isCorrect ? "bg-green-500" : "bg-red-500";

  return <div className={`w-4 h-4 rounded-full ${dotColor} mr-2`}></div>;
};

export default ColorDot;
