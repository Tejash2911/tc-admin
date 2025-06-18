'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      <div className='flex flex-1 flex-col'>
        <Navbar isOpen={isSideBarOpen} setSideBar={setIsSideBarOpen} />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>{children}</main>
      </div>
    </div>
  )
}
