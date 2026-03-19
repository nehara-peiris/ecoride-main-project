import { useEffect, useState } from "react";
import api from "../services/api";
import type { User } from "../types/User";

const initialForm: User = {
  fullName: "",
  email: "",
  phone: "",
  licenseNumber: "",
  accountBalance: 0,
};

type UserFormProps = {
  selectedUser: User;
  onSaved: () => void;
  onCancelEdit: () => void;
};

export default function UserForm({
  selectedUser,
  onSaved,
  onCancelEdit,
}: UserFormProps) {
  const [form, setForm] = useState<User>(initialForm);

  useEffect(() => {
    setForm(selectedUser.id ? selectedUser : initialForm);
  }, [selectedUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "accountBalance" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (form.id) {
        await api.put(`/api/v1/users/${form.id}`, form);
        alert("User updated successfully");
      } else {
        await api.post("/api/v1/users", form);
        alert("User created successfully");
      }

      setForm(initialForm);
      onSaved();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "24px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>
        {form.id ? "Edit User" : "Add User"}
      </h2>

      <div style={{ display: "grid", gap: "12px" }}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="licenseNumber"
          placeholder="License Number"
          value={form.licenseNumber}
          onChange={handleChange}
        />

        <input
          name="accountBalance"
          type="number"
          placeholder="Balance"
          value={form.accountBalance}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
        <button type="submit">
          {form.id ? "Update User" : "Add User"}
        </button>

        {form.id && (
          <button type="button" onClick={() => {
            setForm(initialForm);
            onCancelEdit();
          }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}