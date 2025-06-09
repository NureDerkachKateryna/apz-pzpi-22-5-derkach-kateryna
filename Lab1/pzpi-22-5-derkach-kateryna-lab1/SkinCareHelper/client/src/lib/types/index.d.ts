import type { DayOfWeekEnum } from "../enums/DayOfWeekEnum"
import type { ProductTypeEnum } from "../enums/ProductType"
import type { SkinIssueEnum } from "../enums/SkinIssue"
import type { SkinTypeEnum } from "../enums/SkinType"
import type { TimeOfDayEnum } from "../enums/TimeOfDay"

type PageList<T, TCursor> = {
  items: T[],
  nextCursor: TCursor
}

type Product = {
  productId: number
  productName: string
  productPhoto?: Photo
  productDescription: string
  productType: ProductTypeEnum
  skinType: SkinTypeEnum
  skinIssue: SkinIssueEnum
  brand: string
}

type User = {
  id: string
  email: string
  displayName: string
  userName: string
  skinType?: SkinTypeEnum
  skinIssue?: SkinIssueEnum,
  role?: string,
  dermatologistId?: string,
  dermatologist?: User,
}

type Photo = {
  photoId: string,
  url?: string
}

type SkincareRoutine = {
  skincareRoutineId: number,
  timeOfDay: TimeOfDayEnum,
  dayOfWeek: DayOfWeekEnum,
  creationDate: DateTime,
  userId: string
}

type Ban = {
  banId: number,
  productId: number,
  userId?: string
}
