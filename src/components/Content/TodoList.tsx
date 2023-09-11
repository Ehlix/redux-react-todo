import {EptaInput} from "./EptaInput.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {addTodo, removeTodo, toggleStatus} from "../../store/todoSlice";
import React, {useState} from "react";

export function Todolist() {
  const [status, setStatus] = useState<'all' | 'current' | 'complete'>('all');
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos.list);
  const newTodos = todos.filter(t => {
    if (status === 'current') {
      return t.isComplete === false;
    }
    if (status === 'complete') {
      return t.isComplete === true;
    }
    return t;
  });

  const placeholder = 'Add todo';
  const eptaHandler = (text: string) => {

    dispatch(addTodo(text));
    // if (status === "complete") {
    //   setStatus("current")
    // }
  };


  return <div>
    <h3 className="text-3xl font-bold underline">{'Todo List'}</h3>
    <EptaInput placeholder={placeholder} callbackHandler={(a) => eptaHandler(a)}/>
    <div className=''>
      {newTodos.map((t) => {
        const buttonDeleteHandler = () => {
          dispatch(removeTodo(t.id));
        };

        const inputCheckedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(toggleStatus({id: t.id, status: e.currentTarget.checked}));
        };

        return <div key={t.id} className='flex justify-between my-1'>
          <input
            type="checkbox"
            checked={t.isComplete}
            onChange={inputCheckedHandler}
          />
          <span>{t.title}</span>
          <button onClick={buttonDeleteHandler}>X</button>
        </div>;
      })}
    </div>

    <div className='flex gap-1'>
      <button className={(status === "all" && 'bg-fuchsia-700') + ' grow'}
              onClick={() => setStatus('all')}>All
      </button>
      <button className={(status === "current" && 'bg-fuchsia-700') + ' grow'}
              onClick={() => setStatus('current')}>Current
      </button>
      <button className={(status === "complete" && 'bg-fuchsia-700') + ' grow'}
              onClick={() => setStatus('complete')}>Complete
      </button>
    </div>
  </div>;
}