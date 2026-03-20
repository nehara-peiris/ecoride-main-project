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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">Users</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage rider profiles and account details.
        </p>
      </div>

      <UserForm
        selectedUser={selectedUser}
        onSaved={() => {
          setSelectedUser(emptyUser);
          loadUsers();
        }}
        onCancelEdit={() => setSelectedUser(emptyUser)}
      />

      {loading ? (
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-slate-600">Loading users...</p>
        </div>
      ) : (
        <UserList
          users={users}
          onEdit={setSelectedUser}
          onDelete={async (id) => {
            if (!id) return;
            await api.delete(`/api/v1/users/${id}`);
            loadUsers();
          }}
        />
      )}
    </div>
  );
}