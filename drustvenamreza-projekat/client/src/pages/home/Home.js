import React from 'react';

// redux state
import { useSelector } from 'react-redux';

// style
import { Box, useMediaQuery } from '@mui/material';

// components
import Navbar from 'pages/navbar/Navbar';

// widgets
import UserWidget from 'pages/widgets/UserWidget';
import MyPostWidget from 'pages/widgets/MyPostWidget';
import PostsWidget from 'pages/widgets/PostsWidget';
import AdWidget from 'pages/widgets/AdWidget';
import FriendListWidget from 'pages/widgets/FriendListWidget';
import HashtagsWidget from 'pages/widgets/HashtagsWidget';

const Home = () => {
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
  const { _id, picturePath } = useSelector((state) => state.user);
  const isAdmin = useSelector((state) => state.user.admin);
  const isModerator = useSelector((state) => state.user.moderator);

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
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          {!isAdmin && !isModerator && (
            <MyPostWidget picturePath={picturePath} />
          )}
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis='26%'>
            <AdWidget />
            <HashtagsWidget />
            <Box m='2rem 0' />
            {!isAdmin && !isModerator && <FriendListWidget userId={_id} />}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
