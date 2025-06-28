'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { disableAnnouncements, getAllAnnouncements } from '@/redux/slices/announcementSlice'
import { Icon } from '@iconify/react'
import useModal from '@/hooks/use-modal'
import { useQuery } from '@/hooks/useQuery'
import ContentLayout from '@/components/content-layout'
import AnnouncementDialog from '@/components/dialogs/announcementDialog'
import Pagination from '@/components/pagination/Pagination'
import AnnouncementListView from './announcement-list'

const AnnouncementView = () => {
  const { announcements, rowCount, loading } = useAppSelector(({ announcement }) => announcement)
  const dispatch = useAppDispatch()
  const announcementDialog = useModal()
  const { query, updateQuery } = useQuery({})

  useEffect(() => {
    handle.getAllAnnouncements()
  }, [query.offset, query.limit])

  const handle = {
    getAllAnnouncements: () => {
      dispatch(getAllAnnouncements(query))
    },
    disableAllAnnouncements: () => {
      dispatch(disableAnnouncements()).then(() => handle.getAllAnnouncements())
    }
  }

  return (
    <ContentLayout title='Announcements'>
      <div className='mb-4 flex items-center justify-between rounded-lg border border-gray-300 bg-white p-4 text-gray-700'>
        <div className='flex items-center justify-center gap-2'>
          <button
            className='flex items-center justify-center rounded-full border-2 border-teal-700 transition-transform hover:scale-110 hover:bg-teal-700 hover:text-white'
            onClick={() => announcementDialog.onOpen({ isEdit: false })}
          >
            <Icon icon='ri:add-line' />
          </button>
          Add Announcement
        </div>
        <div className='flex items-center justify-center gap-2'>
          <button
            className='flex items-center justify-center rounded-full border-2 border-teal-700 transition-transform hover:scale-110 hover:bg-teal-700 hover:text-white'
            onClick={handle.disableAllAnnouncements}
          >
            <Icon icon='ri:stop-line' />
          </button>
          Deactivate All Announcements
        </div>
      </div>
      <AnnouncementListView announcements={announcements} getData={handle.getAllAnnouncements} loading={loading} />
      <Pagination
        currentPage={query.offset}
        totalPages={Math.ceil(rowCount / query.limit)}
        itemsPerPage={query.limit}
        totalItems={rowCount}
        onPageChange={page => updateQuery({ offset: page })}
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
