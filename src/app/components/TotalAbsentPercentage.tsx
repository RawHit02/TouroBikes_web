"use client";

import React, { useEffect } from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchAttendanceStats } from "@/redux/todays_attendance/attendance.actions";

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
        <Box className="flex flex-col">
          <Typography
            component="div"
            className="text-[#000000] flex flex-row self-center text-xs font-normal"
          >
            {`${props.value}%`}
          </Typography>
          <Typography
            component="div"
            className="text-[#000000] flex flex-row self-center text-xs font-normal"
          >
            Absent
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

const TotalAbsentPercentage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Select absent stats and loading state from Redux
  const { stats, loadingStats } = useSelector(
    (state: RootState) => state.attendance
  );

  // Fetch attendance stats on mount
  useEffect(() => {
    dispatch(fetchAttendanceStats());
  }, [dispatch]);

  // Show loading spinner if stats are loading
  if (loadingStats) {
    return <CircularProgress size="88px" />;
  }

  return (
    <CircularProgressWithLabel
      value={stats.absent} // Dynamic value for absent percentage
      size="88px"
      className="text-[#00A870]"
    />
  );
};

export default TotalAbsentPercentage;

// "use client";
// import * as React from "react";
// import CircularProgress, {
//   CircularProgressProps,
// } from "@mui/material/CircularProgress";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// function CircularProgressWithLabel(
//   props: CircularProgressProps & { value: number }
// ) {
//   return (
//     <Box sx={{ position: "relative", display: "inline-flex" }}>
//       <CircularProgress variant="determinate" {...props} />
//       <Box
//         sx={{
//           top: 0,
//           left: 0,
//           bottom: 0,
//           right: 0,
//           position: "absolute",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <Box className="flex flex-col">
//           <Typography
//             component="div"
//             className="text-[#000000] flex flex-row self-center text-xs font-normal"
//           >
//             21%
//           </Typography>
//           <Typography
//             component="div"
//             className="text-[#000000] flex flex-row self-center text-xs font-normal"
//           >
//             Absent
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default function TotalAbsentPercentage() {
//   const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) =>
//         prevProgress >= 100 ? 0 : prevProgress + 10
//       );
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <CircularProgressWithLabel
//       value={21}
//       size="88px"
//       className="text-[#00A870]"
//     />
//   );
// }
