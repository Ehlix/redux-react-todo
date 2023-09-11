import React, {ChangeEvent, useState} from "react";

interface EptaInputProps extends React.HTMLAttributes<HTMLInputElement> {
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
  const buttonHandler = () => {
    if (text.trim()) {
      callbackHandler(text);
    } else {
      setError("error");
    }
    setText('');
  };

  return <div className='flex'>
    <input
      className='bg-amber-50 text-gray-900'
      type="text"
      placeholder="placeholder"
      {...attributes}
      value={text}
      onChange={(e) => inputHandler(e)}
    />
    <button
      className='ml-1 bg-amber-50 px-2 text-gray-900'
      onClick={buttonHandler}
    >Add
    </button>
    {error && <div style={{color: "red"}}>ERROR PLEASE FILL THE FIELD</div>}
  </div>;
};