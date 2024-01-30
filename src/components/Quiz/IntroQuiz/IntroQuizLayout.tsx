'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '../../Common/Container';
import LoadingLayout from '../../Loading/LoadingLayout';
import { fetchData } from '@/api/quizData';
import useSWR from 'swr';
import { restartQuiz } from '@/api/quizData';
import { QuizData } from '@/models/quizzes';
import QuizHeader from '../../Common/Header/QuizHeader';
import QuizInfoDisplay from '../QuizComponents/QuizInfoDisplay/QuizInfoDisplay';
import ColorDot from '../QuizComponents/ColorDot/ColorDot';
import { Question } from '@/models/quizzes';
import { motion, AnimatePresence } from 'framer-motion';
import { mutate } from 'swr';
import Icons from '@/components/Common/Icons';
import { useQuizStore } from '@/store/useQuizStore';
import { API_BASE_URL } from '@/api/baseApiUrl';

const IntroQuizLayout = () => {
  /* Extract URL Params */
  const params = useParams();
  const quizId = params.quiz.toString();
  const router = useRouter();

  /* State */
  const { setDisplayQuiz } = useQuizStore();

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

  /* Variables */
  const finalScore = score.correct - score.incorrect;

  /* Functions */
  function toggleQuestionsVisibility() {
    setIsQuestionsVisible((prev) => !prev);
  }
  function handleStartQuiz() {
    setDisplayQuiz(true);
    router.push(`/dashboard/quiz/${quizId}/study`);
  }
  async function handleRestartProgress() {
    try {
      await restartQuiz(quizId);
      mutate(`${API_BASE_URL}/quizzes/${quizId}`);
    } catch (error) {
      console.error('Error restarting progress:', error);
      // Handle the error or show a user-friendly message here
      alert(
        'An error occurred while restarting progress. Please try again later. 😞',
      );
    }
  }

  /* Loading Isvalidating State */
  if (isValidating || isLoading) {
    return <LoadingLayout />;
  }
  /* Error State */
  if (error) {
    return <div>Error fetching data intor</div>;
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
              <QuizInfoDisplay
                quizTitle={data?.quizTitle}
                quizText="Test your knowledge by clicking the button below to start the quiz."
                primaryButtonLabel="Start Quiz 🚀"
                onPrimaryButtonClick={handleStartQuiz}
                secondaryButtonLabel="Restart Progress 🔁"
                onSecondaryButtonClick={handleRestartProgress}
              />
              <div className="py-8 px-5 bg-slate-50 p-5 rounded-b-xl shadow-xl">
                <div
                  className={`flex justify-between items-center mb-4 ${
                    isQuestionsVisible ? 'mb-4' : 'mb-0'
                  }`}
                >
                  <h2 className="text-lg md:text-xl font-semibold">
                    {isQuestionsVisible ? 'Questions' : 'Show Questions'}
                  </h2>
                  <button onClick={toggleQuestionsVisibility}>
                    {isQuestionsVisible ? (
                      <Icons size={22} type="minus" color="black" />
                    ) : (
                      <Icons type="plus" size={22} color="black" />
                    )}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {isQuestionsVisible && (
                    <motion.div
                      key="questions"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Mapping through questions and rendering dots */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6  ">
                        {data.questions.map(
                          (question: Question, index: number) => (
                            <div
                              key={question._id}
                              className="flex items-center bg-white p-4 rounded-lg shadow-lg mb-4"
                            >
                              <ColorDot isCorrect={question.isCorrect} />
                              <div className="flex flex-col ml-4 ">
                                <p className="text-lg font-semibold w-44 truncate">
                                  {index + 1}. {question?.questionTitle}
                                </p>
                                <p className="text-gray-600">
                                  {question.isCorrect ? 'Correct' : 'Incorrect'}
                                </p>
                              </div>
                            </div>
                          ),
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
