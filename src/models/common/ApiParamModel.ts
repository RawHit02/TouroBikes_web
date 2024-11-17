export interface ApiParamModel {
    page: number;
    take: number;
    search?: string;
    order?: string;
    orderBy?: string;
}