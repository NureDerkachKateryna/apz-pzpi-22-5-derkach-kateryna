import { Typography, TableContainer, Table, IconButton, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from "@mui/material";
import { t } from "i18next";
import { observer } from "mobx-react-lite";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router";
import { useUsers } from "../../lib/hooks/useUsers";
import { Roles } from "../../lib/enums/Roles";
import { useAccount } from "../../lib/hooks/useAccount";

const UsersTable = observer(function UsersTable() {
    const { usersGroup, isLoading, deleteUser } = useUsers();
    const { updateUserRole } = useAccount();
    const navigate = useNavigate();

    const onRemoveUser = async (userId: string) => {
        await deleteUser.mutate(userId);
    }

    const onChangeRole = async (userId: string, role: string) => {
        await updateUserRole.mutate({ userId, role });
    };

    const roles = Object.values(Roles) as Roles[];

    if (isLoading) return <Typography>{t("card.loading")}</Typography>

    if (!usersGroup || usersGroup.length == 0) return <Typography>{t("card.noneFound")}</Typography>

    return (
        <TableContainer sx={{ position: 'relative' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#7a7979" }}>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.email")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.displayName")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.role")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        usersGroup.map(user =>
                            <TableRow
                                key={user.id}
                                hover
                            >
                                <TableCell
                                    onClick={() => navigate(`/users/${user.id}`)}
                                >
                                    {user.email}
                                </TableCell>
                                <TableCell
                                    onClick={() => navigate(`/users/${user.id}`)}
                                >
                                    {user.userName}
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={user.role}
                                        onChange={(e) =>  { 
                                            const newRole = e.target.value as Roles;
                                            onChangeRole(user.id, newRole);
                                        }}
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role} value={role}>
                                                {Roles[role]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <>
                                        <IconButton onClick={() => onRemoveUser(user.id)} >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </>

                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>)
})

export default UsersTable;