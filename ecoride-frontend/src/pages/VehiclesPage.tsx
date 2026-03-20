import { useEffect, useState } from "react";
import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import api from "../services/api";
import type { Vehicle } from "../types/Vehicle";

const emptyVehicle: Vehicle = {
  vehicleCode: "",
  model: "",
  type: "",
  status: "",
  batteryLevel: 0,
  latitude: 0,
  longitude: 0,
  speed: 0,
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle>(emptyVehicle);
  const [loading, setLoading] = useState(false);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const res = await api.get<Vehicle[]>("/api/v1/vehicles");
      setVehicles(res.data);
    } catch (error) {
      console.error("Failed to load vehicles", error);
      alert("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;

    try {
      await api.delete(`/api/v1/vehicles/${id}`);
      alert("Vehicle deleted successfully");
      loadVehicles();

      if (selectedVehicle.id === id) {
        setSelectedVehicle(emptyVehicle);
      }
    } catch (error) {
      console.error("Failed to delete vehicle", error);
      alert("Failed to delete vehicle");
    }
  };

  const handleSaved = () => {
    setSelectedVehicle(emptyVehicle);
    loadVehicles();
  };

  const handleCancelEdit = () => {
    setSelectedVehicle(emptyVehicle);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Vehicles</h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage your fleet, vehicle status, location, and battery details.
        </p>
      </div>

      <VehicleForm
        selectedVehicle={selectedVehicle}
        onSaved={handleSaved}
        onCancelEdit={handleCancelEdit}
      />

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading vehicles...</p>
        </div>
      ) : (
        <VehicleList
          vehicles={vehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}