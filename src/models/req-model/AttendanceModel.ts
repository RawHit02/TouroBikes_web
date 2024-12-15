import { EmployeeManagementEmployeeModel } from "./EmployeeManagementEmployeeModel";

export interface AttendanceStats {
  present: number; // Number or percentage of present employees
  absent: number; // Number or percentage of absent employees
}

export interface AttendanceRecordPayload {
  id?: string;
  employee: string; // Unique identifier for the employee
  employeeName?: string;
  firstIn: string; // Employee's name
  lastOut: string; // Total working hours for the day
  status: "Present" | "Absent"; // Attendance status
  employeeShift: string; // Shift information (e.g., "Day", "Night")
}

export interface AttendanceState {
  stats: AttendanceStats; // Statistics for present/absent employees
  records: AttendanceRecordPayload[]; // Array of attendance records
  itemCount: number; // Total number of records (for pagination)
  loadingStats: boolean; // Loading state for attendance stats
  loadingRecords: boolean; // Loading state for attendance records
  error: string | null; // Error message (if any)
  getAllEmployees: EmployeeManagementEmployeeModel[];
  employeeNames: {[Key : string]: string}; 
}