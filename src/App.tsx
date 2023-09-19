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
    <div className="container flex h-screen flex-col overflow-hidden px-[2%]">
      <header className="py-5">
        <nav>

        </nav>
      </header>

      <main className="grow basis-auto">
        <TodoApp/>
      </main>
      <footer>
        <span className="text-sm opacity-50">Ehlix 2023</span>
      </footer>
    </div>
  );
}

export default App;