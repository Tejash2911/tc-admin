'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getProductById, productActions } from '@/redux/slices/productSlice'
import ContentLayout from '@/components/content-layout'
import NotFound from '@/components/not-found'
import PageTitle from '@/components/page-title'

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
    <ContentLayout>
      <PageTitle title='Product Details' />
      <div className='w-full max-w-6xl bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        {/* Image Section */}
        {product?.img && (
          <div className='flex justify-center items-center'>
            <Image
              src={product?.img}
              alt={product?.title}
              width={300}
              height={300}
              className='rounded-xl object-contain max-h-80'
            />
          </div>
        )}

        {/* Info Section */}
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>{product?.title}</h3>
          <p className='text-gray-600'>{product?.desc}</p>

          <div className='grid grid-cols-2 gap-2 text-sm text-gray-700'>
            <div>
              <span className='font-medium'>Product No:</span> {product?.productNo}
            </div>
            <div>
              <span className='font-medium'>Brand:</span> {product?.brand}
            </div>
            <div>
              <span className='font-medium'>Category:</span> {product?.categories?.join(', ')}
            </div>
            <div>
              <span className='font-medium'>Color:</span> {product?.color?.join(', ')}
            </div>
            <div>
              <span className='font-medium'>Size:</span> {product?.size?.join(', ')}
            </div>
            <div>
              <span className='font-medium'>Gender:</span> {product?.gender}
            </div>
            <div>
              <span className='font-medium'>In Inventory:</span>{' '}
              <span className={product?.is_in_inventory ? 'text-green-600' : 'text-red-600'}>
                {product?.is_in_inventory ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className='border-t pt-4'>
            <p className='text-lg'>
              <span className='font-semibold'>Price:</span> ${product?.price?.toFixed(2)}
            </p>
            <p>
              <span className='font-semibold'>Available Quantity:</span> {product?.quantity}
            </p>
            <p>
              <span className='font-semibold'>Purchased:</span> {product?.purchasedCount} times
            </p>
            <p>
              <span className='font-semibold'>Ratings:</span> {product?.ratingsAverage} ⭐ ({product?.ratingsQuantity}{' '}
              reviews)
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

export default ProductDetails
