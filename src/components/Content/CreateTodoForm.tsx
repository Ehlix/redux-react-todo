import {EptaInput} from "./EptaInput.tsx";
import React from "react";
import {Label} from "@radix-ui/react-label";

interface CreateTodoFormProps {
  eptaHandlerCreateTodo: (text: string) => void;
}

export const CreateTodoForm: React.FC<CreateTodoFormProps> = ({eptaHandlerCreateTodo}) => {
  return (
    <>
      <Label className="">Create Todo:</Label>
      <EptaInput maxLength={40} placeholder="add title"
                 callbackHandler={t => eptaHandlerCreateTodo(t)}/>
    </>

  );
};
