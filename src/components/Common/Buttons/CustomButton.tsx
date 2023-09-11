import React from "react";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  textSize?: string;
  secondary?: boolean;
  underlineOnHover?: boolean;
  textColor?: string; // Add the textColor prop
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  color,
  textSize,
  secondary,
  underlineOnHover,
  textColor,
}) => {
  const buttonStyle = {
    background:
      color || "bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500",
    textDecoration: underlineOnHover ? "underline" : "none",
    color: textColor || "text-white", // Set the text color
  };

  const buttonClass = `font-semibold py-2 px-4 rounded-full hover:brightness-90 transition-transform transform active:scale-95 ${
    textSize || "text-xs sm:text-md"
  } ${buttonStyle.background} ${buttonStyle.color}`;

  return (
    <button
      className={secondary ? `text-gray-800 ${buttonClass}` : buttonClass}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
