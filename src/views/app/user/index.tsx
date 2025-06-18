'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getAllUsers } from '@/redux/slices/userSlice'
import useDebounce from '@/hooks/use-debounce'
import { useQuery } from '@/hooks/useQuery'
import ContentLayout from '@/components/content-layout'
import { Input } from '@/components/input'
import Pagination from '@/components/pagination/Pagination'
import UserListView from './user-list'

const UsersView = () => {
  const { users, rowCount, loading } = useAppSelector(({ user }) => user)
  const dispatch = useAppDispatch()
  const { query, updateQuery } = useQuery({})
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
      <div className='mb-4 rounded-lg border border-gray-300 bg-white p-4'>
        <Input
          type='text'
          placeholder='Search user by name/email/phone/id'
          value={query.search}
          onChange={e => updateQuery({ search: e.target.value })}
        />
      </div>
      <UserListView users={users} getData={handle.getAllUsers} loading={loading} />
      <Pagination
        currentPage={query.offset}
        totalPages={Math.ceil(rowCount / query.limit)}
        itemsPerPage={query.limit}
        totalItems={rowCount}
        onPageChange={page => updateQuery({ offset: page })}
        hasNextPage={query.offset < Math.ceil(rowCount / query.limit)}
        hasPreviousPage={query.offset > 1}
      />
    </ContentLayout>
  )
}

export default UsersView
