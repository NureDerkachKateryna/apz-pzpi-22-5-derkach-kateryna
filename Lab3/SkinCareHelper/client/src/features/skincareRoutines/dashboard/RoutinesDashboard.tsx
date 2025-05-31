import { Button, Grid } from "@mui/material";
import RoutineList from "./RoutineList";
import "i18next";
import { useRoutines } from "../../../lib/hooks/useRoutines";
import { t } from "i18next";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router";

export default function RoutinesDashboard() {
  const { userId } = useParams();
    const { routinesByUser, generateRoutine } = useRoutines(undefined, userId);

    const handleGenerateRoutine = async () => {            
            try {
                await generateRoutine.refetch();
                window.location.reload()
            } catch (error) {
                toast.error(`${error}`);
            }
        };

    return (
        <Grid container spacing={3} sx={{justifySelf: 'center'}}>
            {(routinesByUser?.length === 0) ? (
                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        fontSize: 60,
                        marginTop: 20
                    }}
                    onClick={handleGenerateRoutine}
                >
                    {t("userMenu.generate")}
                </Button>
            ) : (
                <>
                    <Button
                        component={Link}
                        to={`/routines/${userId}/details/addProduct`}
                        size="medium"
                        variant="contained"
                        color="success"
                        sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3, width: 'auto', height: 'auto' }}
                    >
                        {t("card.add")}
                    </Button>
                    <RoutineList />
                </>
            )}
        </Grid>
    )
}