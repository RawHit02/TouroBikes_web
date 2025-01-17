"use client"
import React, { useEffect } from "react";
import { ContactsOutlinedIcon, DashChartIcon, DashEditIcon, DashSuitCaseIcon, DiamondImg, LocalOfferOutlinedIcon, OverDueIcon, ShieldPersonIcon, TotalSellerIcon } from "@/app/assets";
import { DiamodStock, GoldStock, PrimaryTableExample2, SilverStock, UpdatePriceDialog } from "@/app/components";
import { Box, Typography, Grid2 as Grid } from "@mui/material";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchDashboardData} from "@/redux/dashboard/dashboard_actions";
import TodaysDue from "@/app/components/TodaysDue";



const Dashboard = () => {
  const dispatch = useAppDispatch();

  // Selecting data from the Redux store
  const {
    totalAmountDue,
    totalSupplier,
    totalBuyer,
    totalEmployee,
    totalUser,
    totalRevenue,
    totalPurchase,
    totalSell,
  } = useAppSelector((state) => state.dashboard);

  // Fetch data when the dashboard is loaded
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  // console.log("Dashboard Data from Redux:", {
  //   totalAmountDue,
  //   totalSupplier,
  //   totalBuyer,
  //   totalEmployee,
  //   totalUser,
  //   totalRevenue,
  //   totalPurchase,
  //   totalSell,
  // }); // Debug Redux state
  
  //  console.log("Component - Total Employee from Redux:", totalEmployee); // Log state from Redux

  return (
    <>
      <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12, lg: 6 }}>
            <Grid container spacing={2}>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={OverDueIcon} alt="overdue" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">
                    TOTAL OVER DUE
                  </Typography>
                  <Typography className="text-xl text-gray400 font-medium">
                    {totalAmountDue}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={TotalSellerIcon} alt="total seller" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">
                    TOTAL Suppliers
                  </Typography>
                  <Typography className="text-xl text-gray400 font-medium">
                    {" "}
                    {totalSupplier}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <ContactsOutlinedIcon className="text-[#1D1D1D] text-[18px]" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">
                    TOTAL BUYERS
                  </Typography>
                  <Typography className="text-xl text-gray400 font-medium">
                    {totalBuyer}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={DashEditIcon} alt="edit" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">
                    TOTAL EMPLOYEE
                  </Typography>
                  <Typography className="text-xl text-gray400 font-medium">
                    {(() => {
                      // console.log("Total Employee Data:", totalEmployee); // Log data here
                      return totalEmployee;
                    })()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 6 }}>
            <Grid container spacing={2}>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={ShieldPersonIcon} alt="overdue" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">
                    TOTAL USERS
                  </Typography>
                  <Typography className="text-xl text-gray400 font-medium">
                    {totalUser}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={DashChartIcon} alt="overdue" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">
                    TOTAL REVENUE
                  </Typography>
                  <Typography className="text-xl text-gray400 font-medium">
                    {totalRevenue}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <Image src={DashSuitCaseIcon} alt="overdue" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">
                    TOTAL PURCHASE
                  </Typography>
                  <Typography className="text-xl text-gray400 font-medium">
                    {totalPurchase}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={3}>
                <Box className="border border-primary100 rounded-lg p-4 relative overflow-hidden cursor-pointer dash-card">
                  <Box className="min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full bg-primaryExtraLight flex items-center justify-center mb-4">
                    <LocalOfferOutlinedIcon className="text-gray100 text-[20px]" />
                  </Box>
                  <Typography className="text-primary text-[11px] font-medium mb-2">
                    TOTAL Sell
                  </Typography>
                  <Typography className="text-xl text-gray400 font-medium">
                    {totalSell}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mt-4">
          <Grid size={{ xs: 4, md: 4, lg: 4 }}>
            <DiamodStock />
          </Grid>
          <Grid size={{ xs: 4, md: 4, lg: 4 }}>
            <GoldStock />
          </Grid>
          <Grid size={{ xs: 4, md: 4, lg: 4 }}>
            <SilverStock />
          </Grid>
        </Grid>

        <Grid container spacing={2} className="mt-4">
          <Grid size={{ xs: 3, md: 3, lg: 3 }}>
            <Box className="border border-primary100 rounded-lg p-6 flex justify-between items-start">
              <Box>
                <Typography className="text-[12px] text-primary max-w-[110px] w-full">
                  Commodity Price for Suppliers
                </Typography>
                <Typography className="text-2xl font-bold mt-4">
                  $2,563
                </Typography>
                <Typography className="text-[12px] text-secondary800 font-medium mt-[6px]">
                  From <span className="text-success200">April 1st, 2024</span>{" "}
                  To <span className="text-success200">Today</span>
                </Typography>
                <UpdatePriceDialog title="Commodity Price for Suppliers" />
              </Box>
              <Box>
                <Image src={DiamondImg} alt="coin" />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 3, md: 3, lg: 3 }}>
            <Box className="border border-primary100 rounded-lg p-6 flex justify-between items-start">
              <Box>
                <Typography className="text-[12px] text-primary max-w-[110px] w-full">
                  Commodity Price for Suppliers
                </Typography>
                <Typography className="text-2xl font-bold mt-4">
                  $2,563
                </Typography>
                <Typography className="text-[12px] text-secondary800 font-medium mt-[6px]">
                  From <span className="text-success200">April 1st, 2024</span>{" "}
                  To <span className="text-success200">Today</span>
                </Typography>
                <UpdatePriceDialog title="Commodity Price for Suppliers" />
              </Box>
              <Box>
                <Image src={DiamondImg} alt="coin" />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 3, md: 3, lg: 3 }}>
            <Box className="border border-primary100 rounded-lg p-6 flex justify-between items-start">
              <Box>
                <Typography className="text-[12px] text-primary max-w-[160px] w-full">
                  Set Daily Commission for Commodities for Supplier
                </Typography>
                <Typography className="text-2xl font-bold mt-4">
                  $2,563
                </Typography>
                <Typography className="text-[12px] text-secondary800 font-medium mt-[6px]">
                  From <span className="text-success200">April 1st, 2024</span>{" "}
                  To <span className="text-success200">Today</span>
                </Typography>
                <UpdatePriceDialog title="Set Daily Commission for Commodities for Supplier" />
              </Box>
              <Box>
                <Image src={DiamondImg} alt="coin" />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 3, md: 3, lg: 3 }}>
            <Box className="border border-primary100 rounded-lg p-6 flex justify-between items-start">
              <Box>
                <Typography className="text-[12px] text-primary max-w-[160px] w-full">
                  Set Daily Commission for Commodities for Supplier
                </Typography>
                <Typography className="text-2xl font-bold mt-4">
                  $2,563
                </Typography>
                <Typography className="text-[12px] text-secondary800 font-medium mt-[6px]">
                  From <span className="text-success200">April 1st, 2024</span>{" "}
                  To <span className="text-success200">Today</span>
                </Typography>
                <UpdatePriceDialog title="Set Daily Commission for Commodities for Buyers" />
              </Box>
              <Box>
                <Image src={DiamondImg} alt="coin" />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box className="border border-primary100 rounded-lg p-4 mt-4">
          <Typography>Today&apos;s Due</Typography>
          <Box className="mt-6">
            <TodaysDue/>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
