import { Controller, useForm } from "react-hook-form";
import { editProfileSchema, type EditProfileSchema } from "../../../lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link, useNavigate} from "react-router";
import { SkinIssueEnum, SkinIssueNames } from "../../../lib/enums/SkinIssue";
import { SkinTypeEnum, SkinTypeNames } from "../../../lib/enums/SkinType";
import { useAccount } from "../../../lib/hooks/useAccount";
import TextInput from "../../../app/shared/components/TextInput";
import { t } from "i18next";

export default function ProfileForm() {
    const { control, reset, handleSubmit } = useForm<EditProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(editProfileSchema)
    });
    const navigate = useNavigate();
    const { currentUser, updateUser, loadingUserInfo } = useAccount();

    useEffect(() => {
        if (currentUser) reset({
            ...currentUser,
            skinType: currentUser.skinType,
            skinIssue: currentUser.skinIssue
        });
    }, [currentUser, reset]);

    const onSubmit = async (data: EditProfileSchema) => {
        const { ...rest } = data;
        const flattenedData = { ...rest };

        try {
            const editUser = {
                id: currentUser?.id,
                userName: flattenedData.userName,
                displayName: flattenedData.displayName,
                email: flattenedData.email,
                skinIssue: flattenedData.skinIssue,
                skinType: flattenedData.skinType,
                role: currentUser?.role
            };

            updateUser.mutate({ ...editUser }, {
                onSuccess: () => navigate(`/profile`)                
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    const skinIssueOptions = Object.values(SkinIssueEnum).filter(
        (v) => typeof v === 'number' && v != SkinIssueEnum.All
    ) as SkinIssueEnum[];

    const skinTypeOptions = Object.values(SkinTypeEnum).filter(
        (v) => typeof v === 'number' && v != SkinTypeEnum.All
    ) as SkinTypeEnum[];

    if (loadingUserInfo) return <Typography>{t("card.loading")}</Typography>

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
                    <Typography variant="h4" sx={{color: '#06402b'}} >{t("register.edit")}</Typography>
            </Box>
            <TextInput label={t("register.email")} control={control} name="email" />
            <TextInput label={t("register.username")} control={control} name="userName" />
            <TextInput label={t("register.displayName")} control={control} name="displayName" />
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

            <Box display='flex' justifyContent='end' gap={3}>
                    <Button component={Link} to={`/profile`} color="inherit">{t("card.cancel")}</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={updateUser.isPending}
                    >
                        {t("card.submit")}
                    </Button>
                </Box>
        </Paper>
    )
}