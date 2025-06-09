import { useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount"
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import { t } from "i18next";
import { toast } from "react-toastify";

export default function LoginForm() {
    const { loginUser } = useAccount();
    const navigate = useNavigate();
    const location = useLocation();
    const { control, handleSubmit, formState: { isValid, isSubmitting } } = useForm<LoginSchema>({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginSchema) => {
        await loginUser.mutateAsync(data, {
            onSuccess: () => {
                navigate(location.state?.from || '/profile');
            },
            onError: () => {
                toast.error("Something wrong with email or password");
                        
            }
        });
    }

    return (
        <Paper
            component='form'
            onSubmit={handleSubmit(onSubmit)}
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
                    <LockOpen fontSize="large" sx={{color: '#06402b'}} />
                    <Typography variant="h4" sx={{color: '#06402b'}} >{t("login.signIn")}</Typography>
            </Box>
            <TextInput label={t("login.email")} control={control} name="email" />
            <TextInput label={t("login.password")} type="password" autoComplete="off" control={control} name="password" />
            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
                color="success"
            >
                {t("login.login")}
            </Button>
            <Typography sx={{textAlign: 'center'}}>
                {t("login.account")}
                <Typography sx={{mx: 2}} component={Link} to='/register' color="success">
                    {t("login.signUp")}
                </Typography>
            </Typography>
        </Paper>
    )
}
