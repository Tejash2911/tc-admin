import reviewService from '@/service/review-service'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { AddReviewI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'

export const useReviewsByProductId = (productId: string) => {
  return useQuery({
    queryKey: ['reviews', 'byProduct', productId],
    queryFn: () => reviewService.getAll(productId),
    enabled: !!productId,
    select: (res: any) => ({
      data: Array.isArray(res?.data) ? res?.data : []
    })
  })
}

export const useAddReview = () => {
  return useMutation({
    mutationFn: (payload: AddReviewI) => reviewService.add(payload),
    onSuccess: (res: any) => {
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useUpvoteReview = () => {
  return useMutation({
    mutationFn: (id: string) => reviewService.upvote(id),
    onSuccess: (res: any) => {
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useAbuseReview = () => {
  return useMutation({
    mutationFn: (id: string) => reviewService.abuse(id),
    onSuccess: (res: any) => {
      showToastSuccess(res?.data?.message)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}
