import React, {ChangeEvent, useState} from "react";

interface EptaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  callbackHandler: (text: string) => void,
}

export const EptaInput: React.FC<EptaInputProps> = ({
                                                      children,
                                                      callbackHandler,
                                                      ...attributes
                                                    }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<'error' | ''>('');

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    setError('');
  };
  const buttonHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim()) {
      callbackHandler(text);
    } else {
      setError("error");
    }
    setText('');
  };

  return <div className="">
    <form onSubmit={(e) => buttonHandler(e)}>
      <input
        className="inline-flex w-72 appearance-none items-center justify-center bg-purple-200 selection:bg-pink-300 bg-opacity-10 leading-none text-gray-900 placeholder:text-purple-300 placeholder:text-opacity-40 shadow-gray-900 outline-none h-[35px] w-[200px] px-[10px] text-[15px] selection:color-white hover:shadow-[inset_0_0_0_1px] focus:placeholder:text-gray-900 focus:placeholder:text-opacity-50 hover:shadow-amber-50 focus:bg-white"
        type="text"
        placeholder="placeholder"
        {...attributes}
        value={text}
        onChange={(e) => inputHandler(e)}
        tabIndex={1}
      />
      <button
        type="submit"
        className="ml-1 px-2 text-gray-300"
        tabIndex={1}
      >Add
      </button>
      {error && <div style={{color: "red"}}>ERROR!!! FIELD IS EMPTY</div>}

    </form>
  </div>;
};