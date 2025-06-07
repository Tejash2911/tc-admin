'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { disableAnnoucements, getAllAnnouncements } from '@/redux/slices/announcementSlice'
import { errorActions } from '@/redux/slices/errorSlice'
import { Icon } from '@iconify/react'
import useModal from '@/hooks/use-modal'
import ContentLayout from '@/components/content-layout'
import AnnouncementDialog from '@/components/dialogs/announcementDialog'
import Pagination from '@/components/pagination/Pagination'
import AnnoucementListView from './announcement-list'

interface QueryI {
  search: string
  offset: number
  limit: number
}

const AnnouncementView = () => {
  const { announcements, rowCount, loading } = useAppSelector(({ announcement }) => announcement)
  const dispatch = useAppDispatch()

  const announcementDialog = useModal()

  const [query, setQuery] = useState<QueryI>({
    search: '',
    offset: 1,
    limit: 10
  })

  useEffect(() => {
    handle.getAllAnnouncements()
  }, [query.offset, query.limit])

  const handle = {
    getAllAnnouncements: () => {
      dispatch(getAllAnnouncements(query))
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
    <ContentLayout title='Announcements'>
      <div className='flex justify-between items-center bg-white p-4 rounded-lg text-gray-700 mb-4 border border-gray-300'>
        <div className='flex items-center justify-center gap-2'>
          <button
            className='border-2 border-teal-700 rounded-full flex justify-center items-center transition-transform hover:scale-110 hover:bg-teal-700 hover:text-white'
            onClick={() => announcementDialog.onOpen({ isEdit: false })}
          >
            <Icon icon='ri:add-line' />
          </button>
          Add Announcement
        </div>
        <div className='flex items-center justify-center gap-2'>
          <button
            className='border-2 border-teal-700 rounded-full flex justify-center items-center transition-transform hover:scale-110 hover:bg-teal-700 hover:text-white'
            onClick={handle.disableAllAnnouncements}
          >
            <Icon icon='ri:stop-line' />
          </button>
          Deactivate All Announcements
        </div>
      </div>
      <AnnoucementListView announcements={announcements} getData={handle.getAllAnnouncements} loading={loading} />
      <Pagination
        currentPage={query.offset}
        totalPages={Math.ceil(rowCount / query.limit)}
        itemsPerPage={query.limit}
        totalItems={rowCount}
        onPageChange={page => setQuery(prev => ({ ...prev, offset: page }))}
        hasNextPage={query.offset < Math.ceil(rowCount / query.limit)}
        hasPreviousPage={query.offset > 1}
      />
      {announcementDialog.isOpen && (
        <AnnouncementDialog
          open={announcementDialog.isOpen}
          setOpen={announcementDialog.onClose}
          data={announcementDialog.selectedRow}
          getData={handle.getAllAnnouncements}
        />
      )}
    </ContentLayout>
  )
}

export default AnnouncementView
