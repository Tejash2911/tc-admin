import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import analyticsSlice from './slices/analyticsSlice'
import announcementSlice from './slices/announcementSlice'
import authSlice from './slices/authSlice'
import errorSlice from './slices/errorSlice'

const appReducer = combineReducers({
  auth: authSlice,
  error: errorSlice,
  analytics: analyticsSlice,
  announcement: announcementSlice
})

// Handle the reset on logout by returning undefined for the state
const rootReducer = (state: RootState | undefined, action: Action) => {
  if (action.type === 'USER_LOGOUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof appReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: RootState) => {
  const store = configureStore({
    reducer: rootReducer,

    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware().concat(quotesApiSlice.middleware)
    // },
    preloadedState
  })

  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  // setupListeners(store.dispatch)
  return store
}

const store = makeStore()

export default store

// Infer the type of `store`
export type AppStore = typeof store

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>
