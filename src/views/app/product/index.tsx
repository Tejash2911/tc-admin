'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getAllProducts } from '@/redux/slices/productSlice'
import useDebounce from '@/hooks/use-debounce'
import useModal from '@/hooks/use-modal'
import { useQuery } from '@/hooks/useQuery'
import { Button } from '@/components/button'
import ContentLayout from '@/components/content-layout'
import ProductDialog from '@/components/dialogs/productDialog'
import { Input, Select } from '@/components/input'
import Pagination from '@/components/pagination/Pagination'
import ProductListView from './product-list'

const ProductView = () => {
  const { products, rowCount, loading } = useAppSelector(({ product }) => product)
  const dispatch = useAppDispatch()
  const productDialog = useModal()
  const { query, updateQuery } = useQuery({})
  const debouncedSearch = useDebounce(query.search, 1000)

  useEffect(() => {
    handle.getAllProducts()
  }, [debouncedSearch, query.sort, query.category, query.offset])

  const handle = {
    getAllProducts: () => {
      dispatch(getAllProducts(query))
    },
    handleSearch: async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, { type }: { type: string }) => {
      if (type === 'cat') updateQuery({ category: e.target.value })
      if (type === 'sort') updateQuery({ sort: e.target.value })
      if (type === 'search') updateQuery({ search: e.target.value })
    }
  }

  return (
    <ContentLayout title='Products'>
      <div className='grid grid-cols-1 gap-2 rounded-lg border border-gray-300 bg-white p-4 md:grid-cols-4'>
        <Input
          name='search'
          placeholder='Search by product name'
          onChange={e => handle.handleSearch(e, { type: 'search' })}
        />
        <Select
          name='category'
          onChange={e => handle.handleSearch(e, { type: 'cat' })}
          options={[
            { label: 'Category', value: '' },
            { label: 'Home', value: 'home' },
            { label: 'Electronics', value: 'Electronics' },
            { label: 'Footwear', value: 'footwear' },
            { label: 'Clothing', value: 'clothing' },
            { label: 'EyeWear', value: 'eyewears' }
          ]}
        />
        <Select
          name='sort'
          onChange={e => handle.handleSearch(e, { type: 'sort' })}
          options={[
            { label: 'Price sort', value: '' },
            { label: 'Low to High', value: 'price-asc' },
            { label: 'High to Low', value: 'price-desc' }
          ]}
        />
        <Button icon='add' onClick={() => productDialog.onOpen({ isEdit: false })}>
          Add Product
        </Button>
      </div>
      <ProductListView products={products} getData={handle.getAllProducts} loading={loading} />
      <Pagination
        currentPage={query.offset}
        totalPages={Math.ceil(rowCount / query.limit)}
        itemsPerPage={query.limit}
        totalItems={rowCount}
        onPageChange={page => updateQuery({ offset: page })}
        hasNextPage={query.offset < Math.ceil(rowCount / query.limit)}
        hasPreviousPage={query.offset > 1}
      />
      {productDialog.isOpen && (
        <ProductDialog
          open={productDialog.isOpen}
          setOpen={productDialog.onClose}
          data={productDialog.selectedRow}
          getData={handle.getAllProducts}
        />
      )}
    </ContentLayout>
  )
}

export default ProductView
