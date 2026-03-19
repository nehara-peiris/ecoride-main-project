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
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const vehicleStats = useMemo(() => {
    return {
      available: vehicles.filter((v) => v.status === "AVAILABLE").length,
      inUse: vehicles.filter((v) => v.status === "IN_USE").length,
      maintenance: vehicles.filter((v) => v.status === "MAINTENANCE").length,
      offline: vehicles.filter((v) => v.status === "OFFLINE").length,
    };
  }, [vehicles]);

  const maintenanceStats = useMemo(() => {
    return {
      pending: jobs.filter((j) => j.status === "PENDING").length,
      scheduled: jobs.filter((j) => j.status === "SCHEDULED").length,
      inProgress: jobs.filter((j) => j.status === "IN_PROGRESS").length,
      completed: jobs.filter((j) => j.status === "COMPLETED").length,
      cancelled: jobs.filter((j) => j.status === "CANCELLED").length,
    };
  }, [jobs]);

  const recentVehicles = vehicles.slice(0, 5);
  const recentJobs = jobs.slice(0, 5);

  if (loading) {
    return (
      <div style={{ padding: "24px" }}>
        <h1>EcoRide Dashboard</h1>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px" }}>EcoRide Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        <StatCard title="Total Users" value={users.length} />
        <StatCard title="Total Vehicles" value={vehicles.length} />
        <StatCard title="Maintenance Jobs" value={jobs.length} />
        <StatCard
          title="Active Vehicle Issues"
          value={
            maintenanceStats.pending +
            maintenanceStats.scheduled +
            maintenanceStats.inProgress
          }
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <Panel title="Vehicle Status Overview">
          <InfoRow label="AVAILABLE" value={vehicleStats.available} />
          <InfoRow label="IN_USE" value={vehicleStats.inUse} />
          <InfoRow label="MAINTENANCE" value={vehicleStats.maintenance} />
          <InfoRow label="OFFLINE" value={vehicleStats.offline} />
        </Panel>

        <Panel title="Maintenance Status Overview">
          <InfoRow label="PENDING" value={maintenanceStats.pending} />
          <InfoRow label="SCHEDULED" value={maintenanceStats.scheduled} />
          <InfoRow label="IN_PROGRESS" value={maintenanceStats.inProgress} />
          <InfoRow label="COMPLETED" value={maintenanceStats.completed} />
          <InfoRow label="CANCELLED" value={maintenanceStats.cancelled} />
        </Panel>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "20px",
        }}
      >
        <Panel title="Recent Vehicles">
          {recentVehicles.length === 0 ? (
            <p>No vehicles found.</p>
          ) : (
            recentVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <p style={{ fontWeight: 700 }}>{vehicle.vehicleCode}</p>
                <p>Model: {vehicle.model}</p>
                <p>Type: {vehicle.type}</p>
                <p>Status: {vehicle.status}</p>
                <p>Battery: {vehicle.batteryLevel}%</p>
              </div>
            ))
          )}
        </Panel>

        <Panel title="Recent Maintenance Jobs">
          {recentJobs.length === 0 ? (
            <p>No maintenance jobs found.</p>
          ) : (
            recentJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <p style={{ fontWeight: 700 }}>{job.vehicleCode}</p>
                <p>Issue: {job.issueType}</p>
                <p>Priority: {job.priority}</p>
                <p>Status: {job.status}</p>
                <p>Scheduled: {job.scheduledDate || "-"}</p>
              </div>
            ))
          )}
        </Panel>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "10px" }}>
        {title}
      </p>
      <h2 style={{ fontSize: "30px", margin: 0, color: "#111827" }}>{value}</h2>
    </div>
  );
}

type PanelProps = {
  title: string;
  children: React.ReactNode;
};

function Panel({ title, children }: PanelProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "16px" }}>{title}</h3>
      {children}
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value: number;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}