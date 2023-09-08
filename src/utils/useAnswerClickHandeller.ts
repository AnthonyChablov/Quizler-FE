import { useState } from 'react';

type SetScoreFunction = React.Dispatch<
  React.SetStateAction<{ correct: number; incorrect: number }>
>;
type SetCurrentQuestionIndexFunction = React.Dispatch<React.SetStateAction<number>>;
type SetSelectedAnswerIndexFunction = React.Dispatch<React.SetStateAction<number | null>>;

export function useAnswerClickHandler(
  setScore: SetScoreFunction,
  setCurrentQuestionIndex: SetCurrentQuestionIndexFunction,
  setSelectedAnswerIndex: SetSelectedAnswerIndexFunction
) {
  return function handleAnswerClick(isCorrect: boolean, answerIndex: number) {
    setSelectedAnswerIndex(answerIndex);
    setScore((prevScore) => ({
      ...prevScore,
      correct: isCorrect ? prevScore.correct + 1 : prevScore.correct,
      incorrect: isCorrect ? prevScore.incorrect : prevScore.incorrect + 1,
    }));
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswerIndex(null);
    }, 1500);
  };
}
