import analyticsService from '@/service/analytics-service'
import { useQuery } from '@tanstack/react-query'

export const useOrderAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'orderStats'],
    queryFn: () => analyticsService.getOrderAnalytics(),
    select: (res: any) => res?.data,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

export const useOrderPriceAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'orderPriceStats'],
    queryFn: () => analyticsService.getOrderPriceAnalytics(),
    select: (res: any) => res?.data,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

export const usePopularSizeColor = () => {
  return useQuery({
    queryKey: ['analytics', 'popularSizeColor'],
    queryFn: () => analyticsService.getPopularSizeColor(),
    select: (res: any) => res?.data,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

export const useTopCategories = () => {
  return useQuery({
    queryKey: ['analytics', 'topCategories'],
    queryFn: () => analyticsService.getTopCategories(),
    select: (res: any) => res?.data,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}

export const useTopProducts = (params?: { for: string }) => {
  return useQuery({
    queryKey: ['analytics', 'topProducts', params],
    queryFn: () => analyticsService.getTopProducts(params || { for: 'chart' }),
    select: (res: any) => res?.data,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}
