import  { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Message as MessageIcon,
  ThumbUp as ThumbUpIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const SearchResultCard = ({ result, type }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const renderPeopleCard = () => (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={isHovered ? 8 : 0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        p: 3,
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          mb: { xs: 2, sm: 0 },
          mr: { sm: 3 },
          alignSelf: { xs: "center", sm: "flex-start" },
        }}
      >
        <Avatar
          src={result.avatar}
          sx={{
            width: 100,
            height: 100,
            fontSize: "2.5rem",
            border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          {result.name[0]}
        </Avatar>
        {result.verified && (
          <CheckCircleIcon
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              color: theme.palette.primary.main,
              bgcolor: theme.palette.background.paper,
              borderRadius: "50%",
              fontSize: 28,
            }}
          />
        )}
      </Box>
      <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          {result.name}
        </Typography>
        {result.mutualFriends && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {result.mutualFriends} mutual friends
            </Typography>
          </Box>
        )}
        {result.bio && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {result.bio}
          </Typography>
        )}
        {result.tags && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mb: 2,
              flexWrap: "wrap",
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
            {result.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            justifyContent: { xs: "center", sm: "flex-start" },
          }}
        >
          <Button
            startIcon={<PersonAddIcon />}
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
            }}
          >
            Add Friend
          </Button>
          <Button
            startIcon={<MessageIcon />}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
            }}
          >
            Message
          </Button>
        </Box>
      </Box>
    </Card>
  );

  const renderPostCard = () => (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={isHovered ? 8 : 0}
      sx={{
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              src={result.author?.avatar}
              sx={{
                mr: 1.5,
                width: 48,
                height: 48,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              {result.author?.name[0]}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {result.author?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {result.time}
              </Typography>
            </Box>
          </Box>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {result.content}
        </Typography>
      </CardContent>
      {result.image && (
        <CardMedia
          component="img"
          image={result.image}
          alt="Post image"
          sx={{
            maxHeight: 450,
            objectFit: "cover",
            cursor: "pointer",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        />
      )}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button
            startIcon={<ThumbUpIcon />}
            size="small"
            sx={{
              textTransform: "none",
              color: theme.palette.text.secondary,
              fontWeight: 600,
            }}
          >
            {result.likes}
          </Button>
          <Button
            startIcon={<CommentIcon />}
            size="small"
            sx={{
              textTransform: "none",
              color: theme.palette.text.secondary,
              fontWeight: 600,
            }}
          >
            {result.comments}
          </Button>
          <Button
            startIcon={<ShareIcon />}
            size="small"
            sx={{
              textTransform: "none",
              color: theme.palette.text.secondary,
              fontWeight: 600,
            }}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Card>
  );

  const renderPhotoCard = () => (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={isHovered ? 12 : 0}
      sx={{
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        mb: 2,
        cursor: "pointer",
        border: `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          image={result.image}
          alt={result.title}
          sx={{
            height: 300,
            objectFit: "cover",
            transition: "transform 0.5s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.8) 100%)`,
          }}
        />
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={result.author?.avatar}
            sx={{
              mr: 1.5,
              width: 36,
              height: 36,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            {result.author?.name[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {result.author?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {result.time}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const renderGroupCard = () => (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      elevation={isHovered ? 8 : 0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        p: 3,
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <Avatar
        src={result.image}
        variant="rounded"
        sx={{
          width: { xs: "100%", sm: 120 },
          height: 120,
          mr: { sm: 3 },
          mb: { xs: 2, sm: 0 },
          border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          fontSize: "3rem",
        }}
      >
        {result.name[0]}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            mb: 1,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {result.name}
          </Typography>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
          <Chip
            label={`${result.members} members`}
            size="small"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 600,
            }}
          />
          <Chip
            label={result.privacy}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        {result.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {result.description}
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
          }}
        >
          Join Group
        </Button>
      </Box>
    </Card>
  );

  switch (type) {
    case "people":
      return renderPeopleCard();
    case "posts":
      return renderPostCard();
    case "photos":
      return renderPhotoCard();
    case "groups":
      return renderGroupCard();
    default:
      return renderPeopleCard();
  }
};

export default SearchResultCard;
