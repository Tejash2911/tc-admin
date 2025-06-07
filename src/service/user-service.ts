import { axiosInstance } from '@/libs/axios'
import { getCommonParams } from '@/utils/get-params'
import { GetDataI, UpdateUserI } from '@/types/api-payload-types'
import { ApiErrorI, ApiSuccessI, handleApiErr, handleApiRes } from './handle-response'

const getAll = (payload: GetDataI): Promise<ApiSuccessI | ApiErrorI> => {
  const nParams = getCommonParams(payload)
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/user', { params: nParams })
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getById = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/user/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const update = (ORpayload: UpdateUserI): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    const { id, payload } = ORpayload

    axiosInstance
      .put(`/user/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const deleteById = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/user/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const userService = {
  getAll,
  getById,
  update,
  deleteById
}

export default userService
