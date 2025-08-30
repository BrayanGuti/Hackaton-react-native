import { create } from "zustand";

interface CounterState {
  topic: string;
  setTopic: (topic: string) => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  topic: "",
  setTopic: (topic: string) => set({ topic }),
}));
