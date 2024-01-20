import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';

import WidgetWrapper from 'components/WidgetWrapper';
import Spinner from 'components/Spinner';
import ReportInfo from 'components/ReportInfo';

const ReportsWidget = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();

  const getReports = async () => {
    const res = await fetch(`http://localhost:3001/reports`, {
      method: 'GET',
    });

    const data = await res.json();
    setReports(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getReports();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper sx={{ mb: '1rem' }}>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        Reports
      </Typography>
      {loading ? (
        <Spinner />
      ) : (
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {reports?.map((report) => (
            <ReportInfo key={report._id} report={report} />
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default ReportsWidget;
