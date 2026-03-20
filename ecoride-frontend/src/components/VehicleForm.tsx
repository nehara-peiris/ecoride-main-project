import { useEffect, useState } from "react";
import api from "../services/api";
import type { Vehicle } from "../types/Vehicle";

const initialForm: Vehicle = {
  vehicleCode: "",
  model: "",
  type: "",
  status: "",
  batteryLevel: 0,
  latitude: 0,
  longitude: 0,
  speed: 0,
};

type VehicleFormProps = {
  selectedVehicle: Vehicle;
  onSaved: () => void;
  onCancelEdit: () => void;
};

export default function VehicleForm({
  selectedVehicle,
  onSaved,
  onCancelEdit,
}: VehicleFormProps) {
  const [form, setForm] = useState<Vehicle>(initialForm);

  useEffect(() => {
    setForm(selectedVehicle.id ? selectedVehicle : initialForm);
  }, [selectedVehicle]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "batteryLevel" ||
        name === "latitude" ||
        name === "longitude" ||
        name === "speed"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (form.id) {
        await api.put(`/api/v1/vehicles/${form.id}`, form);
        alert("Vehicle updated successfully");
      } else {
        await api.post("/api/v1/vehicles", form);
        alert("Vehicle created successfully");
      }

      setForm(initialForm);
      onSaved();
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to save vehicle");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-900">
          {form.id ? "Edit Vehicle" : "Add Vehicle"}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Enter vehicle details and operational status.
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
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />

        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        >
          <option value="">Select Status</option>
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="IN_USE">IN_USE</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
          <option value="OFFLINE">OFFLINE</option>
        </select>

        <input
          name="batteryLevel"
          type="number"
          placeholder="Battery Level"
          value={form.batteryLevel}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />

        <input
          name="speed"
          type="number"
          step="any"
          placeholder="Speed"
          value={form.speed}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />

        <input
          name="latitude"
          type="number"
          step="any"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />

        <input
          name="longitude"
          type="number"
          step="any"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-emerald-400"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          {form.id ? "Update Vehicle" : "Add Vehicle"}
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