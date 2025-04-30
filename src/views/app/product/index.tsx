'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getAllProducts } from '@/redux/slices/productSlice'
import { MdAdd } from 'react-icons/md'
import useDebounce from '@/hooks/use-debounce'
import useModal from '@/hooks/use-modal'
import ProductDialog from '@/components/dialogs/productDialog'
import ProductListView from './product-list'

interface QueryI {
  search: string
  category: any
  sort: string
  offset: number
}

const ProductView = () => {
  const { products, rowCount } = useAppSelector(({ product }) => product)
  const dispatch = useAppDispatch()

  const productDialog = useModal()

  const [query, setQuery] = useState<QueryI>({
    search: '',
    category: '',
    sort: '',
    offset: 1
  })

  const debouncedSearch = useDebounce(query.search, 500)

  useEffect(() => {
    handle.getAllProducts()
  }, [debouncedSearch, query.sort, query.category, query.offset])

  const handle = {
    getAllProducts: () => {
      dispatch(
        getAllProducts({ search: query.search, sort: query.sort, category: query.category, offset: query.offset })
      )
    },
    handleSearch: async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, { type }: { type: string }) => {
      if (type === 'cat') setQuery((p: any) => ({ ...p, category: e.target.value }))
      if (type === 'sort') setQuery((p: any) => ({ ...p, sort: e.target.value }))
      if (type === 'search') setQuery((p: any) => ({ ...p, search: e.target.value }))
    }
  }

  return (
    <>
      <div className='w-full min-h-dvh flex flex-col items-center bg-gray-100 box-border'>
        <h1 className='text-xl font-semibold mt-6'>Products</h1>

        <div className='w-full max-w-6xl'>
          {/* Filter Section */}
          <div className='flex flex-wrap md:flex-nowrap gap-2 bg-white p-4 rounded-lg mt-6'>
            <input
              type='text'
              placeholder='Search by product name'
              onChange={e => handle.handleSearch(e, { type: 'search' })}
              className='flex-2 p-3 bg-gray-100 rounded-lg w-full md:flex-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700'
            />

            <select
              onChange={e => handle.handleSearch(e, { type: 'cat' })}
              className='flex-1 p-3 bg-gray-100 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 w-full md:flex-1'
            >
              <option value='' defaultValue=''>
                Category
              </option>
              <option value='home'>home</option>
              <option value='Electronics'>electronic</option>
              <option value='footwear'>footware</option>
              <option value='clothing'>clothing</option>
              <option value='eyewears'>eyewear</option>
            </select>

            <select
              onChange={e => handle.handleSearch(e, { type: 'sort' })}
              className='flex-1 p-3 bg-gray-100 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700 w-full md:flex-1'
            >
              <option value='' defaultValue=''>
                Price sort
              </option>
              <option value='price-asc'>Low to High</option>
              <option value='price-desc'>High to Low</option>
            </select>

            <button
              onClick={() => productDialog.onOpen({ isEdit: false })}
              className='flex-1 p-3 bg-teal-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-teal-800 transition-all w-full md:flex-1'
            >
              <MdAdd /> Add Product
            </button>
          </div>

          {/* Product List */}
          <ProductListView products={products} getData={handle.getAllProducts} />
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
              onClick={() => products.length > 0 && setQuery(prev => ({ ...prev, offset: prev.offset + 1 }))}
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
      {productDialog.isOpen && (
        <ProductDialog
          open={productDialog.isOpen}
          setOpen={productDialog.onClose}
          data={productDialog.selectedRow}
          getData={handle.getAllProducts}
        />
      )}
    </>
  )
}

export default ProductView
