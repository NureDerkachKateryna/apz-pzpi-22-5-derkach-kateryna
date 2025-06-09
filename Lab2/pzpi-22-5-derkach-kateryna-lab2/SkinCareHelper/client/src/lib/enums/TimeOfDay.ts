export enum TimeOfDayEnum {
    Morning = 0,
    Evening = 1,
}

export const TimeOfDayNames: Record<TimeOfDayEnum, string> = {
    [TimeOfDayEnum.Morning]: 'Morning',
    [TimeOfDayEnum.Evening]: 'Evening',
}