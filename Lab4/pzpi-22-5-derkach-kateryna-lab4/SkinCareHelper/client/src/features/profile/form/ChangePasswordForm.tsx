import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useAccount } from "../../../lib/hooks/useAccount";
import TextInput from "../../../app/shared/components/TextInput";
import { t } from "i18next";
import { changePasswordSchema, type ChangePasswordSchema } from "../../../lib/schemas/changePasswordSchema";

export default function ChangePasswordForm() {
    const { control, handleSubmit, setError } = useForm<ChangePasswordSchema>({
        mode: 'onTouched',
        resolver: zodResolver(changePasswordSchema)
    });
    const navigate = useNavigate();
    const { loadingUserInfo, changePassword } = useAccount();

    const onSubmit = async (data: ChangePasswordSchema) => {
        await changePassword.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach(err => {
                        if (err.includes('Password')) setError('oldPassword', { message: err })
                    })
                }
            },
            onSuccess: () => navigate(`/profile`)
        });
    }

    if (loadingUserInfo) return <Typography>{t("card.loading")}</Typography>

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                gap: 3,
                maxWidth: 'md',
                mx: 'auto',
                borderRadius: 3
            }}
        >
            <Box display='flex' alignItems='center' justifyContent='center'
                gap={3}>
                <Typography variant="h4" sx={{ color: '#06402b' }} >{t("card.change")}</Typography>
            </Box>
            <TextInput label={t("card.old")} type="password" control={control} name="oldPassword" />
            <TextInput label={t("card.new")} type="password" control={control} name="newPassword" />

            <Box display='flex' justifyContent='end' gap={3}>
                <Button component={Link} to={`/profile`} color="inherit">{t("card.cancel")}</Button>
                <Button
                    type="submit"
                    color="success"
                    variant="contained"
                    disabled={changePassword.isPending}
                >
                    {t("card.submit")}
                </Button>
            </Box>
        </Paper>
    )
}