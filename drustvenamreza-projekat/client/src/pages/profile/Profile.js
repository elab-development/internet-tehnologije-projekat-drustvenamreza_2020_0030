import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// redux state
import { useSelector } from 'react-redux';

// style
import { Box, useMediaQuery } from '@mui/material';

// pages
import Navbar from 'pages/navbar/Navbar';

// widgets
import FriendListWidget from 'pages/widgets/FriendListWidget';
import MyPostWidget from 'pages/widgets/MyPostWidget';
import PostsWidget from 'pages/widgets/PostsWidget';
import UserWidget from 'pages/widgets/UserWidget';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isAdmin = useSelector((state) => state.user.admin);
  const isModerator = useSelector((state) => state.user.moderator);

  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const isLoggedInUser = userId === _id;

  const getUser = async () => {
    const res = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        padding='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m='2rem 0' />
          {!isAdmin && !isModerator && <FriendListWidget userId={userId} />}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          {isLoggedInUser && !isAdmin && !isModerator && (
            <MyPostWidget picturePath={user.picturePath} />
          )}
          <Box m='2rem 0' />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
