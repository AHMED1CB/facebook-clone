import { Box, Typography, Chip, useTheme, alpha } from "@mui/material";
import SearchResultCard from "./SearchResultCard";

const SearchResultsList = ({ results, filter, searchQuery }) => {
  const theme = useTheme();

  if (!results || results.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 12,
          px: 3,
        }}
      >
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <Typography variant="h1" sx={{ fontSize: "4rem" }}>
            🔍
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          No results found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          We couldn't find anything for "{searchQuery}"
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try searching with different keywords or check your spelling
        </Typography>
      </Box>
    );
  }

  const getFilterTitle = () => {
    const titles = {
      all: "All Results",
      people: "People",
      posts: "Posts",
      photos: "Photos",
      videos: "Videos",
      groups: "Groups",
      pages: "Pages",
      events: "Events",
      marketplace: "Marketplace",
    };
    return titles[filter] || "All Results";
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {getFilterTitle()}
          </Typography>
          <Chip
            label={`${results.length} results`}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              fontWeight: 700,
              fontSize: "0.875rem",
            }}
          />
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Search results for <strong>"{searchQuery}"</strong>
        </Typography>
      </Box>

      {results.map((result) => (
        <SearchResultCard
          key={result.id}
          result={result}
          type={filter === "all" ? result.type : filter}
        />
      ))}
    </Box>
  );
};

export default SearchResultsList;
