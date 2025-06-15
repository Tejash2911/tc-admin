import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/redux-hooks'
import { addAnnouncement, updateAnnouncement } from '@/redux/slices/announcementSlice'
import type { AddAnnouncementI } from '@/types/api-payload-types'
import { Button } from '../button'
import { Select, Textarea } from '../input'
import Modal from '../modal'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: any
  getData: () => void
}

const AnnouncementDialog = ({ open, setOpen, data, getData }: IProps) => {
  const dispatch = useAppDispatch()

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
    onSubmit: async (e: React.FormEvent) => {
      e.preventDefault()

      if (data.isEdit) {
        dispatch(updateAnnouncement({ payload: formData, id: data._id })).then(() => {
          handle.handleClose()
          getData()
        })
      } else {
        dispatch(addAnnouncement(formData)).then(() => {
          handle.handleClose()
          getData()
        })
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
        <div className='flex gap-3 justify-end mt-2'>
          <Button type='submit' icon={data.isEdit ? 'save' : 'add'} variant='primary'>
            {data.isEdit ? 'Save' : 'Add'}
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
