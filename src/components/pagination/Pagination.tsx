import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  hasNextPage: boolean
  hasPreviousPage: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  hasNextPage,
  hasPreviousPage
}) => {
  return (
    <div className='mt-2 flex w-full items-center justify-between text-sm'>
      <button
        onClick={() => hasPreviousPage && onPageChange(currentPage - 1)}
        className={`mx-1 w-max ${
          hasPreviousPage ? 'text-gray-700 hover:text-teal-600 hover:underline' : 'pointer-events-none text-gray-400'
        }`}
      >
        Previous
      </button>
      <div className='flex items-center gap-2 text-gray-600'>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <span>|</span>
        <span>{totalItems} items</span>
        <span>|</span>
        <span>{itemsPerPage} items per page</span>
      </div>
      <button
        onClick={() => hasNextPage && onPageChange(currentPage + 1)}
        className={`mx-1 w-max ${
          hasNextPage ? 'text-gray-700 hover:text-teal-600 hover:underline' : 'pointer-events-none text-gray-400'
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
