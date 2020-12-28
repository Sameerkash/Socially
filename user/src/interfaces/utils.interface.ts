export interface PaginationParams {
  skip: number;
  take: number;
}

export interface Result {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}
