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
    }
  }

  return (
    <div className='w-full h-[50px] sticky top-0 bg-white/80 shadow-md'>
      <div className='h-full px-6 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button
            onClick={() => setSideBar(!isOpen)}
            className={`transition-transform duration-100 cursor-pointer ${isOpen ? 'rotate-y-0' : 'rotate-y-180'}`}
          >
            <Icon icon='ri:menu-unfold-4-line' />
          </button>
          <Link href='/' className='flex items-center gap-2'>
            <span className='font-bold text-xl text-gray-900'>TejashCreation</span>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          {isMounted && currentUser && (
            <div className='flex items-center gap-2'>
              <Image src={currentUser?.avatar} width={100} height={100} alt='avatar' className='w-8 h-8 rounded-full' />
              <button
                onClick={handle.onLogout}
                className='font-medium text-gray-700 hover:text-gray-900 transition-colors'
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
