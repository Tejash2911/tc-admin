import type { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  open: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Modal = ({ children, open, size = 'md' }: IProps) => {
  if (!open) return null

  const modalSizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm' />

      {/* Modal */}
      <div
        className={`fixed left-1/2 top-1/2 z-50 w-full text-sm ${modalSizes[size]} -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-2xl`}
      >
        {children}
      </div>
    </>
  )
}

export default Modal
