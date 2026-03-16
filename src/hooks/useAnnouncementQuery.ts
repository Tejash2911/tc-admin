import announcementService from '@/service/announcement-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AddAnnouncementI, GetDataI, UpdateAnnouncementI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'

export const useAllAnnouncements = (payload?: GetDataI) => {
  return useQuery({
    queryKey: ['announcements', 'all', payload],
    queryFn: () => announcementService.getAll(payload || {}),
    select: (res: any) => ({
      list: Array.isArray(res?.data?.data) ? res?.data?.data : [],
      rowCount: res?.data?.totalCount
    }),
    enabled: !!payload
  })
}

export const useAnnouncementById = (id: string) => {
  return useQuery({
    queryKey: ['announcements', id],
    queryFn: () => announcementService.getById(id),
    enabled: !!id,
    select: (res: any) => res?.data
  })
}

export const useAddAnnouncement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AddAnnouncementI) => announcementService.add(payload),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['announcements', 'all'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateAnnouncementI) => announcementService.update(payload),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['announcements', 'all'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => announcementService.deleteById(id),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['announcements', 'all'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useDisableAnnouncements = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => announcementService.disableAll(),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['announcements', 'all'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}
