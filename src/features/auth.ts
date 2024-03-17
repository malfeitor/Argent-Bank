import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../utils/store'

type LogInPayload = string

const initialState = {
  token: '',
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (draft, action: PayloadAction<LogInPayload>) => {
      draft.token = action.payload
    },
  },
})

export const { logIn } = actions
export const selectAuth = (state: RootState) => state.auth
export default reducer
