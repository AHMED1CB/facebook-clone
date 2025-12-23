import React from "react";
import { Box, useTheme } from "@mui/material";
import  VideosList  from "./VideosList";

const Videos = () => {
  const theme = useTheme();

  const videos = [
    {
      id: 1,
      title: "Amazing Nature Timelapse 🌅",
      description:
        "Watch this stunning sunset timelapse captured over 3 hours in the mountains. Nature is truly incredible!",
      author: "Nature Lens",
      authorAvatar: "",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      views: "1.2M",
      timeAgo: "2 days ago",
      likes: 45000,
      comments: 892,
      hashtags: ["nature", "timelapse", "sunset", "mountains"],
    },
    {
      id: 2,
      title: "Quick Recipe: Pasta Perfection 🍝",
      description:
        "Learn how to make the perfect creamy pasta in just 15 minutes! Super easy and delicious. Follow for more recipes!",
      author: "Chef Mike",
      authorAvatar: "",
      thumbnail: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
      views: "890K",
      timeAgo: "1 day ago",
      likes: 32000,
      comments: 543,
      hashtags: ["cooking", "recipe", "pasta", "food"],
    },
    {
      id: 3,
      title: "Epic Skateboard Trick 🛹",
      description:
        "Finally landed this trick after 100 attempts! Never give up on your dreams. What trick should I try next?",
      author: "Skate Pro",
      authorAvatar: "",
      thumbnail: "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800",
      views: "2.1M",
      timeAgo: "5 hours ago",
      likes: 67000,
      comments: 1240,
      hashtags: ["skateboarding", "tricks", "extreme", "sports"],
    },
    {
      id: 4,
      title: "Cute Puppy Compilation 🐶",
      description:
        "The cutest puppies you'll see today! Watch till the end for the ultimate cuteness overload. Which one is your favorite?",
      author: "Pet Lovers",
      authorAvatar: "",
      thumbnail: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
      views: "3.5M",
      timeAgo: "3 days ago",
      likes: 125000,
      comments: 2890,
      hashtags: ["puppies", "cute", "dogs", "animals"],
    },
    {
      id: 5,
      title: "Travel Vlog: Tokyo Streets 🇯🇵",
      description:
        "Exploring the beautiful streets of Tokyo at night! The city lights are absolutely mesmerizing. Can't wait to go back!",
      author: "Travel Diaries",
      authorAvatar: "",
      thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      views: "1.8M",
      timeAgo: "1 week ago",
      likes: 58000,
      comments: 1120,
      hashtags: ["travel", "tokyo", "japan", "explore"],
    },
    {
      id: 6,
      title: "Workout Motivation 💪",
      description:
        "Your body can do amazing things! Here's my transformation journey. Remember, consistency is key! Drop a 💪 if you're motivated!",
      author: "Fit Life",
      authorAvatar: "",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
      views: "950K",
      timeAgo: "4 days ago",
      likes: 41000,
      comments: 678,
      hashtags: ["fitness", "workout", "motivation", "health"],
    },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: theme.palette.grey[900],
        overflow: "hidden",
      }}
    >
      <VideosList videos={videos} />
    </Box>
  );
};

export default Videos;
