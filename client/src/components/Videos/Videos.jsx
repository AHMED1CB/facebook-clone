import { Box, Container, useTheme } from "@mui/material";
import VideosList from "./VideosList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback, useRef } from "react";
import { getVideos } from "../../App/Redux/Features/Posts/Services";
import CommentsModal from "../Comments/Modal";
import Loader from "../Loader/Loader";

const Videos = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mainVideos = useSelector((s) => s.posts.videos) || [];

  const [videos, setVideos] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const { state } = useSelector((s) => s.posts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (mainVideos.length === 0) {
      dispatch(getVideos(1));
    } else {
      setVideos([...mainVideos]);
    }
  }, [dispatch, mainVideos]);

  const loadMoreVideos = useCallback(
    async (currentIndex) => {
      if (!hasMore || isFetchingRef.current) return;
      if (currentIndex < videos.length - 1) return;

      isFetchingRef.current = true;
      const nextPage = page + 1;

      const result = await dispatch(getVideos(nextPage));

      const newVideos = Array.isArray(result?.payload) ? result.payload : [];

      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prev) => [...prev, ...newVideos]);
        setPage(nextPage);
      }

      isFetchingRef.current = false;
    },
    [dispatch, page, hasMore, videos],
  );

  const handleComment = useCallback(
    (comment) => {
      if (!activePost) return;
      setVideos((prev) =>
        prev.map((v) =>
          v.id === activePost.id
            ? { ...v, comments: [...v.comments, comment] }
            : v,
        ),
      );
    },
    [activePost],
  );

  const handleDelete = useCallback(
    (id) => {
      if (!activePost) return;
      setVideos((prev) =>
        prev.map((v) =>
          v.id === activePost.id
            ? { ...v, comments: v.comments.filter((c) => c.id !== id) }
            : v,
        ),
      );
    },
    [activePost],
  );

  return (
    (videos?.length === 0 && state === "Loading" && <Loader />) || (
      <Box
        sx={{
          minHeight: "95vh",
          bgcolor: theme.palette.background.default,
          pt: 2,
        }}
      >
        <Container maxWidth="lg">
          <VideosList
            videos={videos}
            setOpen={setOpenComments}
            setActivePost={setActivePost}
            onEndReached={loadMoreVideos}
          />
        </Container>

        {activePost && (
          <CommentsModal
            open={openComments}
            onClose={() => setOpenComments(false)}
            post={activePost}
            onComment={handleComment}
            onDelete={handleDelete}
          />
        )}
      </Box>
    )
  );
};

export default Videos;
