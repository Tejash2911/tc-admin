import userService from '@/service/user-service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { GetDataI, UpdateUserI } from '@/types/api-payload-types'
import { showToastError, showToastSuccess } from '@/components/toast'
import { createAppSlice } from '../createAppSlice'

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (payload: GetDataI, { rejectWithValue }) => {
  try {
    const { data } = await userService.getAll(payload)

    return { users: data.data, rowCount: data.totalCount }
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const getUserById = createAsyncThunk('user/getUserById', async (id: string, { rejectWithValue }) => {
  try {
    const res = await userService.getById(id)

    return res.data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

export const updateUserById = createAsyncThunk(
  'user/updateUserById',
  async (payload: UpdateUserI, { rejectWithValue }) => {
    try {
      const { data } = await userService.update(payload)
      showToastSuccess(data?.message)
      return data
    } catch (error: any) {
      showToastError(error?.data?.message)
      return rejectWithValue(error)
    }
  }
)

export const deleteUser = createAsyncThunk('user/deleteUser', async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await userService.deleteById(id)
    showToastSuccess(data?.message)
    return data
  } catch (error: any) {
    showToastError(error?.data?.message)
    return rejectWithValue(error)
  }
})

interface UserStateI {
  users: any
  user: any
  loading: boolean
  rowCount: number
  userNotFound: boolean
}

const initialState: UserStateI = {
  users: [],
  user: {},
  loading: false,
  rowCount: 0,
  userNotFound: false
}

const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    resetState: () => {
      return { ...initialState }
    },
    resetUser: state => {
      state.user = {}
    }
  },
  extraReducers: builder => {
    // getAllUsers
    builder.addCase(getAllUsers.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
      state.loading = false
      state.users = payload.users
      state.rowCount = payload.rowCount
    })
    builder.addCase(getAllUsers.rejected, state => {
      state.loading = false
    })
    // getUserById
    builder.addCase(getUserById.pending, state => {
      state.loading = true
    })
    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.user = payload
      state.loading = false
      state.userNotFound = false
    })
    builder.addCase(getUserById.rejected, state => {
      state.loading = false
      state.userNotFound = true
    })
    // deleteUserById
    builder.addCase(deleteUser.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteUser.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(deleteUser.rejected, state => {
      state.loading = false
    })
  }
})

export const userActions = userSlice.actions
export default userSlice.reducer
