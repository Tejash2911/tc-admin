'use client'

import type { ReactNode } from 'react'
import Navbar from '@/components/navbar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='flex flex-1 flex-col'>
        <Navbar />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100'>{children}</main>
      </div>
    </div>
  )
}
