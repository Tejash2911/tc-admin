import { axiosInstance } from '@/libs/axios'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const getTopCategories = async (): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get('/analytics/top-cat')
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const getOrderAnalytics = async (): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get('/analytics/order')
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const getOrderPriceAnalytics = async (): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get('/analytics/order-price')
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const getPopularSizeColor = async (): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get('/analytics/popular-size-color')
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const getTopProducts = async (payload: { for: string }): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get('/analytics/top-products', { params: payload })
    return handleApiRes(res)
  } catch (err) {
    throw handleApiErr(err as any)
  }
}

const analyticsService = {
  getTopCategories,
  getOrderAnalytics,
  getOrderPriceAnalytics,
  getPopularSizeColor,
  getTopProducts
}

export default analyticsService
