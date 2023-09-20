import React, {Dispatch} from "react";
import {MyInput} from "./MyInput.tsx";
import {
  editTodoList,
  List,
  removeTodoList,
  TodoState,
  toggleStatus
} from "../../store/todoSlice.ts";
import {TodoStatusBar} from "./TodoStatusBar.tsx";
import {CurrentTodoState, TodosListStatusState} from "./TodoApp.tsx";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import * as Checkbox from '@radix-ui/react-checkbox';
import {CheckIcon, SquareIcon, TrashIcon} from "@radix-ui/react-icons";
import {EditableSpan} from "./EditableSpan.tsx";

interface MainTodoProps {
  currentTodo: CurrentTodoState;
  curTodo: List[];
  dispatch: ThunkDispatch<{
    todos: TodoState
  }, undefined, AnyAction> & Dispatch<AnyAction>;
  getFilter: (filter: 'all' | 'current' | 'complete') => void;
  myInputHandlerAddTodo: (todoId: string, id: string, text: string) => void;
  todosListStatus: TodosListStatusState | undefined;
}

export const MainTodo: React.FC<MainTodoProps> = ({
                                                    currentTodo,
                                                    curTodo,
                                                    dispatch,
                                                    getFilter,
                                                    myInputHandlerAddTodo,
                                                    todosListStatus
                                                  }) => {

  return (
    <>
      <h3 className="text-center text-3xl text-c-select-1">{currentTodo.todoTitle}</h3>
      <div className="flex flex-col pt-5 pb-8">
        <MyInput maxLength={300} placeholder="enter some text"
                 callbackHandler={p => myInputHandlerAddTodo(currentTodo.todoId, currentTodo.list, p)}
                 buttonName="Add Task"
        />
      </div>
      <div className="overflow-y-auto">
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
          const titleChangeHandler = (title: string) => {
            dispatch(editTodoList({
              todoListId: currentTodo.list,
              listId: l.id,
              title: title,
            }));
          };
          return <div
            className={'hover:shadow-c-base hover:shadow-[inset_0_-2px] flex items-center justify-between ' + (l.isComplete ? 'opacity-20' : '')}
            key={l.id}>
            <Checkbox.Root
              className="flex appearance-none items-center justify-center bg-none outline-none h-[31px] w-[31px] focus-visible:bg-c-hover-1"
              onCheckedChange={checkBoxHandler}
              checked={l.isComplete}
              id="c1"
              tabIndex={1}
            >
              {!l.isComplete && <div><SquareIcon className="text-c-base"/></div>}
              <Checkbox.Indicator className="">
                {l.isComplete && <div className="relative flex">
                  <SquareIcon className="text-t-base"/>
                  <CheckIcon className="absolute text-t-base"/>
                </div>}
              </Checkbox.Indicator>
            </Checkbox.Root>
            <EditableSpan
              className={'text-c-base ' + (l.isComplete ? 'line-through text-t-base ' : '')}
              callback={(p: string) => titleChangeHandler(p)} title={l.title}/>
            {/*<span className={'text-c-base ' + (l.isComplete ? 'line-through text-t-base ' : '')}>{l.title}</span>*/}
            <button tabIndex={2} className="" onClick={buttonHandler}><TrashIcon
              className="text-c-select-1"/>
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