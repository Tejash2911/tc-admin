export interface GetDataI {
  isPagination?: boolean
  offset?: number | string
  limit?: number | string
  search?: string
  sort_column?: string
  sort_order?: number | string
}

export interface LoginI {
  email: string
  password: string
}

export interface CurrentUserI {
  firstName: string
  lastName: string
  avtar: string
  email: string
  number: number
  isAdmin: boolean
  purchasedProducts: any[]
}
