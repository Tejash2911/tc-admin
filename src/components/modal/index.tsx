import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  open: boolean
}

export default function Modal({ children, open }: IProps) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm' />

      {/* Modal */}
      <div className='fixed left-1/2 top-1/2 z-50 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white p-6 shadow-2xl'>
        {children}
      </div>
    </>
  )
}
