"use client";
import React, { useEffect } from "react";
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
import { visuallyHidden } from "@mui/utils";
import {
  DeleteRed,
  DummyProfile,
  EditOutlinedIcon,
  MoreVertIcon,
} from "../assets";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableData } from "@/redux/dashboard/dashboard_actions"; // Correctly import the fetch action
import { RootState , AppDispatch} from "@/redux/store";

const ITEM_HEIGHT = 48;

interface Data {
  id: string;
  transId: string;
  name: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  address: string;
  balanceDue: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "transId", numeric: false, disablePadding: false, label: "Trans ID" },
  { id: "name", numeric: false, disablePadding: false, label: "Name/Email" },
  {
    id: "contactNumber",
    numeric: false,
    disablePadding: false,
    label: "Contact Number",
  },
  {
    id: "whatsappNumber",
    numeric: false,
    disablePadding: false,
    label: "WhatsApp Number",
  },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  {
    id: "balanceDue",
    numeric: true,
    disablePadding: false,
    label: "Amount Due",
  },
];

interface EnhancedTableProps {
  order: "asc" | "desc";
  orderBy: string;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
}



function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="left">Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

const TodaysDue = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todaysDue, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  ); // Updated selector
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("contactNumber");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  


  useEffect(() => {
    dispatch(fetchTableData()); // Fetch today's due data
  }, [dispatch]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const visibleRows = React.useMemo(
    () =>
      todaysDue
        .slice()
        .sort((a, b) =>
          order === "desc"
            ? a[orderBy] < b[orderBy]
              ? 1
              : -1
            : a[orderBy] > b[orderBy]
            ? 1
            : -1
        )
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [todaysDue, order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }} className="primary-table">
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size="small">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center">
                    <Typography variant="body2" color="textSecondary">
                      No Data Available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                visibleRows.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Typography className="font-semibold text-sm">
                        {row.transId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box className="flex items-center gap-2">
                        <Box className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                          <Image
                            src={row.profileImage || DummyProfile}
                            alt={row.name || "Profile"}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        </Box>
                        <Box>
                          <Typography className="font-semibold text-sm">
                            {row.vendor?.name}
                          </Typography>
                          <Typography className="text-xs text-gray-500">
                            {row.vendor?.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      {row.vendor?.contactNumber}
                    </TableCell>
                    <TableCell align="left">
                      {row.vendor?.whatsappNumber}
                    </TableCell>
                    <TableCell align="left">{row.vendor?.address}</TableCell>
                    <TableCell align="right">
                      <Typography className="font-semibold text-sm">
                        {row.balanceDue}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <IconButton
                        aria-label="more"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClickMenu}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: "126px",
                            boxShadow: "#9f9e9e29 5px 5px 16px 0px",
                            borderRadius: "8px",
                          },
                        }}
                      >
                        <MenuItem onClick={handleCloseMenu}>
                          <Box className="flex items-center gap-[6px] text-baseBlack">
                            <EditOutlinedIcon className="text-[20px]" />
                            <Typography className="text-sm">
                              Mark as Received
                            </Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                          <Box className="flex items-center gap-[6px] text-error200">
                            <Image src={DeleteRed} alt="delete" />
                            <Typography className="text-sm">
                              Move to Tomorrow
                            </Typography>
                          </Box>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={todaysDue.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
};

export default TodaysDue;
