import {EptaInput} from "./EptaInput.tsx";
import React from "react";

interface CreateTodoFormProps {
  eptaHandlerCreateTodo: (text: string) => void;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({eptaHandlerCreateTodo}) => {
  return (
    <>
      <EptaInput maxLength={40} placeholder="add title" buttonName="Create Todo List"
                 callbackHandler={t => eptaHandlerCreateTodo(t)}/>
    </>

  );
};
