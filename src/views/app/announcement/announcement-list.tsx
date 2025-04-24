'use client'

import { useAppDispatch } from '@/redux/redux-hooks'
import { deleteAnnouncement } from '@/redux/slices/announcementSlice'
import { errorActions } from '@/redux/slices/errorSlice'
import { MdDelete, MdEdit } from 'react-icons/md'
import { GetAnnouncementsI } from '@/types/api-payload-types'
import useModal from '@/hooks/use-modal'
import AnnouncementDialog from '@/components/dialogs/announcementDialog'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'

interface IProps {
  announcements: GetAnnouncementsI[]
  getData: () => void
}

function AnnoucementListView({ announcements, getData }: IProps) {
  const dispatch = useAppDispatch()

  const announcementDialog = useModal()
  const isDelete = useModal()

  const handle = {
    confirmDelete: () => {
      const { selectedRow } = isDelete
      dispatch(deleteAnnouncement(selectedRow.id))
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
      {announcements && (
        <div className='mt-4 overflow-auto rounded-lg'>
          <table className='w-full border-collapse text-sm'>
            <thead className='bg-teal-600 text-white text-left'>
              <tr>
                <th className='p-3'>Title</th>
                <th className='p-3'>Status</th>
                <th className='p-3'>Date Added</th>
                <th className='p-3'>Last Updated</th>
                <th className='p-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map(a => (
                <tr key={a._id} className='border border-gray-200'>
                  <td className='p-3'>{a.title}</td>
                  <td className='p-3'>
                    <p
                      className={`text-center font-medium rounded-full p-1 border text-sm ${
                        a.active
                          ? 'bg-lime-100 text-lime-600 border-lime-600'
                          : 'bg-red-100 text-red-500 border-red-500'
                      }`}
                    >
                      {a.active ? 'Activated' : 'Deactivated'}
                    </p>
                  </td>
                  <td className='p-3'>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td className='p-3'>{new Date(a.updatedAt).toLocaleDateString()}</td>
                  <td className='p-3 flex gap-2 items-center'>
                    <MdEdit
                      className='text-gray-400 hover:text-gray-600 text-xl cursor-pointer'
                      onClick={() => announcementDialog.onOpen({ ...a, isEdit: true })}
                    />
                    <MdDelete
                      className='text-gray-400 hover:text-gray-600 text-xl cursor-pointer'
                      onClick={() => isDelete.onOpen({ id: a._id })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {announcementDialog.isOpen && (
        <AnnouncementDialog
          open={announcementDialog.isOpen}
          setOpen={announcementDialog.onClose}
          data={announcementDialog.selectedRow}
          getData={getData}
        />
      )}
      {isDelete.isOpen && (
        <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
      )}
    </>
  )
}

export default AnnoucementListView
