import { useEffect, useState } from 'react'
import type { AddAnnouncementI } from '@/types/api-payload-types'
import { useAddAnnouncement, useUpdateAnnouncement } from '@/hooks/useAnnouncementQuery'
import { Button } from '../button'
import { Select, Textarea } from '../input'
import Modal from '../modal'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: any
}

const AnnouncementDialog = ({ open, setOpen, data }: IProps) => {
  const { mutate: addAnnouncement } = useAddAnnouncement()
  const { mutate: updateAnnouncement } = useUpdateAnnouncement()

  const [formData, setFormData] = useState<AddAnnouncementI>({
    title: '',
    active: false
  })

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || '',
        active: data.active || false
      })
    }
  }, [data])

  const handle = {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      setFormData(prev => ({
        ...prev,
        [name]: name === 'active' ? value === 'true' : value
      }))
    },
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault()

      if (data.isEdit) {
        updateAnnouncement({ payload: formData, id: data._id })
        handle.handleClose()
      } else {
        addAnnouncement(formData)
        handle.handleClose()
      }
    },
    handleClose: () => {
      setOpen(false)
    }
  }

  return (
    <Modal open={open}>
      <form onSubmit={handle.onSubmit} className='flex flex-col gap-2'>
        <Textarea
          name='title'
          label='Title'
          value={formData.title}
          onChange={handle.onChange}
          rows={5}
          placeholder='Enter Announcement'
          required
        />
        <Select
          name='active'
          value={String(formData.active)}
          onChange={handle.onChange}
          label='Active'
          options={[
            { label: 'No', value: 'false' },
            { label: 'Yes', value: 'true' }
          ]}
        />
        <div className='mt-2 flex justify-end gap-3'>
          <Button type='submit' variant='primary'>
            Save
          </Button>
          <Button type='reset' onClick={handle.handleClose} variant='outline'>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default AnnouncementDialog
