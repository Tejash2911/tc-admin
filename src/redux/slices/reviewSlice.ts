import reviewService from '@/service/review-service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AddReviewI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'
import { createAppSlice } from '../createAppSlice'

export const getAllReviewByProductId = createAsyncThunk(
  'review/getAllReviewByProductId',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await reviewService.getAll(id)

      return { data: Array.isArray(data) ? data : [] }
    } catch (error: any) {
      showToastError(error?.data?.message)
      return rejectWithValue(error)
    }
  }
)

export const addReview = createAsyncThunk('review/addReview', async (payload: AddReviewI, { rejectWithValue }) => {
  try {
    const res = await reviewService.add(payload)
    showToastSuccess(res?.data?.message)
    return res
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const upvoteReview = createAsyncThunk('review/upvoteReview', async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await reviewService.upvote(id)
    showToastSuccess(data?.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const abuseReview = createAsyncThunk('review/abuseReview', async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await reviewService.abuse(id)
    showToastSuccess(data?.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

interface ReviewStateI {
  loading: boolean
  reviews: any[]
}

const initialState: ReviewStateI = {
  loading: false,
  reviews: []
}

const reviewSlice = createAppSlice({
  name: 'review',
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
    // get all review by product id
    builder.addCase(getAllReviewByProductId.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllReviewByProductId.fulfilled, (state, { payload: { data } }) => {
      state.reviews = data
      state.loading = false
    })
    builder.addCase(getAllReviewByProductId.rejected, state => {
      state.loading = false
    })
    // add review
    builder.addCase(addReview.pending, state => {
      state.loading = true
    })
    builder.addCase(addReview.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(addReview.rejected, state => {
      state.loading = false
    })
    // upvote review
    builder.addCase(upvoteReview.pending, state => {
      state.loading = false
    })
    builder.addCase(upvoteReview.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(upvoteReview.rejected, state => {
      state.loading = false
    })
    // abuse review
    builder.addCase(abuseReview.pending, state => {
      state.loading = false
    })
    builder.addCase(abuseReview.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(abuseReview.rejected, state => {
      state.loading = false
    })
  }
})

export const reviewActions = reviewSlice.actions
export default reviewSlice.reducer
