export enum EOrder {
  DESC = "desc",
  ASC = "asc",
}

export interface IPaginaionParams {
  order: EOrder;
  per_page: number;
  page: number;
}

export interface IPaginationResponse {
  total_count: number;
  incomplete_results: boolean;
}
