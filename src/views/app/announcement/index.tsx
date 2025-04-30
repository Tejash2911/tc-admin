'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { disableAnnoucements, getAllAnnouncements } from '@/redux/slices/announcementSlice'
import { errorActions } from '@/redux/slices/errorSlice'
import { MdAdd, MdDelete } from 'react-icons/md'
import useModal from '@/hooks/use-modal'
import AnnouncementDialog from '@/components/dialogs/announcementDialog'
import AnnoucementListView from './announcement-list'

const AnnouncementView = () => {
  const { announcements } = useAppSelector(({ announcement }) => announcement)
  const dispatch = useAppDispatch()

  const announcementDialog = useModal()

  useEffect(() => {
    handle.getAllAnnouncements()
  }, [])

  const handle = {
    getAllAnnouncements: () => {
      dispatch(getAllAnnouncements({}))
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

          <AnnoucementListView announcements={announcements.data} getData={handle.getAllAnnouncements} />
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
