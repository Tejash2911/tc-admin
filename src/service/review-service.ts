import { axiosInstance } from '@/libs/axios'
import { AddReviewI } from '@/types/api-payload-types'
import { ApiErrorI, ApiSuccessI, handleApiErr, handleApiRes } from './handle-response'

const getAll = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/review/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const add = (ORpayload: AddReviewI): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    const { id, payload } = ORpayload

    axiosInstance
      .post(`/review/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const upvote = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/review/upvote/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const abuse = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`/review/abuse/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const reviewService = {
  getAll,
  add,
  upvote,
  abuse
}

export default reviewService
