export enum SkinIssueEnum {
    None = 0,
    Comedones = 1,
    Rosacea = 2,
    Fungal_acne = 3,
    Dermatitis = 4,
    Acne = 5,
    All = 6,
}

export const SkinIssueNames: Record<SkinIssueEnum, string> = {
    [SkinIssueEnum.Acne]: 'Acne',
    [SkinIssueEnum.All]: 'All issues',
    [SkinIssueEnum.Comedones]: 'Comedones',
    [SkinIssueEnum.Dermatitis]: 'Dermatitis',
    [SkinIssueEnum.Fungal_acne]: 'Fungal Acne',
    [SkinIssueEnum.None]: 'None',
    [SkinIssueEnum.Rosacea]: 'Rosacea',
}