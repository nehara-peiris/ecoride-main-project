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
      style={{
        marginBottom: "24px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>
        {form.id ? "Edit Maintenance Job" : "Add Maintenance Job"}
      </h2>

      <div style={{ display: "grid", gap: "12px" }}>
        <input
          name="vehicleCode"
          placeholder="Vehicle Code"
          value={form.vehicleCode}
          onChange={handleChange}
        />

        <input
          name="issueType"
          placeholder="Issue Type"
          value={form.issueType}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="">Select Priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
          <option value="CRITICAL">CRITICAL</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange}>
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
        />

        <input
          name="completedDate"
          type="date"
          value={form.completedDate || ""}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
        <button type="submit">
          {form.id ? "Update Job" : "Add Job"}
        </button>

        {form.id && (
          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              onCancelEdit();
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}