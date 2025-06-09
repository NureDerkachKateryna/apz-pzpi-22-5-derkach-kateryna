import { Button, Grid } from "@mui/material";
import MyRoutineList from "./MyRoutineList";
import "i18next";
import { useRoutines } from "../../../lib/hooks/useRoutines";
import { t } from "i18next";
import { toast } from "react-toastify";
import { useAccount } from "../../../lib/hooks/useAccount";

export default function MyRoutinesDashboard() {
    const { currentUser } = useAccount();
    const { userRoutinesGroup, generateRoutine } = useRoutines(undefined, currentUser?.id);

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
            {(userRoutinesGroup?.length === 0) ? (
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
                <MyRoutineList />
            )}
        </Grid>
    )
}