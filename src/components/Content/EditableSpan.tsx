import React, {useState} from "react";

interface EditableSpan {
  title: string;
  callback: (p: string) => void;
  className?: string;
}

export function EditableSpan({title, callback, className}: EditableSpan) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');


  const editModeHandler = () => {
    setNewTitle(title);
    setEditMode(true);
  };
  const viewModeHandler = () => {
    if (newTitle.trim()) {
      callback(newTitle.trim());
    }
    setEditMode(false);
  };
  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (newTitle.trim()) {
        callback(newTitle.trim());
      }
      setEditMode(false);
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value.trimStart());
  };
  return (
    <>
      {editMode ?
        <input
          placeholder="field is empty"
          className={"flex items-center justify-center text-center appearance-none bg-opacity-10 leading-none placeholder:text-opacity-60 outline-none bg-c-base w-full text-t-base placeholder:text-c-error h-[31px] px-[10px] text-[15px] selection:color-white focus:placeholder:text-c-error focus:placeholder:text-opacity-60 focus:bg-white " + className}
          value={newTitle} onChange={inputChangeHandler}
          onKeyDown={keyHandler}
          onBlur={viewModeHandler} autoFocus></input> :
        <span className={'w-full text-center ' + className}
              onDoubleClick={editModeHandler}>{title}</span>
      }
    </>
  );
}