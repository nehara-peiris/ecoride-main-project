import { useState } from "react";
import api from "../services/api";
import type { User } from "../types/User";

const initialForm: User = {
  fullName: "",
  email: "",
  phone: "",
  licenseNumber: "",
  accountBalance: 0,
};

export default function UserForm() {
  const [form, setForm] = useState<User>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "accountBalance" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/api/v1/users", form);
      alert("User created successfully");
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input name="licenseNumber" placeholder="License Number" value={form.licenseNumber} onChange={handleChange} />
      <input name="accountBalance" type="number" placeholder="Balance" value={form.accountBalance} onChange={handleChange} />
      <button type="submit">Add User</button>
    </form>
  );
}