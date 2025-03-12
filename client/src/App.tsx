import { useCallback, useEffect, useState } from "react";
import AddUser from "./AddUser";
import UsersList from "./UserList";
import UpdateForm from "./UpdateUserForm";
import { User } from "./type";
import { fetchApi } from "./service/fetchApi";
import QrCodeGenerator from "./components/QrCodeGenerator/QrCodeGenerator";

function App() {
  const [userId, setUserId] = useState<number | null>(null);
const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [addModal, setAddModal] = useState<boolean>(false);



const fetchUsers = useCallback(async () => {
  try {
    const response = await fetchApi(
      "https://node-server-d14o.onrender.com/api/users",
      "GET"
    );
    if (response && Array.isArray(response)) {
      setUsers((prevUsers) =>
        JSON.stringify(prevUsers) !== JSON.stringify(response)
          ? response
          : prevUsers
      );
    } else {
      console.error("Response is not an array of users:", response);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}, []); // Stable function reference

useEffect(() => {
  fetchUsers();
}, [fetchUsers, isOpen, addModal, users]);
  return (
    <div
      style={{
        height: "100vh",
        gap: 10,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <>
        <UsersList
          users={users}
          setSelectedUser={setSelectedUser}
          setUserId={setUserId}
          setIsOpen={setIsOpen}
          setUsers={setUsers}
        />
        <button
          onClick={() => {
            setAddModal(true);
          }}
        >
          {" "}
          Add Users
        </button>
        <QrCodeGenerator />
        <AddUser addModal={addModal} setAddModal={setAddModal} />
        <UpdateForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userId={userId}
          selectedUser={selectedUser}
        />
      </>
    </div>
  );
}

export default App;
