import { create } from 'zustand';
type State = {
  searchQuery: string;
};

type Actions = {
  setSearchQuery: (newValue: string) => void;
};

export const useExploreStore = create<State & Actions>((set) => ({
  searchQuery: '',
  setSearchQuery: (newSearchQuery) => set({ searchQuery: newSearchQuery }),
}));
