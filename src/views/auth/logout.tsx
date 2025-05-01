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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //
    }
  }

  useEffect(() => {
    handleSignOut()
  }, [])

  return null
}

export default LogoutView
