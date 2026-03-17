import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { useAuthUser, useLogout } from '@/hooks/useAuthQuery'

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
      className={`flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors duration-200 ${
        isActive ? 'bg-[#f0f0ff] text-[#555]' : 'text-[#555] hover:bg-[#f0f0ff]'
      }`}
    >
      {icon}
      <span className='text-sm font-medium'>{label}</span>
    </Link>
  )
}

const Navbar = () => {
  const { data: currentUser } = useAuthUser()
  const { mutate: logout } = useLogout()
  const router = useRouter()

  const handle = {
    onLogout: () => {
      logout(undefined, {
        onSuccess: () => {
          router.push('/login')
        }
      })
    }
  }

  return (
    <div className='sticky top-0 h-[50px] w-full bg-white/80 shadow-md'>
      <div className='flex h-full items-center justify-between px-6'>
        <div className='flex items-center gap-6'>
          <Link href='/home' className='flex items-center gap-2'>
            <span className='text-xl font-bold text-gray-900'>TejashCreation</span>
          </Link>
          <nav className='hidden items-center gap-2 md:flex'>
            <NavItem href='/announcement' icon={<Icon icon='ri:notification-line' />} label='Announcement' />
            <NavItem href='/user' icon={<Icon icon='ri:user-line' />} label='Users' />
            <NavItem href='/product' icon={<Icon icon='ri:store-line' />} label='Products' />
            <NavItem href='/order' icon={<Icon icon='ri:shopping-bag-line' />} label='Orders' />
          </nav>
        </div>
        <div className='flex items-center gap-4'>
          {currentUser && (
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
