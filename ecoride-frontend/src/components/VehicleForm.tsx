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
      style={{
        marginBottom: "24px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>
        {form.id ? "Edit Vehicle" : "Add Vehicle"}
      </h2>

      <div style={{ display: "grid", gap: "12px" }}>
        <input
          name="vehicleCode"
          placeholder="Vehicle Code"
          value={form.vehicleCode}
          onChange={handleChange}
        />

        <input
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
        />

        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
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
        />

        <input
          name="latitude"
          type="number"
          step="any"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
        />

        <input
          name="longitude"
          type="number"
          step="any"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
        />

        <input
          name="speed"
          type="number"
          step="any"
          placeholder="Speed"
          value={form.speed}
          onChange={handleChange}
        />
      </div>

      <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
        <button type="submit">
          {form.id ? "Update Vehicle" : "Add Vehicle"}
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