import React, { useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  ThumbUp as ThumbUpIcon,
  ChatBubble as ChatIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

export default  ({ video }) => {
  const theme = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        bgcolor: theme.palette.grey[900],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Video Thumbnail/Background */}
      <Box
        component="img"
        src={video.thumbnail}
        alt={video.title}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: isPlaying ? "brightness(0.7)" : "brightness(0.5)",
        }}
      />

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <IconButton
          onClick={handlePlayPause}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            width: 80,
            height: 80,
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <PlayIcon sx={{ fontSize: 48 }} />
        </IconButton>
      )}

      {/* Top Controls */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          p: 2,
          background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar src={video.authorAvatar} sx={{ width: 40, height: 40 }}>
            {video.author[0]}
          </Avatar>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: 600 }}
            >
              {video.author}
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
              {video.views} views • {video.timeAgo}
            </Typography>
          </Box>
        </Box>

        <Box>
          <IconButton
            onClick={handleMuteToggle}
            sx={{ color: "white" }}
          >
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Bottom Info & Controls */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "white",
            mb: 2,
            fontWeight: 500,
          }}
        >
          {video.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.9)",
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {video.description}
        </Typography>

        {/* Hashtags */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {video.hashtags.map((tag, index) => (
            <Typography
              key={index}
              variant="caption"
              sx={{
                color: theme.palette.primary.light,
                fontWeight: 600,
              }}
            >
              #{tag}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Right Side Actions */}
      <Box
        sx={{
          position: "absolute",
          right: 16,
          bottom: 100,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <IconButton
            onClick={handleLike}
            sx={{
              bgcolor: isLiked
                ? theme.palette.primary.main
                : "rgba(255,255,255,0.2)",
              color: "white",
              mb: 0.5,
              "&:hover": {
                bgcolor: isLiked
                  ? theme.palette.primary.dark
                  : "rgba(255,255,255,0.3)",
              },
            }}
          >
            <ThumbUpIcon />
          </IconButton>
          <Typography variant="caption" sx={{ color: "white", display: "block" }}>
            {isLiked ? video.likes + 1 : video.likes}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              mb: 0.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <ChatIcon />
          </IconButton>
          <Typography variant="caption" sx={{ color: "white", display: "block" }}>
            {video.comments}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <IconButton
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              mb: 0.5,
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <ShareIcon />
          </IconButton>
          <Typography variant="caption" sx={{ color: "white", display: "block" }}>
            Share
          </Typography>
        </Box>
      </Box>

      {/* Center Play/Pause Button (when playing) */}
      {isPlaying && (
        <IconButton
          onClick={handlePlayPause}
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <PauseIcon />
        </IconButton>
      )}
    </Box>
  );
};
