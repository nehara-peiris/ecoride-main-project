import type { Vehicle } from "../types/Vehicle";

type VehicleListProps = {
  vehicles: Vehicle[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id?: string) => void;
};

export default function VehicleList({
  vehicles,
  onEdit,
  onDelete,
}: VehicleListProps) {
  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>Vehicle List</h2>

      {vehicles.length === 0 ? (
        <p>No vehicles found.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <p><strong>{vehicle.vehicleCode}</strong></p>
              <p>Model: {vehicle.model}</p>
              <p>Type: {vehicle.type}</p>
              <p>Status: {vehicle.status}</p>
              <p>Battery: {vehicle.batteryLevel}%</p>
              <p>Latitude: {vehicle.latitude}</p>
              <p>Longitude: {vehicle.longitude}</p>
              <p>Speed: {vehicle.speed}</p>

              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <button onClick={() => onEdit(vehicle)}>Edit</button>
                <button onClick={() => onDelete(vehicle.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}