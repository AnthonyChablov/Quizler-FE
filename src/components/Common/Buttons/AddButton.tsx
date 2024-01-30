import React from 'react';
import Icons from '../Icons';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500 hover:opacity-80
        text-whitefont-semibold hover:bg-opacity-80 text-white py-2 px-10 
        rounded flex flex-col-reverse items-center justify-center"
      onClick={onClick}
    >
      <p className="text-lg uppercase font-semibold">Add</p>
      <Icons type="add" size={30} color="" />
    </button>
  );
};

export default AddButton;
