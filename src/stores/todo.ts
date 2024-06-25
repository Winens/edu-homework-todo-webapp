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
          id: "initial__todo__1",
          text: "Tutorial (1): Açıklamayı görmek ve düzenlemek için tıklayınız.",
          description:
            "Bu bir örnek görevdir. Görevi tamamlamak için soldaki kutucuğa tıklayınız.\n" +
            "NOT: Her değişiklik anlık olarak otomatik kaydedilir.",
          done: false,
          lastUpdated: dayjs().toISOString(),
          createdAt: dayjs().toISOString(),
          starred: false,
        },

        {
          id: "initial__todo__2",
          text: "Tutorial (2): Silmek için sağ köşedeki çöp kutusuna tıklayınız.",
          description: "",
          done: false,
          lastUpdated: dayjs().toISOString(),
          createdAt: dayjs().toISOString(),
          starred: false,
        },

        {
          id: "initial__todo__3",
          text: "Tutorial (3): Tamamlamak için soldaki kutucuğa tıklayınız.",
          description: "",
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
