import { Box, Card, Divider, Typography } from "@mui/material";
import { t } from "i18next";
import { useAccount } from "../../lib/hooks/useAccount";

export default function MyDermatologistPage() {
    const { currentUser } = useAccount();

    if (!currentUser) return <Typography>{t("card.loading")}</Typography>

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection:'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='center' 
                gap={3}>
                    <Typography variant="h4" sx={{color: '#06402b'}} >{t("appointment.myDermatologist")}</Typography>
            </Box>

            <Box display='flex' flexDirection='column' gap={2}>
                <Typography variant="h4">{t("register.displayName")}: {currentUser?.dermatologist?.displayName}</Typography>
                <Typography variant="h4">{t("register.email")}: {currentUser?.dermatologist?.email}</Typography>
                <Divider sx={{marginTop: 3}} />
                <Typography>{t("appointment.contact")}</Typography>
            </Box>

        </Card>
    )
}