// vender-management/buyers/page.tsx
"use client";

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddNewBuyerDialog from '@/app/components/AddNewBuyerDialog';
import PrimaryTable from '@/app/components/PrimaryTable';

interface Data {
  id: number;
  name: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  profileImage?: string;
}

const Buyers = () => {
  const [buyers, setBuyers] = useState<Data[]>([]);

  const addNewBuyer = (buyer: Data) => {
    setBuyers((prevBuyers) => [...prevBuyers, buyer]);
  };

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6">
      <Box className="w-full flex items-center justify-between">
        <Typography className='text-2xl font-bold'>Vendor Management / Buyers</Typography>
        <AddNewBuyerDialog onAddBuyer={addNewBuyer} />
      </Box>
      <Box className="mt-4">
        <PrimaryTable rows={buyers} />
      </Box>
    </Box>
  );
};

export default Buyers;
