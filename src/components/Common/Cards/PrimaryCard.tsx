import React from 'react';

interface PrimaryCardProps {
  question: string;
}

const PrimaryCard: React.FC<PrimaryCardProps> = ({ question }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <h2 className="text-2xl font-semibold mb-4 capitalize">{question}</h2>
      {/* Add the rest of your component's content here */}
    </div>
  );
};

export default PrimaryCard;
