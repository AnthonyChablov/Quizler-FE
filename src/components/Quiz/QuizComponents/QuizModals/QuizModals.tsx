import React from "react";
import { DeleteQuizModal } from "@/components/Common/Modal/DeleteQuizModal";
import { RenameQuizModal } from "@/components/Common/Modal/RenameQuizModal";
import AddQuestionModal from "@/components/Common/Modal/AddQuestionModal";
import EditQuestionModal from "@/components/Common/Modal/EditQuestionModal";
import { useModalStore } from "@/store/useModalStore";
import { Question } from "@/models/quizzes";
import { useQuestionStore } from "@/store/useQuestionStore";

interface QuizModalsProps {
  quizId: string | string[];
  questions: Question[] | undefined;
}

const QuizModals: React.FC<QuizModalsProps> = ({ quizId, questions }) => {
  const {
    isDeleteModalOpen,
    isRenameModalOpen,
    isAddQuizModalOpen,
    isEditQuestionModalOpen,
    toggleDeleteModal,
    toggleRenameModal,
    toggleAddQuizModal,
    toggleEditQuestionModal,
  } = useModalStore();
  const { editQuestionId } = useQuestionStore();

  return (
    <>
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
    </>
  );
};

export default QuizModals;
