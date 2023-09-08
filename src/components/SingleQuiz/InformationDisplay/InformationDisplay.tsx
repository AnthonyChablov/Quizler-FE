import React from 'react';
import Icons from '@/components/Common/Icons';
import { useQuizStore } from '@/store/useQuizStore';

interface InformationDisplayProps {
  mode?: 'toLearn' | 'regular';
}

const InformationDisplay: React.FC<InformationDisplayProps> = ({ mode }) => {

  /* State */
  const isHelpOpen = useQuizStore((state) => state.isHelpOpen);
  const toggleHelp = useQuizStore((state) => state.toggleHelp);

  function onClickHandler() {
    toggleHelp(!isHelpOpen);
  }

  if (!isHelpOpen) {
    return null; // Don't render anything if isHelpOpen is false
  }
  return (
    <div className="bg-gray-100 p-8 rounded-lg position fixed top-20 w-full">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold mb-4">Start Quiz</h2>
        <button onClick={onClickHandler}>
          <Icons type='close' size={28} color='#7861f3'/>
        </button>
      </div>
      
      <p className="text-gray-600 mb-4">
        Welcome to the quiz! 
      </p>
      <div className="mode mb-6">
        <h3 className="text-xl font-semibold mb-2">Start Again?</h3>
        <p className="text-gray-700 mb-2">
          
        </p>
        {/* {mode === 'toLearn' && (
          <p className="text-indigo-700">Currently in To-Learn Mode</p>
        )} */}
      </div>
      <div className="mode">
        <h3 className="text-xl font-semibold mb-2">Regular Mode</h3>
        
        {/* {mode === 'regular' && (
          <p className="text-indigo-600">Currently in Regular Mode</p>
        )} */}
      </div>
    </div>
  );
}

export default InformationDisplay;
