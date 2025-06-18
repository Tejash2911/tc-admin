import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/redux/redux-hooks'
import { Icon } from '@iconify/react'

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
    },
    toggleSidebar: () => {
      setSideBar(!isOpen)
    }
  }

  return (
    <div className='sticky top-0 h-[50px] w-full bg-white/80 shadow-md'>
      <div className='flex h-full items-center justify-between px-6'>
        <div className='flex items-center gap-4'>
          <button
            onClick={handle.toggleSidebar}
            className={`flex h-8 w-8 items-center justify-center rounded-lg p-1 transition-all duration-200 ease-in-out ${
              isOpen ? 'rotate-y-0 bg-gray-100' : 'rotate-y-180 bg-white'
            }`}
          >
            <Icon icon='ri:menu-unfold-4-line' className='h-4 w-4' />
          </button>
          <Link href='/home' className='flex items-center gap-2'>
            <span className='text-xl font-bold text-gray-900'>TejashCreation</span>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          {isMounted && currentUser && (
            <div className='flex items-center gap-2'>
              <Image src={currentUser?.avatar} width={100} height={100} alt='avatar' className='h-8 w-8 rounded-full' />
              <button
                onClick={handle.onLogout}
                className='font-medium text-gray-700 transition-colors hover:text-gray-900'
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
