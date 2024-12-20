import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/base-url/apiClient";
import {
  GET_ATTENDANCE_STATS,
  ADD_ATTENDANCE_RECORD,
  GET_ATTENDANCE_RECORDS,
  UPDATE_ATTENDANCE_RECORD,
  DELETE_ATTENDANCE_RECORD,
  GET_ALL_EMPLOYEES_ATTENDANCE,
} from "@/base-url/apiRoutes";

import {
  AttendanceStats,
  AttendanceRecordPayload,
} from "@/models/req-model/AttendanceModel";
import { EmployeeManagementEmployeeModel } from "@/models/req-model/EmployeeManagementEmployeeModel";

// Mock Data (for testing purposes)
const mockAttendanceStats: AttendanceStats = {
  present: 79,
  absent: 21,
};

// Fetch Attendance Stats (Present/Absent percentages)
export const fetchAttendanceStats = createAsyncThunk<
  AttendanceStats,
  void,
  { rejectValue: { message: string } }
>("attendance/fetchStats", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(GET_ATTENDANCE_STATS);
    return response.data.data || mockAttendanceStats; // Mock data if no real API
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch attendance stats",
    });
  }
});

// Fetch Attendance Records (Paginated)
export const fetchAttendanceRecords = createAsyncThunk<
  { data: AttendanceRecordPayload[]; itemCount: number },
  { page: number; take: number },
  { rejectValue: { message: string } }
>("attendance/fetchRecords", async ({ page, take }, { rejectWithValue }) => {
  try {
    const options = { params: { page, take } };
    const response = await apiClient.get(GET_ATTENDANCE_RECORDS, options);

    return {
      data: response.data.data.data.map((item: any) => ({
        id: item.id,
        employee: item.employee,
        employeeName: item.employeeName || "", // Add employee name here
        firstIn: item.firstIn,
        lastOut: item.lastOut,
        status: item.status,
        employeeShift: item.shift, // Ensure employeeShift is mapped
      })),
      itemCount: response.data.data.meta.itemCount,
    };
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch attendance records",
    });
  }
});

// Add Attendance Record
export const addAttendanceRecord = createAsyncThunk<
  AttendanceRecordPayload,
  AttendanceRecordPayload,
  { rejectValue: { message: string } }
>("attendance/addRecord", async (attendanceData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(
      ADD_ATTENDANCE_RECORD,
      attendanceData
    );
    return response.data?.data || attendanceData;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to add attendance record",
    });
  }
});

// Update Attendance Record
export const updateAttendanceRecord = createAsyncThunk<
  AttendanceRecordPayload,
  { attendanceId: string; updatePayload: AttendanceRecordPayload },
  { rejectValue: { message: string } }
>(
  "attendance/updateRecord",
  async ({ attendanceId, updatePayload }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(
        `${UPDATE_ATTENDANCE_RECORD}/${attendanceId}`,
        updatePayload
      );
      return response.data?.data || updatePayload;
    } catch (error: any) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to update attendance record",
      });
    }
  }
);

// Delete Attendance Record
export const deleteAttendanceRecord = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: { message: string } }
>("attendance/deleteRecord", async (attendanceId, { rejectWithValue }) => {
  try {
    await apiClient._delete(`${DELETE_ATTENDANCE_RECORD}/${attendanceId}`);
    return { message: "Attendance record deleted successfully" };
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to delete attendance record",
    });
  }
});

// Fetch Employee Names
export const fetchEmployeeNames = createAsyncThunk<
  EmployeeManagementEmployeeModel[],
  void,
  { rejectValue: { message: string } }
>("attendance/fetchEmployeeNames", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(GET_ALL_EMPLOYEES_ATTENDANCE, {
      params: { page: 1, take: 100 },
    });
    return response.data?.data?.data || [];
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch employee names",
    });
  }
});

// Map Employee ID to Name
export const mapEmployeeIdToName = (
  id: string,
  employees: EmployeeManagementEmployeeModel[]
) => {
  const employee = employees.find((emp) => emp.id === id);
  return employee?.name || "Unknown";
};
