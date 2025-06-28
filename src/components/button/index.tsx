import React from 'react'
import { Icon } from '@iconify/react'

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'delete' | 'outline'
  icon?: 'search' | 'add' | 'delete' | 'save' | 'print'
  children: React.ReactNode
}

export const Button: React.FC<IProps> = ({ variant = 'primary', icon, children, ...props }) => {
  const baseClasses =
    'flex items-center justify-center gap-1 transition-all rounded-lg py-2 px-3 transition duration-300'

  const variantClasses = {
    primary: 'bg-teal-700 hover:bg-teal-800 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    delete: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'bg-transparent border border-teal-700 text-teal-700'
  }[variant]

  const iconMap = {
    search: <Icon icon='ri:search-line' />,
    add: <Icon icon='ri:add-line' />,
    delete: <Icon icon='ri:delete-bin-7-line' />,
    save: <Icon icon='ri:save-line' />,
    print: <Icon icon='ri:printer-line' />
  } as const

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {icon ? iconMap[icon] : null}
      {children}
    </button>
  )
}
