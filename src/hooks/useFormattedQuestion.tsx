import { useEffect, useState } from 'react';
import { shuffleArray } from '@/utils/shuffleArray';
import { Answer, Question } from '@/models/quizzes';

export function useFormattedQuestions(currentQuestion: Question | null) {

  const [questions, setQuestions] = useState<Answer[]>([]);

  useEffect(() => {
    if (currentQuestion) {
      const formattedAnswers: Answer[] = [
        ...currentQuestion.incorrect_answers.map((answer: string) => ({
          answerText: answer,
          isCorrect: false,
        })),
        {
          answerText: currentQuestion.correct_answer,
          isCorrect: true,
        },
      ];

      setQuestions(shuffleArray(formattedAnswers));
    }
  }, [currentQuestion]);

  return questions;
}
