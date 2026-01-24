import {
  Modal,
  Box,
  Button,
  IconButton,
  Avatar,
  Typography,
  Divider,
  Paper,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  CircularProgress,
  Fade,
  Badge,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  Close,
  PhotoCamera,
  PublicOutlined,
  GroupOutlined,
  LockOutlined,
  CheckCircle,
  Videocam,
  EmojiEmotions,
  LocationOn,
  Tag,
  Gif,
  InsertEmoticon,
  Image,
  VideoCameraBack,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../App/services/api";
import Alert from "../../App/Alert/Swal";
import { upload } from "../../App/services/postservices";

export default ({ open, onClose, onUpload }) => {
  const theme = useTheme();

  let defaultData = {
    post_type: "TXT",
    post_privacy: "PUB",
    post_content: "",
    subtext: "",
  };
  const [post, setPost] = useState(defaultData);
  let [mediaPath, setMediaPath] = useState(null);
  const [privacyAnchorEl, setPrivacyAnchorEl] = useState(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState("public");
  const [loading, setLoading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handlePrivacyClick = (event) => {
    setPrivacyAnchorEl(event.currentTarget);
  };

  const handlePrivacyClose = () => {
    setPrivacyAnchorEl(null);
  };

  const handlePrivacySelect = (privacy) => {
    setSelectedPrivacy(privacy);
    let privacies = {
      public: "PUB",
      private: "PRIV",
      friends: "FRI",
    };
    setPost({ ...post, post_privacy: privacies[privacy] });
    handlePrivacyClose();
  };

  const getPrivacyIcon = () => {
    switch (selectedPrivacy) {
      case "public":
        return <PublicOutlined sx={{ fontSize: 18 }} />;
      case "friends":
        return <GroupOutlined sx={{ fontSize: 18 }} />;
      case "private":
        return <LockOutlined sx={{ fontSize: 18 }} />;
      default:
        return <PublicOutlined sx={{ fontSize: 18 }} />;
    }
  };

  const getPrivacyText = () => {
    switch (selectedPrivacy) {
      case "public":
        return "Public";
      case "friends":
        return "Friends";
      case "private":
        return "Only me";
      default:
        return "Public";
    }
  };

  const getPrivacyDescription = () => {
    switch (selectedPrivacy) {
      case "public":
        return "Anyone can see this";
      case "friends":
        return "Only your friends";
      case "private":
        return "Only you can see";
      default:
        return "Anyone can see this";
    }
  };

  const getPrivacyColor = () => {
    switch (selectedPrivacy) {
      case "public":
        return theme.palette.success.main;
      case "friends":
        return theme.palette.info.main;
      case "private":
        return theme.palette.warning.main;
      default:
        return theme.palette.success.main;
    }
  };

  const user = useSelector((s) => s.auth.user);

  let profileImage = user.photo ? (
    <Avatar
      src={`${api.getUri()}/../storage/${user.photo}`}
      sx={{
        width: 44,
        height: 44,
        border: `2px solid ${theme.palette.primary.main}20`,
      }}
    />
  ) : (
    <Avatar
      sx={{
        width: 44,
        height: 44,
        bgcolor: theme.palette.primary.main,
        fontSize: "1.1rem",
        fontWeight: 600,
      }}
    >
      {user.name[0].toUpperCase()}
    </Avatar>
  );

  const imgInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageChanged = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      Alert.error("Invalid Image File", "The chosen file is not an image");
      return;
    }

    setHasVideo(false);
    setPost({
      ...post,
      post_type: "IMG",
      post_content: file,
      subtext: post.subtext || "",
    });

    const reader = new FileReader();
    reader.onload = (r) => {
      setMediaPath(r.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoChanged = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      Alert.error("Invalid Video File", "The chosen file is not a video");
      return;
    }

    const maxSize = 40 * 1024 * 1024;
    if (file.size > maxSize) {
      Alert.error("File Too Large", "Video must be less than 40MB");
      return;
    }

    setHasVideo(true);
    setPost({
      ...post,
      post_type: "VID",
      post_content: file,
      subtext: post.subtext || "",
    });

    const reader = new FileReader();
    reader.onload = (r) => {
      setMediaPath(r.target.result);
    };
    reader.readAsDataURL(file);
  };

  const clearMedia = () => {
    setPost({
      ...post,
      post_type: "TXT",
      post_content: "",
      subtext: post.post_type === "TXT" ? post.subtext : "",
    });
    setMediaPath(null);
    setHasVideo(false);
    if (imgInputRef.current) imgInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCharCount(text.length);
    setPost({
      ...post,
      subtext: text,
      post_content: post.post_type === "TXT" ? text.trim() : post.post_content,
    });
  };

  const uploadPost = async () => {
    if (loading) return;

    if (
      post.post_type === "TXT" &&
      (!post.post_content || post.post_content.trim().length < 1)
    ) {
      Alert.error("Invalid Details", "Post content cannot be empty");
      return;
    }

    if (
      (post.post_type === "IMG" || post.post_type === "VID") &&
      !post.post_content
    ) {
      Alert.error("Invalid Details", "Please select a file to upload");
      return;
    }

    setLoading(true);

    try {
      let form = new FormData();
      form.append("post_privacy", post.post_privacy);
      form.append("post_type", post.post_type);

      if (post.post_type === "TXT") {
        form.append("post_content", post.post_content);
      } else {
        form.append("post_content", post.post_content);
      }

      if (post.subtext && post.subtext.trim().length > 0) {
        form.append("subtext", post.subtext);
      }

      setIsVideoUploading(post.post_type === "VID");
      let uploaded = await upload(form);
      if (uploaded?.data?.data?.post) {
        onUpload(uploaded.data.data.post);
        onClose();
        setPost(defaultData);
        setMediaPath(null);
        setHasVideo(false);
        setSelectedPrivacy("public");
        setCharCount(0);
      } else {
        Alert.error("Upload Failed", "Failed to create post");
      }
    } catch (error) {
      Alert.error("Upload Failed", error.message || "Something went wrong");
    } finally {
      setLoading(false);
      setIsVideoUploading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <Fade in={open}>
        <Paper
          sx={{
            width: { xs: "95vw", sm: "600px", md: "650px" },
            maxHeight: "90vh",
            overflow: "hidden",
            borderRadius: 3,
            boxShadow: theme.shadows[24],
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              p: 2.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                color: theme.palette.text.primary,
              }}
            >
              Create Post
            </Typography>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                position: "absolute",
                right: 16,
                bgcolor: theme.palette.action.hover,
                "&:hover": {
                  bgcolor: theme.palette.action.selected,
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* User Info & Privacy */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2.5,
              gap: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.background.paper,
            }}
          >
            {profileImage}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: theme.palette.text.primary,
                  mb: 0.5,
                }}
              >
                {user.name}
              </Typography>
              <Chip
                icon={getPrivacyIcon()}
                label={getPrivacyText()}
                onClick={handlePrivacyClick}
                size="small"
                sx={{
                  bgcolor: getPrivacyColor() + "15",
                  color: getPrivacyColor(),
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  height: 28,
                  "& .MuiChip-icon": {
                    color: getPrivacyColor(),
                    fontSize: 16,
                  },
                  "&:hover": {
                    bgcolor: getPrivacyColor() + "25",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Privacy Menu */}
          <Menu
            anchorEl={privacyAnchorEl}
            open={Boolean(privacyAnchorEl)}
            onClose={handlePrivacyClose}
            PaperProps={{
              sx: {
                width: 340,
                borderRadius: 2,
                boxShadow: theme.shadows[10],
                mt: 1,
                border: `1px solid ${theme.palette.divider}`,
                overflow: "hidden",
              },
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: theme.palette.text.primary,
                }}
              >
                Select Audience
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.85rem",
                  color: theme.palette.text.secondary,
                  mt: 0.5,
                }}
              >
                Choose who can see your post
              </Typography>
            </Box>
            <Divider />

            {[
              {
                value: "public",
                icon: PublicOutlined,
                label: "Public",
                desc: "Anyone can see this",
              },
              {
                value: "friends",
                icon: GroupOutlined,
                label: "Friends",
                desc: "Only your friends",
              },
              {
                value: "private",
                icon: LockOutlined,
                label: "Only me",
                desc: "Only you can see",
              },
            ].map((item) => (
              <MenuItem
                key={item.value}
                onClick={() => handlePrivacySelect(item.value)}
                sx={{
                  py: 2,
                  px: 2.5,
                  gap: 2,
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: getPrivacyColor() + "15",
                    color: getPrivacyColor(),
                  }}
                >
                  <item.icon />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                    {item.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.85rem",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {item.desc}
                  </Typography>
                </Box>
                {selectedPrivacy === item.value && (
                  <CheckCircle sx={{ color: theme.palette.primary.main }} />
                )}
              </MenuItem>
            ))}
          </Menu>

          {/* Text Area */}
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Box sx={{ p: 2.5, position: "relative" }}>
              <textarea
                placeholder={
                  hasVideo
                    ? "Add a caption for your video..."
                    : "What's on your mind?"
                }
                value={post.subtext || ""}
                onChange={handleTextChange}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  fontSize: "1.5rem",
                  fontFamily: "inherit",
                  minHeight: "150px",
                  color: theme.palette.text.primary,
                  backgroundColor: "transparent",
                  lineHeight: 1.6,
                  "&::placeholder": {
                    color: theme.palette.text.disabled,
                  },
                }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 16,
                  fontSize: "0.75rem",
                  color:
                    charCount > 0
                      ? theme.palette.text.secondary
                      : "transparent",
                }}
              >
                {charCount} characters
              </Typography>
            </Box>

            {/* Media Preview */}
            {mediaPath && (
              <Box
                sx={{
                  m: 2.5,
                  mt: 0,
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                {isVideoUploading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: alpha(theme.palette.common.black, 0.7),
                      zIndex: 2,
                    }}
                  >
                    <CircularProgress color="primary" />
                    <Typography sx={{ color: "white", ml: 2, fontWeight: 500 }}>
                      Uploading video...
                    </Typography>
                  </Box>
                )}

                {post.post_type === "IMG" ? (
                  <Box
                    component="img"
                    src={mediaPath}
                    alt="Preview"
                    sx={{
                      width: "100%",
                      maxHeight: 400,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <Box
                    component="video"
                    src={mediaPath}
                    controls
                    sx={{
                      width: "100%",
                      maxHeight: 400,
                      backgroundColor: "#000",
                      display: "block",
                    }}
                  />
                )}

                <IconButton
                  onClick={clearMedia}
                  disabled={isVideoUploading}
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: alpha(theme.palette.common.black, 0.7),
                    color: "white",
                    "&:hover": {
                      bgcolor: theme.palette.common.black,
                    },
                  }}
                >
                  <Close />
                </IconButton>
              </Box>
            )}

            {/* Media Type Badge */}
            {post.post_type !== "TXT" && (
              <Box sx={{ px: 2.5, mb: 2 }}>
                <Chip
                  icon={
                    post.post_type === "IMG" ? (
                      <Image fontSize="small" />
                    ) : (
                      <VideoCameraBack fontSize="small" />
                    )
                  }
                  label={`${post.post_type === "IMG" ? "Photo" : "Video"} post`}
                  size="small"
                  sx={{
                    bgcolor: theme.palette.primary.main + "15",
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    "& .MuiChip-icon": {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              p: 2.5,
              borderTop: `1px solid ${theme.palette.divider}`,
              borderBottom: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                color: theme.palette.text.primary,
                mb: 2,
              }}
            >
              Add to your post
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Add Photo" arrow>
                <IconButton
                  onClick={() => imgInputRef.current.click()}
                  disabled={hasVideo || isVideoUploading}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: theme.palette.success.main + "15",
                    color: theme.palette.success.main,
                    "&:hover": {
                      bgcolor: theme.palette.success.main + "25",
                    },
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </Tooltip>

              <Tooltip title="Add Video" arrow>
                <IconButton
                  onClick={() => videoInputRef.current.click()}
                  disabled={post.post_type === "IMG" || isVideoUploading}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: theme.palette.error.main + "15",
                    color: theme.palette.error.main,
                    "&:hover": {
                      bgcolor: theme.palette.error.main + "25",
                    },
                  }}
                >
                  <Videocam />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              p: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: getPrivacyColor() + "15",
                  color: getPrivacyColor(),
                }}
              >
                {getPrivacyIcon()}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                  {getPrivacyText()}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {getPrivacyDescription()}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={uploadPost}
              disabled={loading || isVideoUploading}
              sx={{
                fontWeight: 700,
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: 2,
                fontSize: "1rem",
                minWidth: 120,
                bgcolor: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
                "&.Mui-disabled": {
                  bgcolor: theme.palette.action.disabled,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Post"
              )}
            </Button>
          </Box>

          {/* Hidden file inputs */}
          <input
            type="file"
            hidden
            accept="image/*"
            ref={imgInputRef}
            onChange={handleImageChanged}
          />
          <input
            type="file"
            hidden
            accept="video/*"
            ref={videoInputRef}
            onChange={handleVideoChanged}
          />
        </Paper>
      </Fade>
    </Modal>
  );
};
