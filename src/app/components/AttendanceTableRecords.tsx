"use client";

import React, { useState } from "react";
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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import moment from "moment";
import DeleteDialog from "./DeleteDialog";

import { DeleteRed, DummyProfile } from "../assets";
import { AttendanceRecordPayload } from "@/models/req-model/AttendanceModel";

interface Data {
  id: string;
  name: string;
  firstIn: string;
  lastOut: string;
  todaysHours: string;
  status: "Present" | "Absent";
  shift: "Day" | "Night";
}

const headCells = [
  { id: "name", label: "Employee Name" },
  { id: "firstIn", label: "First In" },
  { id: "lastOut", label: "Last Out" },
  { id: "todaysHours", label: "Today's Hours" },
  { id: "status", label: "Status" },
  { id: "shift", label: "Shift" },
];

const AttendanceTableRecords = ({
  records,
  itemCount,
  loading,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  onEditRecord,
  onDeleteRecord,
}: {
  records: AttendanceRecordPayload[];
  itemCount: number;
  loading: boolean;
  rowsPerPage: number;
  page: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onEditRecord: (
    record: AttendanceRecordPayload & { employeeName: string }
  ) => void;
  onDeleteRecord: (id: string) => void;
}) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);

  const open = Boolean(anchorEl);

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
    onEditRecord({
      ...record,
      employeeName: record.employeeName || "Unknown",
      shift: record.shift || "N/A",
    });
    handleCloseMenu();
  };

  const handleDelete = () => {
    if (selectedRecordId) {
      onDeleteRecord(selectedRecordId);
    }
    setOpenDelete(false);
    handleCloseMenu();
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange(newRowsPerPage);
    onPageChange(0); // Reset to first page
  };

  return (
    <Box sx={{ width: "100%" }} className="primary-table">
      {loading ? (
        <Box className="flex justify-center mt-4">
          <CircularProgress />
        </Box>
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
                const uniqueKey = record.id || `record-${index}`; // Use record.id or fallback to index

                const employeeName = record.employeeName || "Unknown";
                const shift = record.shift || "N/A";

                const todaysHours = (() => {
                  if (!record.todaysHour) return "N/A";
                  const hours = Math.floor(parseFloat(record.todaysHour));
                  const minutes = Math.round(
                    (parseFloat(record.todaysHour) - hours) * 60
                  );
                  return `${hours}h ${minutes}m`;
                })();

                return (
                  <TableRow hover tabIndex={-1} key={uniqueKey}>
                    <TableCell>
                      <Box className="flex items-center gap-[10px]">
                        <Box className="w-[32px] h-[32px] rounded-full overflow-hidden">
                          <Image
                            className="w-full h-full"
                            src={DummyProfile}
                            alt="Employee"
                          />
                        </Box>
                        <Box>
                          <Typography className="text-sm">
                            {employeeName}
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
                    <TableCell>{todaysHours}</TableCell>
                    <TableCell>{record.status}</TableCell>
                    <TableCell>{shift}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        onClick={(event) => handleClickMenu(event, record.id!)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
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
          dialogueTitle="Delete Attendance"
          dialogueDescription="Are you sure you want to delete this Employee Attendance?"
        />
      )}
    </Box>
  );
};

export default AttendanceTableRecords;
