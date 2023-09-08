import { useParams } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { restartQuiz } from "@/api/quizData";

const QuizIntro: React.FC = () => {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz.toString();

  /* State */
  const { setDisplayQuiz } = useQuizStore();

  function handleStartQuiz() {
    setDisplayQuiz(true);
  }

  function handleRestartProgress() {
    restartQuiz(quizId);
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
