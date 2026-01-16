import { Box, Typography } from "@mui/material";
import Post from "./Post";
import { useContext, useState } from "react";
import PostContext from "../../App/Context/PostsContext";
import { like } from "../../App/services/postservices";

export default ({ lastElementRef }) => {
  const { posts, setPosts } = useContext(PostContext);

  const [loading, setLoading] = useState(false);

  const likePost = async (idx) => {
    if (loading) {
      return;
    }

    setLoading(() => true);

    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === idx
          ? {
              ...post,
              likes_count: post.isLiked
                ? post.likes_count - 1
                : post.likes_count + 1,
              isLiked: !post.isLiked,
            }
          : post
      )
    );

    await like(posts[idx].id);

    setLoading(() => false);
  };

  return (
    <Box width={"100%"}>
      {posts.map((post, i) => {
        let isLast = i === posts.length - 1;
        return (
          <Post
            key={post.id}
            post={posts[i]}
            ref={isLast ? lastElementRef : null}
            onLike={() => likePost(i)}
          />
        );
      })}
      {posts.length == 0 && (
        <Typography color="gray" variant="h2" sx={{ textAlign: "center" }}>
          No Posts Yet
        </Typography>
      )}
    </Box>
  );
};
