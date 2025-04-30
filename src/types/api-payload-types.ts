export interface GetDataI {
  isPagination?: boolean
  offset?: number | string
  limit?: number | string
  search?: string
  sort?: string
  category?: number | string
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

export interface GetProductI {
  _id: string
  title: string
  productNo: string
  desc: string
  img: string
  categories: string[]
  size: string[]
  color: string[]
  price: number
  quantity: number
  purchasedCount: number
  ratingsQuantity: number
  ratingsAverage: number
  brand: string
  gender: string
  is_in_inventory: boolean
}

export interface AddProductI {
  title: string
  productNo: string
  desc: string
  img: string
  categories: string[]
  size: string[]
  color: string[]
  price: number
  quantity: number
  brand: string
}

export interface UpdateProductI {
  payload: AddProductI
  id: string
}
