import { axiosInstance } from '@/libs/axios'
import { getCommonParams } from '@/utils/get-params'
import type { AddProductI, GetDataI, UpdateProductI } from '@/types/api-payload-types'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const getAll = async (payload: GetDataI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const nParams = getCommonParams(payload)
    const res = await axiosInstance.get('/product/all', { params: nParams })
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const getById = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get(`/product/info/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const add = async (payload: AddProductI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.post('/product', payload)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const update = async (ORpayload: UpdateProductI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const { id, payload } = ORpayload
    const res = await axiosInstance.put(`/product/${id}`, payload)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const deleteById = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.delete(`/product/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const productService = {
  getAll,
  getById,
  add,
  update,
  deleteById
}

export default productService
