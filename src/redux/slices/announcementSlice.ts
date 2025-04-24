import announcementService from '@/service/announcement-service'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AddAnnouncementI, GetDataI, UpdateAnnouncementI } from '@/types/api-payload-types'
import { createAppSlice } from '../createAppSlice'

export const getAllAnnouncements = createAsyncThunk(
  'announcement/getAllAnnouncements',
  async (payload: GetDataI, { rejectWithValue }) => {
    try {
      const { data } = await announcementService.getAll(payload)

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const getAnnouncementById = createAsyncThunk(
  'announcement/getAnnouncementById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await announcementService.getById(id)

      return res.data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const addAnnouncement = createAsyncThunk(
  'announcement/addAnnouncement',
  async (payload: AddAnnouncementI, { rejectWithValue }) => {
    try {
      const { data } = await announcementService.add(payload)

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateAnnouncement = createAsyncThunk(
  'announcement/updateAnnouncement',
  async (payload: UpdateAnnouncementI, { rejectWithValue }) => {
    try {
      const { data } = await announcementService.update(payload)

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const deleteAnnouncement = createAsyncThunk(
  'announcement/deleteAnnouncement',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await announcementService.deleteById(id)

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const disableAnnoucements = createAsyncThunk(
  'announcement/disableAnnoucements',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await announcementService.disableAll()

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

interface AnnouncementStateI {
  announcements: any
  loading: boolean
  rowCount: number
}

const initialState: AnnouncementStateI = {
  announcements: [],
  loading: false,
  rowCount: 0
}

const announcementSlice = createAppSlice({
  name: 'announcement',
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
    // getAllAnnouncements
    builder.addCase(getAllAnnouncements.pending, state => {
      state.loading = true
    })
    builder.addCase(getAllAnnouncements.fulfilled, (state, { payload }) => {
      state.loading = false
      state.announcements = payload
    })
    builder.addCase(getAllAnnouncements.rejected, state => {
      state.loading = false
    })
    // add announcement
    builder.addCase(addAnnouncement.pending, state => {
      state.loading = true
    })
    builder.addCase(addAnnouncement.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(addAnnouncement.rejected, state => {
      state.loading = false
    })
    // get announcement by id
    builder.addCase(getAnnouncementById.pending, state => {
      state.loading = true
    })
    builder.addCase(getAnnouncementById.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(getAnnouncementById.rejected, state => {
      state.loading = false
    })
    // update announcement
    builder.addCase(updateAnnouncement.pending, state => {
      state.loading = true
    })
    builder.addCase(updateAnnouncement.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(updateAnnouncement.rejected, state => {
      state.loading = false
    })
    // delete announcement
    builder.addCase(deleteAnnouncement.pending, state => {
      state.loading = true
    })
    builder.addCase(deleteAnnouncement.fulfilled, state => {
      state.loading = false
    })
    builder.addCase(deleteAnnouncement.rejected, state => {
      state.loading = false
    })
  }
})

export const announcementActions = announcementSlice.actions
export default announcementSlice.reducer
