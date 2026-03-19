import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import api from "../services/api";
import type { User } from "../types/User";

const emptyUser: User = {
  fullName: "",
  email: "",
  phone: "",
  licenseNumber: "",
  accountBalance: 0,
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>(emptyUser);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get<User[]>("/api/v1/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Failed to load users", error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;

    try {
      await api.delete(`/api/v1/users/${id}`);
      alert("User deleted successfully");
      loadUsers();

      if (selectedUser.id === id) {
        setSelectedUser(emptyUser);
      }
    } catch (error) {
      console.error("Failed to delete user", error);
      alert("Failed to delete user");
    }
  };

  const handleSaved = () => {
    setSelectedUser(emptyUser);
    loadUsers();
  };

  const handleCancelEdit = () => {
    setSelectedUser(emptyUser);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>EcoRide - Users</h1>

      <UserForm
        selectedUser={selectedUser}
        onSaved={handleSaved}
        onCancelEdit={handleCancelEdit}
      />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}