import { z } from "zod";
import { requiredString } from "../util/util";
import { SkinIssueEnum } from "../enums/SkinIssue";
import { SkinTypeEnum } from "../enums/SkinType";
import { ProductTypeEnum } from "../enums/ProductType";

export const productSchema = z.object({
  productName: requiredString('productName'),
  productType: z.nativeEnum(ProductTypeEnum),
  productDescription: requiredString('productDescription'),
  brand: requiredString('brand'),
  skinIssue: z.nativeEnum(SkinIssueEnum),
  skinType: z.nativeEnum(SkinTypeEnum),
})

export type ProductSchema = z.infer<typeof productSchema> 