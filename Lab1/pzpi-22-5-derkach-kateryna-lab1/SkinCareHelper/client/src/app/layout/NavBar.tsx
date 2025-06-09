import { Spa } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Container, MenuItem, Typography, Button } from "@mui/material";
import { Link, NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useAccount } from "../../lib/hooks/useAccount";
import UserMenu from "./UserMenu";
import LanguageSwitch from "../shared/components/LanguageSwitch";
import { t } from "i18next";
import { Roles } from "../../lib/enums/Roles";

export default function NavBar() {
  const { currentUser } = useAccount();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#06402b' }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                <Spa fontSize="large" />
                <Typography variant="h4" fontWeight='bold'>Skincare Helper</Typography>
              </MenuItem>
            </Box>
            {currentUser ? (
              <>
                <Box display='flex' alignItems='center' gap={2}>
                  <Box sx={{ display: 'flex' }}>
                    {currentUser.role !== Roles.Admin ? (<MenuItemLink to='/products'>
                      {t("navbar.products")}
                    </MenuItemLink>) : null}
                    {currentUser.role === Roles.Customer ? (<MenuItemLink to='/myProducts'>
                      {t("navbar.myProducts")}
                    </MenuItemLink>) : null}
                    {currentUser.role === Roles.Customer ? (<MenuItemLink to='/myRoutines'>
                      {t("navbar.routines")}
                    </MenuItemLink>) : null}
                    {currentUser.role === Roles.Admin ? (<MenuItemLink to='/users'>
                      {t("navbar.users")}
                    </MenuItemLink>) : null}
                    {currentUser.role === Roles.Admin ? (<MenuItemLink to='/allProducts'>
                      {t("navbar.allProducts")}
                    </MenuItemLink>) : null}
                    {currentUser.role === Roles.Dermatologist ? (<MenuItemLink to='/myCustomers'>
                      {t("navbar.customers")}
                    </MenuItemLink>) : null}
                  </Box>
                </Box>
                <Box display='flex' alignItems='center' gap={2}>
                  {!currentUser.dermatologistId && currentUser.role === Roles.Customer ? (<Button
                    component={Link}
                    to={'/makeAppointment'} 
                    size="large"
                    variant="contained"
                    color="success"
                  >
                    {t("navbar.appointment")}
                  </Button>) : null}
                  <UserMenu />
                </Box>
              </>
            ) : (
              <>
              <Box display='flex'>
                <MenuItemLink to='/login'>{t("navbar.login")}</MenuItemLink>
                  <MenuItemLink to='/register'>{t("navbar.register")}</MenuItemLink>
              </Box>                  
              </>
            )}
            <LanguageSwitch />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}