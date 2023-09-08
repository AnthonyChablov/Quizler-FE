import React from 'react';

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, onClick }) => {
  return (
    <button
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 text-white
        hover:opacity-80 font-semibold py-2 px-4 rounded-full transition-transform transform active:scale-95
        text-xs sm:text-md"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
