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

export interface GetAnnouncementsI {
  _id: string
  title: string
  active: boolean
  createdAt: number
  updatedAt: number
}

export interface AddAnnouncementI {
  title: string
  active: boolean
}

export interface UpdateAnnouncementI {
  id: string
  payload: AddAnnouncementI
}

export interface GetUsersI {
  _id: string
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  number: number
  avatar: string
  createdAt: string
  purchasedProducts: string[]
}

export interface AddUserI {
  firstName: string
  lastName: string
  email: string
  isAdmin: boolean
  number: string
}

export interface UpdateUserI {
  id: string
  payload: AddUserI
}
