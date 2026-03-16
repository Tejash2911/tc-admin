import { v4 as uuid } from 'uuid'
import { createAppSlice } from '../createAppSlice'

interface MessageStateI {
  message: string | null
  id: string | null
}

const initialState: MessageStateI = {
  message: null,
  id: null
}

const messageSlice = createAppSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
      state.id = uuid()
    },
    clearMessage: () => {
      return { ...initialState }
    }
  }
})

export const messageActions = messageSlice.actions
export default messageSlice.reducer
