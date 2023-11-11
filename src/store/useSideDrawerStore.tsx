import create from 'zustand';
type State = {
  isAddQuizSideDrawerOpen: boolean;
  isAddDirectorySideDrawerOpen: boolean;
};

type Actions = {
  toggleAddQuizSideDrawer: (newValue: boolean) => void;
  toggleAddDirectorySideDrawer: (newValue: boolean) => void;
};

export const useSideDrawerStore = create<State & Actions>((set) => ({
  isAddQuizSideDrawerOpen: false,
  toggleAddQuizSideDrawer: (newValue) => set({ isAddQuizSideDrawerOpen: newValue }),
  isAddDirectorySideDrawerOpen: false,
  toggleAddDirectorySideDrawer: (newValue) => set({ isAddDirectorySideDrawerOpen: newValue }),
}));
