import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.background.default,
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          {/* Decorative Header */}
          <Box
            sx={{
              height: 8,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          />

          <Box
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: "center",
            }}
          >
            {/* Animated 404 */}
            <Box
              sx={{
                position: "relative",
                mb: 4,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "8rem", md: "12rem" },
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  textShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": {
                      transform: "translateY(0px)",
                    },
                    "50%": {
                      transform: "translateY(-20px)",
                    },
                  },
                }}
              >
                404
              </Typography>

              {/* Floating Error Icon */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation: "spin 10s linear infinite",
                  "@keyframes spin": {
                    "0%": {
                      transform: "translate(-50%, -50%) rotate(0deg)",
                    },
                    "100%": {
                      transform: "translate(-50%, -50%) rotate(360deg)",
                    },
                  },
                }}
              >
                <ErrorIcon
                  sx={{
                    fontSize: { xs: 60, md: 80 },
                    color: alpha(theme.palette.primary.main, 0.2),
                  }}
                />
              </Box>
            </Box>

            {/* Main Message */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Page Not Found
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 4,
                fontSize: { xs: "1rem", md: "1.25rem" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Oops! The page you're looking for doesn't exist. It might have been
              moved or deleted.
            </Typography>

            {/* Suggestion Cards */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                mb: 4,
                justifyContent: "center",
              }}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  💡 Try
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Checking the URL for typos
                </Typography>
              </Paper>

              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: alpha(theme.palette.secondary.main, 0.05),
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  🔍 Or
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Search for what you need
                </Typography>
              </Paper>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<HomeIcon />}
                onClick={handleGoHome}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: theme.shadows[4],
                  "&:hover": {
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                Go to Home
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                  },
                }}
              >
                Go Back
              </Button>
            </Box>

            {/* Popular Links */}
            <Box sx={{ mt: 6, pt: 4, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, fontWeight: 600 }}
              >
                Popular Pages
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {[
                  { label: "Home", path: "/" },
                  { label: "Profile", path: "/profile" },
                  { label: "Videos", path: "/videos" },
                ].map((link) => (
                  <Button
                    key={link.path}
                    size="small"
                    onClick={() => navigate(link.path)}
                    sx={{
                      textTransform: "none",
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Floating Decorative Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            animation: "pulse 4s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": {
                transform: "scale(1)",
                opacity: 0.5,
              },
              "50%": {
                transform: "scale(1.1)",
                opacity: 0.3,
              },
            },
            display: { xs: "none", md: "block" },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: 150,
            height: 150,
            borderRadius: "50%",
            bgcolor: alpha(theme.palette.secondary.main, 0.1),
            animation: "pulse 5s ease-in-out infinite",
            display: { xs: "none", md: "block" },
          }}
        />
      </Container>
    </Box>
  );
};

export default NotFound;