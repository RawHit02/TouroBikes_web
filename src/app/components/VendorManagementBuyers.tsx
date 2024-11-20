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
import TextField from "@mui/material/TextField";
import { visuallyHidden } from "@mui/utils";
import {
  DeleteRed,
  DummyProfile,
  EditOutlinedIcon,
  MoreVertIcon,
  CheckCircleIcon,
} from "../assets";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { GetAllBuyersRequest } from "@/models/req-model/VendorManagementBuyerModel";
import {
  deleteBuyerAction,
  getAllBuyersAction,
  editBuyerAction,
} from "@/redux/vendor_management/vendor_management.actions";
import { VendorManagementBuyerModel } from "@/models/req-model/VendorManagementBuyerModel";

const ITEM_HEIGHT = 48;

const headCells = [
  { id: "name", label: "Name/Email", numeric: false },
  { id: "contact", label: "Contact Number", numeric: false },
  { id: "whatsapp", label: "WhatsApp Number", numeric: false },
  { id: "address", label: "Address", numeric: false },
];

const VendorManagementBuyers = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null); // Track editing row ID
  const [editedRow, setEditedRow] = useState<VendorManagementBuyerModel | null>(
    null
  ); // Temporary edited data
  const open = Boolean(anchorEl);
  const [selectedBuyerId, setSelectedBuyerId] = useState<string | null>(null); // Buyer ID for the menu actions
  const dispatch = useDispatch<AppDispatch>();
  const { getAllBuyers, itemCount } = useAppSelector(
    (state) => state.VendorManagementReducer
  );

  const fetchData = async () => {
    try {
      const params: GetAllBuyersRequest = {
        page: page + 1,
        take: rowsPerPage,
        order,
        orderBy,
      };
      await dispatch(getAllBuyersAction({ commonApiParamModel: params }));
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, page, rowsPerPage, order, orderBy]);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLElement>,
    buyerId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedBuyerId(buyerId); // Set the buyer ID for menu actions
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBuyerId(null); // Clear selected buyer
  };

  const handleEditClick = (row: VendorManagementBuyerModel) => {
    setIsEditing(row.id); // Enable edit mode for the specific row
    setEditedRow({ ...row }); // Copy current row data for editing
    handleCloseMenu();
  };

  const handleSaveClick = async () => {
    if (editedRow) {
      try {
        await dispatch(
          editBuyerAction({
            buyerId: editedRow.id,
            editBuyerPayload: {
              name: editedRow.name,
              contactNumber: editedRow.contactNumber,
              whatsappNumber: editedRow.whatsappNumber,
              address: editedRow.address,
              email: editedRow.email,
              vendorType: ""
            },
          })
        ).unwrap();
        fetchData(); // Refresh data after saving
      } catch (error) {
        console.error("Failed to update buyer:", error);
      }
    }
    setIsEditing(null); // Exit edit mode
    setEditedRow(null); // Clear edited data
  };

  const handleDeleteBuyer = async () => {
    if (selectedBuyerId) {
      if (window.confirm("Are you sure you want to delete this buyer?")) {
        try {
          await dispatch(deleteBuyerAction(selectedBuyerId)).unwrap();
          fetchData();
        } catch (error) {
          console.error("Failed to delete buyer:", error);
        }
      }
      handleCloseMenu();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof VendorManagementBuyerModel
  ) => {
    if (editedRow) {
      setEditedRow({
        ...editedRow,
        [field]: e.target.value,
      });
    }
  };

  const handleRequestSort = (
    _: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box className="w-full primary-table">
      <TableContainer>
        <Table className="min-w-[750px]" size="small">
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
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component="span" className="sr-only">
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
            {getAllBuyers.map((row: VendorManagementBuyerModel) => (
              <TableRow key={row.id} className="hover:cursor-pointer">
                {isEditing === row.id ? (
                  <>
                    <TableCell>
                      <TextField
                        value={editedRow?.name || ""}
                        onChange={(e) => handleInputChange(e, "name")}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedRow?.contactNumber || ""}
                        onChange={(e) => handleInputChange(e, "contactNumber")}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedRow?.whatsappNumber || ""}
                        onChange={(e) => handleInputChange(e, "whatsappNumber")}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={editedRow?.address || ""}
                        onChange={(e) => handleInputChange(e, "address")}
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={handleSaveClick}>
                        <CheckCircleIcon />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
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
                        <Typography className="font-semibold text-sm">
                          {row.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.contactNumber}</TableCell>
                    <TableCell>{row.whatsappNumber}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={(event) => handleClickMenu(event, row.id)}
                        aria-label="more"
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open && selectedBuyerId === row.id}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem onClick={() => handleEditClick(row)}>
                          <EditOutlinedIcon />
                          Edit
                        </MenuItem>
                        <MenuItem onClick={handleDeleteBuyer}>
                          <Image src={DeleteRed} alt="Delete" />
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={itemCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default VendorManagementBuyers;
