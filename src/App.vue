<template>
  <div id="app">
    <div class="todo-container">
      <h1>Todo List With Pinia</h1>
      <!-- Kotak input -->
      <div class="input-container">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          placeholder="Tambah Tugas Baru"
          class="inp"
        />
        <button @click="addTask" class="plus">Tambah</button>
      </div>
      <!-- Daftar output -->
      <div class="output-container">
        <div class="filter-buttons">
          <button @click="filterTasks('all')">Semua Tugas</button>
          <button @click="filterTasks('completed')">Tugas Selesai</button>
          <button @click="filterTasks('incomplete')">Tugas Belum Selesai</button>
        </div>
        <ul>
          <li
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :class="{ completed: todo.completed }"
          >
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTask(index)"
            />
            <span>{{ todo.task }}</span>
            <button @click="removeTask(index)">Hapus</button>
          </li>
        </ul>
        <p class="incomplete-count">Task completed: {{ incompleteTodosCount }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTodoStore } from "./store/todoStore";

export default {
  setup() {
    const newTask = ref("");
    const todoStore = useTodoStore();

    const addTask = () => {
      if (newTask.value.trim() !== "") {
        todoStore.addTodo(newTask.value);
        newTask.value = "";
      }
    };

    const removeTask = (index) => {
      todoStore.removeTodo(index);
    };

    const toggleTask = (index) => {
      todoStore.toggleTodo(index);
    };

    const filter = ref("all");

    const filterTasks = (type) => {
      filter.value = type;
    };

    const filteredTodos = computed(() => {
      if (filter.value === "completed") {
        return todoStore.todos.filter((todo) => todo.completed);
      } else if (filter.value === "incomplete") {
        return todoStore.todos.filter((todo) => !todo.completed);
      } else {
        return todoStore.todos;
      }
    });

    const incompleteTodosCount = computed(() => {
      return todoStore.todos.filter((todo) => !todo.completed).length;
    });

    return {
      newTask,
      filteredTodos,
      incompleteTodosCount,
      addTask,
      removeTask,
      toggleTask,
      filterTasks,
    };
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #E3E3E3;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.inp {
  margin-left: 10px;
  width: 315px;
}

.inp:focus {
  background-color: #a9a9a9;
}

.inp:focus::placeholder {
  color: #ffffff;
}

.plus {
  color: rgb(214, 75, 75);
  background-color: rgb(18, 19, 18);
}

.plus:hover {
  background-color: rgb(26, 29, 27);
}

.todo-container {
  background-color: #ff6b3505;
  padding: 70px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  backdrop-filter: blur(10px);
}

h1 {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  background-color: #ff7637;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

button:hover {
  background-color: #f77d4d;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

li:last-child {
  border-bottom: none;
}

li.completed span {
  text-decoration: line-through;
  color: #888;
}

li input[type="checkbox"] {
  margin-right: 10px;
}

li button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

li button:hover {
  background-color: #c82333;
}

.incomplete-count {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  color: #333;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-buttons button {
  margin-right: 10px;
  padding: 10px 15px;
  background-color: #ff7637;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.filter-buttons button:hover {
  background-color: #f77d4d;
}
</style>
