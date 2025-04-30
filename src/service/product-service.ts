import { axiosInstance } from '@/libs/axios'
import { getCommonParams } from '@/utils/get-params'
import type { AddProductI, GetDataI, UpdateProductI } from '@/types/api-payload-types'
import { ApiErrorI, ApiSuccessI, handleApiErr, handleApiRes } from './handle-response'

const getAll = (payload: GetDataI): Promise<ApiSuccessI | ApiErrorI> => {
  const nParams = getCommonParams(payload)
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/product/all', { params: nParams })
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getById = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/product/info/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const add = (payload: AddProductI): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/product', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const update = (ORpayload: UpdateProductI): Promise<ApiSuccessI | ApiErrorI> => {
  const { id, payload } = ORpayload

  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/product/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const deleteById = (id: string) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/product/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const productService = {
  getAll,
  getById,
  add,
  update,
  deleteById
}

export default productService
