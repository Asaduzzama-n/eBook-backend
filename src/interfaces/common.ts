export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    currentPage?: number;
    numberOfPages?: number;
  };
  data: T;
};
