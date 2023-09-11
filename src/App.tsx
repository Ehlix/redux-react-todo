// import {v1} from "uuid";

import {Todolist} from "./components/Content/TodoList.tsx";

function App() {

  return (
    <div>
      <Todolist/>
    </div>
  );
}

export default App;


// const listId = v1();
// const listId2 = v1();
// const TodoLists = {
//   [listId]: {
//     listTitle: 'what learn',
//     todos: [
//       {id: v1(), title: 'learn react', isComplete: false},
//       {id: v1(), title: 'learn redux', isComplete: false},
//       {id: v1(), title: 'learn ass', isComplete: false},
//     ],
//   },
//   [listId2]: {
//     listTitle: 'what buy',
//     todos: [
//       {id: v1(), title: 'apple', isComplete: false},
//       {id: v1(), title: 'orange', isComplete: false},
//       {id: v1(), title: 'chicken', isComplete: false},
//     ],
//   },
// };
// todoLists2[0].todos[0].title
// const TodoLists2 = [
//   {
//     listId: v1(),
//     listTitle: 'what learn',
//     todos: [
//       {id: v1(), title: 'learn react', isComplete: false},
//       {id: v1(), title: 'learn redux', isComplete: false},
//       {id: v1(), title: 'learn ass', isComplete: false},
//     ],
//   },
//   {
//     listId: v1(),
//     listTitle: 'what buy',
//     todos: [
//       {id: v1(), title: 'apple', isComplete: false},
//       {id: v1(), title: 'orange', isComplete: false},
//       {id: v1(), title: 'chicken', isComplete: false},
//     ],
//   },
// ];
