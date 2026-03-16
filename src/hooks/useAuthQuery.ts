import { getCurrentUser } from '@/libs/auth'
import authService from '@/service/auth-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { showToastError, showToastSuccess } from '@/components/toast'

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (res: any) => {
      showToastSuccess(res?.data?.message)
      localStorage.setItem('auth', JSON.stringify(res?.data?.data))
      queryClient.setQueryData(['currentUser'], res?.data?.data)
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: (res: any) => {
      showToastSuccess(res?.data?.message)
      localStorage.removeItem('auth')
      queryClient.removeQueries({ queryKey: ['currentUser'] })
    },
    onError: (error: any) => {
      showToastError(error?.data?.message)
    }
  })
}

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: Infinity,
    initialData: getCurrentUser(),
    enabled: typeof window !== 'undefined'
  })
}
