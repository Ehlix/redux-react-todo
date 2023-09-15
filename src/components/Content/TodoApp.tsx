import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {
  addTodo,
  createTodo,
} from "../../store/todoSlice";
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
    <div className="flex">
      <div className="">
        <CreateTodoForm eptaHandlerCreateTodo={(t: string) => eptaHandlerCreateTodo(t)}/>
        <AllTodosList todosList={todosList} currentTodo={currentTodo}
                      setCurrentTodo={setCurrentTodo} dispatch={dispatch}/>
      </div>
      <div className="">
        {curTodo &&
          <MainTodo currentTodo={currentTodo} curTodo={curTodo} getFilter={getFilter}
                    eptaHandlerAddTodo={eptaHandlerAddTodo} dispatch={dispatch}
                    todosListStatus={todosListStatus}/>}
      </div>
    </div>
  );
}
