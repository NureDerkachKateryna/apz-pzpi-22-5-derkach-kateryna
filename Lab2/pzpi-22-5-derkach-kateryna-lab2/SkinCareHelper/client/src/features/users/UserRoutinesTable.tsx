import { Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Box, Button } from "@mui/material";
import { t } from "i18next";
import { observer } from "mobx-react-lite";
import { useAccount } from "../../lib/hooks/useAccount";
import { Link } from "react-router";
import { useCustomers } from "../../lib/hooks/useCustomers";
import { SkinIssueNames } from "../../lib/enums/SkinIssue";
import { SkinTypeNames } from "../../lib/enums/SkinType";

const UserRoutinesTable = observer(function UserRoutinesTable() {
    const { currentUser } = useAccount();
    const { usersByDermatologist, isLoadingUsersByDermatologist } = useCustomers(currentUser?.id);

    if (isLoadingUsersByDermatologist) return <Typography>{t("card.loading")}</Typography>

    if (!usersByDermatologist || usersByDermatologist.length == 0) return <Typography>{t("card.noneFound")}</Typography>

    return (
        <TableContainer sx={{ position: 'relative' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#7a7979" }}>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.email")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.displayName")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.issue")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.skinType")}</TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>{t("register.actions")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        usersByDermatologist.map(user =>
                            <TableRow
                                key={user.id}
                                hover
                            >
                                <TableCell>
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    {user.displayName}
                                </TableCell>
                                <TableCell>
                                    {SkinIssueNames[user.skinIssue!]}
                                </TableCell>
                                <TableCell>
                                    {SkinTypeNames[user.skinType!]}
                                </TableCell>
                                <TableCell>
                                    <Box display='flex' alignItems='center'>
                                        <Button
                                            component={Link}
                                            to={`/routines/${user.id}`}
                                            size="large"
                                            variant="contained"
                                            color="success"
                                        >
                                            {t("appointment.editRoutines")}
                                        </Button>
                                    </Box>

                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>)
})

export default UserRoutinesTable;