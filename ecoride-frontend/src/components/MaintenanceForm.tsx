import { useEffect, useState } from "react";
import api from "../services/api";
import type { MaintenanceJob } from "../types/MaintenanceJob";

const initialForm: MaintenanceJob = {
  vehicleCode: "",
  issueType: "",
  description: "",
  priority: "",
  status: "",
  scheduledDate: "",
  completedDate: "",
};

type MaintenanceFormProps = {
  selectedJob: MaintenanceJob;
  onSaved: () => void;
  onCancelEdit: () => void;
};

export default function MaintenanceForm({
  selectedJob,
  onSaved,
  onCancelEdit,
}: MaintenanceFormProps) {
  const [form, setForm] = useState<MaintenanceJob>(initialForm);

  useEffect(() => {
    setForm(selectedJob.id ? selectedJob : initialForm);
  }, [selectedJob]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (form.id) {
        await api.put(`/api/v1/maintenance/${form.id}`, form);
        alert("Maintenance job updated successfully");
      } else {
        await api.post("/api/v1/maintenance", form);
        alert("Maintenance job created successfully");
      }

      setForm(initialForm);
      onSaved();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to save maintenance job");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-900">
          {form.id ? "Edit Maintenance Job" : "Add Maintenance Job"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Log issues, set priority, and manage maintenance progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="vehicleCode"
          placeholder="Vehicle Code"
          value={form.vehicleCode}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />

        <input
          name="issueType"
          placeholder="Issue Type"
          value={form.issueType}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400 md:col-span-2"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        >
          <option value="">Select Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        >
          <option value="">Select Status</option>
          <option value="PENDING">PENDING</option>
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <input
          name="scheduledDate"
          type="date"
          value={form.scheduledDate || ""}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />

        <input
          name="completedDate"
          type="date"
          value={form.completedDate || ""}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          {form.id ? "Update Job" : "Add Job"}
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