'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Message from '@/components/message'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/register'

  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false)

  useEffect(() => {
    setIsSideBarOpen(false)
  }, [pathname])

  return (
    <>
      {!isAuthPage && <Navbar isOpen={isSideBarOpen} setSideBar={setIsSideBarOpen} />}
      {!isAuthPage && <Sidebar isOpen={isSideBarOpen} />}
      {children}
      <Message />
    </>
  )
}
