import userService from '@/service/user-service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginI } from '@/types/api-payload-types'
import { createAppSlice } from '../createAppSlice'

export const login = createAsyncThunk('user/login', async (payload: LoginI, { rejectWithValue }) => {
  try {
    const { data } = await userService.login(payload)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

interface UserStateI {
  currentUser: any
  address: any
  loading: boolean
}

const initialState: UserStateI = {
  currentUser: null,
  address: null,
  loading: false
}

if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user')

  initialState.currentUser = storedUser ? JSON.parse(storedUser) : null
}

const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: state => {
      state.currentUser = null
      localStorage.removeItem('user')
      state.address = null
    },
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
      localStorage.setItem('user', JSON.stringify(payload))
    })
    builder.addCase(login.rejected, state => {
      state.loading = false
    })
  }
})

export const userActions = userSlice.actions
export default userSlice.reducer
