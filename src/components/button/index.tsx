import React from 'react'

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'delete' | 'outline'
  children: React.ReactNode
}

export const Button: React.FC<IProps> = ({ variant = 'primary', children, ...props }) => {
  const baseClasses =
    'flex items-center justify-center gap-1 transition-all rounded-lg py-2 px-3 transition duration-300'

  const variantClasses = {
    primary: 'bg-teal-700 hover:bg-teal-800 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    delete: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'bg-transparent border border-teal-700 text-teal-700'
  }[variant]

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  )
}
