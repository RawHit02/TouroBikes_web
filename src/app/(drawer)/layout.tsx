"use client";
import React from "react";
import { Header, SideNav } from "../components";
import { Box, ThemeProvider } from "@mui/material";
import theme from "../assets/styles/theme";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Box className="bg-primaryLight h-screen w-full p-4">
        <Box className="flex gap-3 w-full">
          <Box className="max-w-[270px] w-full">
            <SideNav />
          </Box>
          <Box className="w-calc(100%-286px) flex flex-col gap-3 w-full">
            <Header />
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
}
