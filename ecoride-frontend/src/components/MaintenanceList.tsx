import type { MaintenanceJob } from "../types/MaintenanceJob";

type MaintenanceListProps = {
  jobs: MaintenanceJob[];
  onEdit: (job: MaintenanceJob) => void;
  onDelete: (id?: number) => void;
};

export default function MaintenanceList({
  jobs,
  onEdit,
  onDelete,
}: MaintenanceListProps) {
  return (
    <div>
      <h2 style={{ marginBottom: "16px" }}>Maintenance Jobs</h2>

      {jobs.length === 0 ? (
        <p>No maintenance jobs found.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                borderRadius: "10px",
                background: "#fff",
              }}
            >
              <p><strong>Vehicle:</strong> {job.vehicleCode}</p>
              <p><strong>Issue Type:</strong> {job.issueType}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Priority:</strong> {job.priority}</p>
              <p><strong>Status:</strong> {job.status}</p>
              <p><strong>Scheduled Date:</strong> {job.scheduledDate || "-"}</p>
              <p><strong>Completed Date:</strong> {job.completedDate || "-"}</p>

              <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                <button onClick={() => onEdit(job)}>Edit</button>
                <button onClick={() => onDelete(job.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}