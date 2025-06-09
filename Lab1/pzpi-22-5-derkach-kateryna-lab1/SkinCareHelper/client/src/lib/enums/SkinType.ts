export enum SkinTypeEnum {
    Oily = 0,
    Dry = 1,
    Normal = 2,
    Combination = 3,
    Sensitive = 4,
    All = 5,
}

export const SkinTypeNames: Record<SkinTypeEnum, string> = {
    [SkinTypeEnum.All]: 'All types',
    [SkinTypeEnum.Combination]: 'Combination',
    [SkinTypeEnum.Dry]: 'Dry',
    [SkinTypeEnum.Normal]: 'Normal',
    [SkinTypeEnum.Oily]: 'Oily',
    [SkinTypeEnum.Sensitive]: 'Sensitive',
}