import React, {useState} from "react";

interface EditableSpan {
  title: string | undefined;
  callback: (p: string) => void;
  className?: string;
}

export function EditableSpan({title, callback, className}: EditableSpan) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');


  const editModeHandler = () => {
    setEditMode(true);
    title && setNewTitle(title);
  };
  const vievModeHandler = () => {
    callback(newTitle);
    setEditMode(false);
  };
  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      callback(newTitle);
      setEditMode(false);
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };
  return (
    <>
      {editMode ?
        <input className={className} value={newTitle} onChange={inputChangeHandler}
               onKeyDown={keyHandler}
               onBlur={vievModeHandler} autoFocus></input> :
        <span className={className} onDoubleClick={editModeHandler}>{title}</span>
      }
    </>
  );
}