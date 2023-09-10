import React from "react";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  textSize?: string; // Add the textSize prop
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  color,
  textSize,
}) => {
  const buttonStyle = {
    background:
      color || "bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500",
  };

  return (
    <button
      className={`text-white
        hover:opacity-80 font-semibold py-2 px-4 rounded-full transition-transform transform active:scale-95
        ${textSize || "text-xs sm:text-md"} ${buttonStyle.background}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
