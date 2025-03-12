import React from "react";

interface UpdateUserFormProps {
  value: string;
  name: string;
  placeholder: string;
  isOpen: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  handleChange: (value: string) => void;
}

const TextInput: React.FC<UpdateUserFormProps> = ({
  name,
  value,
  inputRef,
  placeholder,
  handleChange,
}) => {
  return (
    <>
      <input
        name={name}
        value={value}
        ref={inputRef}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
};

export default TextInput;
