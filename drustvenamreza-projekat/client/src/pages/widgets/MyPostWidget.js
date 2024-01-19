import React, { useEffect, useState } from 'react';

// redux state
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';

// style
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';

// components
import FlexBetween from 'components/FlexBetween';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';

// forms
import Dropzone from 'react-dropzone';

const MyPostWidget = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [usersBan, setUsersBan] = useState(null);
  const [post, setPost] = useState('');

  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('userId', _id);
    formData.append('description', post);

    if (image) {
      formData.append('picture', image);
      formData.append('picturePath', image.name);
    }

    const res = await fetch(`http://localhost:3001/posts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await res.json();

    dispatch(setPosts({ posts }));
    setImage(null);
    setPost('');
  };

  const getBans = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:3001/bans`, {
      method: 'GET',
    });
    const data = await res.json();
    data.forEach((ban) => {
      if (!ban.expired && ban.userId === _id) {
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

  useEffect(() => {
    getBans();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      {isBanned ? (
        <Box sx={{ margin: '1rem 0' }}>
          <Typography variant='h4' color='#8b0000' fontWeight='bold'>
            You are currently banned due to your actions on this platform.
          </Typography>
          <Typography>
            You were banned on{' '}
            {new Date(usersBan.createdAt).toLocaleDateString()} for{' '}
            {usersBan.duration} days.
          </Typography>
          <Typography>
            If you want to find out more please contact us!
          </Typography>
        </Box>
      ) : (
        <>
          <FlexBetween gap='1.5rem'>
            <UserImage image={picturePath} />
            <InputBase
              placeholder="What's on your mind..."
              onChange={(e) => setPost(e.target.value)}
              value={post}
              sx={{
                width: '100%',
                backgroundColor: palette.neutral.light,
                borderRadius: '2rem',
                padding: '1rem 2rem',
              }}
            />
          </FlexBetween>
          {isImage && (
            <Box
              border={`1px solid ${medium}`}
              borderRadius='5px'
              mt='1rem'
              p='1rem'
            >
              <Dropzone
                acceptedFiles='.jpg,.jpeg,.png'
                multiple={false}
                onDrop={(acceptedFiles) => {
                  setImage(acceptedFiles[0]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <FlexBetween>
                    <Box
                      {...getRootProps()}
                      border={`2px dashed ${palette.primary.main}`}
                      p='1rem'
                      width='100%'
                      sx={{ '&:hover': { cursor: 'pointer' } }}
                    >
                      <input {...getInputProps()} />
                      {!image ? (
                        <p>Add Image</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{image.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                    {image && (
                      <IconButton
                        onClick={() => setImage(null)}
                        sx={{ width: '15%' }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </FlexBetween>
                )}
              </Dropzone>
            </Box>
          )}

          <Divider sx={{ margin: '1.25rem 0' }} />

          <FlexBetween>
            <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ '&:hover': { cursor: 'pointer', color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>
            {isNonMobileScreens ? (
              <>
                <FlexBetween gap='0.25rem'>
                  <GifBoxOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Clip</Typography>
                </FlexBetween>
                <FlexBetween gap='0.25rem'>
                  <AttachFileOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Attachment</Typography>
                </FlexBetween>
                <FlexBetween gap='0.25rem'>
                  <MicOutlined sx={{ color: mediumMain }} />
                  <Typography color={mediumMain}>Audio</Typography>
                </FlexBetween>
              </>
            ) : (
              <FlexBetween gap='0.25rem'>
                <MoreHorizOutlined sx={{ color: mediumMain }} />
              </FlexBetween>
            )}

            <Button
              disabled={!post || !image}
              onClick={handlePost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: '3rem',
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </>
      )}
    </WidgetWrapper>
  );
};

export default MyPostWidget;
