import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../utils/store'

type LogInPayload = {
  email: string
  password: string
}

const initialState = {}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (draft, action: PayloadAction<LogInPayload>) => {
      console.log(draft)
      console.log(action)
    },
  },
})

export const { logIn } = actions
export const selectAuth = (state: RootState) => state.auth
export default reducer
