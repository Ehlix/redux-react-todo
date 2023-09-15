import {TodoApp} from "./components/Content/TodoApp.tsx";
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
    <div className="container flex flex-col h-screen">
      <header>
        <nav>
          Header
        </nav>
      </header>

      <main className='grow basis-auto'>
        <TodoApp/>
      </main>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default App;