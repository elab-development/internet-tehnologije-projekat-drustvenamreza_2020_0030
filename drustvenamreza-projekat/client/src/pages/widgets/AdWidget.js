import React from 'react';

// style
import { Typography, useTheme } from '@mui/material';

// components
import WidgetWrapper from 'components/WidgetWrapper';
import FlexBetween from 'components/FlexBetween';

const AdWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant='h5' fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={medium}>Ad</Typography>
      </FlexBetween>
      <img
        width='100%'
        height='auto'
        alt='advertisement'
        src='http://localhost:3001/assets/info4.jpeg'
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={main}>Cosmetics</Typography>
        <Typography color={medium}>cosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} m='0.5rem 0'>
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdWidget;
