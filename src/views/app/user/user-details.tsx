'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { deleteUser, getUserById, updateUserById, userActions } from '@/redux/slices/userSlice'
import type { AddUserI } from '@/types/api-payload-types'
import useModal from '@/hooks/use-modal'
import { Button } from '@/components/button'
import ContentLayout from '@/components/content-layout'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'
import { Input, Select } from '@/components/input'
import NotFound from '@/components/not-found'

interface IProps {
  id: string
}

const UserDetailsPage = ({ id }: IProps) => {
  const { user, userNotFound } = useAppSelector(({ user }) => user)
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
    if (id) {
      dispatch(getUserById(id))
    }
    return () => {
      dispatch(userActions.resetUser())
    }
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
      dispatch(updateUserById({ id, payload: formData })).then(() => router.push('/user'))
    },
    confirmDelete: () => {
      const { selectedRow } = isDelete
      dispatch(deleteUser(selectedRow.id)).then(() => {
        isDelete.onClose()
        router.push('/user')
      })
    }
  }

  if (userNotFound) {
    return <NotFound message='User Not Found' description='The user you are looking for does not exist.' />
  }

  return (
    <ContentLayout title='User Details'>
      {user && (
        <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='rounded-lg border border-gray-300 bg-white p-8'>
            {/* Top Section */}
            <div className='mb-8 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    height={50}
                    width={50}
                    alt='avatar'
                    className='h-12 w-12 rounded-full object-cover'
                  />
                )}
                <h2 className='text-gray-900'>UserID: {user._id}</h2>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handle.onSubmit} className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {/* First Name */}
              <Input
                name='firstName'
                label='First Name'
                placeholder='First Name'
                value={formData.firstName}
                onChange={handle.onInputChange}
              />

              {/* Last Name */}
              <Input
                name='lastName'
                label='Last Name'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handle.onInputChange}
              />

              {/* Email */}
              <Input
                name='email'
                label='Email'
                placeholder='Email'
                value={formData.email}
                onChange={handle.onInputChange}
                readOnly
              />

              {/* Number */}
              <Input
                name='number'
                label='Phone Number'
                placeholder='Phone Number'
                value={formData.number}
                onChange={handle.onInputChange}
              />

              {/* isAdmin */}
              <Select
                name='isAdmin'
                label='Is Admin?'
                value={formData.isAdmin.toString()}
                onChange={handle.onInputChange}
                options={[
                  { label: 'No', value: 'false' },
                  { label: 'Yes', value: 'true' }
                ]}
              />

              {/* Submit Buttons */}
              <div className='col-span-full flex justify-end gap-4'>
                <Button type='submit' icon='save'>
                  Update User
                </Button>
                <Button type='button' icon='delete' variant='delete' onClick={() => isDelete.onOpen({ id })}>
                  Delete User
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDelete.isOpen && (
        <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
      )}
    </ContentLayout>
  )
}

export default UserDetailsPage
