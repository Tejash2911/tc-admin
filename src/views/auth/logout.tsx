'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/redux-hooks'
import { logout } from '@/redux/slices/authSlice'

const LogoutView = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSignOut = () => {
    Promise.all([dispatch({ type: 'USER_LOGOUT' }), dispatch(logout())])
      .then(() => router.push('/login'))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    handleSignOut()
  }, [])

  return null
}

export default LogoutView
