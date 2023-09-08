import { QuizData } from "@/models/quizzes";

export function countCorrectQuestions(
  quizData: QuizData | undefined
): number | undefined {
  // Count the number of correct questions
  return quizData?.questions.reduce(
    (count, question) => (question.isCorrect ? count + 1 : count),
    0
  );
}
