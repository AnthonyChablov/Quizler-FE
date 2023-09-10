"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/Common/Container";
import useSWR, { mutate, useSWRConfig } from "swr";
import { throttle } from "lodash";
import { QuizData } from "@/models/quizzes";
import { Question } from "@/models/quizzes";
import { Answer } from "@/models/quizzes";
import { fetchData } from "@/api/quizData";
import { useParams, useRouter } from "next/navigation";
import { useQuizStore } from "@/store/useQuizStore";
import { useFormattedQuestions } from "@/hooks/useFormattedQuestion";
import { countCorrectQuestions } from "@/utils/countCorrectQuestions";
import QuizHeader from "@/components/Common/Header/QuizHeader";
import Score from "../QuizComponents/Score/Score";
import PrimaryButton from "@/components/Common/Buttons/PrimaryButton";
import PrimaryCard from "@/components/Common/Cards/PrimaryCard";
import AnswerButton from "@/components/Common/Buttons/AnswerButton";
import { updateStudyResults } from "@/api/quizData";
import LoadingLayout from "@/components/Loading/LoadingLayout";

const StudyingQuizLayout = () => {
  /* Optimistic updates using swr */
  const router = useRouter();
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
  // Keeps track of the current question index in the quiz.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // This is what moves on to the next question
  // Stores the index of the selected answer for the current question or null if none is selected.
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
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
    { trailing: false }
  );

  useEffect(() => {
    if (data) {
      const filteredQuestions = data.questions.filter(
        (question) => question.isCorrect === false
      );
      setQuizQuestions(filteredQuestions);
    }
    console.log(data);
  }, [data]);

  useEffect(() => {
    const updateResults = async () => {
      try {
        const response = await updateStudyResults(quizId, correctQuestionIDs);
        mutate(`https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`);
        console.log("Study results updated successfully:", response);
      } catch (error) {
        console.error("Error updating study results:", error);
      }
    };
    if (firstRender) {
      // Skip the effect on the first render
      setFirstRender(false);
      return;
    }
    if (isEndOfQuiz) {
      updateResults();
      router.push(`/dashboard/quiz/${quizId}/completed`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEndOfQuiz,
    quizQuestions,
    currentQuestionIndex,
    quizId,
    correctQuestionIDs,
  ]);

  /* Loading Isvalidating State */
  if (isValidating || isLoading) {
    return <LoadingLayout />;
  }
  /* Error State */
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="bg-slate-200 h-full min-h-screen pb-32">
      <Container>
        {data && (
          <Container>
            <QuizHeader
              headerText={data?.quizTitle}
              score={finalScore}
              displayScore={true}
              link={`/dashboard/quiz/${quizId}`}
            />
            <div className="mt-8">
              {
                <>
                  {currentQuestion && (
                    <PrimaryCard
                      question={`${currentQuestionIndex + 1}. ${
                        currentQuestion.questionTitle
                      }`}
                    />
                  )}
                  {currentQuestion && (
                    <div className="mt-8 flex flex-col space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
                      {questions.map((answer: Answer, index: number) => (
                        <AnswerButton
                          key={index}
                          label={answer.answerText}
                          onClick={() =>
                            throttledHandleAnswerClick(answer.isCorrect, index)
                          }
                          answerState={
                            selectedAnswerIndex === index
                              ? answer.isCorrect
                                ? "correct"
                                : "incorrect"
                              : null
                          }
                        />
                      ))}
                    </div>
                  )}
                </>
              }
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default StudyingQuizLayout;
