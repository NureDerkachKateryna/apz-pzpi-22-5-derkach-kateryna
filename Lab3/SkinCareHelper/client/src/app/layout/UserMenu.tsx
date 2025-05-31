import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Box, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { useAccount } from '../../lib/hooks/useAccount';
import { Link, useNavigate } from 'react-router';
import { AccountCircleOutlined, Add, DoNotDisturbOutlined, Logout, Person, Medication } from '@mui/icons-material';
import { t } from 'i18next';
import { useRoutines } from '../../lib/hooks/useRoutines';
import { toast } from 'react-toastify';
import { Roles } from '../../lib/enums/Roles';

export default function UserMenu() {
    const { currentUser, handleLogout } = useAccount();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { generateRoutine } = useRoutines(undefined, currentUser?.id);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGenerateRoutine = async () => {
        handleClose();
        
        try {
            await generateRoutine.refetch();
            navigate('/myRoutines');
        } catch (error) {
            toast.error(`${error}`);
        }
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color='inherit'
                size='large'
                sx={{ fontSize: '1.1rem' }}
            >
                <Box display='flex' alignItems='center' gap={2}>
                    <AccountCircleOutlined sx={{ fontSize: 40, display: 'flex' }} />
                </Box>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem component={Link} to={`/profile`} onClick={handleClose}>
                    <ListItemIcon>
                        <Person />
                    </ListItemIcon>
                    <ListItemText>{t("userMenu.profile")}</ListItemText>
                </MenuItem>
                {currentUser?.role === Roles.Customer ? (
                    <>
                        {currentUser.dermatologistId ? (<MenuItem component={Link} to={`/myDermatologist`} onClick={handleClose}>
                            <ListItemIcon>
                                <Medication />
                            </ListItemIcon>
                            <ListItemText>{t("userMenu.dermatologist")}</ListItemText>
                        </MenuItem>) : null}
                        <MenuItem onClick={handleGenerateRoutine}>
                            <ListItemIcon>
                                <Add />
                            </ListItemIcon>
                            <ListItemText>{t("userMenu.generate")}</ListItemText>
                        </MenuItem>
                        <MenuItem component={Link} to='/bans' onClick={handleClose}>
                            <ListItemIcon>
                                <DoNotDisturbOutlined />
                            </ListItemIcon>
                            <ListItemText>{t("userMenu.bans")}</ListItemText>
                        </MenuItem>
                    </>
                ) : null}
                <Divider />
                <MenuItem onClick={() => {
                    handleLogout();
                    handleClose();
                }}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    <ListItemText>{t("userMenu.logout")}</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}
