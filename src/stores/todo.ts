import dayjs from "dayjs";
import { defineStore } from "pinia";

export type Todo = {
  id: string;
  text: string;
  description: string;
  done?: boolean;
  lastUpdated: string;
  createdAt: string;
  starred?: boolean;
};

export const useTodoStore = defineStore("todos", {
  state: () => {
    return {
      todos: [
        {
          id: "initial",
          text: "Tutorial: Tamamlamak için tıkla!",
          description:
            "Bu bir örnek görevdir. Görevi tamamlamak için üzerine tıklayın.",
          done: false,
          lastUpdated: dayjs().toISOString(),
          createdAt: dayjs().toISOString(),
          starred: false,
        },
      ] as Todo[],
    };
  },
  persist: true,
});
