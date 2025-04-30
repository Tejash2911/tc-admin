import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { addProduct, updateProduct } from '@/redux/slices/productSlice'
import { AddProductI } from '@/types/api-payload-types'
import ImageUpload from '../image-upload'
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
    <Modal open={open}>
      <form onSubmit={handle.onSubmit} className='flex flex-col gap-4 text-xs sm:text-sm w-full max-w-4xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Left Column */}
          <div className='flex flex-col gap-2'>
            {/* Title */}
            <label className='font-semibold' htmlFor='title'>
              Title:
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handle.onChange}
              placeholder='Product title'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
              required
            />

            {/* Product No */}
            <label className='font-semibold' htmlFor='productNo'>
              Product No:
            </label>
            <input
              type='text'
              id='productNo'
              name='productNo'
              value={formData.productNo}
              onChange={handle.onChange}
              placeholder='Product number'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
              required
            />

            {/* Description */}
            <label className='font-semibold' htmlFor='desc'>
              Description:
            </label>
            <textarea
              id='desc'
              name='desc'
              value={formData.desc}
              onChange={handle.onChange}
              rows={5}
              cols={50}
              placeholder='Product description'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
              required
            />

            {/* Categories */}
            <label className='font-semibold' htmlFor='categories'>
              Categories (comma separated):
            </label>
            <input
              type='text'
              id='categories'
              name='categories'
              value={formData.categories.join(', ')}
              onChange={handle.onChange}
              placeholder='e.g. clothing, accessories'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
              required
            />

            {/* Sizes */}
            <label className='font-semibold' htmlFor='size'>
              Sizes (comma separated):
            </label>
            <input
              type='text'
              id='size'
              name='size'
              value={formData.size.join(', ')}
              onChange={handle.onChange}
              placeholder='e.g. S, M, L, XL'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
            />
          </div>

          {/* Right Column */}
          <div className='flex flex-col gap-2'>
            {/* Colors */}
            <label className='font-semibold' htmlFor='color'>
              Colors (comma separated):
            </label>
            <input
              type='text'
              id='color'
              name='color'
              value={formData.color.join(', ')}
              onChange={handle.onChange}
              placeholder='e.g. red, blue, green'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
            />

            {/* Price */}
            <label className='font-semibold' htmlFor='price'>
              Price:
            </label>
            <input
              type='number'
              id='price'
              name='price'
              value={formData.price}
              onChange={handle.onChange}
              placeholder='Price'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
              required
            />

            {/* Quantity */}
            <label className='font-semibold' htmlFor='quantity'>
              Quantity:
            </label>
            <input
              type='number'
              id='quantity'
              name='quantity'
              value={formData.quantity}
              onChange={handle.onChange}
              placeholder='Quantity'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
              required
            />

            {/* Brand */}
            <label className='font-semibold' htmlFor='brand'>
              Brand:
            </label>
            <input
              type='text'
              id='brand'
              name='brand'
              value={formData.brand}
              onChange={handle.onChange}
              placeholder='Brand name'
              className='w-full rounded-xl border border-[#ccc] p-2 focus:border-[#555]'
              required
            />

            {/* Image Upload */}
            <label className='font-semibold'>Product Image:</label>
            <ImageUpload value={formData.img} onChange={base64 => setFormData(prev => ({ ...prev, img: base64 }))} />
          </div>
        </div>

        {/* Buttons */}
        <div className='flex gap-3 justify-end mt-6'>
          <button type='submit' className='rounded-xl border-none bg-black px-5 py-2 text-white hover:bg-[#777]'>
            {data.isEdit ? 'Update Product' : 'Add Product'}
          </button>
          <button
            type='button'
            onClick={handle.handleClose}
            className='rounded-xl border-none bg-gray-700 px-5 py-2 text-white hover:bg-gray-600'
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ProductDialog
