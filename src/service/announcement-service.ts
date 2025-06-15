import { axiosInstance } from '@/libs/axios'
import { getCommonParams } from '@/utils/get-params'
import type { AddAnnouncementI, GetDataI, UpdateAnnouncementI } from '@/types/api-payload-types'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const getAll = (payload: GetDataI): Promise<ApiSuccessI | ApiErrorI> => {
  const nParams = getCommonParams(payload)
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/announcement/all', { params: nParams })
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const getById = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/announcement/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const add = (payload: AddAnnouncementI): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('/announcement', payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const update = (ORpayload: UpdateAnnouncementI): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    const { id, payload } = ORpayload

    axiosInstance
      .put(`/announcement/${id}`, payload)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const deleteById = (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/announcement/${id}`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const disableAll = (): Promise<ApiSuccessI | ApiErrorI> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .delete(`/announcement/active`)
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const bulkImport = (file: File): Promise<any> => {
  // Create FormData object to handle file upload
  const formData = new FormData()

  formData.append('file', file)

  return new Promise((resolve, reject) => {
    if (!file) {
      reject({
        status: null,
        data: reject({ status: null, data: {}, message: 'File is required' }),
        message: 'File is required'
      })

      return
    }

    axiosInstance
      .post('/announcement/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => resolve(handleApiRes(res)))
      .catch(err => reject(handleApiErr(err)))
  })
}

const announcementService = {
  getAll,
  getById,
  add,
  update,
  deleteById,
  disableAll,
  bulkImport
}

export default announcementService
