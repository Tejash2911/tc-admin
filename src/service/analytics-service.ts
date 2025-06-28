import { axiosInstance } from '@/libs/axios'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const getTopCategories = (): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/analytics/top-cat')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getOrderAnalytics = (): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/analytics/order')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getOrderPriceAnalytics = (): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/analytics/order-price')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getPopularSizeColor = (): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/analytics/popular-size-color')
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getTopProducts = (payload: { for: string }): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/analytics/top-products', { params: payload })
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const analyticsService = {
  getTopCategories,
  getOrderAnalytics,
  getOrderPriceAnalytics,
  getPopularSizeColor,
  getTopProducts
}

export default analyticsService
