import React, { useEffect, useState } from 'react';

// redux state
import { useSelector } from 'react-redux';

// style
import { Box, Typography, useTheme } from '@mui/material';

// components
import Spinner from 'components/Spinner';
import WidgetWrapper from 'components/WidgetWrapper';
import UserInfo from 'components/UserInfo';

const UsersListWidget = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();

  const getUsers = async () => {
    const res = await fetch(`http://localhost:3001/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper sx={{ mb: '1rem' }}>
      <Typography
        color={palette.neutral.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        Users
      </Typography>
      {loading ? (
        <Spinner />
      ) : (
        <Box display='flex' flexDirection='column' gap='1.5rem'>
          {users?.map((user) => (
            <UserInfo key={user._id} user={user} />
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default UsersListWidget;
