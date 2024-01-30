'use client';
import React, { useState, useEffect } from 'react';
import Container from '@/components/Common/Container';
import useSWR, { mutate } from 'swr';
import { throttle } from 'lodash';
import { QuizData } from '@/models/quizzes';
import { Question } from '@/models/quizzes';
import { Answer } from '@/models/quizzes';
import { fetchData } from '@/api/quizData';
import { useParams, useRouter, usePathname } from 'next/navigation';
import ExitStudyModal from '@/components/Common/Modal/ExitStudyModal';
import { useFormattedQuestions } from '@/hooks/useFormattedQuestion';
import QuizHeader from '@/components/Common/Header/QuizHeader';
import PrimaryCard from '@/components/Common/Cards/PrimaryCard';
import AnswerButton from '@/components/Common/Buttons/AnswerButton';
import { updateStudyResults } from '@/api/quizData';
import LoadingLayout from '@/components/Loading/LoadingLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonVariants } from '@/variants/variants';
import { useModalStore } from '@/store/useModalStore';
import { Suspense } from 'react';
import { NavigationEvents } from '@/hooks/NavigationEvents';
import QuizTimer from '../QuizComponents/QuizTimer/QuizTimer';
import { API_BASE_URL } from '@/api/baseApiUrl';

const StudyingQuizLayout = () => {
  /* Optimistic updates using swr */
  const router = useRouter();
  /* Extract URL Params */
  const params = useParams();
  const quizId = params.quiz.toString();
  const pathname = usePathname();

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `${API_BASE_URL}/users/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 700000,
    },
  );

  /* State */
  // Keeps track of the current question index in the quiz.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // This is what moves on to the next question
  // Stores the index of the selected answer for the current question or null if none is selected.
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  // Stores an array of question IDs that have been answered correctly.
  const [correctQuestionIDs, setCorrectQuestionIDs] = useState<string[]>([]);
  // Keeps track of the score in the quiz, including the number of correct and incorrect answers.
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });
  // Stores an array of quiz questions.
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  // Tracks whether a button has been clicked (e.g., Next Question button) to prevent rapid clicks.
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  // Used to identify the first render of the component and avoid certain effects on the initial render.
  const [firstRender, setFirstRender] = useState(true);
  const { isExitStudyModeModalOpen, toggleExitStudyModeModal } =
    useModalStore();

  /* Variables */
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isEndOfQuiz = currentQuestionIndex === quizQuestions.length;
  const finalScore = score.correct - score.incorrect;
  const questions = useFormattedQuestions(currentQuestion || null);

  const throttledHandleAnswerClick = throttle(
    function handleAnswerClick(isCorrect: boolean, answerIndex: number) {
      if (buttonClicked) {
        return;
      }
      setSelectedAnswerIndex(answerIndex);
      setScore((prevScore) => ({
        ...prevScore,
        correct: isCorrect ? prevScore.correct + 1 : prevScore.correct,
      }));

      if (isCorrect) {
        // Access the _id property from the current question
        const questionId = currentQuestion?._id;
        if (questionId) {
          setCorrectQuestionIDs((prevIds) => [...prevIds, questionId]);
        }
      }

      setButtonClicked(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswerIndex(null);
        setButtonClicked(false);
      }, 1000);
    },
    400,
    { trailing: false },
  );
  const updateResults = async () => {
    try {
      const response = await updateStudyResults(quizId, correctQuestionIDs);
      mutate(`${API_BASE_URL}/quizzes/${quizId}`);
      console.log('Study results updated successfully:', response);
    } catch (error) {
      console.error('Error updating study results:', error);
    }
  };

  const onDontSaveProgress = () => {
    toggleExitStudyModeModal(false);
    router.push(`/dashboard/`);
  };

  const onSaveProgress = async () => {
    try {
      await updateResults();
      toggleExitStudyModeModal(false);
      router.push(`/dashboard/`);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  function endOfQuiz() {
    updateResults();
    router.push(`/dashboard/quiz/${quizId}/completed`);
  }

  useEffect(() => {
    if (data) {
      const filteredQuestions = data.questions.filter(
        (question) => question.isCorrect === false,
      );
      setQuizQuestions(filteredQuestions);
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (firstRender) {
      // Skip the effect on the first render
      setFirstRender(false);
      return;
    }
    if (isEndOfQuiz) {
      endOfQuiz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEndOfQuiz,
    quizQuestions,
    currentQuestionIndex,
    quizId,
    correctQuestionIDs,
  ]);

  // State to control the key for the answers animation
  const [answersAnimationKey, setAnswersAnimationKey] = useState(0);

  useEffect(() => {
    // Whenever you want to retrigger the animations (e.g., when moving to the next question), update the key
    setAnswersAnimationKey((prevKey) => prevKey + 1);
  }, [currentQuestionIndex]);

  /* Loading Isvalidating State */
  if (isValidating || isLoading) {
    return <LoadingLayout />;
  }
  /* Error State */
  if (error) {
    return <div>Error fetching data study</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-slate-200 h-full min-h-screen pb-32"
    >
      <ExitStudyModal
        isOpen={isExitStudyModeModalOpen}
        onClose={() => toggleExitStudyModeModal(false)}
        onSaveProgress={() => {
          onSaveProgress();
        }}
        onDontSaveProgress={() => {
          onDontSaveProgress();
        }}
      />
      <Suspense fallback={null}>
        <NavigationEvents />
      </Suspense>
      <Container>
        {data && (
          <Container>
            <QuizHeader
              headerText={data?.quizTitle}
              score={finalScore}
              displayScore={true}
              link={`/dashboard/quiz/${quizId}`}
              mode={'study'}
            />
            <QuizTimer
              durationInSeconds={900}
              onTimeout={() => {
                endOfQuiz();
              }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              {/* Question */}
              <AnimatePresence mode="wait">
                {currentQuestion && (
                  <motion.div
                    key={currentQuestion._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  >
                    <PrimaryCard
                      question={`${currentQuestionIndex + 1}. ${
                        currentQuestion.questionTitle
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Answers */}
              <motion.div
                key={answersAnimationKey} // Use the key to re-render the answers with new animations
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="mt-8 flex flex-col space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 "
              >
                {questions.map((answer: Answer, index: number) => (
                  <motion.div
                    key={index}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden" // Added exit animation
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <AnswerButton
                      label={answer.answerText}
                      onClick={() =>
                        throttledHandleAnswerClick(answer.isCorrect, index)
                      }
                      answerState={
                        selectedAnswerIndex === index
                          ? answer.isCorrect
                            ? 'correct'
                            : 'incorrect'
                          : null
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        )}
      </Container>
    </motion.div>
  );
};

export default StudyingQuizLayout;
