"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { CheckCircleIcon, CloseOutlinedIcon, MoreVertIcon } from "../assets";

const Reset = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button
        variant="text"
        className="text-[#1085B7] rounded-lg h-10 text-base normal-case"
        onClick={handleClickOpen}
      >
        Reset
      </Button>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
      >
        <DialogTitle className="flex items-start justify-between gap-6 pt-9 pr-9 pl-9">
          <Box>
            <Typography className="text-2xl font-bold">
              Reset Password
            </Typography>
            <Typography className="text-base font-normal text-secondary800 mt-2">
              Change your password
            </Typography>
          </Box>
          <IconButton onClick={handleClose} className="p-0 text-gray100">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="pt-6 pl-9 pr-9">
          <Box className="flex flex-col gap-[8px]">
            <Box className="flex flex-col gap-[4px]">
              <Box className=" flex flex-row justify-start">
                <Typography className=" text-primary text-sm font-normal">
                  Current Password
                </Typography>
                <Typography
                  className="text-red100 text-sm font-normal"
                  component="span"
                >
                  *
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                />
              </Box>
            </Box>
            <Box className="flex flex-col gap-[4px]">
              <Box className="flex flex-row justify-start">
                <Typography className=" text-sm font-normal text-primary">
                  New Password
                </Typography>
                <Typography
                  className="text-red100 text-sm font-normal"
                  component="span"
                >
                  *
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                />
              </Box>
            </Box>
            <Box className="flex flex-col gap-[4px]">
              <Box className="p-[2px] flex flex-row justify-start">
                <Typography className=" text-primary text-sm font-normal">
                  Re-Enter Password
                </Typography>
                <Typography
                  className="text-red100 text-sm font-normal"
                  component="span"
                >
                  *
                </Typography>
              </Box>
              <Box>
                <TextField
                  variant="outlined"
                  fullWidth
                  placeholder="Enter here"
                />
              </Box>
            </Box>
            <Box>
              <Typography
                component="ul"
                className="text-[13px] font-medium text-[#414855]"
              >
                Password Requirements:
              </Typography>
              <Typography
                component="li"
                className="text-[13px] font-medium text-[#414855] pl-2"
              >
                Minimum 8 characters long - the more, the better
              </Typography>
              <Typography
                component="li"
                className="text-[13px] font-medium text-[#414855] pl-2"
              >
                At least one lowercase character
              </Typography>
              <Typography
                component="li"
                className="text-[13px] font-medium text-[#414855] pl-2"
              >
                At least one number, symbol, or whitespace character
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="mb-[36px] px-9">
          <Button
            variant="outlined"
            size="large"
            startIcon={<CloseOutlinedIcon />}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CheckCircleIcon className="!text-[20px]" />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Reset;
