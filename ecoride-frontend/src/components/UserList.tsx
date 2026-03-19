import { useEffect, useState } from "react";
import api from "../services/api";
import type { User } from "../types/User";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    try {
      const res = await api.get<User[]>("/api/v1/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p><strong>{user.fullName}</strong></p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.licenseNumber}</p>
          <p>Balance: {user.accountBalance}</p>
        </div>
      ))}
    </div>
  );
}