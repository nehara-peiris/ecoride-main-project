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
      } else {
        await api.post("/api/v1/users", form);
      }

      setForm(initialForm);
      onSaved();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to save user");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-900">
          {form.id ? "Edit User" : "Add User"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Fill in the user details below.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />
        <input
          name="licenseNumber"
          placeholder="License Number"
          value={form.licenseNumber}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />
        <input
          name="accountBalance"
          type="number"
          placeholder="Account Balance"
          value={form.accountBalance}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 md:col-span-2"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          {form.id ? "Update User" : "Add User"}
        </button>

        {form.id && (
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              onCancelEdit();
            }}
            className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}