import userService from '@/service/user-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { GetDataI, UpdateUserI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'

export const useAllUsers = (payload?: GetDataI) => {
  return useQuery({
    queryKey: ['users', payload],
    queryFn: () => userService.getAll(payload || {}),
    select: (res: any) => ({
      users: res?.data?.data,
      rowCount: res?.data?.totalCount
    }),
    enabled: !!payload
  })
}

export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getById(id),
    enabled: !!id,
    select: (res: any) => res?.data
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateUserI) => userService.update(payload),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => userService.deleteById(id),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}
