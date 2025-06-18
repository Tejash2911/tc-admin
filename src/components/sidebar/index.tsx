import React, { useEffect, useRef, useState } from 'react'
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
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: IProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && onClose && !isTransitioning) {
        setIsTransitioning(true)
        setTimeout(() => {
          onClose()
          setIsTransitioning(false)
        }, 100)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, isTransitioning])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-[50px] bottom-0 h-[calc(100vh-50px)] w-52 bg-white shadow-md transition-all duration-300 ease-in-out ${
        isOpen ? 'left-0' : '-left-52'
      }`}
      onClick={e => e.stopPropagation()}
    >
      <div className='space-y-6 p-5 text-[#555]'>
        {/* Dashboard */}
        <div>
          <h3 className='mb-2 text-xs font-semibold text-[#bbb]'>Dashboard</h3>
          <ul className='space-y-1'>
            <li>
              <NavItem href='/home' icon={<Icon icon='ri:home-line' />} label='Home' />
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
          <h3 className='mb-2 text-xs font-semibold text-[#bbb]'>All Menu</h3>
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
          <h3 className='mb-2 text-xs font-semibold text-[#bbb]'>Connect</h3>
          <ul className='space-y-1'>
            <li>
              <NavItem href='mailto:tcpatel2911@gmail.com' icon={<Icon icon='ri:mail-line' />} label='Mail' />
            </li>
            <li>
              <NavItem href='#' icon={<Icon icon='ri:feedback-line' />} label='Feedback' />
            </li>
            <li>
              <NavItem href='#' icon={<Icon icon='ri:message-line' />} label='Messages' />
            </li>
          </ul>
        </div>

        {/* Contact */}
        {/* <div>
          <h3 className='text-xs text-[#bbb] font-semibold mb-2'>Contact</h3>
          <ul className='space-y-1'>
            <li>
              <NavItem href='https://github.com/tejash2911' icon={<Icon icon='ri:github-fill' />} label='GitHub' />
            </li>
            <li>
              <NavItem
                href='https://linkedin.com/in/tejash2911'
                icon={<Icon icon='ri:linkedin-box-fill' />}
                label='LinkedIn'
              />
            </li>
            <li>
              <NavItem
                href='https://instagram.com/___tejas2911'
                icon={<Icon icon='ri:instagram-line' />}
                label='Instagram'
              />
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  )
}

export default Sidebar
