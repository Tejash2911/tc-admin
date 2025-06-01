'use client'

import { useEffect, useState } from 'react'

interface NotFoundProps {
  message?: string
  description?: string
}

const NotFound = ({
  message = 'Invalid ID',
  description = 'The ID you are looking for does not exist.'
}: NotFoundProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] p-8'>
      <div className='text-center'>
        <div className='mb-4'>
          <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto'>
            <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
        </div>
        <h2 className='text-2xl font-semibold mb-2 text-gray-800'>{message}</h2>
        <p className='text-gray-600 mb-4'>{description}</p>
      </div>
    </div>
  )
}

export default NotFound
