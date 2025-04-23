import analyticsService from '@/service/analytics-service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createAppSlice } from '../createAppSlice'

export const getTopCategories = createAsyncThunk('analytics/topCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await analyticsService.getTopCategories()

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getOrderAnalytics = createAsyncThunk('analytics/order', async (_, { rejectWithValue }) => {
  try {
    const { data } = await analyticsService.getOrderAnalytics()

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getOrderPriceAnalytics = createAsyncThunk('analytics/orderPrice', async (_, { rejectWithValue }) => {
  try {
    const { data } = await analyticsService.getOrderPriceAnalytics()

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getPopularSizeColor = createAsyncThunk('analytics/popularSizeColor', async (_, { rejectWithValue }) => {
  try {
    const { data } = await analyticsService.getPopularSizeColor()

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getTopProducts = createAsyncThunk(
  'analytics/topProducts',
  async (payload: { for: string }, { rejectWithValue }) => {
    try {
      const { data } = await analyticsService.getTopProducts(payload)

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

interface AnalyticsStateI {
  topCategories: any
  orderStats: any
  orderPriceStats: any
  popularSizeColor: any
  topProducts: any
  loading: boolean
}

const initialState: AnalyticsStateI = {
  topCategories: null,
  orderStats: null,
  orderPriceStats: null,
  popularSizeColor: null,
  topProducts: null,
  loading: false
}

const analyticsSlice = createAppSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    resetState: () => {
      return { ...initialState }
    }
  },
  extraReducers: builder => {
    // getTopCategories
    builder.addCase(getTopCategories.pending, state => {
      state.loading = true
    })
    builder.addCase(getTopCategories.fulfilled, (state, { payload }) => {
      state.loading = false
      state.topCategories = payload
    })
    builder.addCase(getTopCategories.rejected, state => {
      state.loading = false
    })
    // getOrderAnalytics
    builder.addCase(getOrderAnalytics.pending, state => {
      state.loading = true
    })
    builder.addCase(getOrderAnalytics.fulfilled, (state, { payload }) => {
      state.loading = false
      state.orderStats = payload
    })
    builder.addCase(getOrderAnalytics.rejected, state => {
      state.loading = false
    })
    // getOrderPriceAnalytics
    builder.addCase(getOrderPriceAnalytics.pending, state => {
      state.loading = true
    })
    builder.addCase(getOrderPriceAnalytics.fulfilled, (state, { payload }) => {
      state.loading = false
      state.orderPriceStats = payload
    })
    builder.addCase(getOrderPriceAnalytics.rejected, state => {
      state.loading = false
    })
    // getPopularSizeColor
    builder.addCase(getPopularSizeColor.pending, state => {
      state.loading = true
    })
    builder.addCase(getPopularSizeColor.fulfilled, (state, { payload }) => {
      state.loading = false
      state.popularSizeColor = payload
    })
    builder.addCase(getPopularSizeColor.rejected, state => {
      state.loading = false
    })
    // getTopProducts
    builder.addCase(getTopProducts.pending, state => {
      state.loading = true
    })
    builder.addCase(getTopProducts.fulfilled, (state, { payload }) => {
      state.loading = false
      state.topProducts = payload
    })
    builder.addCase(getTopProducts.rejected, state => {
      state.loading = false
    })
  }
})

export const analyticsActions = analyticsSlice.actions
export default analyticsSlice.reducer
