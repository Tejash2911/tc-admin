import { axiosInstance } from '@/libs/axios'
import { getCommonParams } from '@/utils/get-params'
import type { GetDataI } from '@/types/api-payload-types'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const getAll = async (payload: GetDataI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const nParams = getCommonParams(payload)
    const res = await axiosInstance.get('/order/all', { params: nParams })
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const getById = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get(`/order/info/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const add = async (payload: any): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.post('/order', payload)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const update = async (ORpayload: any): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const { id, payload } = ORpayload
    const res = await axiosInstance.put(`/order/${id}`, payload)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const deleteById = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.delete(`/order/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const getByUserId = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get(`/order/find/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const changeOrderStatus = async (OrPayload: any): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const { id, payload } = OrPayload
    const res = await axiosInstance.put(`/order/status/${id}`, payload)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const orderService = {
  getAll,
  getById,
  add,
  update,
  deleteById,
  getByUserId,
  changeOrderStatus
}

export default orderService
