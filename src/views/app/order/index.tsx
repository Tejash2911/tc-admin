'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getAllOrders } from '@/redux/slices/orderSlice'
import { useQuery } from '@/hooks/useQuery'
import { Button } from '@/components/button'
import ContentLayout from '@/components/content-layout'
import { Input, Select } from '@/components/input'
import Pagination from '@/components/pagination/Pagination'
import OrderListView from './order-list'

const OrderView = () => {
  const { orders, rowCount, loading } = useAppSelector(({ order }) => order)
  const dispatch = useAppDispatch()
  const { query, updateQuery } = useQuery({})

  useEffect(() => {
    handle.getAllOrders()
  }, [query.offset, query.limit])

  const handle = {
    getAllOrders: () => {
      dispatch(getAllOrders(query))
    },
    handleSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, { type }: { type: string }) => {
      updateQuery({ [type]: e.target.value })
    },
    onSearch: (e: React.FormEvent) => {
      e.preventDefault()
      dispatch(getAllOrders(query))
    }
  }

  return (
    <ContentLayout title='Orders'>
      <form
        onSubmit={handle.onSearch}
        className='grid grid-cols-1 md:grid-cols-4 gap-2 bg-white p-4 rounded-lg border border-gray-300'
      >
        <Input
          type='number'
          placeholder='Search by customer number'
          onChange={e => handle.handleSearch(e, { type: 'search' })}
        />
        <Select
          onChange={e => handle.handleSearch(e, { type: 'status' })}
          options={[
            { label: 'All', value: '' },
            { label: 'Pending', value: 'pending' },
            { label: 'Processing', value: 'processing' },
            { label: 'Delivered', value: 'delivered' }
          ]}
        />
        <Select
          onChange={e => handle.handleSearch(e, { type: 'sort' })}
          options={[
            { label: 'Old Orders (default)', value: 'oldest' },
            { label: 'Price Low to High', value: 'price-asc' },
            { label: 'Price High to Low', value: 'price-desc' },
            { label: 'New Orders', value: 'newest' }
          ]}
        />
        <Button icon='search' type='submit'>
          Search
        </Button>
      </form>
      <OrderListView orders={orders} getData={handle.getAllOrders} loading={loading} />
      <Pagination
        currentPage={query.offset}
        totalPages={Math.ceil(rowCount / query.limit)}
        itemsPerPage={query.limit}
        totalItems={rowCount}
        onPageChange={page => updateQuery({ offset: page })}
        hasNextPage={query.offset < Math.ceil(rowCount / query.limit)}
        hasPreviousPage={query.offset > 1}
      />
    </ContentLayout>
  )
}

export default OrderView
