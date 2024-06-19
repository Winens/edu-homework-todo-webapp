import { defineStore } from "pinia";

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
        },
      ],
    };
  },
  persist: true,
});
