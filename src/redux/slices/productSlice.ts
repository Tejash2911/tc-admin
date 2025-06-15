import productService from '@/service/product-service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AddProductI, GetDataI, UpdateProductI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'
import { createAppSlice } from '../createAppSlice'

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (payload: GetDataI, { rejectWithValue }) => {
    try {
      const { data } = await productService.getAll(payload)

      return { list: Array.isArray(data.data) ? data.data : [], rowCount: data.totalCount }
    } catch (error: any) {
      showToastError(error?.data?.message)
      return rejectWithValue(error)
    }
  }
)

export const addProduct = createAsyncThunk('product/addProduct', async (payload: AddProductI, { rejectWithValue }) => {
  try {
    const { data } = await productService.add(payload)
    showToastSuccess(data?.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const getProductById = createAsyncThunk('product/getProductById', async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await productService.getById(id)

    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (payload: UpdateProductI, { rejectWithValue }) => {
    try {
      const { data } = await productService.update(payload)
      showToastSuccess(data?.message)
      return data
    } catch (error: any) {
      showToastError(error?.data?.message)
      return rejectWithValue(error)
    }
  }
)

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await productService.deleteById(id)
    showToastSuccess(data?.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

interface ProductStateI {
  loading: boolean
  products: any[]
  product: any
  rowCount: number
  productNotFound: boolean
}

const initialState: ProductStateI = {
  loading: false,
  products: [],
  product: {},
  rowCount: 0,
  productNotFound: false
}

const productSlice = createAppSlice({
  name: 'product',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    resetState: () => {
      return { ...initialState }
    },
    resetProduct: state => {
      state.product = {}
    }
  },
  extraReducers: builder => {
    // get all products
    builder.addCase(getAllProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllProducts.fulfilled, (state, { payload: { list, rowCount } }) => {
      state.products = Array.isArray(list) ? list : []
      state.loading = false
      state.rowCount = rowCount
    })
    builder.addCase(getAllProducts.rejected, state => {
      state.loading = false
    })

    // add product
    builder.addCase(addProduct.pending, state => {
      state.loading = true
    })
    builder.addCase(addProduct.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(addProduct.rejected, state => {
      state.loading = false
    })

    // get product by id
    builder.addCase(getProductById.pending, state => {
      state.loading = true
    })
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.loading = false
      state.product = payload
      state.productNotFound = false
    })
    builder.addCase(getProductById.rejected, state => {
      state.loading = false
      state.productNotFound = true
    })

    // update product
    builder.addCase(updateProduct.pending, state => {
      state.loading = true
    })
    builder.addCase(updateProduct.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(updateProduct.rejected, state => {
      state.loading = false
    })

    // delete product
    builder.addCase(deleteProduct.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteProduct.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(deleteProduct.rejected, state => {
      state.loading = false
    })
  }
})

export const productActions = productSlice.actions
export default productSlice.reducer
