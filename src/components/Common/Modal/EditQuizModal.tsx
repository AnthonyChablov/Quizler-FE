import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { QuizModalProps } from './Modal';

const EditQuizModal = ({ quizId, isOpen, onClose }: QuizModalProps) => {
  const handleEditQuestion = async () => {
    try {
    } catch (error) {
      // Handle error if needed
      console.error('Error deleting quiz:', error);
    }
  };

  return <Modal isOpen={isOpen} onClose={onClose}></Modal>;
};

export default EditQuizModal;
