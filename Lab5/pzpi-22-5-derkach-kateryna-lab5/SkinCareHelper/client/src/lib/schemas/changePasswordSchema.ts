import { z } from "zod";
import { requiredString } from "../util/util";

export const changePasswordSchema = z.object({
    //email: z.string().email(),
    oldPassword: requiredString('oldPassword'),
    newPassword: requiredString('newPassword')
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;