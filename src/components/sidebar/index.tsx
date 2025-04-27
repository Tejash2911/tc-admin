'use client'

import React from 'react'
import Link from 'next/link'
import {
  MdCampaign,
  MdDrafts,
  MdFeedback,
  MdForum,
  MdLineStyle,
  MdLocalAtm,
  MdPermIdentity,
  MdStorefront,
  MdTrendingUp
} from 'react-icons/md'

interface IProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: IProps) => {
  return (
    <div
      className={`fixed top-[50px] bottom-0 bg-[#fbfbff] transition-all duration-300 ease-in-out h-[calc(100vh-50px)] w-max z-50 ${
        isOpen ? 'left-0' : '-left-full'
      }`}
    >
      <div className='p-5 text-[#555] space-y-6'>
        {/* Dashboard */}
        <div>
          <h3 className='text-xs text-[#bbb] font-semibold mb-2'>Dashboard</h3>
          <ul className='space-y-1'>
            <li>
              <Link href='/' className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff]'>
                <MdLineStyle className='text-base' />
                <span className='text-sm'>Home</span>
              </Link>
            </li>
            <li>
              <Link href='/announcement' className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff]'>
                <MdCampaign className='text-base' />
                <span className='text-sm'>Announcement</span>
              </Link>
            </li>
            <li className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff] cursor-pointer'>
              <MdTrendingUp className='text-base' />
              <span className='text-sm'>Sales</span>
            </li>
          </ul>
        </div>

        {/* All Menu */}
        <div>
          <h3 className='text-xs text-[#bbb] font-semibold mb-2'>All Menu</h3>
          <ul className='space-y-1'>
            <li>
              <Link href='/user' className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff]'>
                <MdPermIdentity className='text-base' />
                <span className='text-sm'>Users</span>
              </Link>
            </li>
            <li>
              <Link href='/products' className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff]'>
                <MdStorefront className='text-base' />
                <span className='text-sm'>Products</span>
              </Link>
            </li>
            <li>
              <Link href='/orders' className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff]'>
                <MdLocalAtm className='text-base' />
                <span className='text-sm'>Orders</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className='text-xs text-[#bbb] font-semibold mb-2'>Connect</h3>
          <ul className='space-y-1'>
            <li className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff] cursor-pointer'>
              <MdDrafts className='text-base' />
              <span className='text-sm'>Mail</span>
            </li>
            <li className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff] cursor-pointer'>
              <MdFeedback className='text-base' />
              <span className='text-sm'>Feedback</span>
            </li>
            <li className='flex items-center space-x-2 rounded-lg p-2 hover:bg-[#f0f0ff] cursor-pointer'>
              <MdForum className='text-base' />
              <span className='text-sm'>Messages</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
