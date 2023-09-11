import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

type Todo = {
  id: string;
  title: string;
  isComplete: boolean;
}
type TodoState = {
  list: Array<Todo>
}
const initialState: TodoState = {
  list: [{
    id: v1(),
    title: 'asfaewfase',
    isComplete: true,
  }, {
    id: v1(),
    title: '12312312',
    isComplete: false,
  }, {
    id: v1(),
    title: 'qqqqqqqqqqqqq',
    isComplete: false,
  }]
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>): void {
      state.list.unshift({
        id: v1(),
        title: action.payload,
        isComplete: false
      });

    },
    removeTodo(state, action: PayloadAction<string>): void {
      state.list = state.list.filter(t => {
        return t.id !== action.payload;
      });
    },
    toggleStatus(state, action: PayloadAction<{ id: string, status: boolean }>): void {
      const todo = state.list.find(t => t.id === action.payload.id);
      if (todo) {
        todo.isComplete = action.payload.status;
      }
    }
  }
});

export const {
  addTodo,
  removeTodo,
  toggleStatus,
} = todoSlice.actions;

export default todoSlice.reducer;