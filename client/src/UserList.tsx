import React, { Dispatch, SetStateAction } from "react";
import { User, UserPayload } from "./type";
import { fetchApi } from "./service/fetchApi";

interface UsersListProps {
  setUserId: (id: number | null) => void;
  setUsers: Dispatch<SetStateAction<User[]>>;
  users: User[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedUser: Dispatch<SetStateAction<UserPayload | undefined>>;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  setUsers,
  setSelectedUser,
  setUserId,
  setIsOpen,
}) => {
  const handleDeleteUser = async (id?: number) => {
    try {
      const response = await fetchApi(
        `https://node-server-d14o.onrender.com/api/user/${id}`,
        "DELETE"
      );

      if (response) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const getUser = async (id: number | null) => {
    if (id === null) {
      console.error("Error: User ID is null");
      return;
    }

    try {
      const response = await fetch(
        `https://node-server-d14o.onrender.com/api/user/${id}`
      );

      if (response.ok) {
        const user = await response.json();
        setSelectedUser(user);
        setIsOpen(true);
        return user;
      } else {
        console.error("Error: Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleGetUserID = (id: number | undefined) => {
    setUserId(id ?? null); // Convert undefined to null
    getUser(id ?? null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "0.7px solid grey",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>List of Users</h2>
      {users?.map((user) => (
        <React.Fragment key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email Address: {user.email}</p>
          <p>Age: {user.age}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,

              paddingRight: 10,
            }}
          >
            <p style={{ textAlign: "end", fontWeight: 500 }}>Delete User</p>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "black",
                color: "white",
                padding: 8,
                borderRadius: 15,
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => handleGetUserID(user.id)}
            >
              <p style={{ fontSize: 12 }}>Update</p>
            </button>
            <button
              onClick={() => handleDeleteUser(user.id)}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
                color: "white",
                width: 25,
                height: 25,
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default UsersList;
