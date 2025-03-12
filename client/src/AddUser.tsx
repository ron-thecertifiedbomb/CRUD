import React, {
  useState,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { User } from "./type";
import { fetchApi } from "./service/fetchApi";

type AddUserProps = {
  addModal: boolean;
  setAddModal: Dispatch<SetStateAction<boolean>>;
};

const AddUser: React.FC<AddUserProps> = ({ addModal, setAddModal }) => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputAge, setInputAge] = useState<number | "">("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (addModal) {
      inputRef.current?.focus();
    }
  }, [addModal]);

  const handleNameChange = (value: string) => {
    setInputName(value);
  };

  const handleEmailChange = (value: string) => {
    setInputEmail(value);
  };

  const handleAgeChange = (value: string) => {
    const numericValue = Number(value);
    if (value === "") {
      setInputAge("");
    } else if (!isNaN(numericValue) && numericValue >= 0) {
      setInputAge(numericValue);
    }
  };

  const addUser = async () => {
    const payLoad: User = {
      name: inputName,
      email: inputEmail,
      age: inputAge,
    };

    try {
      const response = await fetchApi(
        "https://node-server-d14o.onrender.com/api/users",
        "POST",
        payLoad
      );

      if (!response) {
        console.error("Failed to add user:", response);
        return null;
      }
      const data = response;
      console.log("Successfully added user:", response);

      setInputName("");
      setInputEmail("");
      setInputAge("");
      setTimeout(() => {
        setAddModal(false);
      }, 400);
      return data;
    } catch (error) {
      console.error("Error adding user:", error);
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div
      style={{
        display: addModal ? "flex" : "none",
        zIndex: 99,
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.9,
        flexDirection: "column",
        gap: 10,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "200px",
        }}
      >
        <input
          name="name"
          value={inputName}
          ref={inputRef}
          placeholder="name"
          onChange={(e) => handleNameChange(e.target.value)}
        />
        <input
          name="email"
          value={inputEmail}
          placeholder="email"
          onChange={(e) => handleEmailChange(e.target.value)}
        />
        <input
          name="age"
          value={inputAge}
          placeholder="age"
          onChange={(e) => handleAgeChange(e.target.value)}
        />

        <button type="submit">Add User</button>
      </form>
      <button
        onClick={() => {
          setAddModal(true);
        }}
      >
        Close Form
      </button>
    </div>
  );
};

export default AddUser;
