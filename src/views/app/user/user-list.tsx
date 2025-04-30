import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { deleteUser } from '@/redux/slices/userSlice'
import { MdContentCopy, MdDelete, MdRemoveRedEye } from 'react-icons/md'
import { GetUsersI } from '@/types/api-payload-types'
import useModal from '@/hooks/use-modal'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'

interface IProps {
  users: GetUsersI[]
  getData: () => void
}

const UserListView = ({ users, getData }: IProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const isDelete = useModal()

  const handle = {
    confirmDelete: () => {
      const { selectedRow } = isDelete
      dispatch(deleteUser(selectedRow.id))
        .unwrap()
        .then(res => {
          dispatch(errorActions.setErrorMessage(res?.message))
          isDelete.onClose()
          getData()
        })
        .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
    }
  }

  return (
    <>
      <div className='mt-5 overflow-auto border border-gray-300 rounded-lg'>
        <table className='w-full min-w-[1000px] border-collapse'>
          <thead className='bg-teal-700 text-white'>
            <tr>
              <td className='p-3'>Id</td>
              <td className='p-3'>Joining Date</td>
              <td className='p-3'>Image</td>
              <td className='p-3'>Name</td>
              <td className='p-3'>Email</td>
              <td className='p-3'>Purchased</td>
              <td className='p-3'>isAdmin</td>
              <td className='p-3'>Actions</td>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {users?.map(u => (
              <tr key={u._id} className='border-b border-gray-300'>
                <td className='p-3'>
                  <div className='flex items-center gap-2'>
                    <MdContentCopy
                      onClick={() => navigator.clipboard.writeText(u?._id)}
                      className='text-gray-400 hover:text-gray-600 cursor-pointer'
                    />
                  </div>
                </td>
                <td className='p-3'>{new Date(u.createdAt).toDateString()}</td>
                <td className='p-3'>
                  <Image
                    src={u.avatar}
                    height={100}
                    width={100}
                    className='w-8 h-8 rounded-full object-center'
                    alt='avatar'
                  />
                </td>
                <td className='p-3'>{`${u.firstName} ${u.lastName}`}</td>
                <td className='p-3'>{u.email}</td>
                <td className='p-3'>{u?.purchasedProducts?.length}</td>
                <td className='p-3'>
                  <div className={u.isAdmin ? 'text-green-600' : 'text-red-600'}>{JSON.stringify(u.isAdmin)}</div>
                </td>
                <td className='p-3'>
                  <div className='flex items-center gap-2'>
                    <MdRemoveRedEye
                      onClick={() => router.push(`/user/${u._id}`)}
                      className='text-gray-400 hover:text-gray-600 cursor-pointer'
                    />
                    <MdDelete
                      onClick={() => {
                        isDelete.onOpen({ id: u._id })
                      }}
                      className='text-gray-400 hover:text-gray-600 cursor-pointer'
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDelete.isOpen && (
        <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
      )}
    </>
  )
}

export default UserListView
