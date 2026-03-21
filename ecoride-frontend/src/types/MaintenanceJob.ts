export interface MaintenanceJob {
  id?: number;
  vehicleCode: string;
  issueType: string;
  description: string;
  priority: string;
  status: string;
  scheduledDate: string;
  completedDate: string;
  attachmentUrl?: string;
  attachmentName?: string;
}