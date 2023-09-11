// Import necessary modules

import { useEffect, useState } from "react"; // Import React's 'useEffect' and 'useState' hooks for managing state and side effects.
import { shuffleArray } from "@/utils/shuffleArray"; // Import a function for shuffling arrays.
import { Answer, Question } from "@/models/quizzes"; // Import data models 'Answer' and 'Question' from a specific location.

// Define a custom hook called useFormattedQuestions
export function useFormattedQuestions(currentQuestion: Question | null) {
  // Initialize state variable 'questions' using useState
  const [questions, setQuestions] = useState<Answer[]>([]); // 'questions' is a state variable that will hold an array of 'Answer' objects.

  // Use useEffect to run code when 'currentQuestion' changes
  useEffect(() => {
    // Check if 'currentQuestion' is not null
    if (currentQuestion) {
      // Create an array of formatted answers
      const formattedAnswers: Answer[] = [
        // Map incorrect answers to objects with 'answerText' and 'isCorrect' properties
        ...currentQuestion.incorrect_answers.map((answer: string) => ({
          answerText: answer, // 'answerText' is a string representing an answer text.
          isCorrect: false, // 'isCorrect' is a boolean indicating whether the answer is correct or not.
        })),
        {
          answerText: currentQuestion.correct_answer, // Add the correct answer to the array
          isCorrect: true, // Set 'isCorrect' to true for the correct answer.
        },
      ];

      // Shuffle the array of formatted answers
      setQuestions(shuffleArray(formattedAnswers)); // 'setQuestions' updates the 'questions' state variable with a shuffled array of answers.
    }
  }, [currentQuestion]);

  return questions; // Return the formatted and shuffled array of questions.
}
