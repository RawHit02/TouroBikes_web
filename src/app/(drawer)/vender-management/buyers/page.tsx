// vendor-management/buyers/page.tsx
"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import AddNewBuyerDialog from "@/app/components/AddNewBuyerDialog";
import PrimaryTable from "@/app/components/PrimaryTable";
import { Data } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import { addBuyer } from "@/redux/slices/buyerSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { v4 as uuidv4 } from "uuid"; // Import uuid for unique IDs
import VendorManagementBuyers from "@/app/components/VendorManagementBuyers";
import { getAllBuyersAction } from "@/redux/vendor_management/vendor_management.actions";
import { useAppSelector } from "@/redux/store";


const Buyers = () => {
  const buyers = useSelector((state: RootState) => state.buyer.buyers);
  const dispatch = useDispatch<AppDispatch>();

  // Function to handle adding a new buyer with unique ID
  const addNewBuyer = (buyer: Omit<Data, "id">) => {
    const newBuyer = { ...buyer, id: uuidv4() }; // Add unique ID
    dispatch(addBuyer(newBuyer));
  };

  const fetchData = async () => {
  const params = {
    page: 1,
    take: 10,
    order: "asc",
    orderBy: "name",
  };
  try {
    await dispatch(getAllBuyersAction({ commonApiParamModel: params })).unwrap();
  } catch (error) {
    console.error("Error fetching buyers:", error);
  }
};


  const refreshBuyers = async () => {
    await fetchData();
  };

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      <Box className="w-full flex items-center justify-between">
        <Typography className="text-2xl font-bold">
          Vendor Management / Buyers
        </Typography>
        {/* <AddNewBuyerDialog onAddBuyer={addNewBuyer} /> */}
        <AddNewBuyerDialog onBuyerCreated={refreshBuyers} />
      </Box>
      <Box className="mt-4">
        <VendorManagementBuyers />
      </Box>
    </Box>
  );
};

export default Buyers;
