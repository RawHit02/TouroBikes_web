"use client";

import React, { useEffect } from "react";
import moment, { Moment } from "moment";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  AddCircleOutlineOutlinedIcon,
  CheckCircleIcon,
  CloseOutlinedIcon,
  KeyboardArrowDownIcon,
} from "../assets";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addAttendanceRecord,
  updateAttendanceRecord,
} from "@/redux/todays_attendance/attendance.actions";
import { fetchEmployeesAction } from "@/redux/employee_management/employee_management.actions";
import { EmployeeManagementEmployeeModel } from "@/models/req-model/EmployeeManagementEmployeeModel";
import { AttendanceSchema } from "@/yupSchema/AttendanceSchema";

interface AddAttendanceDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues?: {
    id: string;
    employeeId: string;
    employeeName?: string; 
    inTime: Moment | null;
    outTime: Moment | null;
    status: string;
    shift: string;
  };
  isEditMode: boolean;
  onRecordUpdated: () => Promise<void>;
}

const AddAttendanceDialog: React.FC<AddAttendanceDialogProps> = ({
  open,
  onClose,
  initialValues,
  isEditMode,
  onRecordUpdated,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(
    (state: RootState) => state.attendance.getAllEmployees
  );

  const [loadingEmployees, setLoadingEmployees] = React.useState(false);

  useEffect(() => {
    if (employees.length === 0) {
      setLoadingEmployees(true);
      dispatch(fetchEmployeesAction({ page: 1, take: 50 }))
        .unwrap()
        .catch((error) => {
          console.error("Failed to fetch employees:", error);
        })
        .finally(() => {
          setLoadingEmployees(false);
        });
    }
  }, [dispatch, employees.length]);

  const formik = useFormik({
    initialValues: {
      employeeId: initialValues?.employeeId || "",
      employeeName:
      initialValues?.employeeName ||
        employees.find((emp) => emp.id === initialValues?.employeeId)?.name ||
        "",
      inTime: initialValues?.inTime || moment(),
      outTime: initialValues?.outTime || moment(),
      status: initialValues?.status || "",
      shift: initialValues?.shift || "",
    },
    validationSchema: AttendanceSchema,
    enableReinitialize: !!initialValues,
    onSubmit: async (values) => {
      try {
        // const employee = employees.find((emp) => emp.id === values.employeeId);
        const payload = {
          employee: values.employeeId,
          firstIn: values.inTime ? values.inTime.toISOString() : "",
          lastOut: values.outTime ? values.outTime.toISOString() : "",
          status: values.status as "Present" | "Absent",
          employeeShift: values.shift,
        };

        if (isEditMode && initialValues?.id) {
          await dispatch(
            updateAttendanceRecord({
              attendanceId: initialValues.id,
              updatePayload: payload,
            })
          ).unwrap();
        } else {
          await dispatch(addAttendanceRecord(payload)).unwrap();
        }

        onClose();
        formik.resetForm();
        await onRecordUpdated();
      } catch (error) {
        console.error("Failed to submit attendance record:", error);
      }
    },
  });

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
          <Box>
            <Typography className="text-2xl leading-6 font-semibold">
              {isEditMode ? "Edit Attendance" : "Add Attendance"}
            </Typography>
            <Typography className="text-secondary800 mt-2">
              {isEditMode
                ? "Update the employee attendance"
                : "Enter employee attendance"}
            </Typography>
          </Box>
          <IconButton onClick={onClose} className="p-0 text-gray100">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-9">
          <Box sx={{ width: "100%" }} className="flex flex-col gap-[12px]">
            {/* Name Field */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">Name</Typography>
              <FormControl fullWidth className="mt-2">
                <Select
                  size="medium"
                  name="employeeId"
                  value={formik.values.employeeId}
                  onChange={formik.handleChange}
                  displayEmpty
                  error={
                    !!formik.errors.employeeId && formik.touched.employeeId
                  }
                  IconComponent={() => (
                    <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-3" />
                  )}
                >
                  {loadingEmployees ? (
                    <MenuItem disabled value="">
                      Loading employees...
                    </MenuItem>
                  ) : employees.length === 0 ? (
                    <MenuItem disabled value="">
                      No employees found
                    </MenuItem>
                  ) : (
                    <MenuItem disabled value="">
                      Select
                    </MenuItem>
                  )}
                  {employees.map(
                    (employee: EmployeeManagementEmployeeModel) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.name || "Unnamed Employee"}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Box>

            {/* Time Pickers */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">In time</Typography>
              <Box className="mt-2">
                <input
                  type="datetime-local"
                  value={formik.values.inTime?.format("YYYY-MM-DDTHH:mm") || ""}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "inTime",
                      e.target.value ? moment(e.target.value) : moment() // Default to current date and time
                    )
                  }
                  placeholder="Select In Time"
                  className="w-full p-2 border border-gray-300 rounded text-sm text-primary"
                />
              </Box>
            </Box>
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">Out time</Typography>
              <Box className="mt-2">
                <input
                  type="datetime-local"
                  value={
                    formik.values.outTime?.format("YYYY-MM-DDTHH:mm") || ""
                  }
                  onChange={(e) =>
                    formik.setFieldValue(
                      "outTime",
                      e.target.value ? moment(e.target.value) : moment()
                    )
                  }
                  placeholder="Select Out Time"
                  className="w-full p-2 border border-gray-300 rounded text-sm text-primary"
                />
              </Box>
            </Box>

            {/* Status Dropdown */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">Status</Typography>
              <FormControl fullWidth className="mt-2">
                <Select
                  size="medium"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  displayEmpty
                  error={!!formik.errors.status && formik.touched.status}
                  IconComponent={() => (
                    <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-3" />
                  )}
                >
                  <MenuItem disabled value="">
                    Select
                  </MenuItem>
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Shift Dropdown */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">Shift</Typography>
              <FormControl fullWidth className="mt-2">
                <Select
                  size="medium"
                  name="shift"
                  value={formik.values.shift}
                  onChange={formik.handleChange}
                  displayEmpty
                  error={!!formik.errors.shift && formik.touched.shift}
                  IconComponent={() => (
                    <KeyboardArrowDownIcon className="text-baseBlack text-[20px] mr-3" />
                  )}
                >
                  <MenuItem disabled value="">
                    Select
                  </MenuItem>
                  <MenuItem value="Morning">Morning</MenuItem>
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Night">Night</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="mb-[36px] px-9">
          <Button
            variant="outlined"
            size="large"
            startIcon={<CloseOutlinedIcon />}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckCircleIcon className="!text-[20px]" />}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddAttendanceDialog;
