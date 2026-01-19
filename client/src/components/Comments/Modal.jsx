import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  IconButton,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import {
  Close,
  Favorite,
  FavoriteBorder,
  Send,
  MoreVert,
} from "@mui/icons-material";
import api from "../../App/services/api";
import { useSelector } from "react-redux";

export default function CommentsModal({
  open = true,
  onClose = () => {},
  post,
}) {
  const [comments, setComments] = useState(post?.comments);
  const [text, setText] = useState("");
  const [loading] = useState(false);

  const addComment = () => {
    if (!text.trim()) return;
    setComments([
      {
        id: Date.now(),
        user: {
          name: "Current User",
          avatar: "https://i.pravatar.cc/150?img=4",
        },
        text,
        time: "Now",
        likes: 0,
        liked: false,
      },
      ...comments,
    ]);
    setText("");
  };


  const toggleLike = (id) =>
    setComments(
      comments.map((c) =>
        c.id === id
          ? { ...c, liked: !c.liked, likes: c.likes + (c.liked ? -1 : 1) }
          : c,
      ),
    );

  useEffect(() => {
    if (post) {
      setComments(post.comments);
    }
  }, [post]);

  const authUser = useSelector((s) => s.auth.user)

  return (
    comments && (
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            maxHeight: "85vh",
            width: "90vw",
            bgcolor: "background.paper",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography fontWeight={700}>Comments</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>

          {/* List */}
          <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
              </Box>
            ) : comments.length ? (
              <List disablePadding>
                {comments.map((c, i) => (
                  <React.Fragment key={c.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={`${api.getUri()}/../storage/${c.user.photo}`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography fontWeight={700}>
                              {c.user.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {c.time}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography sx={{ my: 1 }}>{c.content}</Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                            </Box>
                          </>
                        }
                      />
                    </ListItem>
                    {i < comments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography align="center" color="text.secondary">
                No comments yet
              </Typography>
            )}
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              gap: 1,
            }}
          >
            <Avatar src={`${api.getUri()}/../storage/${authUser.photo}`} />
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Write a comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), addComment())
              }
            />
            <IconButton onClick={addComment} disabled={!text.trim()}>
              <Send />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    )
  );
}
