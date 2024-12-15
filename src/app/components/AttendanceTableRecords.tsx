"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttendanceRecords,
  deleteAttendanceRecord,
  mapEmployeeIdToName,
} from "@/redux/todays_attendance/attendance.actions";
import { RootState, AppDispatch } from "@/redux/store";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import { fetchEmployeesAction } from "@/redux/employee_management/employee_management.actions";
import moment from "moment";
import DeleteDialog from "./DeleteDialog";

import { DeleteRed, DummyProfile } from "../assets";
import { AttendanceRecordPayload } from "@/models/req-model/AttendanceModel";

const ITEM_HEIGHT = 48;

const calculateTodaysHours = (firstIn: string, lastOut: string): string => {
  if (!firstIn || !lastOut) return "N/A";
  const inTime = moment(firstIn);
  const outTime = moment(lastOut);
  if (!inTime.isValid() || !outTime.isValid()) return "N/A";
  const duration = outTime.diff(inTime, "minute");
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

interface Data {
  id: string;
  name: string;
  firstIn: string;
  lastOut: string;
  todaysHours: string;
  status: "Present" | "Absent";
  employeeShift: string; // Updated for consistent naming
}

const headCells = [
  { id: "name", label: "Employee Name" },
  { id: "firstIn", label: "First In" },
  { id: "lastOut", label: "Last Out" },
  { id: "todaysHours", label: "Today's Hours" },
  { id: "status", label: "Status" },
  { id: "employeeShift", label: "Shift" }, // Updated label for consistency
];

const AttendanceTableRecords = ({
  onEditRecord,
}: {
  onEditRecord: (
    row: AttendanceRecordPayload & { employeeName: string }
  ) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { records, loadingRecords, itemCount } = useSelector(
    (state: RootState) => state.attendance
  );
  const employees = useSelector(
    (state: RootState) =>
      state.EmployeeManagementReducer.employees.getAllEmployees
  );

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchEmployeesAction({ page: 1, take: 50 }));
    dispatch(fetchAttendanceRecords({ page: page + 1, take: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    recordId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRecordId(recordId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRecordId(null);
  };

  const handleEditClick = (record: AttendanceRecordPayload) => {
    const employeeName = mapEmployeeIdToName(record.employee, employees);
    onEditRecord({ ...record, employeeName });
    handleCloseMenu();
  };

  const handleDelete = async () => {
    if (selectedRecordId) {
      try {
        await dispatch(deleteAttendanceRecord(selectedRecordId)).unwrap();
        // Refresh the attendance records after successful deletion
        dispatch(fetchAttendanceRecords({ page: page + 1, take: rowsPerPage }));
      } catch (error) {
        console.error("Failed to delete attendance record:", error);
      } finally {
        setOpenDelete(false);
      }
    } else {
      setOpenDelete(false);
    }
    handleCloseMenu();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }} className="primary-table">
      {loadingRecords ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(event) =>
                        handleRequestSort(event, headCell.id as keyof Data)
                      }
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.map((record, index) => {
                const employeeName = mapEmployeeIdToName(
                  record.employee,
                  employees
                );

                return (
                  <TableRow hover tabIndex={-1} key={record.id || index}>
                    <TableCell>
                      <Box className="flex items-center gap-[10px]">
                        <Box className="w-[32px] h-[32px] rounded-full overflow-hidden">
                          <Image
                            className="w-full h-full"
                            src={DummyProfile}
                            alt="img"
                          />
                        </Box>
                        <Box>
                          <Typography className="text-sm">
                            {employeeName || "Unknown"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {moment(record.firstIn).format("DD MMM YYYY, h:mm A")}
                    </TableCell>
                    <TableCell>
                      {moment(record.lastOut).format("DD MMM YYYY, h:mm A")}
                    </TableCell>
                    <TableCell>
                      {calculateTodaysHours(record.firstIn, record.lastOut)}
                    </TableCell>
                    <TableCell>{record.status}</TableCell>
                    <TableCell>{record.employeeShift}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(event) => handleClickMenu(event, record.id!)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        open={open && selectedRecordId === record.id}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem onClick={() => handleEditClick(record)}>
                          <EditOutlinedIcon />
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => setOpenDelete(true)}>
                          <Image src={DeleteRed} alt="Delete" />
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={itemCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {openDelete && (
        <DeleteDialog
          handleCloseDeleteDialog={() => setOpenDelete(false)}
          openDelete={openDelete}
          handleDeleteAction={handleDelete}
          dialogueTitle="Delete Record"
          dialogueDescription="Are you sure you want to delete this record?"
        />
      )}
    </Box>
  );
};

export default AttendanceTableRecords;
