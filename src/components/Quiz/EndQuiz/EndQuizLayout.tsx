"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchData } from "@/api/quizData";
import { QuizData } from "@/models/quizzes";
import { useParams, useRouter } from "next/navigation";
import Container from "@/components/Common/Container";
import QuizHeader from "@/components/Common/Header/QuizHeader";
import LoadingLayout from "@/components/Loading/LoadingLayout";
import Score from "../QuizComponents/Score/Score";
import { Question } from "@/models/quizzes";

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

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

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
      <div>
        <Container>
          <QuizHeader
            headerText={data?.quizTitle}
            score={score.correct}
            displayScore={true}
            link={`/dashboard/quiz/${quizId}`}
          />
          <Score
            score={score.correct}
            onTryAgain={() => {
              router.push(`/dashboard/quiz/${quizId}/`);
            }}
            percentage={score.correct / (score.correct + score.incorrect)}
          />
        </Container>
      </div>
    );
  }

  // If data is not available, you can return a loading indicator or a fallback component.
  return <LoadingLayout />;
};

export default EndQuizLayout;
