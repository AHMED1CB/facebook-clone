import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import CreatePost from "../Posts/CreatePost";
import Posts from "../Posts/Posts";
import Contacts from "../Contacts/Contacts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";
import { getPosts } from "../../App/Redux/Features/Posts/Services";
import Loader from "../Loader/Loader";
import PostContext from "../../App/Context/PostsContext";
import CreatePostModal from "../Posts/CreatePostModal";
import CommentsModal from "../Comments/Modal";
import EditPostModal from "../Posts/EditPostModal";
const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const observerRef = useRef();

  const user = useSelector((s) => s.auth.user);
  const friends = user.friends;

  const { state } = useSelector((s) => s.posts);

  const postsFromRedux = useSelector((s) => s.posts.posts || []);

  const [combinedPosts, setCombinedPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [activePost, setActivePost] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  
  useEffect(() => {
    dispatch(getPosts(1));
  }, [dispatch]);

  
  useEffect(() => {
    if (
      !isLoadingMore &&
      combinedPosts.length === 0 &&
      postsFromRedux.length > 0
    ) {
      
      setCombinedPosts(postsFromRedux);
      return;
    }

    if (isLoadingMore) {
      
      setCombinedPosts((prev) => {
        if (!postsFromRedux || postsFromRedux.length === 0) {
          setHasMore(false); 
          return prev;
        }

        const newPosts = postsFromRedux.filter(
          (p) => !prev.some((c) => c.id === p.id),
        );
        return [...prev, ...newPosts];
      });

      setIsLoadingMore(false);
    }
  }, [postsFromRedux, isLoadingMore, combinedPosts.length]);

  
  const lastPostElementRef = useCallback(
    (node) => {
      if (state === "Loading" || isLoadingMore || !hasMore) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setIsLoadingMore(true);
            const nextPage = page + 1;
            setPage(nextPage);
            dispatch(getPosts(nextPage));
          }
        },
        { threshold: 0.5, rootMargin: "100px" },
      );

      if (node) observerRef.current.observe(node);
    },
    [state, isLoadingMore, hasMore, page, dispatch],
  );

  const onUpload = useCallback((newPost) => {
    if (newPost.post_privacy === "PUB") {
      setCombinedPosts((prev) =>
        prev.some((p) => p.id === newPost.id) ? prev : [newPost, ...prev],
      );
    }
  }, []);

  const openCommentsPlace = useCallback((post) => {
    setActivePost(post);
    setShowComments(true);
  }, []);

  const openEditModal = useCallback((post) => {
    setActivePost(post);
    setShowEditModal(true);
  }, []);

  return (
    <PostContext.Provider
      value={{ posts: combinedPosts, setPosts: setCombinedPosts }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
          width: "100%",
          pt: 2,
          overflowX: "hidden",
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "1400px" },
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
            {/* Sidebar */}
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              sx={{
                display: { xs: "block", sm: "block" },
                flexShrink: 0,
                width: { xs: "100%", sm: "33.333%", md: "25%", lg: "25%" },
                order: { xs: 1, sm: 1 },
                mb: { xs: 2, sm: 0 },
              }}
            >
              <Box
                sx={{
                  position: { md: "fixed" },
                  top: { sm: 80 },
                  maxHeight: { sm: "calc(100vh - 100px)" },
                  overflowY: { sm: "auto" },
                }}
              >
                <Sidebar />
              </Box>
            </Grid>

            {/* Main Content */}
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              lg={6}
              sx={{
                flexGrow: 1,
                width: { xs: "100%", sm: "66.667%", md: "50%", lg: "50%" },
                order: { xs: 3, sm: 2 },
                mx: { xs: "auto", sm: 0 },
                maxWidth: { xs: "100%", sm: "none" },
              }}
            >
              <Box sx={{ mb: 2 }}>
                <CreatePost setOpen={setOpen} />
              </Box>

              <Box>
                <Posts
                  lastElementRef={lastPostElementRef}
                  openCommentsPlace={openCommentsPlace}
                  openEditModal={openEditModal}
                />

                {(state === "Loading" || isLoadingMore) && <Loader />}

                {!hasMore && combinedPosts.length > 0 && (
                  <Typography
                    sx={{
                      margin: "40px auto",
                      width: "fit-content",
                      color: "gray",
                      textAlign: "center",
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                    variant="body1"
                  >
                    No more posts to show
                  </Typography>
                )}
              </Box>
            </Grid>

            {/* Contacts */}
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              lg={3}
              sx={{
                display: { xs: "block", sm: "block" },
                flexShrink: 0,
                width: { xs: "100%", sm: "100%", md: "25%", lg: "25%" },
                order: { xs: 2, sm: 3 },
                mt: { xs: 2, sm: 0 },
              }}
            >
              <Box
                sx={{
                  position: { md: "fixed" },
                  top: { md: 300 },
                  maxHeight: { md: "calc(100vh - 100px)" },
                  overflowY: { md: "auto" },
                }}
              >
                <Contacts contacts={friends} />
              </Box>
            </Grid>
          </Grid>

          <CreatePostModal
            open={open}
            onClose={() => setOpen(!open)}
            onUpload={onUpload}
          />
          <CommentsModal
            open={showComments}
            onClose={() => setShowComments(false)}
            post={activePost}
          />
          <EditPostModal
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            post={activePost}
            onUpdate={(updatedPost) =>
              setCombinedPosts(
                combinedPosts
                  .map((p) => (p.id === updatedPost.id ? updatedPost : p))
                  .filter((p) => p.post_privacy === "PUB"),
              )
            }
          />
        </Container>
      </Box>
    </PostContext.Provider>
  );
};

export default Home;
