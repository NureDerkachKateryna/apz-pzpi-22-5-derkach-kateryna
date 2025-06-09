import { Spa } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'url("/images/home.png")'        
      }}
      
    >
      <Box sx={{display: 'flex', alignItems: 'center', alignContent: 'center', 
        color: '#06402b', gap: 3}}
      >
        <Spa sx={{height: 110, width: 110}} />
        <Typography variant="h1">
          Skincare Helper
        </Typography>
      </Box>
      <Typography variant="h2" sx={{color: '#06402b'}}>
        {t("home.welcome")}
      </Typography>
      <Button
        component={Link}
        to='/profile'
        size="large"
        variant="contained"
        color="success"
        sx={{height: 80, borderRadius: 4, fontSize: '1.5rem'}}
      >
        {t("home.start")}
      </Button>
    </Paper>
  )
}
