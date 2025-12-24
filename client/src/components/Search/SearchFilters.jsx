import {
  Box,
  Paper,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Person as PersonIcon,
  Group as GroupIcon,
  Pages as PagesIcon,
  PhotoLibrary as PhotoIcon,
  VideoLibrary as VideoIcon,
  Event as EventIcon,
  Store as StoreIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const SearchFilters = ({ activeFilter, onFilterChange, resultsCount = {} }) => {
  const theme = useTheme();

  const filters = [
    { id: "all", label: "All", icon: <SearchIcon />, count: resultsCount.all || 0 },
    { id: "people", label: "People", icon: <PersonIcon />, count: resultsCount.people || 0 },
    { id: "posts", label: "Posts", icon: <PagesIcon />, count: resultsCount.posts || 0 },
    { id: "photos", label: "Photos", icon: <PhotoIcon />, count: resultsCount.photos || 0 },
    { id: "videos", label: "Videos", icon: <VideoIcon />, count: resultsCount.videos || 0 },
    { id: "groups", label: "Groups", icon: <GroupIcon />, count: resultsCount.groups || 0 },
    { id: "pages", label: "Pages", icon: <PagesIcon />, count: resultsCount.pages || 0 },
    { id: "events", label: "Events", icon: <EventIcon />, count: resultsCount.events || 0 },
    { id: "marketplace", label: "Marketplace", icon: <StoreIcon />, count: resultsCount.marketplace || 0 },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        position: { xs: "relative"},
        display: {md: 'none' , xl: 'Block'},
        top: { md: 80 },
        border: `1px solid ${theme.palette.divider}`,
        overflow: "hidden",
        mb: { xs: 2, md: 0 },
      }}
    >
      {/* Header - Hide on mobile */}
      <Box
        sx={{
          p: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.05
          )} 100%)`,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: { xs: "none", md: "block" },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Search Filters
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Refine your results
        </Typography>
      </Box>

      {/* Filters List */}
      <List
        sx={{
          p: 2,
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          overflowX: { xs: "auto", md: "visible" },
          gap: { xs: 1, md: 0 },
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: alpha(theme.palette.text.primary, 0.2),
            borderRadius: 3,
          },
        }}
      >
        {filters.map((filter) => (
          <ListItemButton
            key={filter.id}
            selected={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
            sx={{
              borderRadius: 2,
              mb: { xs: 0, md: 1 },
              minWidth: { xs: "auto", md: "auto" },
              flexShrink: { xs: 0, md: 1 },
              flexDirection: { xs: "column", md: "row" },
              py: { xs: 1.5, md: 1 },
              px: { xs: 2, md: 2 },
              transition: "all 0.2s ease-in-out",
              "&.Mui-selected": {
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
              },
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
                transform: { xs: "translateY(-2px)", md: "translateX(4px)" },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: { xs: "auto", md: 44 },
                mb: { xs: 0.5, md: 0 },
                justifyContent: { xs: "center", md: "flex-start" },
                color: activeFilter === filter.id ? theme.palette.primary.main : "inherit",
              }}
            >
              {filter.icon}
            </ListItemIcon>
            <ListItemText
              primary={filter.label}
              primaryTypographyProps={{
                fontWeight: activeFilter === filter.id ? 700 : 500,
                fontSize: { xs: "0.875rem", md: "1rem" },
                textAlign: { xs: "center", md: "left" },
              }}
              sx={{
                my: 0,
                display: { xs: "block", md: "block" },
              }}
            />
            {filter.count > 0 && (
              <Chip
                label={filter.count}
                size="small"
                sx={{
                  bgcolor:
                    activeFilter === filter.id
                      ? theme.palette.primary.main
                      : alpha(theme.palette.text.primary, 0.1),
                  color:
                    activeFilter === filter.id
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.secondary,
                  fontWeight: 600,
                  height: 24,
                  mt: { xs: 0.5, md: 0 },
                  position: { xs: "static", md: "static" },
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default SearchFilters;