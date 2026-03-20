import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import type { User } from "../types/User";
import type { Vehicle } from "../types/Vehicle";
import type { MaintenanceJob } from "../types/MaintenanceJob";

export default function DashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [jobs, setJobs] = useState<MaintenanceJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const [usersRes, vehiclesRes, jobsRes] = await Promise.all([
          api.get<User[]>("/api/v1/users"),
          api.get<Vehicle[]>("/api/v1/vehicles"),
          api.get<MaintenanceJob[]>("/api/v1/maintenance"),
        ]);

        setUsers(usersRes.data);
        setVehicles(vehiclesRes.data);
        setJobs(jobsRes.data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const vehicleStats = useMemo(
    () => ({
      available: vehicles.filter((v) => v.status === "AVAILABLE").length,
      inUse: vehicles.filter((v) => v.status === "IN_USE").length,
      maintenance: vehicles.filter((v) => v.status === "MAINTENANCE").length,
      offline: vehicles.filter((v) => v.status === "OFFLINE").length,
    }),
    [vehicles]
  );

  const maintenanceStats = useMemo(
    () => ({
      pending: jobs.filter((j) => j.status === "PENDING").length,
      scheduled: jobs.filter((j) => j.status === "SCHEDULED").length,
      inProgress: jobs.filter((j) => j.status === "IN_PROGRESS").length,
      completed: jobs.filter((j) => j.status === "COMPLETED").length,
      cancelled: jobs.filter((j) => j.status === "CANCELLED").length,
    }),
    [jobs]
  );

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-slate-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white shadow-lg">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-50">
          Overview
        </p>
        <h2 className="mt-2 text-3xl font-bold">EcoRide Dashboard</h2>
        <p className="mt-2 max-w-2xl text-sm text-emerald-50/90">
          Monitor your users, vehicles, and maintenance activity in one place.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Users" value={users.length} />
        <StatCard title="Total Vehicles" value={vehicles.length} />
        <StatCard title="Maintenance Jobs" value={jobs.length} />
        <StatCard
          title="Open Issues"
          value={
            maintenanceStats.pending +
            maintenanceStats.scheduled +
            maintenanceStats.inProgress
          }
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel title="Vehicle Status">
          <InfoRow label="Available" value={vehicleStats.available} />
          <InfoRow label="In Use" value={vehicleStats.inUse} />
          <InfoRow label="Maintenance" value={vehicleStats.maintenance} />
          <InfoRow label="Offline" value={vehicleStats.offline} />
        </Panel>

        <Panel title="Maintenance Status">
          <InfoRow label="Pending" value={maintenanceStats.pending} />
          <InfoRow label="Scheduled" value={maintenanceStats.scheduled} />
          <InfoRow label="In Progress" value={maintenanceStats.inProgress} />
          <InfoRow label="Completed" value={maintenanceStats.completed} />
          <InfoRow label="Cancelled" value={maintenanceStats.cancelled} />
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel title="Recent Vehicles">
          <div className="space-y-4">
            {vehicles.slice(0, 5).map((vehicle) => (
              <div
                key={vehicle.id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900">
                    {vehicle.vehicleCode}
                  </h4>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {vehicle.status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
                  <p>Model: {vehicle.model}</p>
                  <p>Type: {vehicle.type}</p>
                  <p>Battery: {vehicle.batteryLevel}%</p>
                  <p>Speed: {vehicle.speed}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Recent Maintenance Jobs">
          <div className="space-y-4">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900">
                    {job.vehicleCode}
                  </h4>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                    {job.priority}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-700">{job.issueType}</p>
                <p className="mt-1 text-sm text-slate-500">{job.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>{job.status}</span>
                  <span>{job.scheduledDate || "-"}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}