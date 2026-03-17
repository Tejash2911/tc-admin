import { axiosInstance } from '@/libs/axios'
import { getCommonParams } from '@/utils/get-params'
import type { GetDataI, UpdateUserI } from '@/types/api-payload-types'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const getAll = async (payload: GetDataI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const nParams = getCommonParams(payload)
    const res = await axiosInstance.get('/user', { params: nParams })
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const getById = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get(`/user/${id}`)
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const update = async (ORpayload: UpdateUserI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const { id, payload } = ORpayload
    const res = await axiosInstance.put(`/user/${id}`, payload)
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const deleteById = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.delete(`/user/${id}`)
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const userService = {
  getAll,
  getById,
  update,
  deleteById
}

export default userService
