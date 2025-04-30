'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getAllUsers } from '@/redux/slices/userSlice'
import UserListView from './user-list'

const UsersView = () => {
  const { users } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()

  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    handle.getAllUsers()
  }, [])

  const handle = {
    getAllUsers: () => {
      dispatch(getAllUsers({}))
    },
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault()
      dispatch(getAllUsers({ search }))
    }
  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-[#f4f5f7] p-4'>
      <h1 className='text-xl font-semibold mb-4'>Users</h1>

      <div className='w-full max-w-6xl'>
        <form className='w-full flex flex-wrap gap-2 bg-white rounded-lg p-4 mb-4' onSubmit={handle.onSubmit}>
          <input
            type='text'
            placeholder='Search by User by name/email/phone/id'
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='flex-grow rounded-md border border-[#f4f5f7] bg-[#f4f5f7] px-4 py-2 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700'
          />
          <button
            type='submit'
            className='rounded-md bg-teal-700 text-white font-semibold px-5 py-2 hover:bg-teal-800 transition'
          >
            Search
          </button>
        </form>

        <UserListView users={users.data} getData={handle.getAllUsers} />
      </div>
    </div>
  )
}

export default UsersView
