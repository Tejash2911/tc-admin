'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { logout } from '@/redux/slices/authSlice'

const LogoutView = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(({ auth }) => auth)
  const router = useRouter()

  const handleSignOut = () => {
    Promise.all([dispatch({ type: 'USER_LOGOUT' }), dispatch(logout())])
      .then(() => router.push('/login'))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    handleSignOut()
  }, [])

  return loading ? <div className='flex h-screen items-center justify-center'>Logging out...</div> : null
}

export default LogoutView
