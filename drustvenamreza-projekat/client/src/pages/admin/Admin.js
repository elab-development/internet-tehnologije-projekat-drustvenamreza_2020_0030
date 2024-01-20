import React from 'react';

// styles
import { Box, useMediaQuery } from '@mui/material';

// components
import Navbar from 'pages/navbar/Navbar';

// widgets
import UsersListWidget from 'pages/widgets/UsersListWidget';
import PostsListWidget from 'pages/widgets/PostsListWidget';
import ChartWidget from 'pages/widgets/DoughnutWidget';
import AreaWidget from 'pages/widgets/AreaWidget';
import ReportsWidget from 'pages/widgets/ReportsWidget';

const Admin = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box flexBasis={isNonMobileScreens ? '30%' : undefined}>
          {/* USERS */}
          <UsersListWidget />
          <ReportsWidget />
        </Box>
        <Box flexBasis={isNonMobileScreens ? '30%' : undefined}>
          {/* POSTS */}
          <PostsListWidget />
        </Box>
        <Box flexBasis={isNonMobileScreens ? '30%' : undefined}>
          {/* CHARTS */}
          <ChartWidget />
          <AreaWidget />
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
