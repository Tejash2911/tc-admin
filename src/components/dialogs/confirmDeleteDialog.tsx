import { Button } from '../button'
import Modal from '../modal'

interface IProps {
  open: boolean
  onClose: () => void
  onDelete: () => void
  title?: string
  description?: string
}

const ConfirmDeleteDialog = ({
  open,
  onClose,
  onDelete,
  title = 'Confirm Deletion',
  description = 'Are you sure you want to delete this item? This action cannot be undone.'
}: IProps) => {
  return (
    <Modal open={open}>
      <div className='flex flex-col gap-2'>
        <h2 className='text-lg font-semibold'>{title}</h2>
        <p className='text-gray-600'>{description}</p>

        <div className='flex gap-2 justify-end mt-2'>
          <Button onClick={onDelete} variant='delete'>
            Delete
          </Button>
          <Button onClick={onClose} variant='secondary'>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmDeleteDialog
