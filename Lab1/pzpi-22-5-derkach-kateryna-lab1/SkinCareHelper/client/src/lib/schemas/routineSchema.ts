import { z } from "zod";
import { requiredString } from "../util/util";

export const routineSchema = z.object({
    timeOfDay: requiredString('TimeOfDay'),
    dayOfWeek: requiredString('DayOfWeek'),
})

export type RoutineSchema = z.infer<typeof routineSchema>