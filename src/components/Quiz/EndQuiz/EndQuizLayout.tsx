"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchData } from "@/api/quizData";
import { QuizData } from "@/models/quizzes";
import { useParams, useRouter } from "next/navigation";
import Container from "../../Common/Container";
import QuizHeader from "../../Common/Header/QuizHeader";
import LoadingLayout from "../../Loading/LoadingLayout";
import Score from "../QuizComponents/Score/Score";
import { Question } from "@/models/quizzes";
import QuizInfoDisplay from "../QuizComponents/QuizInfoDisplay/QuizInfoDisplay";
import Icons from "@/components/Common/Icons";
import { motion, AnimatePresence } from "framer-motion"; // Import animation components
import ColorDot from "../QuizComponents/ColorDot/ColorDot";

const EndQuizLayout = () => {
  /* Extract URL Params and Router */
  const params = useParams();
  const quizId = params.quiz.toString();
  const router = useRouter();

  /* State */
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });
  const [isQuestionsVisible, setIsQuestionsVisible] = useState(true);

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* Functions */
  function toggleQuestionsVisibility() {
    setIsQuestionsVisible((prev) => !prev);
  }

  function onPrimaryButtonClick() {
    router.push(`/dashboard/quiz/${quizId}`);
  }

  function onSecondaryButtonClick() {
    router.push(`/dashboard/quiz/${quizId}`);
  }

  useEffect(() => {
    if (data) {
      // Count how many questions have isCorrect set to true
      const correctQuestionsCount = data.questions.reduce(
        (count, question) => (question.isCorrect ? count + 1 : count),
        0
      );
      setScore({
        correct: correctQuestionsCount,
        incorrect: data.questions.length - correctQuestionsCount,
      });

      console.log(data);
      console.log(correctQuestionsCount);
    }
  }, [data]);

  /* Loading Isvalidating State */
  if (isValidating || isLoading) {
    return <LoadingLayout />;
  }

  /* Error State */
  if (error) {
    return <div>Error fetching data</div>;
  }

  /* Render when data is available */
  if (data) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-slate-200 h-full min-h-screen pb-32 "
      >
        <Container>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <QuizHeader
              headerText={data?.quizTitle}
              score={score.correct - score.incorrect}
              displayScore={true}
              link={`/dashboard/quiz/${quizId}`}
            />
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mt-8">
              <QuizInfoDisplay
                quizTitle={`Congratulations`}
                quizText="You have successfully completed the quiz. You can review your performance and see your score below. Feel free to play the quiz again or go back to explore more quizzes and topics."
                primaryButtonLabel="Try Again 🚀"
                secondaryButtonLabel="Go Back 🏠"
                onPrimaryButtonClick={onPrimaryButtonClick}
                onSecondaryButtonClick={onSecondaryButtonClick}
                showScore={true} // Pass the condition to control the Score component
                scoreProps={{
                  score: score.correct,
                  onTryAgain: () => {
                    router.push(`/dashboard/quiz/${quizId}/`);
                  },
                  percentage: (score.correct / data?.questions.length) * 100,
                }}
              />
              <div className="py-8 px-5 bg-slate-50 p-5 rounded-b-xl shadow-xl">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Mapping through questions and rendering dots */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6  ">
                    {data.questions.map((question: Question, index: number) => (
                      <motion.div
                        key={question._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center bg-white p-4 rounded-lg shadow-lg mb-4"
                      >
                        <ColorDot isCorrect={question.isCorrect} />
                        <div className="flex flex-col ml-4 ">
                          <p className="text-lg font-semibold w-44 truncate">
                            {index + 1}. {question?.questionTitle}
                          </p>
                          <p className="text-gray-600">
                            {question.isCorrect ? "Correct" : "Incorrect"}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Container>
      </motion.div>
    );
  }

  // If data is not available, you can return a loading indicator or a fallback component.
  return <LoadingLayout />;
};

export default EndQuizLayout;
