import React, {ChangeEvent, useState} from "react";

interface EptaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  callbackHandler: (text: string) => void,
  buttonName?: string
}

export const EptaInput: React.FC<EptaInputProps> = ({
                                                      children,
                                                      callbackHandler,
                                                      buttonName,
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

  return <>
    <form className="relative flex items-center justify-between gap-0"
          onSubmit={(e) => buttonHandler(e)}>
      <input
        className="flex shrink grow appearance-none items-center justify-center bg-opacity-10 leading-none placeholder:text-opacity-60 outline-none bg-c-base text-t-base placeholder:text-c-base h-[35px] w-[200px] px-[10px] text-[15px] selection:color-white hover:shadow-[inset_0_-2px] focus:placeholder:text-t-base hover:shadow-c-base focus:placeholder:text-opacity-30 focus:bg-white"
        type="text"
        placeholder="placeholder"
        {...attributes}
        value={text}
        onChange={(e) => inputHandler(e)}
        tabIndex={1}
      />
      <button
        type="submit"
        className="px-5 bg-c-base text-t-base p-[5.5px]"
        tabIndex={1}
      >{buttonName ? buttonName : 'Add'}
      </button>


      {error &&
        <div className="absolute mt-14 font-bold text-c-error">ERROR!!! FIELD IS EMPTY</div>}
    </form>
  </>;
};