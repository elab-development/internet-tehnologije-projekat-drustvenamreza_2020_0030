import React from 'react';

// chartjs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

// style
import { Typography, useTheme } from '@mui/material';

// components
import WidgetWrapper from 'components/WidgetWrapper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const AreaWidget = () => {
  const { palette } = useTheme();

  const labels = [
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'User Interactions',
        data: labels.map(() => faker.number.int({ min: 300, max: 1200 })),
        borderColor: palette.primary.main,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <WidgetWrapper sx={{ mt: '2rem' }}>
      {' '}
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        # of Users Interactions in 2023
      </Typography>
      <Line data={data} options={options} />
    </WidgetWrapper>
  );
};

export default AreaWidget;
