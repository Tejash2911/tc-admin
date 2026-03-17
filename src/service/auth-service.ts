import { axiosInstance } from '@/libs/axios'
import type { LoginI } from '@/types/api-payload-types'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const login = async (payload: LoginI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.post('/auth/login', payload)
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const logout = async (): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.post('/auth/logout')
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const authService = {
  login,
  logout
}

export default authService
