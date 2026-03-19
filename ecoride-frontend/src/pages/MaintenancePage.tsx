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
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>EcoRide - Maintenance</h1>

      <MaintenanceForm
        selectedJob={selectedJob}
        onSaved={handleSaved}
        onCancelEdit={handleCancelEdit}
      />

      {loading ? (
        <p>Loading maintenance jobs...</p>
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