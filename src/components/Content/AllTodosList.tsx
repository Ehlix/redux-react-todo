import {removeTodo} from "../../store/todoSlice.ts";
import {PayloadAction} from "@reduxjs/toolkit";
import {TrashIcon} from "@radix-ui/react-icons";

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
    <>
      <div className="overflow-y-auto">
        {todosList.map(t => {
          const color = currentTodo?.todoId === t.todoId ? ' bg-c-select-1 text-t-alt-1' : ' ';
          const buttonHandler = () => {
            setCurrentTodo({todoId: t.todoId, todoTitle: t.todoTitle, list: t.list});
          };
          const deleteButtonHandler = () => {
            dispatch(removeTodo(t.todoId));
          };
          return <div className="flex overflow-x-hidden" key={t.todoId}>
            <button
              tabIndex={1}
              onClick={buttonHandler}
              className={'grow ' + color}>
              <span className="">{t.todoTitle}</span>
            </button>
            <button tabIndex={0} className="" onClick={deleteButtonHandler}><TrashIcon
              className="text-c-select-1"/>
            </button>
          </div>;
        })}
      </div>

    </>
  );
};