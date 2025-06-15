import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/redux-hooks'
import { deleteUser } from '@/redux/slices/userSlice'
import { GetUsersI } from '@/types/api-payload-types'
import { ColumnI } from '@/types/table-props'
import useModal from '@/hooks/use-modal'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'
import { Table } from '@/components/table'

interface IProps {
  users: GetUsersI[]
  getData: () => void
  loading?: boolean
}

const UserListView = ({ users, getData, loading = false }: IProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const isDelete = useModal()

  const handle = {
    confirmDelete: () => {
      const { selectedRow } = isDelete
      dispatch(deleteUser(selectedRow.id)).then(() => {
        isDelete.onClose()
        getData()
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
      {isDelete.isOpen && (
        <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
      )}
    </>
  )
}

export default UserListView
