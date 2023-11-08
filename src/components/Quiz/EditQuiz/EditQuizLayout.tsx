import React, { useEffect } from "react";
import useSWR from "swr";
import { fetchData } from "@/api/quizData";
import { useParams } from "next/navigation";
import Container from "../../Common/Container";
import { QuizData } from "@/models/quizzes";
import { useModalStore } from "@/store/useModalStore";
import DisplayCard from "../../Common/Cards/DisplayCard";
import AddButton from "../../Common/Buttons/AddButton";
import LoadingLayout from "../../Loading/LoadingLayout";
import QuizHeader from "../../Common/Header/QuizHeader";
import SpeedDialButton from "../../Common/Buttons/SpeedDialButton";
import QuizModals from "../QuizComponents/QuizModals/QuizModals";
import Notification from "@/components/Common/Notification/Notification";

const EditQuizLayout = () => {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;

  /* State */
  const { toggleAddQuizModal } = useModalStore();

  /* Fetch Data */
  const { data, error, isValidating, isLoading } = useSWR<QuizData>(
    `https://quizzlerreactapp.onrender.com/api/quizzes/${quizId}`,
    fetchData,
    {
      revalidateOnFocus: false,
      refreshInterval: 300000,
    }
  );

  /* Variables */
  const quizHeader = data?.quizTitle ?? "Loading...";
  const questions = data?.questions; // Extract the questions from the fetched data

  if (isValidating || isLoading) {
    return <LoadingLayout />;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className=" bg-slate-200 h-full min-h-screen pb-24">
      <Container>
        {/* Modals */}
        <QuizModals quizId={quizId} questions={questions} />
        <QuizHeader
          headerText={quizHeader}
          displayScore={false}
          link="/dashboard"
        />
        <div className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 ">
          {questions?.map((question) => (
            <DisplayCard
              key={question?._id}
              id={question?._id}
              questionTitle={question?.questionTitle}
              questionAnswers={[
                ...question?.incorrect_answers,
                question?.correct_answer,
              ]}
              questionData={question}
            />
          ))}
        </div>
        <div className="w-full flex justify-center mt-6">
          <AddButton onClick={() => toggleAddQuizModal(true)} />
        </div>
        <SpeedDialButton
          isPlayQuiz={true}
          isDeleteQuiz={true}
          isRenameQuiz={true}
          isAddQuestion={true}
        />
        <Notification />
      </Container>
    </div>
  );
};

export default EditQuizLayout;
