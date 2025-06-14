'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getAllReviewByProductId } from '@/redux/slices/reviewSlice'

interface ReviewProps {
  productId: string
}

const ReviewComponent = ({ productId }: ReviewProps) => {
  const dispatch = useAppDispatch()
  const { reviews } = useAppSelector(state => state.review)

  useEffect(() => {
    if (productId) {
      dispatch(getAllReviewByProductId(productId))
    }
  }, [productId])

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Product Reviews</h2>
        <div className='flex items-center text-sm text-gray-500'>{reviews.length} reviews</div>
      </div>

      {/* Reviews List */}
      <div className='space-y-4'>
        {reviews.map((review: any) => (
          <div key={review._id} className='p-3 text-gray-700 bg-gray-50 rounded-lg border border-gray-300'>
            <div className='flex items-start justify-between'>
              <div>
                <div className='flex items-center gap-3 mb-2'>
                  <h3 className='font-semibold text-gray-900'>
                    {review.user?.firstName + ' ' + review.user?.lastName || 'Anonymous'}
                  </h3>
                  <div className='flex items-center text-sm text-gray-500'>
                    <div className='flex items-center gap-1'>
                      {[1, 2, 3, 4, 5].map(star => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className='text-gray-600 leading-relaxed'>{review.review}</p>
              </div>
              <div className='flex flex-col items-end text-sm text-gray-500'>
                <span className='text-xs text-gray-400'>{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewComponent
