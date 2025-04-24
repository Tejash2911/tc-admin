import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/redux-hooks'
import { addAnnouncement, updateAnnouncement } from '@/redux/slices/announcementSlice'
import { errorActions } from '@/redux/slices/errorSlice'
import { AddAnnouncementI } from '@/types/api-payload-types'
import Modal from '../modal'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: any
  getData: () => void
}

export default function AnnouncementDialog({ open, setOpen, data, getData }: IProps) {
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
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target

      setFormData(prev => ({
        ...prev,
        [name]: name === 'active' ? value === 'true' : value
      }))
    },
    onSubmit: async (e: React.FormEvent) => {
      e.preventDefault()

      if (data.isEdit) {
        dispatch(updateAnnouncement({ payload: formData, id: data._id }))
          .unwrap()
          .then(res => {
            errorActions.setErrorMessage(res?.message)
            handle.handleClose()
            getData()
          })
          .catch(err => errorActions.setErrorMessage(err?.message))
      } else {
        dispatch(addAnnouncement(formData))
          .unwrap()
          .then(res => {
            errorActions.setErrorMessage(res?.message)
            handle.handleClose()
            getData()
          })
          .then(handle.handleClose)
          .catch(err => errorActions.setErrorMessage(err?.message))
      }
    },
    handleClose: () => {
      setOpen(false)
    }
  }

  return (
    <Modal open={open}>
      <form onSubmit={handle.onSubmit} className='flex flex-col gap-2 font-Urbanist text-xs sm:text-sm'>
        <label htmlFor='title' className='block font-semibold'>
          Title:
        </label>
        <input
          type='text'
          name='title'
          id='title'
          placeholder='Enter Announcement'
          value={formData.title}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
          required
        />
        <label htmlFor='active' className='block font-semibold'>
          Active:
        </label>
        <select
          name='active'
          value={String(formData.active)}
          onChange={handle.onChange}
          className='w-full rounded-xl border border-gray-300 p-2 focus:border-gray-500 focus:outline-none'
        >
          <option value='false'>No</option>
          <option value='true'>Yes</option>
        </select>
        <div className='flex gap-3'>
          <button type='submit' className='rounded-xl border-none bg-black px-5 py-2 text-white hover:bg-[#777]'>
            Submit
          </button>
          <button
            type='reset'
            onClick={handle.handleClose}
            className='rounded-xl border-none bg-black px-5 py-2 text-white hover:bg-[#777]'
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
