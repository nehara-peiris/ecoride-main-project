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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-900">
          Maintenance Jobs
        </h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {jobs.length} jobs
        </span>
      </div>

      {jobs.length === 0 ? (
        <p className="text-slate-500">No maintenance jobs found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-slate-200 p-5 transition hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    {job.vehicleCode}
                  </h4>
                  <p className="text-sm text-slate-500">{job.issueType}</p>
                </div>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  {job.priority}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p>Status: {job.status}</p>
                <p>Scheduled: {job.scheduledDate || "-"}</p>
                <p>Completed: {job.completedDate || "-"}</p>
                <p className="text-sm text-slate-600">Description: {job.description}</p>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => onEdit(job)}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(job.id)}
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