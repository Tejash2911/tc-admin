'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/redux-hooks'
import { authActions } from '@/redux/slices/authSlice'

const LogoutView = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSignOut = () => {
    try {
      dispatch(authActions.logoutUser())
      dispatch({ type: 'USER_LOGOUT' })
      router.push('/login')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleSignOut()
  }, [])

  return null
}

export default LogoutView
