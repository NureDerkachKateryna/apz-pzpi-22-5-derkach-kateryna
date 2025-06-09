import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { Link, useNavigate} from "react-router";
import { t } from "i18next";
import { appointmentSchema, type AppointmentSchema } from "../../lib/schemas/consultationSchema";
import { useUsers } from "../../lib/hooks/useUsers";
import { useAccount } from "../../lib/hooks/useAccount";
import type { User } from "../../lib/types";

export default function AppointmentPage() {
    const { control, handleSubmit } = useForm<AppointmentSchema>({
        mode: 'onTouched',
        resolver: zodResolver(appointmentSchema)
    });
    const navigate = useNavigate();
    const { dermatologists, isLoadingDermatologists, makeAppointment } = useUsers();
    const { currentUser } = useAccount();

    const onSubmit = async (data: AppointmentSchema) => {
        try {
            const appointment = {
                userId: currentUser!.id,
                dermatologistId: data.dermatologistId,
            };

            makeAppointment.mutate(appointment, {
                onSuccess: () => navigate(`/profile`)                
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoadingDermatologists) return <Typography>{t("card.loading")}</Typography>

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
                    <Typography variant="h4" sx={{color: '#06402b'}} >{t("appointment.makeAppointment")}</Typography>
            </Box>
            <Controller
                name="dermatologistId"
                control={control}
                defaultValue={dermatologists![0].id}
                render={({ field }) => (
                    <FormControl>
                        <InputLabel id="dermatologist-label">{t("appointment.dermatologist")}</InputLabel>
                         <Select
                            {...field}
                            labelId="dermatologist-label"
                            label={t("appointment.dermatologist")}
                            onChange={(e) => field.onChange(e.target.value)}
                        >
                            {dermatologists!.map((dermatologist: User) => (
                                <MenuItem key={dermatologist.id} value={dermatologist.id}>
                                    {dermatologist.displayName}
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
                        disabled={makeAppointment.isPending}
                    >
                        {t("card.submit")}
                    </Button>
                </Box>
        </Paper>
    )
}