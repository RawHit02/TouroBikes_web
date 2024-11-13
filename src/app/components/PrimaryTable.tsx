// components/PrimaryTable.tsx

"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import Image from 'next/image';

// Interface for Data and Props
interface Data {
  id: number;
  name: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  profileImage?: string; // For image URL
}

interface PrimaryTableProps {
  rows: Data[];
}

const PrimaryTable: React.FC<PrimaryTableProps> = ({ rows }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('contactNumber');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Column Definitions
  const columns: { id: keyof Data; label: string }[] = [
    { id: 'name', label: 'Name/Email' },
    { id: 'contactNumber', label: 'Contact Number' },
    { id: 'whatsappNumber', label: 'WhatsApp Number' },
    { id: 'address', label: 'Address' },
  ];

  return (
    <Box sx={{ width: '100%' }} className="primary-table">
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={(e) => handleRequestSort(e, column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.id}>
                {/* Name and Email with Profile Image */}
                <TableCell>
                  <Box className="flex items-center gap-2">
                    <Box className="w-[32px] h-[32px] rounded-full overflow-hidden">
                      <Image
                        src={row.profileImage || '/path/to/default-image.jpg'} // Add default image if none provided
                        alt={`${row.name}'s profile`}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </Box>
                    <Box>
                      <Typography className="text-sm font-medium">{row.name}</Typography>
                      <Typography className="text-xs text-gray-500">{row.email}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                {/* Contact Number */}
                <TableCell align="left">{row.contactNumber}</TableCell>
                {/* WhatsApp Number */}
                <TableCell align="left">{row.whatsappNumber}</TableCell>
                {/* Address */}
                <TableCell align="left">{row.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PrimaryTable;
