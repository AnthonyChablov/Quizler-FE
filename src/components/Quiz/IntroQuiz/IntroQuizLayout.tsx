"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Container from "../../Common/Container";
import LoadingLayout from "../../Loading/LoadingLayout";
import { fetchData, updateStudyResults } from "@/api/quizData";
import useSWR, { useSWRConfig } from "swr";
import PrimaryCard from "../../Common/Cards/PrimaryCard";
import AnswerButton from "../../Common/Buttons/AnswerButton";
import { QuizData, Answer, Question } from "@/models/quizzes";
import Score from "../QuizComponents/Score/Score";
import QuizHeader from "../../Common/Header/QuizHeader";
import { useFormattedQuestions } from "@/hooks/useFormattedQuestion";
import { throttle } from "lodash";
import { useQuizStore } from "@/store/useQuizStore";
import QuizIntro from "../QuizComponents/QuizIntro/QuizIntro";
import { countCorrectQuestions } from "@/utils/countCorrectQuestions";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [correctQuestionIDs, setCorrectQuestionIDs] = useState<string[]>([]);
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const { displayQuiz, setDisplayQuiz } = useQuizStore();

  /* Variables */
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isEndOfQuiz = currentQuestionIndex === quizQuestions.length;
  const finalScore = score.correct - score.incorrect;
  const questions = useFormattedQuestions(currentQuestion || null);
  const numberOfCorrectQuestions = countCorrectQuestions(data);
  const totalQuestions = data?.questions?.length || 0;
  const percentage = ((numberOfCorrectQuestions ?? 0) / totalQuestions) * 100;

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
    setDisplayQuiz(false);
  }, []);

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
      if (isEndOfQuiz) {
        try {
          const response = await updateStudyResults(quizId, correctQuestionIDs);
          console.log("Study results updated successfully:", response);
        } catch (error) {
          console.error("Error updating study results:", error);
        }
      }
    };
    updateResults();
  }, [isEndOfQuiz]);

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
            />
            <div className="mt-8">
              {!displayQuiz ? (
                <QuizIntro />
              ) : (
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
                  {isEndOfQuiz && (
                    <Score
                      score={finalScore}
                      onTryAgain={() => setCurrentQuestionIndex(0)}
                      percentage={percentage}
                      /* quizId={`https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`} */
                    />
                  )}
                </>
              )}
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default IntroQuizLayout;
