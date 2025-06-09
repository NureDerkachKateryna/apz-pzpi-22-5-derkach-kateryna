import { Controller, useForm } from "react-hook-form";
import { useAccount } from "../../lib/hooks/useAccount"
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link } from "react-router";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";
import { SkinIssueEnum, SkinIssueNames } from "../../lib/enums/SkinIssue";
import { SkinTypeEnum, SkinTypeNames } from "../../lib/enums/SkinType";
import { t } from "i18next";

export default function RegisterForm() {
    const { registerUser } = useAccount();
    const { control, handleSubmit, setError, formState: { isValid, isSubmitting } } = useForm<RegisterSchema>({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterSchema) => {
        await registerUser.mutateAsync(data, {
            onError: (error) => {
                if (Array.isArray(error)) {
                    error.forEach(err => {
                        if (err.includes('Email')) setError('email', {message: err});
                        else if (err.includes('Password')) setError('password', {message: err})
                    })
                }
            }
        });
    }

    const skinIssueOptions = Object.values(SkinIssueEnum).filter(
        (v) => typeof v === 'number' && v != SkinIssueEnum.All
    ) as SkinIssueEnum[];

    const skinTypeOptions = Object.values(SkinTypeEnum).filter(
        (v) => typeof v === 'number' && v != SkinTypeEnum.All
    ) as SkinTypeEnum[];

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
                    <Typography variant="h4" sx={{color: '#06402b'}} >{t("register.register")}</Typography>
            </Box>
            <TextInput label={t("register.email")} control={control} name="email" />
            <TextInput label={t("register.username")} control={control} name="userName" />
            <TextInput label={t("register.displayName")} control={control} name="displayName" />
            <TextInput label={t("register.password")} type="password" control={control} name="password" />
            <Controller
                name="skinIssue"
                control={control}
                defaultValue={SkinIssueEnum.None}
                render={({ field }) => (
                    <FormControl>
                        <InputLabel id="skin-issue-label">{t("register.issue")}</InputLabel>
                         <Select
                            {...field}
                            labelId="skin-issue-label"
                            label={t("register.issue")}
                            onChange={(e) => field.onChange(e.target.value as SkinIssueEnum)}
                        >
                            {skinIssueOptions.map((issue) => (
                                <MenuItem key={issue} value={issue}>
                                    {SkinIssueNames[issue]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
            <Controller
                name="skinType"
                control={control}
                defaultValue={SkinTypeEnum.Normal}
                render={({ field }) => (
                    <FormControl>
                        <InputLabel id="skin-type-label">{t("register.skinType")}</InputLabel>
                         <Select
                            {...field}
                            labelId="skin-type-label"
                            label={t("register.skinType")}
                            onChange={(e) => field.onChange(e.target.value as SkinTypeEnum)}
                        >
                            {skinTypeOptions.map((issue) => (
                                <MenuItem key={issue} value={issue}>
                                    {SkinTypeNames[issue]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                variant="contained"
                size="large"
                color="success"
            >
                {t("register.signUp")}
            </Button>
            <Typography sx={{textAlign: 'center'}}>
                {t("register.account")}
                <Typography sx={{mx: 2}} component={Link} to='/login' color="success">
                    {t("register.signIn")}
                </Typography>
            </Typography>
        </Paper>
    )
}
