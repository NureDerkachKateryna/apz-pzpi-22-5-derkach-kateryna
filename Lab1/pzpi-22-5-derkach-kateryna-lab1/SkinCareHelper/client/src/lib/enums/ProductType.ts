export enum ProductTypeEnum {
    Serum = 0,
    Sunscreen = 1,
    Cleanser = 2,
    Exfoliation = 3,
    Toner = 4,
    Moisturizer = 5,
    Eye_cream = 6,
    Retinol = 7,
    Acid = 8,
    Cleansing_oil = 9,
}

export const ProductTypeNames: Record<ProductTypeEnum, string> = {
    [ProductTypeEnum.Serum]: 'Serum',
    [ProductTypeEnum.Sunscreen]: 'Sunscreen',
    [ProductTypeEnum.Cleanser]: 'Cleanser',
    [ProductTypeEnum.Exfoliation]: 'Exfoliation',
    [ProductTypeEnum.Toner]: 'Toner',
    [ProductTypeEnum.Moisturizer]: 'Moisturizer',
    [ProductTypeEnum.Eye_cream]: 'Eye cream',
    [ProductTypeEnum.Retinol]: 'Retinol',
    [ProductTypeEnum.Acid]: 'Acid',
    [ProductTypeEnum.Cleansing_oil]: 'Cleansing oil',
}