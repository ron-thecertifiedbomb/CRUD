import React, { useEffect, useState } from "react";

interface User { id: number; name: string; email: string; age: number }

const UsersList: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/users");
            const data: User[] = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
    
            if (response.ok) {
                const result = await response.json(); // Call response.json()
                console.log(result); // Log the success message from the server
    
                setUsers(users.filter(user => user.id !== id));
            } else {
                console.error("Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    
    useEffect(() => { fetchUsers(); }, []);

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>List of Users</h2>
        {users.map((user) => (
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
                onClick={() => deleteUser(user.id)}
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
