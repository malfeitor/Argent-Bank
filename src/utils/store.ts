import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth'
import profileReducer from '../features/profile'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
