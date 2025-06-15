import orderService from '@/service/order-service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { GetDataI, GetOrderI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'
import { createAppSlice } from '../createAppSlice'

export const getAllOrders = createAsyncThunk('order/getAllOrders', async (payload: GetDataI, { rejectWithValue }) => {
  try {
    const { data } = await orderService.getAll(payload)

    return { list: Array.isArray(data.data) ? data.data : [], rowCount: data.totalCount }
  } catch (error: any) {
    return rejectWithValue(error)
  }
})

export const addOrder = createAsyncThunk('order/addOrder', async (payload: any, { rejectWithValue }) => {
  try {
    const { data } = await orderService.add(payload)
    showToastSuccess(data?.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const getOrderById = createAsyncThunk('order/getOrderById', async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await orderService.getById(id)

    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const updateOrder = createAsyncThunk('order/updateOrder', async (payload: any, { rejectWithValue }) => {
  try {
    const { data } = await orderService.update(payload)
    showToastSuccess(data?.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await orderService.deleteById(id)
    showToastSuccess(data?.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const getOrdersByUserId = createAsyncThunk(
  'order/getOrdersByUserId',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await orderService.getByUserId(id)

      return data
    } catch (error: any) {
      showToastError(error?.data?.message)
      return rejectWithValue(error)
    }
  }
)

export const changeOrderStatus = createAsyncThunk(
  'order/changeOrderStatus',
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await orderService.changeOrderStatus(payload)
      showToastSuccess(data?.message)
      return data
    } catch (error: any) {
      showToastError(error?.data?.message)
      return rejectWithValue(error)
    }
  }
)

interface OrderStateI {
  orders: GetOrderI[]
  order: any
  loading: boolean
  rowCount: number
  orderNotFound: boolean
}

const initialState: OrderStateI = {
  orders: [],
  order: {},
  loading: false,
  rowCount: 0,
  orderNotFound: false
}

const orderSlice = createAppSlice({
  name: 'order',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    resetState: () => {
      return { ...initialState }
    },
    resetOrder: state => {
      state.order = {}
    }
  },
  extraReducers: builder => {
    // get all orders
    builder.addCase(getAllOrders.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllOrders.fulfilled, (state, { payload: { list, rowCount } }) => {
      state.orders = list
      state.loading = false
      state.rowCount = rowCount
    })
    builder.addCase(getAllOrders.rejected, state => {
      state.loading = false
    })
    // add order
    builder.addCase(addOrder.pending, state => {
      state.loading = true
    })
    builder.addCase(addOrder.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(addOrder.rejected, state => {
      state.loading = false
    })
    // get order by id
    builder.addCase(getOrderById.pending, state => {
      state.loading = true
    })
    builder.addCase(getOrderById.fulfilled, (state, { payload }) => {
      state.loading = false
      state.order = payload
      state.orderNotFound = false
    })
    builder.addCase(getOrderById.rejected, state => {
      state.loading = false
      state.orderNotFound = true
    })
    // update order
    builder.addCase(updateOrder.pending, state => {
      state.loading = true
    })
    builder.addCase(updateOrder.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(updateOrder.rejected, state => {
      state.loading = false
    })
    // delete order
    builder.addCase(deleteOrder.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteOrder.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(deleteOrder.rejected, state => {
      state.loading = false
    })
    // get orders by user id
    builder.addCase(getOrdersByUserId.pending, state => {
      state.loading = true
    })
    builder.addCase(getOrdersByUserId.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(getOrdersByUserId.rejected, state => {
      state.loading = false
    })
    // change order status
    builder.addCase(changeOrderStatus.pending, state => {
      state.loading = true
    })
    builder.addCase(changeOrderStatus.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(changeOrderStatus.rejected, state => {
      state.loading = false
    })
  }
})

export const orderActions = orderSlice.actions
export default orderSlice.reducer
