import { Box, Typography } from "@mui/material"
import { observer } from "mobx-react-lite";
import { useRoutines } from "../../../lib/hooks/useRoutines";
import { t } from "i18next";
import { useParams } from "react-router";
import RoutineCard from "./RoutineCard";

const RoutineList = observer(function RoutineList() {
  const { userId } = useParams();
  const { routinesByUser, isLoadingRoutinesByUser } = useRoutines(undefined, userId);

  if (isLoadingRoutinesByUser) return <Typography>{t("card.loading")}</Typography>

  if (!routinesByUser || routinesByUser.length == 0) return <Typography>{t("card.noneFound")}</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
      {routinesByUser.map((routine) => (
        <RoutineCard key={routine.skincareRoutineId} routine={routine} userId={userId!} />
      ))}
    </Box>
  )
})

export default RoutineList;