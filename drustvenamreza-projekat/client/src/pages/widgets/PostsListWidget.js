import React, { useEffect, useState } from "react";

// redux state
import { useSelector } from "react-redux";

// style
import { Box, Typography, useTheme } from "@mui/material";

// components
import WidgetWrapper from "components/WidgetWrapper";
import Spinner from "components/Spinner";
import PostInfo from "components/PostInfo";

const PostsListWidget = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();

  const getPosts = async () => {
    const res = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper sx={{ mb: "1rem" }}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Posts
      </Typography>
      {loading ? (
        <Spinner />
      ) : (
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {posts?.map((post) => (
            <PostInfo key={post._id} post={post} />
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostsListWidget;
