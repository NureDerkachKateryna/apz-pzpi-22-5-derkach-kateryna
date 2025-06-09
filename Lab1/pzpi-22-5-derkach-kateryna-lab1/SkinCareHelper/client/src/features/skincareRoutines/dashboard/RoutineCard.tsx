import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import type { SkincareRoutine } from "../../../lib/types"
import { Link } from "react-router"
import { DayOfWeekNames } from "../../../lib/enums/DayOfWeekEnum"
import { TimeOfDayNames } from "../../../lib/enums/TimeOfDay"
import { t } from "i18next"

type Props = {
    routine: SkincareRoutine
    userId: string
}

export default function RoutineCard({ routine, userId }: Props) {

    return (
        <Card elevation={3} sx={{ borderRadius: 3, flex: '0 1 30%', padding: 1 }}>
            <CardContent sx={{ p: 0 }}>
                <Typography variant="h5">{DayOfWeekNames[routine.dayOfWeek]}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{new Date(routine.creationDate).toLocaleString()}</Typography>
                <Typography variant="subtitle1">{TimeOfDayNames[routine.timeOfDay]}</Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifySelf: 'self-end' }}>
                <Button
                    component={Link}
                    to={`/routines/${userId}/details/${routine.skincareRoutineId}`}
                    size="medium"
                    variant="contained"
                    color="success"
                    sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}
                >
                    {t("card.view")}
                </Button>
            </CardActions>
        </Card>
    )
}