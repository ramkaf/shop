
export interface PaginatedResult<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }

  export interface GetAllOptions {
    page : number,
    limit: number,
    sortBy : string,
    sortDir : string
  }