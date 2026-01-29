import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Chip,
  Tabs,
  Tab,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  Person,
  Article,
  FilterList,
} from "@mui/icons-material";
import SearchResultsList from "./SearchResultsList";
import { useParams } from "react-router-dom";
import { search } from "../../App/services/profileServices";
import Alert from "../../App/Alert/Swal";
import Loader from "../Loader/Loader";

const SearchResults = () => {
  const theme = useTheme();
  const [activeFilter, setActiveFilter] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { query: searchQuery } = useParams();

  const filterOptions = [
    { value: "all", label: "All Results", icon: <SearchIcon /> },
    { value: "people", label: "People", icon: <Person /> },
    { value: "posts", label: "Posts", icon: <Article /> },
  ];

  const [allResults, setAllResults] = useState();

  useEffect(() => {
    if (searchQuery.trim().length < 3) {
      Alert.init(theme);
      Alert.error(
        "Query Error",
        "Query Is Too Short Need to be Atleast 3 Letters",
      );
      return;
    }
    getResults();
  }, [searchQuery]);

  let getResults = async () => {
    setLoading(() => true);
    let res = await search(searchQuery);
    res = res.data.data;
    res.posts = res.posts.map((p) => ({ ...p, type: "posts" }));
    res.people = res.people.map((p) => ({ ...p, type: "people" }));
    setAllResults({
      ...res,
    });
    setLoading(() => false);
  };

  useEffect(() => {
    if (allResults) {
      if (activeFilter === "all") {
        const combined = [...allResults.people, ...allResults.posts];
        setResults(combined);
      } else {
        setResults(allResults[activeFilter] || []);
      }
    }
  }, [activeFilter, allResults]);

  const handleFilterChange = (event, newValue) => {
    setActiveFilter(newValue);
  };

  return (
    (!loading && (
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
          width: "100%",
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Main Content Area */}
            <Grid
              item
              xs={12}
              lg={9}
              sx={{
                width: "100%",
              }}
            >
              {/* Filter Tabs */}
              <Paper
                elevation={0}
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    pt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    Filter Results
                  </Typography>
                  <Chip
                    icon={<FilterList />}
                    label="Filters"
                    variant="outlined"
                    size="small"
                  />
                </Box>
                <Tabs
                  value={activeFilter}
                  onChange={handleFilterChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    "& .MuiTab-root": {
                      textTransform: "none",
                      minHeight: 56,
                    },
                  }}
                >
                  {filterOptions.map((option) => (
                    <Tab
                      key={option.value}
                      value={option.value}
                      icon={option.icon}
                      iconPosition="start"
                      label={option.label}
                    />
                  ))}
                </Tabs>
              </Paper>

              {/* Results Count */}
              <Box
                sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Typography variant="body2" color="text.secondary">
                  Showing
                </Typography>
                <Chip
                  label={`${results.length} results`}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>

              {/* Search Results Grid */}
              <SearchResultsList
                results={results}
                filter={activeFilter}
                searchQuery={searchQuery}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    )) || <Loader />
  );
};

export default SearchResults;
