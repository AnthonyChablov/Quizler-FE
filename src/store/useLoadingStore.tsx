import create from "zustand";
type State = {
  isLoading: boolean;
};

type Actions = {
  setIsLoading: (newValue: boolean) => void;
};

export const useLoadingStore = create<State & Actions>((set) => ({
  isLoading: false,
  setIsLoading: (newIsLoading) => set({ isLoading: newIsLoading }),
}));
