import create from 'zustand';
type State = {
  isAddQuizSideDrawerOpen: boolean;
};

type Actions = {
  toggleAddQuizSideDrawer: (newValue: boolean) => void;
};

export const useSideDrawerStore = create<State & Actions>((set) => ({
  isAddQuizSideDrawerOpen: false,
  toggleAddQuizSideDrawer: (newValue) =>
    set({ isAddQuizSideDrawerOpen: newValue }),
}));
