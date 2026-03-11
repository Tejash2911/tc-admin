'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { disableAnnouncements, getAllAnnouncements } from '@/redux/slices/announcementSlice'
import { Icon } from '@iconify/react'
import useModal from '@/hooks/use-modal'
import { useQuery } from '@/hooks/useQuery'
import { Button } from '@/components/button'
import ContentLayout from '@/components/content-layout'
import AnnouncementDialog from '@/components/dialogs/announcementDialog'
import { Input } from '@/components/input'
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
        {/* Search Section - Left Side */}
        <div className='flex-1'>
          <form
            onSubmit={e => {
              e.preventDefault()
              handle.getAllAnnouncements()
            }}
            className='flex w-full max-w-md'
          >
            <div className='relative flex-1'>
              <Input
                type='text'
                placeholder='Search announcements...'
                className='w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:border-teal-500 focus:outline-none'
                value={query.search}
                onChange={e => updateQuery({ search: e.target.value })}
              />
              <Button type='submit' className='absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0' variant='outline'>
                <Icon icon='ri:search-line' className='h-4 w-4' />
              </Button>
            </div>
          </form>
        </div>

        {/* Action Buttons - Right Side */}
        <div className='flex flex-col gap-2 sm:flex-row'>
          <Button onClick={() => announcementDialog.onOpen({ isEdit: false })} variant='primary'>
            Add Announcement
          </Button>
          <Button onClick={handle.disableAllAnnouncements} variant='outline'>
            Deactivate All
          </Button>
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
