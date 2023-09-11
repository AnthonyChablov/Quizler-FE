// components/CustomButtonGroup.tsx

import React, { ReactNode } from "react";

interface CustomButtonGroupProps {
  children: ReactNode;
  activeButtonIndex: number;
  onButtonClick: (index: number) => void;
}

const CustomButtonGroup: React.FC<CustomButtonGroupProps> = ({
  children,
  activeButtonIndex,
  onButtonClick,
}) => {
  return (
    <div className="flex">
      {React.Children.map(children, (child, index) => {
        const isActive = index === activeButtonIndex;
        return (
          <button
            onClick={() => onButtonClick(index)}
            className={`${
              isActive ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-l focus:outline-none`}
          >
            {child}
          </button>
        );
      })}
    </div>
  );
};

export default CustomButtonGroup;
