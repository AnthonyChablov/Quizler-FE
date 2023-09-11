"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Container from "../../Common/Container";
import LoadingLayout from "../../Loading/LoadingLayout";
import { fetchData } from "@/api/quizData";
import useSWR from "swr";
import PrimaryCard from "../../Common/Cards/PrimaryCard";
import { QuizData } from "@/models/quizzes";
import QuizHeader from "../../Common/Header/QuizHeader";
import QuizIntro from "../QuizComponents/QuizIntro/QuizIntro";
import ColorDot from "../QuizComponents/ColorDot/ColorDot";
import { Question } from "@/models/quizzes";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "@/components/Common/Buttons/PrimaryButton";

const IntroQuizLayout = () => {
  /* Extract URL Params */
  const params = useParams();
  const quizId = params.quiz.toString();

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* State */
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });
  const [isQuestionsVisible, setIsQuestionsVisible] = useState(true);

  /* Variables */
  const finalScore = score.correct - score.incorrect;
  const toggleQuestionsVisibility = () => {
    setIsQuestionsVisible((prev) => !prev);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  /* Loading Isvalidating State */
  if (isValidating || isLoading) {
    return <LoadingLayout />;
  }
  /* Error State */
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="bg-slate-200 h-full min-h-screen pb-32 ">
      <Container>
        {data && (
          <Container>
            <QuizHeader
              headerText={data?.quizTitle}
              score={finalScore}
              displayScore={true}
              link="/dashboard"
            />
            <div className="mt-8">
              <QuizIntro quizTitle={data?.quizTitle} />
              <div className="py-8 px-8 bg-slate-50 p-5 rounded-b-xl shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {isQuestionsVisible ? "Questions" : "Show Questions"}
                  </h2>
                  <PrimaryButton
                    label={isQuestionsVisible ? "- Minimize " : " + Maximize "}
                    onClick={toggleQuestionsVisibility}
                    textSize="text-sm md:text-md"
                  />
                </div>
                <AnimatePresence initial={false}>
                  {isQuestionsVisible && (
                    <motion.div
                      key="questions"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Mapping through questions and rendering dots */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
                        {data.questions.map(
                          (question: Question, index: number) => (
                            <div
                              key={question._id}
                              className="flex items-center bg-white p-4 rounded-lg shadow-lg mb-4"
                            >
                              <ColorDot isCorrect={question.isCorrect} />
                              <div className="flex flex-col ml-4 w-auto truncate">
                                <p className="text-lg font-semibold">
                                  {index + 1}. {question?.questionTitle}
                                </p>
                                <p className="text-gray-600">
                                  {question.isCorrect ? "Correct" : "Incorrect"}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default IntroQuizLayout;
