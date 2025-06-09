import { z } from "zod";
import { requiredString } from "../util/util";
import { SkinIssueEnum } from "../enums/SkinIssue";
import { SkinTypeEnum } from "../enums/SkinType";

export const registerSchema = z.object({
    email: z.string().email(),
    displayName: requiredString('displayName'),
    userName: requiredString('displayName'),
    skinIssue: z.nativeEnum(SkinIssueEnum),
    skinType: z.nativeEnum(SkinTypeEnum),
    password: requiredString('password')
})

export type RegisterSchema = z.infer<typeof registerSchema>;