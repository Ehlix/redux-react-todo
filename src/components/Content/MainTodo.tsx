import React, {Dispatch} from "react";
import {EptaInput} from "./EptaInput.tsx";
import {List, removeTodoList, TodoState, toggleStatus} from "../../store/todoSlice.ts";
import {TodoStatusBar} from "./TodoStatusBar.tsx";
import {CurrentTodoState, TodosListStatusState} from "./TodoApp.tsx";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import * as Checkbox from '@radix-ui/react-checkbox';
import {CheckIcon, Cross2Icon, SquareIcon} from "@radix-ui/react-icons";

interface MainTodoProps {
  currentTodo: CurrentTodoState;
  curTodo: List[];
  dispatch: ThunkDispatch<{
    todos: TodoState
  }, undefined, AnyAction> & Dispatch<AnyAction>;
  getFilter: (filter: 'all' | 'current' | 'complete') => void;
  eptaHandlerAddTodo: (todoId: string, id: string, text: string) => void;
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
    <>
      <div className="flex flex-col items-center gap-5 pb-5">
        <h3 className="text-3xl capitalize underline">{currentTodo.todoTitle}</h3>
        <div className="flex items-center justify-center gap-5 px-5">
          <h2>Add task:</h2>
          <EptaInput maxLength={300} placeholder="enter some text"
                     callbackHandler={p => eptaHandlerAddTodo(currentTodo.todoId, currentTodo.list, p)}/>
        </div>
      </div>
      <div>
        {curTodo.map(l => {

          const buttonHandler = () => {
            dispatch(removeTodoList({todoListId: currentTodo.list, listId: l.id}));
          };
          const checkBoxHandler = () => {
            dispatch(toggleStatus({
              todoListId: currentTodo.list,
              listId: l.id,
            }));
          };
          return <div
            className={'flex items-center justify-between ' + (l.isComplete ? 'opacity-20' : '')}
            key={l.id}>
            <Checkbox.Root
              className="inline-flex appearance-none items-center justify-center bg-none outline-none h-[25px] w-[25px] checked:bg-green-500 hover:rounded-xl hover:bg-opacity-40 focus:rounded-xl focus:bg-pink-300"
              onCheckedChange={checkBoxHandler}
              checked={l.isComplete}
              id="c1"
              tabIndex={1}
            >
              {!l.isComplete && <SquareIcon className="text-purple-200"/>}
              <Checkbox.Indicator className="">
                {l.isComplete && <CheckIcon className="text-purple-200"/>}
              </Checkbox.Indicator>
            </Checkbox.Root>
            <span className={l.isComplete ? 'line-through' : ''}>{l.title}</span>
            <button tabIndex={2} className="" onClick={buttonHandler}><Cross2Icon/>
            </button>
          </div>;
        })
        }
      </div>
      <TodoStatusBar
        curStatus={todosListStatus ? todosListStatus[currentTodo.todoId] : 'all'}
        getFilter={(q) => getFilter(q)}/>

    </>
  );
};