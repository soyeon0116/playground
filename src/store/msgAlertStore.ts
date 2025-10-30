import { create } from 'zustand';

interface msgAlertState {
  newMsg: boolean;
  msgs: string[];
  addMsg: (msg: string) => void;
  clearMsg: () => void;
}

export const useMsgAlertStore = create<msgAlertState>((set) => ({
  newMsg: false,
  msgs: [],
  addMsg: (msg) =>
    set((state) => ({
      msgs: [...state.msgs, msg],
      newMsg: true,
    })),
  clearMsg: () =>
    set(() => ({
      msgs: [],
      newMsg: false,
    })),
}));
