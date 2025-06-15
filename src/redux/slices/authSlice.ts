import authService from '@/service/auth-service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { LoginI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'
import { createAppSlice } from '../createAppSlice'

export const login = createAsyncThunk('auth/login', async (payload: LoginI, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(payload)
    showToastSuccess(data.message)
    return data.data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authService.logout()
    showToastSuccess(data.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

interface AuthStateI {
  currentUser: any
  address: any
  loading: boolean
}

const initialState: AuthStateI = {
  currentUser: null,
  address: null,
  loading: false
}

if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('auth')

  initialState.currentUser = storedUser ? JSON.parse(storedUser) : null
}

const authSlice = createAppSlice({
  name: 'auth',
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
    // login
    builder.addCase(login.pending, state => {
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false
      state.currentUser = payload
      localStorage.setItem('auth', JSON.stringify(payload))
    })
    builder.addCase(login.rejected, state => {
      state.loading = false
    })
    // logout
    builder.addCase(logout.pending, state => {
      state.loading = true
    })
    builder.addCase(logout.fulfilled, state => {
      state.loading = false
      state.currentUser = null
      localStorage.removeItem('auth')
      state.address = null
    })
    builder.addCase(logout.rejected, state => {
      state.loading = false
    })
  }
})

export const authActions = authSlice.actions
export default authSlice.reducer
