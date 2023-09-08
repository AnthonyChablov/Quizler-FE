import create from 'zustand';
import { Question } from '@/models/quizzes';

type State = {
  editQuestionData: Question | null; // Replace 'Question' with your actual type
  editQuestionId: string;
};

type Actions = {
  setEditQuestionData: (data: Question | null) => void; // Replace 'Question' with your actual type
  setEditQuestionId: (quizId: string) => void;
};

export const useQuestionStore = create<State & Actions>((set) => ({
  editQuestionData: null,
  editQuestionId: '',
  setEditQuestionData: (data) => set({ editQuestionData: data }),
  setEditQuestionId: (quizId) => set({ editQuestionId: quizId }),
}));
