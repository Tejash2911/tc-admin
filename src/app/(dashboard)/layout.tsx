'use client'

import { PropsWithChildren, useState } from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar isOpen={isSideBarOpen} />
      <div className='flex flex-col flex-1'>
        <Navbar isOpen={isSideBarOpen} setSideBar={setIsSideBarOpen} />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>
          <div className='container mx-auto px-6 py-8'>{children}</div>
        </main>
      </div>
    </div>
  )
}
