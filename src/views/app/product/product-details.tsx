'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getProductById, productActions } from '@/redux/slices/productSlice'
import ContentLayout from '@/components/content-layout'
import NotFound from '@/components/not-found'

interface IProps {
  id: string
}

const ProductDetails = ({ id }: IProps) => {
  const dispatch = useAppDispatch()
  const { product, productNotFound } = useAppSelector(state => state.product)

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id))
    }
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(productActions.resetProduct())
    }
  }, [])

  if (productNotFound) {
    return <NotFound message='Product Not Found' description='The product you are looking for does not exist.' />
  }

  return (
    <ContentLayout title='Product Details'>
      <div className='border border-gray-300 bg-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 mt-6'>
        {/* Image Section */}
        {product?.img && (
          <div className='flex justify-center items-center'>
            <Image
              src={product?.img}
              alt={product?.title}
              width={300}
              height={300}
              priority
              className='rounded-lg object-contain max-h-80'
            />
          </div>
        )}

        {/* Info Section */}
        <div className='space-y-6'>
          <h3 className='text-lg font-bold text-gray-900'>{product?.title}</h3>
          <p className='text-gray-600 text-base'>{product?.desc}</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-300'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Product No:</span>
              <span className='font-medium text-gray-900'>{product?.productNo}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Brand:</span>
              <span className='font-medium text-gray-900'>{product?.brand}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Category:</span>
              <span className='font-medium text-gray-900'>{product?.categories?.join(', ')}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Color:</span>
              <span className='font-medium text-gray-900'>{product?.color?.join(', ')}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Size:</span>
              <span className='font-medium text-gray-900'>{product?.size?.join(', ')}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Gender:</span>
              <span className='font-medium text-gray-900'>{product?.gender}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>In Inventory:</span>
              <span
                className={`px-2 py-1 rounded-full font-medium ${
                  product?.is_in_inventory ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {product?.is_in_inventory ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-300'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Price:</span>
              <span className='font-medium text-gray-900'>₹ {product?.price?.toFixed(2)}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Purchased:</span>
              <span className='font-medium text-gray-900'>{product?.purchasedCount} times</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Available Quantity:</span>
              <span className='font-medium text-gray-900'>{product?.quantity}</span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Ratings:</span>
              <span className='font-medium text-gray-900'>
                {product?.ratingsAverage} ⭐ ({product?.ratingsQuantity} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export default ProductDetails
