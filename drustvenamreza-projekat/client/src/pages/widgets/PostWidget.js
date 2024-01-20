import React, { useState } from 'react';

// redux state
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';

// style
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteRounded,
  ShareOutlined,
  Report,
} from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';

// components
import FlexBetween from 'components/FlexBetween';
import Friend from 'components/Friend';
import WidgetWrapper from 'components/WidgetWrapper';

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isAdmin = useSelector((state) => state.user.admin);
  const isModerator = useSelector((state) => state.user.moderator);

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;

  const patchLike = async () => {
    const res = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });

    const updatedPost = await res.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const handleReport = async () => {
    await fetch(`http://localhost:3001/reports`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId: postId, reportedBy: loggedInUserId }),
    });
  };

  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt={picturePath}
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          {/* LIKE BUTTON */}
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteRounded sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined sx={{ color: main }} />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          {/* COMMENTS BUTTON */}
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        {!isAdmin && !isModerator && (
          <IconButton>
            <ShareOutlined />
          </IconButton>
        )}

        {isModerator && (
          <IconButton onClick={handleReport}>
            <Report />
          </IconButton>
        )}
      </FlexBetween>

      {/* COMMENTS */}
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
