import { useParams, useRouter } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { restartQuiz } from "@/api/quizData";
import { useSWRConfig } from "swr";
import CustomButton from "@/components/Common/Buttons/CustomButton";

interface QuizIntro {
  quizTitle: string;
}

const QuizIntro = ({ quizTitle }: QuizIntro) => {
  /* Next Router */
  const router = useRouter();
  const params = useParams();
  const quizId = params.quiz.toString();

  /* Optimistic updates using SWR */
  const { mutate } = useSWRConfig();

  /* State */
  const { setDisplayQuiz } = useQuizStore();

  function handleStartQuiz() {
    setDisplayQuiz(true);
    router.push(`/dashboard/quiz/${quizId}/study`);
  }

  async function handleRestartProgress() {
    try {
      await restartQuiz(quizId);
      mutate(`https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`);
    } catch (error) {
      console.error("Error restarting progress:", error);
      // Handle the error or show a user-friendly message here
      alert(
        "An error occurred while restarting progress. Please try again later. 😞"
      );
    }
  }

  return (
    <div
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
    rounded-xl p-8 text-center text-white shadow-xl"
    >
      <h1 className="text-3xl font-bold mb-6">{quizTitle}! 🎉</h1>
      <p className="text-md mb-8">
        Test your knowledge by clicking the button below to start the quiz.
      </p>
      <div className="space-y-4 space-x-4">
        <CustomButton
          label={"Start Quiz 🚀"}
          onClick={handleStartQuiz}
          color="bg-white"
          textSize="text-sm sm:text-md md:text-lg"
          textColor="text-purple-600"
        />
        <CustomButton
          label={"Restart Progress 🔁"}
          onClick={handleRestartProgress}
          textSize="text-sm sm:text-md md:text-lg"
          color="none"
          underlineOnHover={true}
          secondary={true}
        />
      </div>
    </div>
  );
};

export default QuizIntro;
