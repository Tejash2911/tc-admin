'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'

const Message = () => {
  const dispatch = useAppDispatch()
  const { id, message } = useAppSelector(({ error }) => error)
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    if (message && id) {
      setIsShow(true)

      const timeout = setTimeout(() => {
        dispatch(errorActions.clearError())
        setIsShow(false)
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [message, id])

  return (
    <>
      {isShow && (
        <div className='animate-fadeInOut fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform'>
          <div className='w-full max-w-sm rounded-lg bg-teal-700 p-2 shadow-md'>
            <span className='mx-2 capitalize'>{message}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Message
