import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n])
  
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <ScrollRestoration />
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container maxWidth='xl' sx={{ pt: 14 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  )
}

export default App