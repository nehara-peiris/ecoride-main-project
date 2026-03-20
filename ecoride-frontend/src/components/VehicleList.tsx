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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">Vehicle List</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {vehicles.length} vehicles
        </span>
      </div>

      {vehicles.length === 0 ? (
        <p className="text-slate-500">No vehicles found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    {vehicle.vehicleCode}
                  </h4>
                  <p className="text-sm text-slate-500">{vehicle.model}</p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {vehicle.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p>Type: {vehicle.type}</p>
                <p>Battery: {vehicle.batteryLevel}%</p>
                <p>Latitude: {vehicle.latitude}</p>
                <p>Longitude: {vehicle.longitude}</p>
                <p>Speed: {vehicle.speed}</p>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => onEdit(vehicle)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(vehicle.id)}
                  className="rounded-xl bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}