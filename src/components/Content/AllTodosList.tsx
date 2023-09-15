import {removeTodo} from "../../store/todoSlice.ts";
import {PayloadAction} from "@reduxjs/toolkit";

interface Todo {
  todoId: string;
  todoTitle: string;
  list: string;
}

interface Props {
  todosList: Todo[];
  currentTodo: Todo | undefined;
  setCurrentTodo: (todo: Todo) => void;
  dispatch: (removeTodo: PayloadAction<string, "todos/removeTodo">) => void;
}

export const AllTodosList = ({
                               todosList,
                               currentTodo,
                               setCurrentTodo,
                               dispatch
                             }: Props) => {
  return (
    <div>
      <h3 className="">Todos List:</h3>
      {todosList.map(t => {
        const color = currentTodo?.todoId === t.todoId ? ' bg-fuchsia-500' : ' ';
        const buttonHandler = () => {
          setCurrentTodo({todoId: t.todoId, todoTitle: t.todoTitle, list: t.list});
        };
        const deleteButtonHandler = () => {
          dispatch(removeTodo(t.todoId));
        };
        return <div className="" key={t.todoId}>
          <button
            onClick={buttonHandler}
            className={color}>
            <span className="">{t.todoTitle}</span>
          </button>
          <button onClick={deleteButtonHandler}>X</button>
        </div>;
      })}
    </div>
  );
};