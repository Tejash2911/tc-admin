import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getAllReviewByProductId } from '@/redux/slices/reviewSlice'

interface IProps {
  productId: string
}

const ReviewComponent = ({ productId }: IProps) => {
  const dispatch = useAppDispatch()
  const { reviews } = useAppSelector(({ review }) => review)

  useEffect(() => {
    if (productId) {
      dispatch(getAllReviewByProductId(productId))
    }
  }, [productId])

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between text-sm'>
        <h3 className='font-semibold'>Product Reviews</h3>
        <div className='text-gray-500'>{reviews.length} reviews</div>
      </div>

      {/* Reviews List */}
      <div className='space-y-4'>
        {reviews.length > 0 ? (
          reviews.map((review: any) => (
            <div key={review._id} className='rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-700'>
              <div className='flex items-start justify-between'>
                <div>
                  <div className='mb-2 flex items-center gap-3'>
                    <h3 className='text-xs font-semibold text-gray-900'>
                      {review.user?.firstName + ' ' + review.user?.lastName || 'Anonymous'}
                    </h3>
                    <div className='flex items-center text-gray-500'>
                      <div className='flex items-center'>
                        {[1, 2, 3, 4, 5].map(star => (
                          <svg
                            key={star}
                            className={`h-3 w-3 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill='currentColor'
                            viewBox='0 0 20 20'
                          >
                            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className='text-xs leading-relaxed text-gray-600'>{review.review}</p>
                </div>
                <div className='flex flex-col items-end text-xs text-gray-500'>
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='rounded-lg border border-gray-300 bg-gray-50 p-3 text-center text-sm text-gray-600'>
            No reviews available yet.
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewComponent
