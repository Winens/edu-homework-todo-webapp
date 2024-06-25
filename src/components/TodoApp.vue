<script setup lang="ts">
import { Ref, computed, reactive, ref } from "vue";
import { useTodoStore } from "../stores/todo";
import {
  RiDeleteBin2Line,
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiTodoFill,
  RiStarLine,
  RiStarFill,
} from "@remixicon/vue";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

const username = localStorage.getItem("username");
const input: Ref<HTMLInputElement | null> = ref(null);

const todoStore = useTodoStore();

const sortedTodos = computed(() => {
  const res = new Array(); //[...todoStore.todos];
  todoStore.todos.map((todo) => {
    res.push(todo);
  });

  if (state.showOnlyStarred) {
    // res.values = res.filter((todo) => todo.starred).values;
    return res.filter((todo) => todo.starred).sort((a, b) => a.done - b.done);
  }
  //@ts-ignore
  return res
    .sort((a, b) => a.done - b.done)
    .sort((a, b) => b.starred - a.starred);
});

const state = reactive({
  openedTodos: [] as string[],
  newTodoText: "",
  showOnlyStarred: false,
});

const handleDelete = (id: string) => {
  const idx = todoStore.todos.findIndex((todo) => todo.id === id);
  if (idx !== -1) {
    todoStore.todos.splice(idx, 1);
  }
};

const handleNewTodo = () => {
  if (!state.newTodoText.trim()) return;

  todoStore.todos.unshift({
    id: nanoid(),
    text: state.newTodoText,
    description: "",
    done: false,
    lastUpdated: dayjs().toISOString(),
    createdAt: dayjs().toISOString(),
  });

  state.newTodoText = "";

  // lose focus
  if (input.value) {
    input.value.blur();
  }
};

const handleCheck = (id: string) => {
  const todo = todoStore.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.done = !todo.done;
    todo.lastUpdated = dayjs().toISOString();
  }

  // close the description if it's open
  if (state.openedTodos.includes(id)) {
    state.openedTodos.splice(state.openedTodos.indexOf(id), 1);
  }
};

const handleStar = (id: string) => {
  const todo = todoStore.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.starred = !todo.starred;
    todo.lastUpdated = dayjs().toISOString();
  }
};
</script>

<template>
  <div class="app-container">
    <h1 style="text-transform: capitalize; margin-top: 16px; margin-bottom: 0">
      Merhaba, {{ username }}.
    </h1>

    <div class="sticky">
      <div class="header">
        <p style="opacity: 0.6">Bugün ki yapılacaklar listesi:</p>

        <button
          class="btn-urgent"
          @click="state.showOnlyStarred = !state.showOnlyStarred"
          :data-active="state.showOnlyStarred || undefined"
        >
          <RiStarFill v-if="state.showOnlyStarred" size="19" />
          <RiStarLine v-else size="19" />
          <span>Önemli</span>
        </button>
      </div>

      <input
        ref="input"
        type="text"
        maxlength="100"
        placeholder="Yeni ekle"
        class="input"
        style="width: 100%"
        v-model="state.newTodoText"
        @keyup.enter="handleNewTodo"
      />

      <hr />
    </div>

    <!-- List -->
    <TransitionGroup name="list" tag="ul" class="todo-list">
      <div
        v-for="todo in sortedTodos"
        :key="todo.id"
        class="todo-item"
        :data-done="todo.done"
        :data-open="state.openedTodos.includes(todo.id)"
        :data-starred="todo.starred"
      >
        <div class="up-section">
          <div class="left-section">
            <RiCheckboxCircleFill
              v-if="todo.done"
              color="#4ade80"
              class="checker"
            />
            <RiCheckboxBlankCircleLine
              v-else
              color="#333"
              class="checker"
              @click="handleCheck(todo.id)"
            />

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
              <p style="margin: 0">
                {{ todo.text }}
              </p>
            </div>
          </div>

          <div class="end-section">
            <button class="btn-delete" @click="handleDelete(todo.id)">
              <RiDeleteBin2Line size="21" />
            </button>

            <button class="btn-star" @click="handleStar(todo.id)">
              <RiStarFill v-if="todo.starred" size="21" />
              <RiStarLine v-else size="21" />
            </button>

            <button
              class="btn-dropdown"
              @click="
                state.openedTodos.includes(todo.id)
                  ? state.openedTodos.splice(
                      state.openedTodos.indexOf(todo.id),
                      1
                    )
                  : state.openedTodos.push(todo.id)
              "
            >
              <RiArrowDownSLine
                v-if="!state.openedTodos.includes(todo.id)"
                size="21"
              />
              <RiArrowUpSLine v-else size="21" />
            </button>
          </div>
        </div>

        <Transition>
          <div v-if="state.openedTodos.includes(todo.id)">
            <textarea
              :disabled="todo.done"
              class="input description-area"
              style="width: 100%"
              placeholder="Açıklama"
              v-model="todo.description"
              rows="3"
            >
            </textarea>
          </div>
        </Transition>
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
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
$urgent-color: #f59e0b;
$disabled-color: #71717a;

.app-container {
  padding-top: 0;
}

.todo-list {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 8px;
  box-sizing: border-box;
  border-radius: 8px;

  transition: all 0.2s;
  background: rgba(#fff, 0.05);
  border-bottom: 4px solid rgba(#fff, 0.1);

  box-shadow: 0 0 10px rgba(#000, 0.1);
}

.up-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;
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
  text-decoration-color: $disabled-color;

  .title {
    color: $disabled-color;
  }

  .description-area {
    color: $disabled-color;
  }
}

.todo-item[data-starred="true"] {
  .btn-star {
    color: $urgent-color;
  }

  &:not([data-done="true"]) {
    background-color: darken($urgent-color, 45);
  }
}

.checker {
  cursor: pointer;
  flex-shrink: 0;
}

.description-area {
  resize: vertical;
  border-color: transparent;

  background: rgba(white, 0.07);

  &::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.todo-item button {
  padding: 4px;
  background: none;
  border: none;
  cursor: pointer;

  &:active {
    transform: scale(0.95);
    transition: transform 0.2s;
  }
}

.btn-star {
  color: rgba(white, 0.4);

  &:hover {
    color: rgba(white, 0.8);
  }
}

.btn-delete {
  $delete-color: #ff4d4f;

  transition: color 0.1s;
  color: $delete-color;
  &:hover {
    color: lighten($delete-color, 10);
  }
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
  user-select: none;
  width: 100%;

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

.sticky {
  position: sticky;
  top: 0;
  background: rgba(#09090b, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(#000, 0.2);
  z-index: 1;

  margin-top: 0;
  padding: 8px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .btn-urgent {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;

  padding: 6px 12px;
  border-radius: 9999px;
  outline: none;

  transition: all 0.2s;

  border: 1px solid $urgent-color;
  background: rgba($urgent-color, 0.1);
  color: $urgent-color;

  &[data-active] {
    background: $urgent-color;
    color: rgba(black, 0.9);
  }
}

// animations
.v-move,
.v-enter-active,
.v-leave-active {
  transition: 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(41px);
}
</style>
