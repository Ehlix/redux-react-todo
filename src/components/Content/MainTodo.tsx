import React, {Dispatch} from "react";
import {EptaInput} from "./EptaInput.tsx";
import {List, removeTodoList, TodoState, toggleStatus} from "../../store/todoSlice.ts";
import {TodoStatusBar} from "./TodoStatusBar.tsx";
import {CurrentTodoState, TodosListStatusState} from "./TodoApp.tsx";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";

interface MainTodoProps {
  currentTodo: CurrentTodoState;
  curTodo: List[];
  dispatch: ThunkDispatch<{todos: TodoState}, undefined, AnyAction> & Dispatch<AnyAction>;
  getFilter: (filter: 'all' | 'current' | 'complete')=>void;
  eptaHandlerAddTodo: (todoId: string, id: string, text: string)=>void;
  todosListStatus: TodosListStatusState | undefined;
}

export const MainTodo: React.FC<MainTodoProps> = ({
                                                    currentTodo,
                                                    curTodo,
                                                    dispatch,
                                                    getFilter,
                                                    eptaHandlerAddTodo,
                                                    todosListStatus
                                                  }) => {

  return (

    <div>
      <h3 className="">{currentTodo.todoTitle}</h3>
      <EptaInput maxLength={300} placeholder="add todo"
                 callbackHandler={p => eptaHandlerAddTodo(currentTodo.todoId, currentTodo.list, p)}/>


      {curTodo.map(l => {

        const buttonHandler = () => {
          dispatch(removeTodoList({todoListId: currentTodo.list, listId: l.id}));
        };
        const checkBoxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(toggleStatus({
            todoListId: currentTodo.list,
            listId: l.id,
            status: e.currentTarget.checked
          }));
        };
        return <div
          className=""
          key={l.id}>
          <input
            onChange={(e) => checkBoxHandler(e)}
            type="checkbox"
            checked={l.isComplete}
          />
          <span className="">{l.title}</span>
          <button className="" onClick={buttonHandler}>X</button>
        </div>;
      })
      }
      <TodoStatusBar
        curStatus={todosListStatus ? todosListStatus[currentTodo.todoId] : 'all'}
        getFilter={(q) => getFilter(q)}/>

    </div>
  );
};