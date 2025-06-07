import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@iconify/react'

interface INavItem {
  href: string
  icon: React.ReactNode
  label: string
}

const NavItem = ({ href, icon, label }: INavItem) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 rounded-lg p-2 transition-colors duration-200 ${
        isActive ? 'bg-[#f0f0ff]' : 'hover:bg-[#f0f0ff]'
      }`}
    >
      {icon}
      <span className='text-sm'>{label}</span>
    </Link>
  )
}

interface IProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: IProps) => {
  return (
    <div
      className={`fixed top-[50px] bottom-0 bg-white transition-all duration-300 ease-in-out h-[calc(100vh-50px)] w-max z-50 shadow-md ${
        isOpen ? 'left-0' : '-left-full'
      }`}
    >
      <div className='p-5 text-[#555] space-y-6'>
        {/* Dashboard */}
        <div>
          <h3 className='text-xs text-[#bbb] font-semibold mb-2'>Dashboard</h3>
          <ul className='space-y-1'>
            <li>
              <NavItem href='/' icon={<Icon icon='ri:home-line' />} label='Home' />
            </li>
            <li>
              <NavItem href='/announcement' icon={<Icon icon='ri:notification-line' />} label='Announcement' />
            </li>
            <li>
              <NavItem href='#' icon={<Icon icon='ri:align-item-bottom-line' />} label='Sales' />
            </li>
          </ul>
        </div>

        {/* All Menu */}
        <div>
          <h3 className='text-xs text-[#bbb] font-semibold mb-2'>All Menu</h3>
          <ul className='space-y-1'>
            <li>
              <NavItem href='/user' icon={<Icon icon='ri:user-line' />} label='Users' />
            </li>
            <li>
              <NavItem href='/product' icon={<Icon icon='ri:store-line' />} label='Products' />
            </li>
            <li>
              <NavItem href='/order' icon={<Icon icon='ri:shopping-bag-line' />} label='Orders' />
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className='text-xs text-[#bbb] font-semibold mb-2'>Connect</h3>
          <ul className='space-y-1'>
            <li>
              <NavItem href='#' icon={<Icon icon='ri:mail-line' />} label='Mail' />
            </li>
            <li>
              <NavItem href='#' icon={<Icon icon='ri:feedback-line' />} label='Feedback' />
            </li>
            <li>
              <NavItem href='#' icon={<Icon icon='ri:message-line' />} label='Messages' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
