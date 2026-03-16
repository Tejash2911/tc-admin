import orderService from '@/service/order-service'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { GetDataI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'

export const useAllOrders = (payload?: GetDataI) => {
  return useQuery({
    queryKey: ['orders', 'all', payload],
    queryFn: () => orderService.getAll(payload || {}),
    select: (res: any) => ({
      list: Array.isArray(res?.data?.data) ? res?.data?.data : [],
      rowCount: res?.data?.totalCount
    }),
    enabled: !!payload
  })
}

export const useOrderById = (id: string) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderService.getById(id),
    enabled: !!id,
    select: (res: any) => res?.data
  })
}

export const useOrdersByUserId = (userId: string) => {
  return useQuery({
    queryKey: ['orders', 'byUser', userId],
    queryFn: () => orderService.getByUserId(userId),
    enabled: !!userId,
    select: (res: any) => res?.data
  })
}

export const useChangeOrderStatus = () => {
  return useMutation({
    mutationFn: (payload: any) => orderService.changeOrderStatus(payload),
    onSuccess: (res: any) => {
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}
