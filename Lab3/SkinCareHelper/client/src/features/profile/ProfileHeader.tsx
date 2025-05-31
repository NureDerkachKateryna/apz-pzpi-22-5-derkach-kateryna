import { Box, Button, CardActions, Chip, Paper, Typography } from "@mui/material";
import { useAccount } from "../../lib/hooks/useAccount";
import { SkinIssueNames } from "../../lib/enums/SkinIssue";
import { t } from "i18next";
import { SkinTypeNames } from "../../lib/enums/SkinType";
import { Link } from "react-router";

export default function ProfileHeader() {
    const { currentUser, loadingUserInfo } = useAccount();

    if (loadingUserInfo) return <Typography>{t("card.loading")}</Typography>

    if (!currentUser) return <Typography>{t("card.noneFound")}</Typography>    

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 'center', display: 'flex', justifySelf: 'center', width: '60%', flexDirection: 'column' }}>
                <Box display='flex' flexDirection='column' gap={2}>
                    <Typography variant="h2" >{currentUser.userName}</Typography>
                    <Typography variant="h4">{t("register.displayName")}: {currentUser.displayName}</Typography>
                    <Typography variant="h4">{t("register.email")}: {currentUser.email}</Typography>
                    {currentUser.skinIssue !== undefined && (
                        <Typography variant="h4">{t("register.issue")}:
                            <Chip label={SkinIssueNames[currentUser.skinIssue]} variant="outlined" sx={{ fontSize: 24, marginLeft: 1 }} />
                        </Typography>
                    )}
                    {currentUser.skinType !== undefined && (
                        <Typography variant="h4">{t("register.skinType")}:
                            <Chip label={SkinTypeNames[currentUser.skinType]} variant="outlined" sx={{ fontSize: 24, marginLeft: 1 }} />
                        </Typography>
                    )}
                </Box>
                <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                    <Button
                        component={Link}
                        to={`/changePassword/${currentUser.id}`}
                        size="medium"
                        variant="contained"
                        color="error"
                        sx={{ display: 'flex', justifySelf: 'self-end', width: 'auto', height: 'auto' }}
                    >
                        {t("card.change")}
                    </Button>
                    <Button
                        component={Link}
                        to={`/editUser/${currentUser.id}`}
                        size="medium"
                        variant="contained"
                        color="success"
                        sx={{ display: 'flex', justifySelf: 'self-end', width: 'auto', height: 'auto' }}
                    >
                        {t("card.edit")}
                    </Button>
                </CardActions>
        </Paper>
    )
}
