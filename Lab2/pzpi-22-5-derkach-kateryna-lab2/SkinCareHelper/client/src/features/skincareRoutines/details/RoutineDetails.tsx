import { Card, CardContent, Divider, Typography } from "@mui/material"
import { useParams } from "react-router"
import { useRoutines } from "../../../lib/hooks/useRoutines"
import { DayOfWeekNames } from "../../../lib/enums/DayOfWeekEnum"
import { TimeOfDayNames } from "../../../lib/enums/TimeOfDay"
import RoutineProductsList from "./RoutineProductsList"
import { t } from "i18next"

export default function RoutineDetails() {
    const { id } = useParams();
    const {routine, isLoadingRoutine} = useRoutines(id as unknown as number)

    if (isLoadingRoutine) return <Typography>{t("card.loading")}</Typography>

    if (!routine) return <Typography>{t("card.noneFound")}</Typography>

    return (
        <Card sx={{ borderRadius: 3, display: 'flex' }}>            
            <CardContent>
                <Typography variant="h3">{DayOfWeekNames[routine.dayOfWeek]}</Typography>
                <Typography variant="h5" fontWeight='light'>{new Date(routine.creationDate).toLocaleString()}</Typography>
                <Typography variant="h4" fontWeight='normal'>{TimeOfDayNames[routine.timeOfDay]}</Typography>
                <Divider sx={{ paddingTop: 2, marginBottom: 2}} />
                <RoutineProductsList />
            </CardContent>
        </Card>
    )
}