import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../utils/store'
import axios from 'axios'

type LogInPayload = string
type Credentials = {
  dispatch: Dispatch
  email: string
  password: string
}

const initialState = {
  token: '',
}

export function authenticate(credentials: Credentials) {
  const { email, password, dispatch } = credentials
  axios
    .post('http://localhost:3001/api/v1/user/login', {
      email,
      password,
    })
    .then((response) => {
      dispatch(logIn(response.data.body.token))
    })
    .catch((error) => {
      console.log(error)
    })
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (draft, action: PayloadAction<LogInPayload>) => {
      draft.token = action.payload
    },
    logOut: (draft) => {
      draft.token = ''
    },
  },
})

export const { logIn, logOut } = actions
export const selectAuth = (state: RootState) => state.auth
export default reducer
