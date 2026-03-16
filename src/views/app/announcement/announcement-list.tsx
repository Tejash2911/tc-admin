import type { GetAnnouncementsI } from '@/types/api-payload-types'
import type { ColumnI } from '@/types/table-props'
import useModal from '@/hooks/use-modal'
import { useDeleteAnnouncement } from '@/hooks/useAnnouncementQuery'
import AnnouncementDialog from '@/components/dialogs/announcementDialog'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'
import { Table } from '@/components/table'

interface IProps {
  announcements?: GetAnnouncementsI[]
  loading?: boolean
}

const AnnouncementListView = ({ announcements, loading = false }: IProps) => {
  const { mutate: deleteAnnouncement } = useDeleteAnnouncement()
  const announcementDialog = useModal()
  const isDelete = useModal()

  const handle = {
    confirmDelete: () => {
      const { selectedRow } = isDelete
      deleteAnnouncement(selectedRow.id, {
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
      key: 'title',
      label: 'Title',
      type: 'text'
    },
    {
      key: 'active',
      label: 'Status',
      type: 'status'
    },
    {
      key: 'createdAt',
      label: 'Date Added',
      type: 'date'
    },
    {
      key: 'updatedAt',
      label: 'Last Updated',
      type: 'date'
    },
    {
      key: 'actions',
      label: 'Actions',
      type: 'action'
    }
  ]

  return (
    <>
      {announcements && (
        <Table
          data={announcements}
          columns={columns}
          onEdit={item => announcementDialog.onOpen({ ...item, isEdit: true })}
          onDelete={item => isDelete.onOpen({ id: item._id })}
          loading={loading}
        />
      )}
      <AnnouncementDialog
        open={announcementDialog.isOpen}
        setOpen={announcementDialog.onClose}
        data={announcementDialog.selectedRow}
      />
      <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
    </>
  )
}

export default AnnouncementListView
