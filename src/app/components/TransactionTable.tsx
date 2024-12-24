"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TableCell,
  CircularProgress,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { updateFilters } from "@/redux/transaction_details/transaction_table.slice";
import { fetchTransactions } from "@/redux/transaction_details/transaction_table.actions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#EDFFF2",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type Order = "ASC" | "DESC";

const headCells = [
  { id: "transId", label: "Trans.ID" },
  { id: "createdDate", label: "Date" },
  { id: "description", label: "Item Description" },
  { id: "quantity", label: "Quantity/(Weight)" },
  { id: "unitPrice", label: "Base Price Per/Unit" },
  { id: "commission", label: "Commission Rate" },
  { id: "totalValue", label: "Total Price" },
  { id: "amountPaid", label: "Amount Paid" },
  { id: "balanceDue", label: "Balance Due" },
  { id: "paymentType", label: "Payment Method" },
  { id: "paymentStatus", label: "Status" },
  { id: "notes", label: "Notes" },
];

const TransactionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: rows = [],
    meta = { itemCount: 0 },
    loading,
    error,
  } = useSelector((state: RootState) => state.transactions);

  const [order, setOrder] = useState<Order>("ASC");
  const [orderBy, setOrderBy] = useState<string>("transId");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(
      fetchTransactions({
        page: page + 1,
        take: rowsPerPage,
        order,
      })
    );
  }, [dispatch, page, rowsPerPage, order]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "ASC";
    const newOrder = isAsc ? "DESC" : "ASC";
    setOrder(newOrder);
    setOrderBy(property);

    dispatch(updateFilters({ order: newOrder, orderBy: property }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    dispatch(updateFilters({ page: newPage + 1 }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const take = parseInt(event.target.value, 10);
    setRowsPerPage(take);
    setPage(0);
    dispatch(updateFilters({ take, page: 1 }));
  };

  const visibleRows = useMemo(() => {
    if (!Array.isArray(rows)) {
      console.error("Expected rows to be an array but received:", rows);
      return [];
    }
    return rows.map((row) => ({
      transId: row.transId,
      createdDate: new Date(row.createdDate).toLocaleDateString(),
      description: row.description,
      quantity: row.quantity,
      unitPrice: row.unitPrice,
      commission: row.commission,
      totalValue: row.totalValue,
      amountPaid: row.amountPaid,
      balanceDue: row.balanceDue,
      paymentType: row.paymentType,
      paymentStatus: row.paymentStatus,
      notes: row.notes,
    }));
  }, [rows]);

  return (
    <Box sx={{ width: "100%" }} className="secondary-table">
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <TableHead>
            <TableRow>
              {headCells.map((cell) => (
                <StyledTableCell
                  key={cell.id}
                  sortDirection={
                    orderBy === cell.id
                      ? (order.toLowerCase() as "asc" | "desc")
                      : false
                  }
                >
                  <TableSortLabel
                    active={orderBy === cell.id}
                    direction={
                      orderBy === cell.id
                        ? (order.toLowerCase() as "asc" | "desc")
                        : "asc"
                    }
                    onClick={(event) => handleRequestSort(event, cell.id)}
                  >
                    {cell.label}
                    {orderBy === cell.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === "DESC"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={headCells.length} align="center">
                  No Data Available
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              visibleRows.map((row) => (
                <StyledTableRow key={row.transId}>
                  <StyledTableCell>{row.transId}</StyledTableCell>
                  <StyledTableCell>{row.createdDate}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>{row.quantity}</StyledTableCell>
                  <StyledTableCell>{row.unitPrice}</StyledTableCell>
                  <StyledTableCell>{row.commission}</StyledTableCell>
                  <StyledTableCell>{row.totalValue}</StyledTableCell>
                  <StyledTableCell>{row.amountPaid}</StyledTableCell>
                  <StyledTableCell>{row.balanceDue}</StyledTableCell>
                  <StyledTableCell>{row.paymentType}</StyledTableCell>
                  <StyledTableCell>{row.paymentStatus}</StyledTableCell>
                  <StyledTableCell>{row.notes}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={meta.itemCount || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TransactionTable;
