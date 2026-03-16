import { axiosInstance } from '@/libs/axios'
import type { AddReviewI } from '@/types/api-payload-types'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const getAll = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get(`/review/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const add = async (ORpayload: AddReviewI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const { id, payload } = ORpayload
    const res = await axiosInstance.post(`/review/${id}`, payload)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const upvote = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.put(`/review/upvote/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const abuse = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.put(`/review/abuse/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const reviewService = {
  getAll,
  add,
  upvote,
  abuse
}

export default reviewService
