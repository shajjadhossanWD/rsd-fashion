/** Shared, app-wide types. Feature-specific types live inside their feature. */
export type Id = string | number

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
