import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Cookie from "../App/Cookie/Cookie";
import { useEffect } from "react";

export default () => {
  const go = useNavigate();
  const isAuthorizedUser = Cookie.exists("authorization");
  useEffect(() => {
    if (!isAuthorizedUser) {
      go("/auth/register");
    }
  }, []);

  return (
    isAuthorizedUser && (
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
    )
  );
};
