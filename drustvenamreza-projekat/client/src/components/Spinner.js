import React from "react";

// style
import { Box, Typography, useTheme } from "@mui/material";
import { TailSpin } from "react-loader-spinner";

const Spinner = () => {
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <TailSpin color={palette.primary.main} height={50} width={200}></TailSpin>
      <Typography
        color={palette.primary.main}
        fontWeight="700"
        sx={{ m: "1rem 0" }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Spinner;
