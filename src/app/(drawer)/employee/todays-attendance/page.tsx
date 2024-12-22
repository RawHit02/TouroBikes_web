"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddAttendanceDialog from "@/app/components/AddAttendanceDialog";
import AttendanceTableRecords from "@/app/components/AttendanceTableRecords";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchAttendanceStats,
  fetchAttendanceRecords,
  deleteAttendanceRecord,
} from "@/redux/todays_attendance/attendance.actions";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment, { Moment } from "moment";
import { AttendanceRecordPayload } from "@/models/req-model/AttendanceModel";

const TodaysAttendance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loadingStats, records, itemCount } = useSelector(
    (state: RootState) => state.attendance
  );

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<{
    id: string;
    employeeId: string;
    inTime: Moment | null;
    outTime: Moment | null;
    status: string;
    shift: string;
  } | null>(null);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [loadingRecords, setLoadingRecords] = useState(false);

  const fetchStats = useCallback(async () => {
    try {
      await dispatch(fetchAttendanceStats());
    } catch (error) {
      console.error("Error fetching attendance stats:", error);
    }
  }, [dispatch]);

  const fetchRecords = useCallback(async () => {
    setLoadingRecords(true);
    try {
      await dispatch(
        fetchAttendanceRecords({
          page: page + 1,
          take: rowsPerPage,
        })
      );
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }, [dispatch, page, rowsPerPage]);

  const handleDeleteRecord = async (id: string) => {
    try {
      await dispatch(deleteAttendanceRecord(id)).unwrap();
      await fetchRecords(); 
    } catch (error) {
      console.error("Error deleting attendance record:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecords(); 
  }, [fetchStats, fetchRecords]);

  const handleEditRecord = (record: AttendanceRecordPayload) => {
    const employeeId =
      typeof record.employee === "string"
        ? record.employee
        : record.employee?.id || "";

    setEditRecord({
      id: record.id || "",
      employeeId,
      inTime: record.firstIn ? moment(record.firstIn) : null,
      outTime: record.lastOut ? moment(record.lastOut) : null,
      status: record.status,
      shift: record.shift,
    });
    setIsEditDialogOpen(true);
  };

  const handleAddAttendance = () => {
    setEditRecord(null);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsEditDialogOpen(false);
    setEditRecord(null);
  };

  const handleRefresh = async () => {
    await fetchRecords();
  };

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="flex items-center justify-between">
        <Typography className="text-2xl font-bold">
          Today&apos;s Attendance
        </Typography>
        <Button
          variant="contained"
          className="bg-primary500 rounded-lg h-10 text-base"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddAttendance}
        >
          Add Attendance
        </Button>
      </Box>

      <Box className="flex flex-row gap-4 mt-4">
        <Box className="rounded-2xl p-6 flex flex-col gap-4 border border-primary500">
          {loadingStats ? (
            <Typography>Loading...</Typography>
          ) : (
            <Typography className="flex flex-row self-center text-base font-medium">
              Present: {stats.present}
            </Typography>
          )}
        </Box>
        <Box className="rounded-2xl p-6 flex flex-col gap-4 border border-primary500">
          {loadingStats ? (
            <Typography>Loading...</Typography>
          ) : (
            <Typography className="flex flex-row self-center text-base font-medium">
              Absent: {stats.absent}
            </Typography>
          )}
        </Box>
      </Box>

      <Box className="mt-4">
        <AttendanceTableRecords
          records={records}
          itemCount={itemCount}
          loading={loadingRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onEditRecord={handleEditRecord}
          onDeleteRecord={handleDeleteRecord} 
        />
      </Box>

      <AddAttendanceDialog
        open={isEditDialogOpen}
        onClose={handleCloseDialog}
        initialValues={
          editRecord || {
            id: "",
            employeeId: "",
            inTime: moment(),
            outTime: moment(),
            status: "",
            shift: "",
            todaysHour: "0.00",
          }
        }
        isEditMode={Boolean(editRecord?.id)}
        onRecordUpdated={handleRefresh}
      />
    </Box>
  );
};

export default TodaysAttendance;
