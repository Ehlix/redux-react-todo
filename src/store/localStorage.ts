import store from "./store.ts";

export const saveToLocalStorage = () => {
  const todos = store.getState().todos;
  const todosString = JSON.stringify(todos);
  localStorage.setItem('SuperTodoEptaList', todosString);
};

export const initialStateFromLocalStorage = () => {
  const todosString = localStorage.getItem('SuperTodoEptaList');

  if (todosString) {
    const todos = JSON.parse(todosString);
    if (todos.todosList && todos.lists) {
      return todos;
    }
  }
};

setInterval(() => {
  saveToLocalStorage();
}, 2000);