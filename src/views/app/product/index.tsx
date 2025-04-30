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
}

const ProductView = () => {
  const { products } = useAppSelector(({ product }) => product)
  const dispatch = useAppDispatch()

  const productDialog = useModal()

  const [query, setQuery] = useState<QueryI>({
    search: '',
    category: '',
    sort: ''
  })

  const debouncedSearch = useDebounce(query.search, 500)

  const handleS = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, { type }: { type: string }) => {
    if (type === 'cat') setQuery((p: any) => ({ ...p, category: e.target.value }))
    if (type === 'sort') setQuery((p: any) => ({ ...p, sort: e.target.value }))
    if (type === 'search') setQuery((p: any) => ({ ...p, search: e.target.value }))
  }

  useEffect(() => {
    handle.getAllProducts()
  }, [debouncedSearch, query.sort, query.category])

  const handle = {
    getAllProducts: () => {
      dispatch(getAllProducts({ search: query.search, sort: query.sort, category: query.category }))
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
              onChange={e => handleS(e, { type: 'search' })}
              className='flex-2 p-3 bg-gray-100 rounded-lg w-full md:flex-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-700'
            />

            <select
              onChange={e => handleS(e, { type: 'cat' })}
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
              onChange={e => handleS(e, { type: 'sort' })}
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
