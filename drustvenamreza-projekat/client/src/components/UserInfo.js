import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux state
import { useSelector } from 'react-redux';

// style
import {
  Box,
  IconButton,
  Typography,
  Divider,
  useTheme,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';

// components
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

const UserInfo = ({ user }) => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isBanned, setIsBanned] = useState(false);
  const [usersBan, setUsersBan] = useState(null);
  const token = useSelector((state) => state.token);
  const isAdmin = useSelector((state) => state.user.admin);

  const navigate = useNavigate();
  const { palette } = useTheme();

  const dateParser = (createdAt) => {
    let date = new Date(createdAt);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const getUserPosts = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:3001/posts/${user._id}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  const getBans = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:3001/bans`, {
      method: 'GET',
    });
    const data = await res.json();
    data.forEach((ban) => {
      if (!ban.expired && ban.userId === user._id) {
        if (
          new Date(ban.createdAt).getTime() +
            ban.duration * 86400000 -
            new Date().getTime() >
          0
        ) {
          setIsBanned(true);
          setUsersBan(ban);
        }
      }
    });
    setLoading(false);
  };

  const handleBan = async () => {
    setLoading(true);
    await fetch(`http://localhost:3001/bans`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user._id }),
    });
    getBans();
    setLoading(false);
  };

  useEffect(() => {
    getUserPosts();
    getBans();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <FlexBetween>
        <FlexBetween gap='2rem'>
          <UserImage image={user.picturePath} size='40px' />
          <Box
            onClick={() => {
              navigate(`/profile/${user._id}`);
              navigate(0);
            }}
          >
            <Typography
              color={palette.primary.main}
              variant='h5'
              fontWeight='500'
              sx={{
                '&:hover': { color: palette.primary.light, cursor: 'pointer' },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={palette.neutral.medium} fontSize='0.75rem'>
              {user.friends.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton onClick={() => setToggle(!toggle)}>
          <MoreVertIcon />
        </IconButton>
      </FlexBetween>
      <Divider sx={{ mt: '1rem' }} />

      {toggle && (
        <Box>
          <Box p='1rem 0'>
            <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
              <LocationOnIcon
                fontSize='large'
                sx={{ color: palette.neutral.main }}
              />
              <Typography color={palette.neutral.medium}>
                {user.location}
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' gap='1rem'>
              <WorkIcon fontSize='large' sx={{ color: palette.neutral.main }} />
              <Typography color={palette.neutral.medium}>
                {user.occupation}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <FlexBetween mb='0.5rem'>
              <Typography color={palette.neutral.medium}>Views</Typography>
              <Typography color={palette.neutral.main} fontWeight='500'>
                {user.viewedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={palette.neutral.medium}>
                Impressions
              </Typography>
              <Typography color={palette.neutral.main} fontWeight='500'>
                {user.impressions}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <FlexBetween>
              <Typography color={palette.neutral.medium}>
                Member since
              </Typography>
              <Typography color={palette.neutral.main} fontWeight='500'>
                {dateParser(user.createdAt)}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <FlexBetween>
              <Typography color={palette.neutral.medium}># of posts</Typography>
              {loading ? (
                <Typography color={palette.neutral.main} fontWeight='500'>
                  Loading...
                </Typography>
              ) : (
                <Typography color={palette.neutral.main} fontWeight='500'>
                  {posts.length}
                </Typography>
              )}
            </FlexBetween>
          </Box>

          <Divider />

          {isAdmin && (
            <>
              <Box p='1rem 0'>
                <FlexBetween>
                  <Box></Box>
                  {usersBan && (
                    <Typography color='red'>
                      Banned on{' '}
                      {new Date(usersBan.createdAt).toLocaleDateString()} for{' '}
                      {usersBan.duration} days
                    </Typography>
                  )}
                  <Button
                    variant='contained'
                    sx={{
                      background: 'red',
                      color: 'white',
                      '&:hover': {
                        color: 'red',
                        background: 'white',
                      },
                    }}
                    disabled={isBanned}
                    onClick={handleBan}
                  >
                    {isBanned ? 'Banned' : 'Ban'}
                  </Button>
                </FlexBetween>
              </Box>
              <Divider />
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UserInfo;
