import React, { useState } from 'react';
import { QuizModalProps } from './Modal';
import { useSWRConfig } from 'swr';
import Modal from './Modal';
import { renameQuiz } from '@/api/quizData';
import CloseButton from '../Buttons/CloseButton';
import { useNotificationStore } from '@/store/useNotificationStore';
// import { API_BASE_URL } from '@/api/baseApiUrl';
const API_BASE_URL = process.env.API_BASE_LOCAL;

export const RenameQuizModal = ({
  quizId,
  isOpen,
  onClose,
}: QuizModalProps) => {
  /* State */
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState<string | null>(null); // Explicitly define the type
  const { setNotificationMode, toggleIsNotificationOpen } =
    useNotificationStore();

  /* Optimistic updates using swr */
  const { mutate } = useSWRConfig();

  const handleRename = async (id: string, title: string) => {
    try {
      await renameQuiz(id, title); // Assuming renameQuiz returns a promise or can be awaited
      toggleIsNotificationOpen(true);
      setNotificationMode('error');
      mutate(`${API_BASE_URL}/quizzes/${quizId}`);
      onClose();
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setError(null); // Clear error when closing the modal
        onClose();
      }}
    >
      <div>
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-4">Rename Quiz</h2>
          <CloseButton onClick={onClose} />
        </div>
        <input
          type="text"
          placeholder="New Quiz Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border rounded p-2 mb-4 w-full"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          className="bg-red-500 text-white px-4 py-2 mt-4"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 ml-4"
          onClick={() => handleRename(quizId, newTitle)}
        >
          Rename
        </button>
      </div>
    </Modal>
  );
};
