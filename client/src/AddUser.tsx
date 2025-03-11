import React, { useState, useRef, useEffect, SetStateAction, Dispatch } from "react";
import { UserPayload } from "./type";

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
    const payLoad: UserPayload = {
      name: inputName,
      email: inputEmail,
      age: inputAge,
    };

    try {
      const response = await fetch(
        "https://node-server-d14o.onrender.com/api/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payLoad),
        }
      );

      if (!response.ok) {
        console.error("Failed to add user:", response.statusText);
        return null;
      }
      const data = await response.json();
        
      console.log("Successfully added user:", data);
      
      setInputName("");
      setInputEmail("");
      setInputAge("");
   setTimeout(() => {
     setAddModal(false);
   }, 300); 
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
        gap: 10
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
