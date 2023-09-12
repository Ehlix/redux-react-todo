import {EptaInput} from "./EptaInput.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {
  addTodo,
  createTodo,
  removeTodo,
  removeTodoList,
  toggleStatus
} from "../../store/todoSlice";
import React, {useEffect, useState} from "react";
import {TodoStatusBar} from "./TodoStatusBar.tsx";

interface TodosListStatusState {
  [key: string]: 'all' | 'current' | 'complete';
}

interface CurrentTodoState {
  todoId: string;
  todoTitle: string;
  list: string;
}

export function Todolist() {

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


  return <div className="flex p-10 pl-5">
    <div className="bg-gray-700 bg-opacity-30 ml-0 mb-10 p-5">
      <h2 className="text-4xl font-bold pb-2 text-amber-50">Create Todo</h2>
      <EptaInput maxLength={40} placeholder="add title"
                 callbackHandler={t => eptaHandlerCreateTodo(t)}/>
      <div className="flex flex-col my-10 mb-0">
        <h3 className="text-3xl font-bold pb-2">Todos List:</h3>
        {todosList.map(t => {
          const color = currentTodo?.todoId === t.todoId ? ' bg-fuchsia-500' : ' ';
          const buttonHandler = () => {
            setCurrentTodo({todoId: t.todoId, todoTitle: t.todoTitle, list: t.list});
          };
          const deleteButtonHandler = () => {
            dispatch(removeTodo(t.todoId));
          };
          return <div className="flex mb-5">
            <button
              onClick={buttonHandler}
              className={'grow mr-1 ' + color}>
              <span className="">{t.todoTitle}</span>
            </button>
            <button onClick={deleteButtonHandler}>X</button>
          </div>;
        })}
      </div>
    </div>
    <div className="pt-28 pl-20">
      {curTodo && <div className="flex gap-10 flex-wrap">
        <div
          className="beg-gray-700 bg-opacity-50 p-5 flex flex-col gap-5 max-w-3xl"
        >
          <h3 className="text-3xl font-bold text-amber-50">{currentTodo.todoTitle}</h3>
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
              className="flex justify-between"
              key={l.id}>
              <input
                onChange={(e) => checkBoxHandler(e)}
                type="checkbox"
                checked={l.isComplete}
              />
              <span className="grow-0 w-full">{l.title}</span>
              <button className="grow-0" onClick={buttonHandler}>X</button>
            </div>;
          })
          }
          <TodoStatusBar
            curStatus={todosListStatus ? todosListStatus[currentTodo.todoId] : 'all'}
            getFilter={(q) => getFilter(q)}/>
        </div>

      </div>
      }
    </div>
  </div>;
}

