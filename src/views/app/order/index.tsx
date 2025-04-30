'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { getAllOrders } from '@/redux/slices/orderSlice'
import { MdAdd } from 'react-icons/md'
import OrderListView from './order-list'

interface QueryI {
  search: string
  sort: any
  status: string
  offset: number
}

const OrderView = () => {
  const { orders, rowCount } = useAppSelector(({ order }) => order)
  const dispatch = useAppDispatch()

  const [query, setQuery] = useState<QueryI>({
    search: '',
    sort: '',
    status: '',
    offset: 1
  })

  useEffect(() => {
    handle.getAllOrders()
  }, [query.offset])

  const handle = {
    getAllOrders: () => {
      dispatch(getAllOrders({ offset: query.offset }))
        .unwrap()
        .then((res: any) => {
          dispatch(errorActions.setErrorMessage(res?.message))
        })
        .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
    },
    handleSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, { type }: { type: string }) => {
      setQuery(prev => ({ ...prev, [type]: e.target.value }))
    },
    onSearch: (e: React.FormEvent) => {
      e.preventDefault()
      dispatch(getAllOrders({ ...query }))
        .unwrap()
        .then((res: any) => {
          dispatch(errorActions.setErrorMessage(res?.message))
        })
        .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
    }
  }

  return (
    <div className='min-h-screen w-full flex flex-col items-center bg-gray-100 box-border'>
      <h1 className='text-xl font-semibold mt-6 mb-4'>Orders</h1>

      <div className='w-[1200px] max-w-[90%]'>
        <form
          onSubmit={handle.onSearch}
          className='flex flex-wrap md:flex-nowrap items-center gap-2 p-4 bg-white rounded-md box-border'
        >
          <input
            type='number'
            placeholder='Search by customer number'
            onChange={e => handle.handleSearch(e, { type: 'search' })}
            className='flex-2 p-3 outline-none bg-gray-100 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 w-full md:w-auto'
          />
          <select
            onChange={e => handle.handleSearch(e, { type: 'status' })}
            className='flex-1 p-3 bg-gray-100 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 w-full md:w-auto'
          >
            <option hidden>Status</option>
            <option value='pending'>Pending</option>
            <option value='processing'>Processing</option>
            <option value='delivered'>Delivered</option>
            <option value=''>All</option>
          </select>
          <select
            onChange={e => handle.handleSearch(e, { type: 'sort' })}
            className='flex-1 p-3 bg-gray-100 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 w-full md:w-auto'
          >
            <option hidden>Sort</option>
            <option value='price-asc'>Price Low to High</option>
            <option value='price-desc'>Price High to Low</option>
            <option value='newest'>New Orders</option>
            <option value='oldest'>Old Orders (default)</option>
          </select>
          <button
            type='submit'
            className='flex-1 flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold p-3 rounded-md w-full md:w-auto'
          >
            <MdAdd />
            Search
          </button>
        </form>

        <OrderListView orders={orders} getData={handle.getAllOrders} />

        <div className='w-full flex items-center justify-between'>
          <p
            onClick={() => query.offset > 1 && setQuery(prev => ({ ...prev, offset: prev.offset - 1 }))}
            className={`mt-4 w-max mx-3 ${
              query.offset > 1
                ? 'text-gray-700 hover:text-teal-600 hover:underline cursor-pointer'
                : 'text-gray-400 pointer-events-none'
            }`}
          >
            Previous
          </p>
          <p
            onClick={() => orders.length > 0 && setQuery(prev => ({ ...prev, offset: prev.offset + 1 }))}
            className={`mt-4 w-max mx-3 ${
              query.offset < Math.ceil(rowCount / 10)
                ? 'text-gray-700 hover:text-teal-600 hover:underline cursor-pointer'
                : 'text-gray-400 pointer-events-none'
            }`}
          >
            Next
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrderView
