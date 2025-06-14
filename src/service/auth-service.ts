import { axiosInstance } from '@/libs/axios'
import { LoginI } from '@/types/api-payload-types'
import { ApiErrorI, ApiSuccessI, handleApiErr, handleApiRes } from './handle-response'

const login = (payload: LoginI): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/auth/login', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const logout = (): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/auth/logout')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const authService = {
  login,
  logout
}

export default authService
