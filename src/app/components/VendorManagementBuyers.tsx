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
import { visuallyHidden } from "@mui/utils";
import {
  DeleteRed,
  DummyProfile,
  EditOutlinedIcon,
  MoreVertIcon,
} from "../assets";
import Image from "next/image";
import localSessionStorage from "@/hooks/localSessionStorage";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { GetAllBuyersRequest } from "@/models/req-model/VendorManagementBuyerModel";
import { getAllBuyersAction } from "@/redux/vendor_management/vendor_management.actions";
import { VendorManagementBuyerModel } from "@/models/req-model/VendorManagementBuyerModel";

const ITEM_HEIGHT = 48;

interface Data {
  id: string; // Correct type for IDs from the API
  name: string;
  contact: string;
  whatsapp: string;
  address: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name/ Email",
  },
  {
    id: "contact",
    numeric: false,
    disablePadding: false,
    label: "Contact Number",
  },
  {
    id: "whatsapp",
    numeric: false,
    disablePadding: false,
    label: "WhatsApp Number",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Add this line
  order: Order;
  orderBy: string;
  rowCount: number;
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
        <TableCell className="text-white" align="left">
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const VendorManagementBuyers = () => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("contact");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // save Nav drawer info in Session Storage
  const { getItem } = localSessionStorage();

  // Add Redux Dispatcher
  const dispatch = useDispatch<AppDispatch>();
  const { getAllBuyers, itemCount, getAllBuyerLoading } = useAppSelector(
    (state) => state.VendorManagementReducer
  );

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = getAllBuyers.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Get All buyers
  useEffect(() => {
    fetchData();
  }, [dispatch, page, rowsPerPage, order, orderBy]);

  const fetchData = async () => {
    try {
      const commonApiParamModel: GetAllBuyersRequest = {
        page: page + 1,
        take: rowsPerPage,
        order: order,
        orderBy: orderBy,
      };
      await dispatch(
        getAllBuyersAction({
          commonApiParamModel,
        })
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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

  // Map Redux data to rows
  const rows: Data[] = getAllBuyers.map((buyer: VendorManagementBuyerModel) => ({
    id: buyer.id,
    name: buyer.name,
    contact: buyer.contactNumber,
    whatsapp: buyer.whatsappNumber,
    address: buyer.address,
  }));

  return (
    <Box sx={{ width: "100%" }} className="primary-table">
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="small"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Box className="flex items-center gap-[10px]">
                      <Box className="w-[32px] h-[32px] rounded-full overflow-hidden">
                        <Image
                          className="w-full h-full"
                          src={DummyProfile}
                          alt="img"
                        />
                      </Box>
                      <Box>
                        <Typography className="text-sm">{row.name}</Typography>
                        <Typography className="text-xs text-gray200">
                          {row.contact}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.contact}</TableCell>
                  <TableCell align="left">{row.whatsapp}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">
                    <Box>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? "long-menu" : undefined}
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleClickMenu}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          "aria-labelledby": "long-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        slotProps={{
                          paper: {
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: "126px",
                              boxShadow: "#9f9e9e29 5px 5px 16px 0px",
                              borderRadius: "8px",
                            },
                          },
                        }}
                      >
                        <MenuItem onClick={handleCloseMenu}>
                          <Box className="flex items-center gap-[6px] text-baseBlack">
                            <EditOutlinedIcon className="text-[20px]" />
                            <Typography className="text-sm">Edit</Typography>
                          </Box>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                          <Box className="flex items-center gap-[6px] text-error200">
                            <Image src={DeleteRed} alt="delete" />
                            <Typography className="text-sm">Delete</Typography>
                          </Box>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
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
