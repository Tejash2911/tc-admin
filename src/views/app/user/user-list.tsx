import { useRouter } from 'next/navigation'
import type { GetUsersI } from '@/types/api-payload-types'
import type { ColumnI } from '@/types/table-props'
import useModal from '@/hooks/use-modal'
import { useDeleteUser } from '@/hooks/useUserQuery'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'
import { Table } from '@/components/table'

interface IProps {
  users: GetUsersI[]
  loading?: boolean
}

const UserListView = ({ users, loading = false }: IProps) => {
  const { mutate: deleteUser } = useDeleteUser()
  const router = useRouter()

  const isDelete = useModal()

  const handle = {
    confirmDelete: () => {
      const { selectedRow } = isDelete
      deleteUser(selectedRow.id, {
        onSuccess: () => {
          isDelete.onClose()
        }
      })
    }
  }

  const columns: ColumnI[] = [
    {
      key: '_id',
      label: '#',
      type: 'copy'
    },
    {
      key: 'createdAt',
      label: 'Joining Date',
      type: 'date'
    },
    {
      key: 'avatar',
      label: 'Image',
      type: 'image'
    },
    {
      key: 'name',
      label: 'Name',
      type: 'text'
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text'
    },
    {
      key: 'purchasedProducts',
      label: 'Purchased',
      type: 'text'
    },
    {
      key: 'isAdmin',
      label: 'isAdmin',
      type: 'boolean'
    },
    {
      key: 'actions',
      label: 'Actions',
      type: 'action'
    }
  ]

  return (
    <>
      <Table
        data={users.map(u => ({
          ...u,
          name: `${u.firstName} ${u.lastName}`,
          purchasedProducts: u.purchasedProducts?.length || 0
        }))}
        columns={columns}
        onView={item => router.push(`/user/${item._id}`)}
        onDelete={item => isDelete.onOpen({ id: item._id })}
        loading={loading}
      />
      <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
    </>
  )
}

export default UserListView
