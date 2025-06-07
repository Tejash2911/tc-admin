import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { addProduct, updateProduct } from '@/redux/slices/productSlice'
import { AddProductI } from '@/types/api-payload-types'
import { Button } from '../button'
import ImageUpload from '../image-upload'
import { Input, Textarea } from '../input'
import Modal from '../modal'

interface IProps {
  open: boolean
  setOpen: (open: boolean) => void
  data: any
  getData: () => void
}

const ProductDialog = ({ open, setOpen, data, getData }: IProps) => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState<AddProductI>({
    title: '',
    productNo: '',
    desc: '',
    img: '',
    categories: [],
    size: [],
    color: [],
    price: 0,
    quantity: 0,
    brand: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || '',
        productNo: data.productNo || '',
        desc: data.desc || '',
        img: data.img || '',
        categories: data.categories || [],
        size: data.size || [],
        color: data.color || [],
        price: data.price || 0,
        quantity: data.quantity || 0,
        brand: data.brand || ''
      })
    }
  }, [data])

  const handle = {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target

      // Handle array fields
      if (['categories', 'size', 'color'].includes(name)) {
        setFormData(prev => ({
          ...prev,
          [name]: value.split(',').map(item => item.trim())
        }))
      } else if (['price', 'quantity'].includes(name)) {
        setFormData(prev => ({
          ...prev,
          [name]: Number(value)
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }
    },
    onSubmit: async (e: React.FormEvent) => {
      e.preventDefault()

      if (data.isEdit) {
        dispatch(updateProduct({ payload: formData, id: data._id }))
          .unwrap()
          .then(res => {
            dispatch(errorActions.setErrorMessage(res?.message))
            handle.handleClose()
            getData()
          })
          .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
      } else {
        dispatch(addProduct(formData))
          .unwrap()
          .then(res => {
            dispatch(errorActions.setErrorMessage(res?.message))
            handle.handleClose()
            getData()
          })
          .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
      }
    },
    handleClose: () => {
      setOpen(false)
    }
  }

  return (
    <Modal open={open} size='xl'>
      <form onSubmit={handle.onSubmit} className='flex flex-col gap-4 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Left Column */}
          <div className='flex flex-col gap-2'>
            <Input
              type='text'
              name='title'
              label='Title'
              value={formData.title}
              onChange={handle.onChange}
              placeholder='Product title'
              required
            />
            <Input
              type='text'
              name='productNo'
              label='Product No'
              value={formData.productNo}
              onChange={handle.onChange}
              placeholder='Product number'
              required
            />
            <Textarea
              name='desc'
              label='Description'
              value={formData.desc}
              onChange={handle.onChange}
              rows={8}
              placeholder='Product description'
              required
            />
            <Input
              type='text'
              name='categories'
              label='Categories (comma separated)'
              value={formData.categories.join(', ')}
              onChange={handle.onChange}
              placeholder='e.g. clothing, accessories'
              required
            />
            <Input
              type='text'
              name='size'
              label='Sizes (comma separated)'
              value={formData.size.join(', ')}
              onChange={handle.onChange}
              placeholder='e.g. S, M, L, XL'
            />
          </div>
          {/* Right Column */}
          <div className='flex flex-col gap-2'>
            <Input
              type='text'
              name='color'
              label='Colors (comma separated)'
              value={formData.color.join(', ')}
              onChange={handle.onChange}
              placeholder='e.g. red, blue, green'
            />
            <Input
              type='number'
              name='price'
              label='Price'
              value={formData.price}
              onChange={handle.onChange}
              placeholder='Price'
              required
            />
            <Input
              type='number'
              name='quantity'
              label='Quantity'
              value={formData.quantity}
              onChange={handle.onChange}
              placeholder='Quantity'
              required
            />
            <Input
              type='text'
              name='brand'
              label='Brand'
              value={formData.brand}
              onChange={handle.onChange}
              placeholder='Brand name'
              required
            />
            <div className='flex flex-col gap-2'>
              <label className='font-semibold'>Product Image</label>
              <div className='w-full rounded-lg border border-[#ccc] bg-gray-100 p-2 focus:border-[#555]'>
                <ImageUpload
                  value={formData.img}
                  onChange={base64 => setFormData(prev => ({ ...prev, img: base64 }))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-3 justify-end mt-2'>
          <Button type='submit' icon={data.isEdit ? 'save' : 'add'} variant='primary'>
            {data.isEdit ? 'Save' : 'Add'}
          </Button>
          <Button type='button' onClick={handle.handleClose} variant='outline'>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default ProductDialog
