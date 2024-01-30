import create from 'zustand';

type State = {
  isHelpOpen: boolean;
  displayQuiz: boolean;
};

type Actions = {
  toggleHelp: (newValue: boolean) => void;
  setDisplayQuiz: (newValue: boolean) => void;
};

export const useQuizStore = create<State & Actions>((set) => ({
  isHelpOpen: false,
  toggleHelp: (newValue) => set({ isHelpOpen: newValue }),
  displayQuiz: false,
  setDisplayQuiz: (newValue) => set({ displayQuiz: newValue }),
}));
