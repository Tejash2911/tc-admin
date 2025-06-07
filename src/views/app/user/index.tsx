'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getAllUsers } from '@/redux/slices/userSlice'
import useDebounce from '@/hooks/use-debounce'
import ContentLayout from '@/components/content-layout'
import { Input } from '@/components/input'
import Pagination from '@/components/pagination/Pagination'
import UserListView from './user-list'

interface QueryI {
  search: string
  offset: number
  limit: number
}

const UsersView = () => {
  const { users, rowCount, loading } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()

  const [query, setQuery] = useState<QueryI>({
    search: '',
    offset: 1,
    limit: 10
  })

  const debouncedSearch = useDebounce(query.search, 1000)

  useEffect(() => {
    handle.getAllUsers()
  }, [debouncedSearch, query.offset, query.limit])

  const handle = {
    getAllUsers: () => {
      dispatch(getAllUsers(query))
    }
  }

  return (
    <ContentLayout title='Users'>
      <div className='bg-white rounded-lg p-4 mb-4 border border-gray-300'>
        <Input
          type='text'
          placeholder='Search user by name/email/phone/id'
          value={query.search}
          onChange={e => setQuery(prev => ({ ...prev, search: e.target.value }))}
        />
      </div>
      <UserListView users={users} getData={handle.getAllUsers} loading={loading} />
      <Pagination
        currentPage={query.offset}
        totalPages={Math.ceil(rowCount / query.limit)}
        itemsPerPage={query.limit}
        totalItems={rowCount}
        onPageChange={page => setQuery(prev => ({ ...prev, offset: page }))}
        hasNextPage={query.offset < Math.ceil(rowCount / query.limit)}
        hasPreviousPage={query.offset > 1}
      />
    </ContentLayout>
  )
}

export default UsersView
