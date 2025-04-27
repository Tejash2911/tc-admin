'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { deleteUser, getUserById, updateUserById, userActions } from '@/redux/slices/userSlice'
import { AddUserI } from '@/types/api-payload-types'
import useModal from '@/hooks/use-modal'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'

interface IProps {
  id: string
}

function UserDetailsPage({ id }: IProps) {
  const { user } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()

  const isDelete = useModal()

  const router = useRouter()

  const [formData, setFormData] = useState<AddUserI>({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    isAdmin: false
  })

  useEffect(() => {
    dispatch(getUserById(id))
  }, [id])

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        number: user.number || '',
        isAdmin: user.isAdmin || false
      })
    }
  }, [user])

  useEffect(() => {
    return () => {
      dispatch(userActions.resetUser())
    }
  }, [])

  const handle = {
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: name === 'isAdmin' ? value === 'true' : value
      }))
    },
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault()
      dispatch(updateUserById({ id, payload: formData }))
        .unwrap()
        .then(res => {
          dispatch(errorActions.setErrorMessage(res?.message))
        })
        .then(() => router.push('/user'))
        .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
    },
    confirmDelete: () => {
      const { selectedRow } = isDelete
      dispatch(deleteUser(selectedRow.id))
        .unwrap()
        .then(res => {
          dispatch(errorActions.setErrorMessage(res?.message))
          isDelete.onClose()
        })
        .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
    }
  }

  return (
    <>
      {user && (
        <div className='w-full flex items-center justify-center'>
          <div className='w-full max-w-6xl bg-[#f6fbfb] flex flex-col items-center m-5 p-4 rounded-xl shadow-md'>
            {/* Top Section */}
            <div className='flex flex-col md:flex-row items-center justify-around w-full mb-6'>
              {user.avatar && (
                <Image
                  src={user.avatar}
                  height={100}
                  width={100}
                  alt='avatar'
                  className='w-48 h-48 rounded-full object-cover'
                />
              )}
              <h2 className='text-gray-800 text-xl font-semibold mt-4 md:mt-0'>UserID: {user._id}</h2>
            </div>

            {/* Form Section */}
            <form onSubmit={handle.onSubmit} className='w-full flex flex-wrap justify-center gap-6 mt-4'>
              {/* First Name */}
              <div className='flex flex-col flex-[1_0_30%]'>
                <label htmlFor='firstName' className='mb-2 text-gray-700 font-medium'>
                  First Name
                </label>
                <input
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handle.onInputChange}
                  placeholder='First Name'
                  className='bg-[#d2e5e5] rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
              </div>

              {/* Last Name */}
              <div className='flex flex-col flex-[1_0_30%]'>
                <label htmlFor='lastName' className='mb-2 text-gray-700 font-medium'>
                  Last Name
                </label>
                <input
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handle.onInputChange}
                  placeholder='Last Name'
                  className='bg-[#d2e5e5] rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
              </div>

              {/* Email */}
              <div className='flex flex-col flex-[1_0_30%]'>
                <label htmlFor='email' className='mb-2 text-gray-700 font-medium'>
                  Email
                </label>
                <input
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handle.onInputChange}
                  placeholder='Email'
                  className='bg-[#d2e5e5] rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
              </div>

              {/* Number */}
              <div className='flex flex-col flex-[1_0_30%]'>
                <label htmlFor='number' className='mb-2 text-gray-700 font-medium'>
                  Phone Number
                </label>
                <input
                  id='number'
                  name='number'
                  value={formData.number}
                  onChange={handle.onInputChange}
                  placeholder='Phone Number'
                  className='bg-[#d2e5e5] rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-teal-500'
                />
              </div>

              {/* isAdmin */}
              <div className='flex flex-col flex-[1_0_30%]'>
                <label htmlFor='isAdmin' className='mb-2 text-gray-700 font-medium'>
                  Is Admin?
                </label>
                <select
                  id='isAdmin'
                  name='isAdmin'
                  value={formData.isAdmin.toString()}
                  onChange={handle.onInputChange}
                  className='bg-[#d2e5e5] rounded-md p-3 text-base'
                >
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
              </div>

              {/* Submit */}
              {/* Submit */}
              <div className='w-full flex justify-center gap-4 mt-6'>
                <button
                  type='submit'
                  className='bg-teal-600 text-white py-3 px-6 rounded-md hover:bg-teal-700 transition duration-300'
                >
                  Update User
                </button>
                <button
                  type='button'
                  onClick={() => isDelete.onOpen({ id })}
                  className='bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition duration-300'
                >
                  Delete User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDelete.isOpen && (
        <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
      )}
    </>
  )
}

export default UserDetailsPage
