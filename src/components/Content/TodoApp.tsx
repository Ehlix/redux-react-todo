import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {addTodo, createTodo,} from "../../store/todoSlice";
import {useEffect, useState} from "react";

import {CreateTodoForm} from "./CreateTodoForm.tsx";
import {AllTodosList} from "./AllTodosList.tsx";
import {MainTodo} from "./MainTodo.tsx";

export interface TodosListStatusState {
  [key: string]: 'all' | 'current' | 'complete';
}

export interface CurrentTodoState {
  todoId: string;
  todoTitle: string;
  list: string;
}

export function TodoApp() {

  const todosList = useAppSelector(state => state.todos.todosList);
  const lists = useAppSelector(state => state.todos.lists);
  const [todosListStatus, setTodosListStatus] = useState<TodosListStatusState>();
  const [currentTodo, setCurrentTodo] = useState<CurrentTodoState>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setCurrentTodo(todosList[0]);
  }, [todosList]);


  const curTodo = currentTodo && lists[currentTodo.list].filter(q => {
    if (!todosListStatus) return q;
    if (todosListStatus[currentTodo.todoId] === 'current') {
      return q.isComplete === false;
    }
    if (todosListStatus[currentTodo.todoId] === 'complete') {
      return q.isComplete === true;
    } else {
      return q;
    }
  });
  const eptaHandlerCreateTodo = (text: string) => {

    dispatch(createTodo(text));
  };
  const eptaHandlerAddTodo = (todoId: string, id: string, text: string) => {

    dispatch(addTodo({todoListId: id, title: text}));
    if (todosListStatus && todosListStatus[todoId] === 'complete') {
      setTodosListStatus({...todosListStatus, [todoId]: 'all'});
    }
  };
  const getFilter = (filter: 'all' | 'current' | 'complete') => {
    currentTodo && setTodosListStatus({...todosListStatus, [currentTodo.todoId]: filter});
  };


  return (
    <div className="flex h-full flex-col gap-5">
      <div className="mb-5 flex items-center gap-5">
        <CreateTodoForm eptaHandlerCreateTodo={eptaHandlerCreateTodo}/>
      </div>
      <div className="flex gap-5 h-[100%]">
        <div className="flex flex-col w-[20%] h-[80vh] sm:hidden lg:w-[25%]">
          <AllTodosList todosList={todosList} currentTodo={currentTodo}
                        setCurrentTodo={setCurrentTodo} dispatch={dispatch}/>
        </div>
        <div
          className={"flex grow flex-col overflow-auto p-5 h-[80vh] mx-[4%] sm:mx-0 " + (curTodo ? ' bg-gradient-to-t from-1a to-2a ' : '')}>
          {curTodo &&
            <MainTodo currentTodo={currentTodo} curTodo={curTodo} getFilter={getFilter}
                      eptaHandlerAddTodo={eptaHandlerAddTodo} dispatch={dispatch}
                      todosListStatus={todosListStatus}/>}
        </div>
      </div>
    </div>
  );
}

