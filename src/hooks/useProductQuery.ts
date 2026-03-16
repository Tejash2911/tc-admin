import productService from '@/service/product-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AddProductI, GetDataI, UpdateProductI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'

export const useAllProducts = (payload?: GetDataI) => {
  return useQuery({
    queryKey: ['products', 'all', payload],
    queryFn: () => productService.getAll(payload || {}),
    select: (res: any) => ({
      list: Array.isArray(res?.data?.data) ? res?.data?.data : [],
      rowCount: res?.data?.totalCount
    }),
    enabled: !!payload
  })
}

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
    select: (res: any) => res?.data
  })
}

export const useAddProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AddProductI) => productService.add(payload),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['products', 'all'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateProductI) => productService.update(payload),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['products', 'all'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => productService.deleteById(id),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['products', 'all'] })
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}
