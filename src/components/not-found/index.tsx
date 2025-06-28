import { useEffect, useState } from 'react'

interface IProps {
  message?: string
  description?: string
}

const NotFound = ({ message = 'Invalid ID', description = 'The ID you are looking for does not exist.' }: IProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className='flex min-h-[calc(100vh-50px)] flex-col items-center justify-center p-8'>
      <div className='text-center'>
        <div className='mb-4'>
          <div className='mx-auto flex h-20 w-20 items-center justify-center rounded-full'>
            <svg className='h-12 w-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
          </div>
        </div>
        <h2 className='mb-2 text-2xl font-semibold text-gray-800'>{message}</h2>
        <p className='mb-4 text-gray-600'>{description}</p>
      </div>
    </div>
  )
}

export default NotFound
