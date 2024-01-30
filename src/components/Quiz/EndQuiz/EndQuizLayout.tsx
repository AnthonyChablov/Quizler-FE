'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetchData } from '@/api/quizData';
import { QuizData } from '@/models/quizzes';
import { useParams, useRouter } from 'next/navigation';
import Container from '../../Common/Container';
import QuizHeader from '../../Common/Header/QuizHeader';
import LoadingLayout from '../../Loading/LoadingLayout';
import Score from '../QuizComponents/Score/Score';
import { Question } from '@/models/quizzes';
import QuizInfoDisplay from '../QuizComponents/QuizInfoDisplay/QuizInfoDisplay';
import Icons from '@/components/Common/Icons';
import { motion, AnimatePresence } from 'framer-motion'; // Import animation components
import ColorDot from '../QuizComponents/ColorDot/ColorDot';
import { API_BASE_URL } from '@/api/baseApiUrl';

const EndQuizLayout = () => {
  /* Extract URL Params and Router */
  const params = useParams();
  const quizId = params.quiz.toString();
  const router = useRouter();

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `${API_BASE_URL}/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    },
  );

  /* State */
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });
  const [isQuestionsVisible, setIsQuestionsVisible] = useState(true);
  // State to track the visibility of correct answers for each question
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<boolean[]>(
    data?.questions.map(() => false) || [],
  );

  /* Functions */
  function onPrimaryButtonClick() {
    router.push(`/dashboard/quiz/${quizId}`);
  }

  function onSecondaryButtonClick() {
    router.push(`/dashboard/quiz/${quizId}`);
  }
  // Function to toggle the visibility of correct answers for a specific question
  function toggleCorrectAnswerVisibility(index: number) {
    setShowCorrectAnswers((prev) => {
      const newVisibility = [...prev];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  }

  useEffect(() => {
    if (data) {
      // Count how many questions have isCorrect set to true
      const correctQuestionsCount = data.questions.reduce(
        (count, question) => (question.isCorrect ? count + 1 : count),
        0,
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
    return <div>Error fetching data end</div>;
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
                  percentage: Math.round(
                    (score.correct / data?.questions.length) * 100,
                  ),
                }}
              />
              <div className="py-8 px-5 bg-slate-50 p-5 rounded-b-xl shadow-xl">
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Mapping through questions and rendering dots and question cards  */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6  ">
                    {data.questions.map((question: Question, index: number) => (
                      <motion.div
                        key={question._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center bg-white p-4 rounded-lg shadow-lg mb-4 justify-between"
                      >
                        <div className="flex flex-col ml-4 flex-grow">
                          <div className="flex items-center space-x-3 truncate">
                            <ColorDot isCorrect={question.isCorrect} />
                            {/* top */}
                            <div className="flex flex-col flex-grow ">
                              <div className="flex-grow w-2 md:w-32">
                                {/* I want to truncate this div  */}
                                <div className="flex flex-col ">
                                  <p className="text-md font-semibold mr-2  ">
                                    {question?.questionTitle}
                                  </p>
                                  <p className="text-gray-600 text-md">
                                    {question.isCorrect
                                      ? 'Correct'
                                      : 'Incorrect'}
                                  </p>
                                </div>
                              </div>
                              {/* Display correct answer when visibility is true */}
                              {showCorrectAnswers[index] && (
                                <div className="flex flex-col sm:flex-row">
                                  <p className="text-green-500">Correct : </p>
                                  <p className="text-green-500">
                                    {question?.correct_answer}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Button to toggle visibility of correct answer */}
                        <button
                          className={`text-blue-500 mt-2 h-full flex items-start ${
                            showCorrectAnswers[index] ? '' : 'h-10'
                          }`}
                          onClick={() => toggleCorrectAnswerVisibility(index)}
                        >
                          {showCorrectAnswers[index] ? (
                            <Icons type="hide" size={30} color="#7861f3" />
                          ) : (
                            <Icons type="show" size={30} color="#7861f3" />
                          )}
                        </button>
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
