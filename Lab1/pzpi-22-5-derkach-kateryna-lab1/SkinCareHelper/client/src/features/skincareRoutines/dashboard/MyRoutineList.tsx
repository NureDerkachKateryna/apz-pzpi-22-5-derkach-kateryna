import { Box, Typography } from "@mui/material"
import { observer } from "mobx-react-lite";
import { useRoutines } from "../../../lib/hooks/useRoutines";
import MyRoutineCard from "./MyRoutineCard";
import { t } from "i18next";

const MyRoutineList = observer(function MyRoutineList() {
  const {userRoutinesGroup, isLoadingUserRoutines} = useRoutines();

  if (isLoadingUserRoutines) return <Typography>{t("card.loading")}</Typography>

  if (!userRoutinesGroup || userRoutinesGroup.length == 0) return <Typography>{t("card.noneFound")}</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
      {userRoutinesGroup.map((routine) => (
        <MyRoutineCard key={routine.skincareRoutineId} routine={routine} />
      ))}
    </Box>
  )
})

export default MyRoutineList;