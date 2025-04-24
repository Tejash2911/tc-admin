import { v4 as uuid } from 'uuid'
import { createAppSlice } from '../createAppSlice'

interface ErrorStateI {
  message: string | null
  id: string | null
}

const initialState: ErrorStateI = {
  message: null,
  id: null
}

const errorSlice = createAppSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.message = action.payload
      state.id = uuid()
    },
    clearError: () => {
      return { ...initialState }
    }
  }
})

export const errorActions = errorSlice.actions
export default errorSlice.reducer
