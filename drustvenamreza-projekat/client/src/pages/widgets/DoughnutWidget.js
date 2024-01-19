import React from "react";

// chartjs
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// components
import WidgetWrapper from "components/WidgetWrapper";

// style
import { Typography, useTheme } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutWidget = () => {
  const { palette } = useTheme();

  const data = {
    labels: [
      "Facebook",
      "Twitter",
      "LinkedIn",
      "Instagram",
      "Snapchat",
      "Other",
    ],
    datasets: [
      {
        label: "Sources",
        data: [33, 15, 9, 23, 5, 15],
        backgroundColor: [
          "rgb(24, 119, 242)",
          "rgb(0, 172, 238)",
          "rgb(0 , 114, 177)",
          "rgb(131 , 58, 180)",
          "rgb(255 , 252, 0)",
          "rgb(255 , 33, 107)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Sources of new Members
      </Typography>
      <Doughnut data={data} />
    </WidgetWrapper>
  );
};

export default DoughnutWidget;
