import { useRouter } from "next/navigation"; // Import the useRouter hook
import { QuizModalProps } from "./Modal";
import Modal from "./Modal";
import { deleteQuiz } from "@/api/quizData";
import CloseButton from "../Buttons/CloseButton";
import { useNotificationStore } from "@/store/useNotificationStore";

export const DeleteQuizModal = ({
  quizId,
  isOpen,
  onClose,
}: QuizModalProps) => {
  /* State */
  const { setNotificationMode, toggleIsNotificationOpen } =
    useNotificationStore();

  const router = useRouter(); // Initialize the useRouter hook

  const handleDelete = async () => {
    try {
      await deleteQuiz(quizId); // Assuming deleteQuiz returns a promise or can be awaited
      onClose();
      router.push("/dashboard"); // Redirect to the dashboard after successful deletion
    } catch (error) {
      toggleIsNotificationOpen(true);
      setNotificationMode("error");
      console.error("Error deleting quiz:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold mb-4">Delete Quiz</h2>
          <CloseButton onClick={onClose} />
        </div>
        <p>Are you sure you want to delete this quiz?</p>
        <button
          className="bg-red-500 text-white px-4 py-2 mt-4"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4 ml-4"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};
