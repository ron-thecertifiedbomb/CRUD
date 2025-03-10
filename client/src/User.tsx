import React, { useEffect, useState } from "react";

interface User { id: number; name: string; email: string; }

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
        <>
            <h2>Users List</h2>
            {users.map(user => (
                <React.Fragment key={user.id}>
                    <p>name: {user.name}</p>
                    <p>email: {user.email}</p>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                </React.Fragment>
            ))}
        </>
    );
};

export default UsersList;
