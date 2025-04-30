'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { disableAnnoucements, getAllAnnouncements } from '@/redux/slices/announcementSlice'
import { errorActions } from '@/redux/slices/errorSlice'
import { MdAdd, MdDelete } from 'react-icons/md'
import useModal from '@/hooks/use-modal'
import AnnouncementDialog from '@/components/dialogs/announcementDialog'
import AnnoucementListView from './announcement-list'

interface QueryI {
  search: string
  offset: number
}

const AnnouncementView = () => {
  const { announcements, rowCount } = useAppSelector(({ announcement }) => announcement)
  const dispatch = useAppDispatch()

  const announcementDialog = useModal()

  const [query, setQuery] = useState<QueryI>({
    search: '',
    offset: 1
  })

  useEffect(() => {
    handle.getAllAnnouncements()
  }, [query])

  const handle = {
    getAllAnnouncements: () => {
      dispatch(getAllAnnouncements({ ...query }))
    },
    disableAllAnnouncements: () => {
      dispatch(disableAnnoucements())
        .unwrap()
        .then(res => {
          dispatch(errorActions.setErrorMessage(res?.message))
          handle.getAllAnnouncements()
        })
        .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
    }
  }

  return (
    <div className='w-full min-h-screen flex justify-center bg-gray-100'>
      <div className='w-full max-w-6xl p-4'>
        <h1 className='text-2xl font-bold text-gray-700 mb-4 text-center'>Announcements</h1>

        <div className='bg-white p-4 rounded-lg shadow'>
          <div className='flex justify-between items-center text-gray-700 mb-4'>
            <div className='flex items-center gap-2 text-lg cursor-pointer'>
              <div
                className='border-2 border-teal-700 rounded-full w-10 h-10 flex justify-center items-center transition-transform hover:scale-110 hover:bg-teal-700 hover:text-white'
                onClick={() => announcementDialog.onOpen({ isEdit: false })}
              >
                <MdAdd />
              </div>
              Add Announcement
            </div>

            <div className='flex items-center gap-2 text-lg cursor-pointer' onClick={handle.disableAllAnnouncements}>
              <div className='border-2 border-teal-700 rounded-full w-10 h-10 flex justify-center items-center transition-transform hover:scale-110 hover:bg-teal-700 hover:text-white'>
                <MdDelete />
              </div>
              Deactivate All Announcements
            </div>
          </div>

          <AnnoucementListView announcements={announcements} getData={handle.getAllAnnouncements} />

          <div className='w-full flex items-center justify-between'>
            <p
              onClick={() => query.offset > 1 && setQuery(prev => ({ ...prev, offset: prev.offset - 1 }))}
              className={`mt-4 w-max mx-3 ${
                query.offset > 1
                  ? 'text-gray-700 hover:text-teal-600 hover:underline cursor-pointer'
                  : 'text-gray-400 pointer-events-none'
              }`}
            >
              Previous
            </p>
            <p
              onClick={() => announcements.length > 0 && setQuery(prev => ({ ...prev, offset: prev.offset + 1 }))}
              className={`mt-4 w-max mx-3 ${
                query.offset < Math.ceil(rowCount / 10)
                  ? 'text-gray-700 hover:text-teal-600 hover:underline cursor-pointer'
                  : 'text-gray-400 pointer-events-none'
              }`}
            >
              Next
            </p>
          </div>
        </div>
      </div>
      {announcementDialog.isOpen && (
        <AnnouncementDialog
          open={announcementDialog.isOpen}
          setOpen={announcementDialog.onClose}
          data={announcementDialog.selectedRow}
          getData={handle.getAllAnnouncements}
        />
      )}
    </div>
  )
}

export default AnnouncementView
