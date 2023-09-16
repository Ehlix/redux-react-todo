import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

export interface List {
  id: string;
  title: string;
  isComplete: boolean;
}

interface Todos {
  todoId: string;
  todoTitle: string;
  list: string;
}

interface Lists {
  [key: string]: List[];
}

export interface TodoState {
  todosList: Todos[];
  lists: Lists;
}

const initialState: TodoState = {
  todosList: [],
  lists: {},
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTodo(state, action: PayloadAction<string>): void {
      const idList = v1();
      state.todosList.unshift({todoId: v1(), todoTitle: action.payload, list: idList});
      state.lists[idList] = [];
    },
    addTodo(state, action: PayloadAction<{
      todoListId: string,
      title: string
    }>): void {
      if (state.lists[action.payload.todoListId] && action.payload.title) {
        state.lists[action.payload.todoListId].unshift({
          id: v1(),
          title: action.payload.title,
          isComplete: false
        });
      }
    },
    removeTodoList(state, action: PayloadAction<{
      todoListId: string,
      listId: string
    }>): void {
      if (state.lists[action.payload.todoListId] && action.payload.listId) {
        state.lists[action.payload.todoListId] = state.lists[action.payload.todoListId].filter(t => {
          return t.id !== action.payload.listId;
        });
      }
    },
    toggleStatus(state, action: PayloadAction<{
      todoListId: string,
      listId: string,
    }>): void {
      if (state.lists[action.payload.todoListId]) {
        const todo = state.lists[action.payload.todoListId].find(t => t.id === action.payload.listId);
        if (todo) {
          todo.isComplete = !todo.isComplete;
        }
      }
    },
    removeTodo(state, action: PayloadAction<string>): void {
      delete state.lists[action.payload];
      state.todosList = state.todosList.filter(t => t.todoId !== action.payload);
    },
    setInitialState(state, action: PayloadAction<TodoState>): void {
      state.lists = action.payload.lists;
      state.todosList = action.payload.todosList;
    }
  }
});

export const {
  createTodo,
  addTodo,
  removeTodoList,
  toggleStatus,
  removeTodo,
  setInitialState
} = todoSlice.actions;

export default todoSlice.reducer;