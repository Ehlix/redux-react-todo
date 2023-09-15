import {EptaInput} from "./EptaInput.tsx";
import React from "react";

interface CreateTodoFormProps {
  eptaHandlerCreateTodo: (text: string)=>void
}
export const CreateTodoForm:React.FC<CreateTodoFormProps> = ({eptaHandlerCreateTodo}) => {
  return (
    <div>
      <h2 className="">Create Todo!</h2>
      <EptaInput maxLength={40} placeholder="add title"
                 callbackHandler={t => eptaHandlerCreateTodo(t)}/>
    </div>

  );
};
