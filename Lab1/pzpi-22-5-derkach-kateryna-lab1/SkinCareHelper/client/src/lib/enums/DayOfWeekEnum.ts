export enum DayOfWeekEnum {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

export const DayOfWeekNames: Record<DayOfWeekEnum, string> = {
    [DayOfWeekEnum.Sunday]: 'Sunday',
    [DayOfWeekEnum.Monday]: 'Monday',
    [DayOfWeekEnum.Tuesday]: 'Tuesday',
    [DayOfWeekEnum.Wednesday]: 'Wednesday',
    [DayOfWeekEnum.Thursday]: 'Thursday',
    [DayOfWeekEnum.Friday]: 'Friday',
    [DayOfWeekEnum.Saturday]: 'Saturday',
}