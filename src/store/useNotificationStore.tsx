import create from "zustand";
type State = {
  isNotificationOpen: boolean;
  notificationMode:
    | "error"
    | "warning"
    | "info"
    | "success"
    | "characterCount"
    | undefined;
};

type Actions = {
  toggleIsNotificationOpen: (newValue: boolean) => void;
  setNotificationMode: (
    newValue:
      | "error"
      | "warning"
      | "info"
      | "success"
      | "characterCount"
      | undefined
  ) => void;
};

export const useNotificationStore = create<State & Actions>((set) => ({
  isNotificationOpen: false,
  notificationMode: "info",
  toggleIsNotificationOpen: (newValue) => set({ isNotificationOpen: newValue }),
  setNotificationMode: (newValue) => set({ notificationMode: newValue }),
}));
