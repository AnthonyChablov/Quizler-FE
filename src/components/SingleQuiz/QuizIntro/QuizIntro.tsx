import { useParams } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { restartQuiz } from "@/api/quizData";
import { useSWRConfig } from "swr";

const QuizIntro = () => {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz.toString();

  /* Optimistic updates using swr */
  const { mutate } = useSWRConfig();

  /* State */
  const { setDisplayQuiz } = useQuizStore();

  function handleStartQuiz() {
    setDisplayQuiz(true);
  }

  async function handleRestartProgress() {
    try {
      await restartQuiz(quizId);
      mutate(`https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`);
    } catch (error) {
      console.error("Error restarting progress:", error);
      // Handle the error or show a user-friendly message here
      alert(
        "An error occurred while restarting progress. Please try again later."
      );
    }
  }

  return (
    <div>
      <p>Click the button below to start the quiz.</p>
      <button onClick={() => handleStartQuiz()}>Start Quiz</button>
      <button onClick={handleRestartProgress}>Restart Progress</button>
    </div>
  );
};

export default QuizIntro;
