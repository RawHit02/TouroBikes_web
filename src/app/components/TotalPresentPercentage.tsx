"use client";

import React, { useEffect } from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store"; // Import RootState and AppDispatch
import { fetchAttendanceStats } from "@/redux/todays_attendance/attendance.actions"; // Import attendance actions

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          component="div"
          className="text-[#000000] flex flex-row self-center text-xs font-normal"
        >
          {`${props.value}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const TotalPresentPercentage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loadingStats } = useSelector(
    (state: RootState) => state.attendance
  );

  useEffect(() => {
    dispatch(fetchAttendanceStats());
  }, [dispatch]);

  // Display a loading spinner if stats are still loading
  if (loadingStats) {
    return <CircularProgress size="88px" />;
  }

  return (
    <CircularProgressWithLabel
      value={stats.present} // Pull mock present data here
      size="88px"
      className="text-[#092E20]" // Dynamic value for present percentage
    />
  );
};

export default TotalPresentPercentage;
