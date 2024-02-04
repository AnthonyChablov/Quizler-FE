// @ts-nocheck
import React, { useState } from 'react';
import { addQuestion } from '@/api/questionData';
import { useSWRConfig } from 'swr';
import { Question } from '@/models/quizzes';
import Modal from './Modal';
import Icons from '../Icons';
import CloseButton from '../Buttons/CloseButton';
// import { API_BASE_URL } from '@/api/baseApiUrl';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_LOCAL;

interface AddQuizModalProps {
  quizId: string;
  isOpen: boolean;
  onClose: () => void;
}

const AddQuestionModal = ({ quizId, isOpen, onClose }: AddQuizModalProps) => {
  /* State */
  const [questionData, setQuestionData] = useState<Question>({
    _id: quizId,
    questionTitle: '',
    correct_answer: '',
    incorrect_answers: ['', '', ''], // Initialize with 3 empty strings
  });

  /* Optimistic updates using swr */
  const { mutate } = useSWRConfig();

  const handleInputChange = (inputName: string, value: string | string[]) => {
    setQuestionData({ ...questionData, [inputName]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addQuestion(quizId, questionData);
      mutate(`${API_BASE_URL}/quizzes/${quizId}`);
      onClose();
    } catch (error) {
      // Handle error
      console.error('Error adding question:', error);
    }
  };

  // Component UI
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" flex items-start justify-between">
        <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
        <CloseButton onClick={onClose} />
      </div>
      <form onSubmit={handleSubmit}>
        {/* Question Title */}
        <input
          type="text"
          placeholder="Question Title"
          value={questionData.questionTitle}
          onChange={(e) => handleInputChange('questionTitle', e.target.value)}
          className="mb-2 p-2 border rounded-lg w-full"
        />

        {/* Question Type */}
        {/* <select
          value={questionData.correct_answer === 'True' ? 'truefalse' : 'other'}
          onChange={(e) => {
            if (e.target.value === 'truefalse') {
              setQuestionData({
                ...questionData,
                correct_answer: 'True',
                incorrect_answers: ['False'],
              });
            } else {
              setQuestionData({
                ...questionData,
                correct_answer: '',
                incorrect_answers: ['', '', ''],
              });
            }
          }}
          className="mb-2 p-2 border rounded-lg w-full"
        >
          <option value="truefalse">True/False</option>
          <option value="other">Other</option>
        </select> */}

        {/* Correct Answer */}
        <input
          type="text"
          placeholder="Correct Answer"
          value={questionData.correct_answer}
          onChange={(e) => handleInputChange('correct_answer', e.target.value)}
          className="mb-2 p-2 border rounded-lg w-full"
          disabled={questionData.correct_answer === 'True'}
        />

        {/* Incorrect Answers */}
        {questionData.incorrect_answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Answer ${index + 1}`}
            value={answer}
            onChange={(e) => {
              const newIncorrectAnswers = [...questionData.incorrect_answers];
              newIncorrectAnswers[index] = e.target.value; // Assign the new value to the correct index
              handleInputChange('incorrect_answers', newIncorrectAnswers);
            }}
            className="mb-2 p-2 border rounded-lg w-full"
            disabled={questionData.correct_answer === 'True'}
          />
        ))}

        {questionData.incorrect_answers.length < 3 &&
          questionData.correct_answer !== 'True' && (
            <button
              type="button"
              onClick={() =>
                setQuestionData({
                  ...questionData,
                  incorrect_answers: [...questionData.incorrect_answers, ''],
                })
              }
              className="mb-2 bg-gray-300 py-1 px-2 rounded"
            >
              Add Answer
            </button>
          )}

        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 
            to-purple-500 text-white py-2 px-4 rounded"
        >
          Add Questions
        </button>
      </form>
    </Modal>
  );
};

export default AddQuestionModal;
