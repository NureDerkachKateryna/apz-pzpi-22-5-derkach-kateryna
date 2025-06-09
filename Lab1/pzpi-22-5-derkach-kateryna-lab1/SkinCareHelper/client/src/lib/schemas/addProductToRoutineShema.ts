import { z } from "zod";

export const addProductToRoutineSchema = z.object({
    productId: z.number(),
})

export type AddProductToRoutineSchema = z.infer<typeof addProductToRoutineSchema>;