<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useTodoStore } from "../stores/todo";
import {
  RiDeleteBin2Line,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiTodoFill,
} from "@remixicon/vue";
import { nanoid } from "nanoid";

const username = localStorage.getItem("username");

const todoStore = useTodoStore();

const sortedTodos = computed(() => {
  //@ts-ignore
  return [...todoStore.todos].sort((a, b) => a.done - b.done);
});

const state = reactive({
  openedTodos: [] as string[],
  newTodoText: "",
});

const handleDelete = (idx: number) => {
  todoStore.todos.splice(idx, 1);
};

const handleNewTodo = () => {
  if (!state.newTodoText.trim()) return;

  todoStore.todos.push({
    id: nanoid(),
    text: state.newTodoText,
    description: "",
    done: false,
  });

  state.newTodoText = "";
};
</script>

<template>
  <div class="app-container">
    <h1 style="text-transform: capitalize">Merhaba, {{ username }}.</h1>

    <p style="opacity: 0.6">Bugün ki yapılacaklar listesi:</p>

    <hr />

    <input
      type="text"
      placeholder="Yeni ekle"
      class="input"
      style="width: 100%"
      v-model="state.newTodoText"
      @keyup.enter="handleNewTodo"
    />

    <hr />

    <!-- List -->
    <div class="todo-list">
      <div
        v-for="(todo, idx) in sortedTodos"
        :key="todo.id"
        class="todo-item"
        :data-done="todo.done"
        :data-open="state.openedTodos.includes(todo.id)"
      >
        <div class="up-section">
          <div class="left-section">
            <RiCheckboxCircleFill
              v-if="todo.done"
              color="#4ade80"
              class="checker"
            />
            <RiCheckboxBlankCircleLine v-else color="#333" class="checker" />

            <div
              class="title"
              @click="
                state.openedTodos.includes(todo.id)
                  ? state.openedTodos.splice(
                      state.openedTodos.indexOf(todo.id),
                      1
                    )
                  : state.openedTodos.push(todo.id)
              "
            >
              <span>
                {{ todo.text }}
              </span>
            </div>
          </div>

          <div class="end-section">
            <button class="btn-delete" @click="handleDelete(idx)">
              <RiDeleteBin2Line />
            </button>

            <button class="btn-dropdown">
              <RiArrowDownSLine v-if="!state.openedTodos.includes(todo.id)" />
              <RiArrowUpSLine v-else />
            </button>
          </div>
        </div>

        <div v-if="state.openedTodos.includes(todo.id)">
          <textarea
            class="input"
            style="width: 100%"
            placeholder="Açıklama"
            v-model="todo.description"
          >
          </textarea>
        </div>
      </div>

      <div v-if="!sortedTodos.length" class="empty-list">
        <RiTodoFill size="32" class="icon" />

        <h3 style="margin: 0; margin-top: 12px">
          Henüz yapılacak bir şey yok.
        </h3>

        <small>
          Yeni bir şey eklemek için yukarıdaki kutuya yazıp <kbd>enter</kbd>'a
          basın.
        </small>
      </div>
      <hr />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.todo-list {
  display: flex;
  flex-direction: column;
}

.todo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;

  border-bottom: 1px solid rgba(#fff, 0.1);
  padding: 8px 0;
}

.up-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.left-section {
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 8px;
  overflow: hidden;
}

.todo-item[data-done="true"] {
  text-decoration: line-through;

  .title {
    opacity: 0.6;
  }
}

.checker {
  cursor: pointer;
  flex-shrink: 0;
}

.todo-item button {
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;
}

.btn-delete {
  color: #ff4d4f;
}

.btn-dropdown {
  color: #333;
}

.end-section {
  display: flex;
  flex-shrink: 0;
  gap: 4px;
}

.left-section .title {
  overflow: hidden;
  cursor: pointer;

  // For long texts truncate
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // if data-open is true, show the full text
  span[data-open="true"] {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
}

.empty-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  opacity: 0.6;
  margin: 64px 0;
}
</style>
