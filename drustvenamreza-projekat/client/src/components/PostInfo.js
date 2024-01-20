import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux state
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';

// style
import { Box, IconButton, Typography, Divider, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// components
import FlexBetween from './FlexBetween';

const PostInfo = ({ post }) => {
  const [toggle, setToggle] = useState(false);
  const [publisher, setPublisher] = useState(null);
  const [reportCount, setReportCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const isAdmin = useSelector((state) => state.user.admin);

  const { palette } = useTheme();

  const dateParser = (createdAt) => {
    let date = new Date(createdAt);
    return `${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
  };

  const getUser = async () => {
    const res = await fetch(`http://localhost:3001/users/${post.userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setPublisher(data);
    setLoading(false);
  };

  const getReports = async () => {
    const res = await fetch('http://localhost:3001/reports', {
      method: 'GET',
    });
    const data = await res.json();
    const postsReports = data.filter((report) => report.postId == post._id);
    setReportCount(postsReports.length);
  };

  const deletePost = async () => {
    await fetch(`http://localhost:3001/posts/${post._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    const res = await fetch('http://localhost:3001/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    dispatch(setPosts({ posts: data }));
    navigate(0);
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    getReports();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <FlexBetween>
        <FlexBetween gap='2rem'>
          <Box width='60px' height='60px'>
            <img
              style={{ objectFit: 'cover' }}
              width='60px'
              height='60px'
              alt='post'
              src={`http://localhost:3001/assets/${post.picturePath}`}
            />
          </Box>
          <Typography>{post.description}</Typography>
        </FlexBetween>
        <IconButton onClick={() => setToggle(!toggle)}>
          <MoreVertIcon />
        </IconButton>
      </FlexBetween>
      <Divider sx={{ mt: '1rem' }} />

      {toggle && (
        <Box>
          <Box p='1rem 0'>
            <FlexBetween>
              <Typography color={palette.neutral.medium}>Posted by</Typography>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : (
                <Typography color={palette.neutral.main} fontWeight='500'>
                  {publisher?.firstName} {publisher?.lastName}
                </Typography>
              )}
            </FlexBetween>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <FlexBetween>
              <Typography color={palette.neutral.medium}>Posted at</Typography>
              <Typography color={palette.neutral.main} fontWeight='500'>
                {dateParser(post.createdAt)}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <FlexBetween>
              <Typography color={palette.neutral.medium}># of likes</Typography>
              <Typography color={palette.neutral.main} fontWeight='500'>
                {Object.keys(post.likes).length}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <FlexBetween>
              <Typography color={palette.neutral.medium}>
                # of comments
              </Typography>
              <Typography color={palette.neutral.main} fontWeight='500'>
                {post.comments.length}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          <Box p='1rem 0'>
            <FlexBetween>
              <Typography color={palette.neutral.medium} sx={{ color: 'red' }}>
                # of reports
              </Typography>
              <Typography
                color={palette.neutral.main}
                fontWeight='500'
                sx={{ color: 'red' }}
              >
                {reportCount}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />

          {isAdmin && (
            <Box p='1rem 0'>
              <FlexBetween>
                <Box></Box>
                <IconButton onClick={deletePost} sx={{ color: 'red' }}>
                  <DeleteOutlineIcon />
                </IconButton>
              </FlexBetween>
            </Box>
          )}

          <Divider />
        </Box>
      )}
    </Box>
  );
};

export default PostInfo;
