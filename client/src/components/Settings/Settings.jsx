import { useContext, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Switch,
  useTheme,
} from "@mui/material";
import themeChanger from "../../App/Context/ThemeChangerContext";

const Settings = () => {
  const theme = useTheme();
  const { mode, setMode } = useContext(themeChanger);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Settings
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Dark Mode
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Switch between light and dark theme
                </Typography>
              </Box>
              <Switch
                checked={mode == 'dark'}
                onChange={(e) => {
                  setMode(e.target.checked ? "dark" : "light");
                  localStorage.mode = e.target.checked ? "dark" : "light";
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Settings;
