import {MyInput} from "./MyInput.tsx";
import React from "react";

interface CreateTodoFormProps {
  myInputHandlerCreateTodo: (text: string) => void;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({myInputHandlerCreateTodo}) => {
  return (
    <>
      <MyInput maxLength={40} placeholder="add title" buttonName="Create Todo List"
               callbackHandler={t => myInputHandlerCreateTodo(t)}/>
    </>

  );
};
