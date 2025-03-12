import React, {
  useState,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { User, UserPayload } from "./type";
import { fetchApi } from "./service/fetchApi";

interface UpdateUserFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  userId: number | null;
  selectedUser: UserPayload | undefined;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  isOpen,
  userId,
  setIsOpen,
  selectedUser,
}) => {
  const defaultUser: UserPayload = { name: "", email: "", age: 0 };
  const user = selectedUser ?? defaultUser;
  const [inputName, setInputName] = useState(user.name);
  const [inputEmail, setInputEmail] = useState(user.email);
  const [inputAge, setInputAge] = useState(user.age);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (selectedUser) {
      setInputName(selectedUser.name);
      setInputEmail(selectedUser.email);
      setInputAge(selectedUser.age);
    }
  }, [selectedUser]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isOpen]);

  const updateNameChange = (value: string) => {
    setInputName(value);
  };

  const updateEmailChange = (value: string) => {
    setInputEmail(value);
  };

  const updateAgeChange = (value: string) => {
    const numericValue = Number(value);
    if (value === "") {
      setInputAge("");
    } else if (!isNaN(numericValue) && numericValue >= 0) {
      setInputAge(numericValue);
    }
  };

  const payload: User = {
    name: inputName,
    email: inputEmail,
    age: inputAge,
  };

  const updateUser = async () => {
    try {
      const response = await fetchApi(
        `https://node-server-d14o.onrender.com/api/user/${userId}`, 'PUT',
        payload
      );
      console.log(response);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser();
  };

  return (
    <div
      style={{
        display: isOpen ? "flex" : "none",
        zIndex: 99,
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "black",
      }}
    >
      <form
        onSubmit={handleUpdate}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "200px",
          margin: "auto",
        }}
      >
        <input
          name="name"
          value={inputName}
          ref={inputRef}
          placeholder="Name"
          onChange={(e) => updateNameChange(e.target.value)}
        />
        <input
          name="email"
          value={inputEmail}
          placeholder="Email"
          onChange={(e) => updateEmailChange(e.target.value)}
        />
        <input
          name="age"
          value={inputAge}
          placeholder="Age"
          onChange={(e) => updateAgeChange(e.target.value)}
        />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
