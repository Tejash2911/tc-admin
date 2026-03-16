'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLogout } from '@/hooks/useAuthQuery'

const LogoutView = () => {
  const { mutate: logout, isPending: loading } = useLogout()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    router.push('/login')
  }

  useEffect(() => {
    handleSignOut()
  }, [])

  return loading ? <div className='flex h-screen items-center justify-center'>Logging out...</div> : null
}

export default LogoutView
