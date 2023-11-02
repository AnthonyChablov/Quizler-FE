import create from "zustand";

type State = {
  isModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isRenameModalOpen: boolean;
  isAddQuizModalOpen: boolean;
  isEditQuestionModalOpen: boolean;
  isExitStudyModeModalOpen: boolean;
  /* Directories */
  isEditDirectoryModalOpen: boolean;
  isDeleteDirectoryModalOpen: boolean;
  isAddDirectoryModalOpen: boolean;
};

type Actions = {
  toggleModal: (newValue: boolean) => void;
  toggleDeleteModal: (newValue: boolean) => void;
  toggleRenameModal: (newValue: boolean) => void;
  toggleAddQuizModal: (newValue: boolean) => void;
  toggleEditQuestionModal: (newValue: boolean) => void;
  toggleExitStudyModeModal: (newValue: boolean) => void;
  /* Directories */
  toggleEditDirectoryModalOpen: (newValue: boolean) => void;
  toggleDeleteDirectoryModalOpen: (newValue: boolean) => void;
  toggleAddDirectoryModalOpen: (newValue: boolean) => void;
};

export const useModalStore = create<State & Actions>((set) => ({
  isModalOpen: false,
  isDeleteModalOpen: false,
  isRenameModalOpen: false,
  isAddQuizModalOpen: false,
  isEditQuestionModalOpen: false,
  isExitStudyModeModalOpen: false,
  toggleModal: (newValue) => set({ isModalOpen: newValue }),
  toggleDeleteModal: (newValue) => set({ isDeleteModalOpen: newValue }),
  toggleRenameModal: (newValue) => set({ isRenameModalOpen: newValue }),
  toggleAddQuizModal: (newValue) => set({ isAddQuizModalOpen: newValue }),
  toggleEditQuestionModal: (newValue) =>
    set({ isEditQuestionModalOpen: newValue }),
  toggleExitStudyModeModal: (newValue) =>
    set({ isExitStudyModeModalOpen: newValue }),

  /* Directories */
  isEditDirectoryModalOpen: false,
  toggleEditDirectoryModalOpen: (newValue) =>
    set({ isAddQuizModalOpen: newValue }),
  isDeleteDirectoryModalOpen: false,
  toggleDeleteDirectoryModalOpen: (newValue) =>
    set({ isDeleteDirectoryModalOpen: newValue }),
  isAddDirectoryModalOpen: false,
  toggleAddDirectoryModalOpen: (newValue) =>
    set({ isAddDirectoryModalOpen: newValue }),
}));
