import Modal from '../modal'

interface IProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
  title?: string
  description?: string
}

export default function ConfirmDeleteDialog({
  open,
  onClose,
  onDelete,
  title = 'Confirm Deletion',
  description = 'Are you sure you want to delete this item? This action cannot be undone.'
}: IProps) {
  return (
    <Modal open={open}>
      <div className='flex flex-col gap-4 font-Urbanist text-sm sm:text-base'>
        <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
        <p className='text-gray-600'>{description}</p>

        <div className='flex justify-end gap-3 pt-2'>
          <button onClick={onDelete} className='rounded-xl bg-red-600 px-6 py-2 text-white hover:bg-red-700 transition'>
            Delete
          </button>
          <button
            onClick={onClose}
            className='rounded-xl bg-gray-300 px-6 py-2 text-black hover:bg-gray-400 transition'
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}
