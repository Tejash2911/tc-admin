import { axiosInstance } from '@/libs/axios'
import { getCommonParams } from '@/utils/get-params'
import type { GetDataI } from '@/types/api-payload-types'
import { ApiErrorI, ApiSuccessI, handleApiErr, handleApiRes } from './handle-response'

const getAll = (payload: GetDataI): Promise<ApiSuccessI | ApiErrorI> => {
  const nParams = getCommonParams(payload)
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/order/all', { params: nParams })
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getById = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/order/info/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const add = (payload: any): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/order', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const update = (ORpayload: any): Promise<ApiSuccessI | ApiErrorI> => {
  const { id, payload } = ORpayload

  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/order/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const deleteById = (id: string) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/order/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getByUserId = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/order/find/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const changeOrderStatus = (OrPayload: any): Promise<ApiSuccessI | ApiErrorI> => {
  const { id, payload } = OrPayload
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/order/status/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
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
