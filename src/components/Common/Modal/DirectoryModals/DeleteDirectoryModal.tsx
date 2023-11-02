import { deleteDirectory } from "@/api/directoryData";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/store/useNotificationStore";
import CloseButton from "../../Buttons/CloseButton";
import Modal from "../Modal";

export interface DirectoryModalProps{
    isOpen: boolean;
    onClose: () => void;
    directoryId: string;
}

export const DeleteDirectoryModal = ({
    directoryId,
    isOpen,
    onClose,
}: DirectoryModalProps) => {
    const { setNotificationMode, toggleIsNotificationOpen } =
    useNotificationStore();

    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deleteDirectory(directoryId);
            onClose();
            // FIXME: redirects to the homepage, might need to change --> deletion can occur in both directory page OR home
            router.push("/dashboard") 
        } catch (error) {
            toggleIsNotificationOpen(true);
            setNotificationMode("error");
            console.error("Error deleting directory:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-4">Delete Directory</h2>
              <CloseButton onClick={onClose} />
            </div>
            {/** chloe: do we want to give them the option to move the quizzes to another directory? */}
            <p>Are you sure you want to delete this directory? Note: All quizzes inside will also get deleted</p>
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
}