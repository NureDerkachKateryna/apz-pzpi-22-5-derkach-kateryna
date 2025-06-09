import { z } from "zod";

export const appointmentSchema = z.object({
    dermatologistId: z.string(),
})

export type AppointmentSchema = z.infer<typeof appointmentSchema>;