import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FlexBetween from './FlexBetween';
import { Report } from '@mui/icons-material';

const ReportInfo = ({ report }) => {
  const [post, setPost] = useState(null);
  const [reporter, setReporter] = useState(null);
  const token = useSelector((state) => state.token);

  const getReportedPost = async () => {
    const res = await fetch(`http://localhost:3001/posts/${report.postId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPost(data);
  };

  const getReporter = async () => {
    const res = await fetch(
      `http://localhost:3001/users/${report.reportedBy}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setReporter(data);
  };

  useEffect(() => {
    getReportedPost();
    getReporter();
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
              src={`http://localhost:3001/assets/${post?.picturePath}`}
            />
          </Box>
          <Box>
            <Typography fontWeight='bold'>{post?.description}</Typography>
            reported by
            <Typography fontWeight='bold'>
              {reporter?.firstName} {reporter?.lastName}
            </Typography>
          </Box>
        </FlexBetween>
        <Report sx={{ color: 'red' }}></Report>
      </FlexBetween>
    </Box>
  );
};

export default ReportInfo;
