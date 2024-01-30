import React from 'react';

interface SubHeaderProps {
  text: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  text,
  size = 'medium',
  color = 'gray',
}) => {
  let textSize = 'text-lg';
  if (size === 'small') {
    textSize = 'text-sm';
  } else if (size === 'large') {
    textSize = 'text-xl';
  }

  const textColor = `text-${color}-600`;

  return (
    <div className={`${textSize} font-semibold ${textColor} mb-4`}>{text}</div>
  );
};

export default SubHeader;
