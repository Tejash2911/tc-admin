import { axiosInstance } from '@/libs/axios'
import { getCommonParams } from '@/utils/get-params'
import type { AddAnnouncementI, GetDataI, UpdateAnnouncementI } from '@/types/api-payload-types'
import type { ApiErrorI, ApiSuccessI } from './handle-response'
import { handleApiErr, handleApiRes } from './handle-response'

const getAll = async (payload: GetDataI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const nParams = getCommonParams(payload)
    const res = await axiosInstance.get('/announcement/all', { params: nParams })
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const getById = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.get(`/announcement/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const add = async (payload: AddAnnouncementI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.post('/announcement', payload)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const update = async (ORpayload: UpdateAnnouncementI): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const { id, payload } = ORpayload
    const res = await axiosInstance.put(`/announcement/${id}`, payload)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const deleteById = async (id: string): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.delete(`/announcement/${id}`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const disableAll = async (): Promise<ApiSuccessI | ApiErrorI> => {
  try {
    const res = await axiosInstance.delete(`/announcement/active`)
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
}

const bulkImport = async (file: File): Promise<any> => {
  try {
    // Create FormData object to handle file upload
    const formData = new FormData()
    formData.append('file', file)

    if (!file) {
      return {
        status: null,
        data: {},
        message: 'File is required'
      }
    }

    const res = await axiosInstance.post('/announcement/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return handleApiRes(res)
  } catch (err) {
    return handleApiErr(err as any)
  }
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
