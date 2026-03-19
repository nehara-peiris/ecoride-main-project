export interface Vehicle {
  id?: string;
  vehicleCode: string;
  model: string;
  type: string;
  status: string;
  batteryLevel: number;
  latitude: number;
  longitude: number;
  speed: number;
}