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
  const [score, setScore] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  });

  /* Variables */
  const finalScore = score.correct - score.incorrect;

  /* Loading Isvalidating State */
  if (isValidating || isLoading) {
    return <LoadingLayout useCircularProgress={true} />;
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
              link="/dashboard"
            />
            <div className="mt-8">
              <QuizIntro quizTitle={data?.quizTitle} />
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default IntroQuizLayout;
