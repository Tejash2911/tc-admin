'use client'

import { useQuery } from '@/hooks/useQuery'
import { useAllUsers } from '@/hooks/useUserQuery'
import ContentLayout from '@/components/content-layout'
import { Input } from '@/components/input'
import Pagination from '@/components/pagination'
import UserListView from './user-list'

const UsersView = () => {
  const { query, updateQuery } = useQuery({})

  const { data: usersData, isPending } = useAllUsers(query)
  const users = usersData?.users || []
  const rowCount = usersData?.rowCount || 0

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
      <UserListView users={users} loading={isPending} />
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
