import { useEffect, useState } from "react";
import api from "../services/api";
import MaintenanceForm from "../components/MaintenanceForm";
import MaintenanceList from "../components/MaintenanceList";
import type { MaintenanceJob } from "../types/MaintenanceJob";

const emptyJob: MaintenanceJob = {
  vehicleCode: "",
  issueType: "",
  description: "",
  priority: "",
  status: "",
  scheduledDate: "",
  completedDate: "",
};

export default function MaintenancePage() {
  const [jobs, setJobs] = useState<MaintenanceJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<MaintenanceJob>(emptyJob);
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get<MaintenanceJob[]>("/api/v1/maintenance");
      setJobs(res.data);
    } catch (error) {
      console.error("Failed to load maintenance jobs", error);
      alert("Failed to load maintenance jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleEdit = (job: MaintenanceJob) => {
    setSelectedJob(job);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;

    try {
      await api.delete(`/api/v1/maintenance/${id}`);
      alert("Maintenance job deleted successfully");
      loadJobs();

      if (selectedJob.id === id) {
        setSelectedJob(emptyJob);
      }
    } catch (error) {
      console.error("Failed to delete maintenance job", error);
      alert("Failed to delete maintenance job");
    }
  };

  const handleSaved = () => {
    setSelectedJob(emptyJob);
    loadJobs();
  };

  const handleCancelEdit = () => {
    setSelectedJob(emptyJob);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Maintenance</h2>
        <p className="mt-1 text-sm text-slate-500">
          Track maintenance jobs, priorities, schedules, and completion status.
        </p>
      </div>

      <MaintenanceForm
        selectedJob={selectedJob}
        onSaved={handleSaved}
        onCancelEdit={handleCancelEdit}
      />

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading maintenance jobs...</p>
        </div>
      ) : (
        <MaintenanceList
          jobs={jobs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}