import { useCallback, useEffect, useState } from "react";
import AddUser from "./AddUser";
import UsersList from "./UserList";
import UpdateForm from "../UpdateForm";
import { User, UserPayload } from "./type";

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
 const [selectedUser, setSelectedUser] = useState<UserPayload | undefined>(
   undefined
 );

  const [isOpen, setIsOpen] = useState<boolean>(false);
 const [addModal, setAddModal] = useState<boolean>(false);
    const fetchUsers = useCallback(async () => {
      try {
        const response = await fetch(
          "https://node-server-d14o.onrender.com/api/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }, [setUsers]);
  
    useEffect(() => {
      fetchUsers();
    }, [fetchUsers, users]);

  return (
    <div
      style={{
        height: "100vh",
        gap: 10,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: 'column'
      }}
    >
      <>
        <UsersList
          users={users}
          setSelectedUser={setSelectedUser}
          setUserId={setUserId}
          setIsOpen={setIsOpen}
        />
        <button onClick={() => {setAddModal(true)}}> Add Users</button>
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
