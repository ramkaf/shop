export interface IFilter {
  field: string
  condition: 'equals' | 'not' | 'in' | 'notIn' | 'lt' | 'lte' | 'gt' | 'gte' | 'contains' | 'startsWith' | 'endsWith'
  value: number | string
}
export interface IWhere {
  [key: string]: string
}
export interface ISearch {
  fields: ['title', 'shortDescription']
  value: string
}
export interface PaginatedResult<T> {
  data: T[]
  totalItems: number
  totalPages: number
  currentPage: number
  limit: number
}
export interface GetAllOptions {
  page: number
  limit: number
  sortBy: string
  sortDir: string
}
