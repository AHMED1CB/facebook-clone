import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Divider,
  TextField,
  Button,
  Chip,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  ThumbUp,
  ThumbUpOutlined,
  ChatBubbleOutline,
  ShareOutlined,
  MoreHoriz,
  InsertPhoto,
  Videocam,
  TextFields,
  Send,
  Public,
  MoreVert,
  Favorite,
  EmojiEmotions,
  CameraAlt,
  TagFaces,
} from "@mui/icons-material";

// Single post data
const postData = {
  id: 1,
  user: {
    id: 1,
    name: "John Doe",
    avatar: "JD",
    color: "#1877f2",
  },
  type: "IMG",
  content:
    "Beautiful sunset from my hike yesterday! Nature always has a way of surprising us with its beauty.",
  mediaUrl:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  likes: 42,
  comments: [
    {
      id: 1,
      user: { id: 2, name: "Alice Smith", avatar: "AS", color: "#e91e63" },
      text: "Wow, where is this?",
      timestamp: "2h",
      likes: 3,
    },
    {
      id: 2,
      user: { id: 3, name: "Bob Johnson", avatar: "BJ", color: "#4caf50" },
      text: "Amazing view! Wish I could have been there.",
      timestamp: "1h",
      likes: 1,
    },
    {
      id: 3,
      user: { id: 4, name: "Emma Wilson", avatar: "EW", color: "#ff9800" },
      text: "The colors are absolutely breathtaking! 📸",
      timestamp: "30m",
      likes: 0,
    },
  ],
  isLiked: true,
  timestamp: "2 hours ago",
  location: "Mountain View, California",
  privacy: "Public",
};

const PostPage = () => {
  const theme = useTheme();
  const [post, setPost] = useState(postData);
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const handleLikeToggle = () => {
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: post.user,
      text: newComment,
      timestamp: "Just now",
      likes: 0,
    };

    setPost({
      ...post,
      comments: [...post.comments, comment],
    });

    setNewComment("");
    setIsCommenting(false);
  };

  const handleCommentLike = (commentId) => {
    setPost({
      ...post,
      comments: post.comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 };
        }
        return comment;
      }),
    });
  };

  const renderPostTypeIcon = () => {
    switch (post.type) {
      case "IMG":
        return <InsertPhoto fontSize="small" />;
      case "VID":
        return <Videocam fontSize="small" />;
      case "TXT":
        return <TextFields fontSize="small" />;
      default:
        return null;
    }
  };

  const renderPostContent = () => {
    if (post.type === "IMG") {
      return (
        <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden" }}>
          <img
            src={post.mediaUrl}
            alt="Post content"
            style={{
              width: "100%",
              maxHeight: "500px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      );
    } else if (post.type === "VID") {
      return (
        <Box sx={{ mt: 2, borderRadius: 1, overflow: "hidden" }}>
          <video
            controls
            style={{
              width: "100%",
              maxHeight: "500px",
              backgroundColor: "#000",
              display: "block",
            }}
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100% !important",
        minHeight: "100vh",
        backgroundColor: theme.palette.mode === "dark" ? "#18191a" : "#f0f2f5",
      }}
    >
      <Card
        sx={{
          minWidth: "85%",
          borderRadius: "8px",
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 40,
                height: 40,
              }}
            >
              {post.user.avatar}
            </Avatar>
          }
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {post.user.name}
              </Typography>
            </Box>
          }
          subheader={
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
            >
              <Typography variant="caption" color="text.secondary">
                {post.timestamp}
              </Typography>
              {post.privacy && (
                <>
                  <Typography variant="caption" color="text.secondary">
                    •
                  </Typography>
                  <Public
                    fontSize="small"
                    sx={{ fontSize: "14px", color: "text.secondary" }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {post.privacy}
                  </Typography>
                </>
              )}
            </Box>
          }
          sx={{
            "& .MuiCardHeader-title": {
              fontSize: "0.9375rem",
            },
            "& .MuiCardHeader-subheader": {
              fontSize: "0.8125rem",
            },
            padding: theme.spacing(2),
          }}
        />

        {/* Post Content */}
        <CardContent sx={{ padding: theme.spacing(0, 2, 2, 2) }}>
          <Typography variant="body1" paragraph sx={{ fontSize: "0.9375rem" }}>
            {post.content}
          </Typography>

          {renderPostContent()}

          {/* Post Type and Stats */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Chip
                icon={renderPostTypeIcon()}
                label={
                  post.type === "IMG"
                    ? "Photo"
                    : post.type === "VID"
                      ? "Video"
                      : "Text"
                }
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: "6px",
                  borderColor: theme.palette.divider,
                  "& .MuiChip-icon": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {post.likes} likes
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post.comments.length} comments
              </Typography>
              <Typography variant="caption" color="text.secondary">
                12 shares
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Divider />

        {/* Like, Comment, Share Actions */}
        <CardActions sx={{ padding: "4px 8px" }}>
          <IconButton
            onClick={handleLikeToggle}
            aria-label="like"
            sx={{
              color: post.isLiked
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
              borderRadius: "4px",
              padding: "8px 16px",
              flex: 1,
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.04)",
              },
            }}
          >
            {post.isLiked ? (
              <ThumbUp fontSize="small" sx={{ mr: 1 }} />
            ) : (
              <ThumbUpOutlined fontSize="small" sx={{ mr: 1 }} />
            )}
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Like
            </Typography>
          </IconButton>

          <IconButton
            aria-label="share"
            sx={{
              color: theme.palette.text.secondary,
              borderRadius: "4px",
              padding: "8px 16px",
              flex: 1,
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(0,0,0,0.04)",
              },
            }}
          >
            <ShareOutlined fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Share
            </Typography>
          </IconButton>
        </CardActions>

        <Divider />

        <Box sx={{ padding: theme.spacing(2) }}>
          {/* Comments List */}
          <Box sx={{ mb: 2 }}>
            {post.comments.map((comment) => (
              <Box key={comment.id} sx={{ display: "flex", mb: 2 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1.5,
                    bgcolor: comment.user.color,
                    fontSize: "0.75rem",
                  }}
                >
                  {comment.user.avatar}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.02)",
                      borderRadius: "18px",
                      padding: "12px",
                      maxWidth: "90%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {comment.user.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {comment.timestamp}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: "0.9375rem" }}>
                      {comment.text}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        gap: 1.5,
                      }}
                    >
                      <Tooltip title="Like">
                        <IconButton
                          size="small"
                          onClick={() => handleCommentLike(comment.id)}
                          sx={{
                            padding: "2px",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          <Favorite fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Typography variant="caption" color="text.secondary">
                        {comment.likes > 0 &&
                          `${comment.likes} like${comment.likes !== 1 ? "s" : ""}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Add Comment */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
                fontSize: "0.75rem",
              }}
            >
              {post.user.avatar}
            </Avatar>
            <Box
              sx={{
                flexGrow: 1,
                position: "relative",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.02)",
                borderRadius: "20px",
                padding: "8px 12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                placeholder="Write a comment..."
                size="small"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onFocus={() => setIsCommenting(true)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: "0.9375rem",
                    "& input::placeholder": {
                      fontSize: "0.9375rem",
                    },
                  },
                }}
                sx={{ mr: 1 }}
              />
              {isCommenting && (
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <Tooltip title="Post comment">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      sx={{ padding: "4px" }}
                    >
                      <Send fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Box>
          </Box>

          {isCommenting && newComment && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  setNewComment("");
                  setIsCommenting(false);
                }}
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Comment
              </Button>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default PostPage;
