import {Todolist} from "./components/Content/TodoList.tsx";
import {initialStateFromLocalStorage} from "./store/localStorage.ts";
import {useAppDispatch} from "./hooks.ts";
import {setInitialState} from "./store/todoSlice.ts";
import {useEffect} from "react";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initTodos = initialStateFromLocalStorage();
    initTodos && dispatch(setInitialState(initTodos));
  }, []);


  return (
    <div >
      <Todolist/>
    </div>
  );
}

export default App;