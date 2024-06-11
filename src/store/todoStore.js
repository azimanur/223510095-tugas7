import { defineStore } from "pinia";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [],
  }),
  actions: {
    addTodo(task) {
      this.todos.push({ task, completed: false });
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
  },
  getters: {
    incompleteTodosCount: (state) => {
      return state.todos.filter((todo) => !todo.completed).length;
    },
  },
});
