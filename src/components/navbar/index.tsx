'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/redux-hooks'
import { MdOutlineMenuOpen } from 'react-icons/md'

interface IProps {
  isOpen: boolean
  setSideBar: (isOpen: boolean) => void
}

const Navbar = ({ isOpen, setSideBar }: IProps) => {
  const { currentUser } = useAppSelector(({ auth }) => auth)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handle = {
    onLogout: () => {
      router.push('/logout')
    }
  }

  return (
    <div className='w-full h-[50px] sticky top-0 z-50 bg-white/80 shadow-md'>
      <div className='h-full px-5 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <MdOutlineMenuOpen
            size={30}
            onClick={() => setSideBar(!isOpen)}
            className={`transition-transform duration-100 cursor-pointer ${isOpen ? 'rotate-y-0' : 'rotate-y-180'}`}
          />
          <span className='font-bold text-2xl cursor-pointer'>
            <Link href='/'>TejashCreation</Link>
          </span>
        </div>
        <div className='flex items-center'>
          {isMounted && currentUser && (
            <>
              <Image
                src={currentUser?.avatar}
                width={100}
                height={100}
                alt='avatar'
                className='w-7 h-7 rounded-full mx-1'
              />
              <p className='mx-2 cursor-pointer' onClick={handle.onLogout}>
                Logout
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
