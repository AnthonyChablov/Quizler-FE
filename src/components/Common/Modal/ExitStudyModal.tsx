import React from 'react';
import Modal from './Modal';
import CloseButton from '../Buttons/CloseButton';
import { Question } from '@/models/quizzes';

interface ExitStudyModalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProgress: () => void; // Function to save progress
  onDontSaveProgress: () => void;
}

const ExitStudyModal = ({
  isOpen,
  onClose,
  onSaveProgress, // Add onSaveProgress prop
  onDontSaveProgress,
}: ExitStudyModalModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-semibold">Exit Quiz</h2>
          <CloseButton onClick={onClose} />
        </div>
        <p className="text-gray-700">
          Do you want to save your progress before leaving?
        </p>
        <div className="flex flex-col justify-end mt-4 space-y-2 ">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors w-52 mx-auto"
          >
            Cancel
          </button>
          <button
            onClick={onSaveProgress}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 w-52 mx-auto
            to-purple-500 text-white px-4 py-2 rounded hover:from-indigo-600 hover:to-purple-600 transition-colors"
          >
            Save Progress
          </button>
          <button
            onClick={onDontSaveProgress}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors w-52 mx-auto"
          >
            Leave Without Saving
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExitStudyModal;
