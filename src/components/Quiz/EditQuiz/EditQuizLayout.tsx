import React, { useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetchData } from "@/api/quizData";
import { useParams } from "next/navigation";
import Container from "../../Common/Container";
import { QuizData } from "@/models/quizzes";
import { DeleteQuizModal } from "../../Common/Modal/DeleteQuizModal";
import { RenameQuizModal } from "../../Common/Modal/RenameQuizModal";
import { useModalStore } from "@/store/useModalStore";
import DisplayCard from "../../Common/Cards/DisplayCard";
import AddButton from "../../Common/Buttons/AddButton";
import LoadingLayout from "../../Loading/LoadingLayout";
import QuizHeader from "../../Common/Header/QuizHeader";
import SpeedDialButton from "../../Common/Buttons/SpeedDialButton";
import AddQuestionModal from "../../Common/Modal/AddQuestionModal";
import EditQuestionModal from "../../Common/Modal/EditQuestionModal";
import { useQuestionStore } from "@/store/useQuestionStore";

const EditQuizLayout = () => {
  /* Next Router */
  const params = useParams();
  const quizId = params.quiz;

  /* Optimistic updates using swr */
  const { mutate } = useSWRConfig();

  /* State */
  const {
    isModalOpen,
    isDeleteModalOpen,
    isRenameModalOpen,
    isAddQuizModalOpen,
    isEditQuestionModalOpen,
    toggleModal,
    toggleDeleteModal,
    toggleRenameModal,
    toggleAddQuizModal,
    toggleEditQuestionModal,
  } = useModalStore();

  const { editQuestionId } = useQuestionStore();

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
    console.log(data);
  }, [data]);

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
        {isDeleteModalOpen && (
          <DeleteQuizModal
            quizId={String(quizId)}
            isOpen={isDeleteModalOpen}
            onClose={() => toggleDeleteModal(false)}
          />
        )}
        {isRenameModalOpen && (
          <RenameQuizModal
            quizId={String(quizId)}
            isOpen={isRenameModalOpen}
            onClose={() => toggleRenameModal(false)}
          />
        )}
        {isAddQuizModalOpen && (
          <AddQuestionModal
            quizId={String(quizId)}
            isOpen={isAddQuizModalOpen}
            onClose={() => toggleAddQuizModal(false)}
          />
        )}
        {isEditQuestionModalOpen && editQuestionId && questions && (
          <EditQuestionModal
            questionData={questions.find(
              (question) => question._id === editQuestionId
            )} /* Find the specific question */
            questionId={String(editQuestionId)}
            quizId={String(quizId)}
            isOpen={isEditQuestionModalOpen}
            onClose={() => toggleEditQuestionModal(false)}
          />
        )}
        <QuizHeader headerText={quizHeader} displayScore={false} />
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
        <SpeedDialButton />
      </Container>
    </div>
  );
};

export default EditQuizLayout;
