import {
  createSlice,
  Dispatch,
  Middleware,
  PayloadAction,
} from '@reduxjs/toolkit'
import { persistor, RootState } from '../utils/store'
import axios from 'axios'

type LogInPayload = string
type Credentials = {
  dispatch: Dispatch
  email: string
  password: string
  saveToken: boolean
}

const initialState = {
  token: '',
}

export function setAxiosDefaultAuthHeader(token: string) {
  axios.defaults.headers.common['Authorization'] = token
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action?.type === 'string' && action.type === 'persist/REHYDRATE') {
    setAxiosDefaultAuthHeader(`Bearer ${action.payload.token}`)
  }
  return next(action)
}

export async function authenticate(credentials: Credentials) {
  const { email, password, saveToken, dispatch } = credentials
  await axios
    .post('http://localhost:3001/api/v1/user/login', {
      email,
      password,
    })
    .then((response) => {
      if (!saveToken) {
        persistor.pause()
      }
      dispatch(logIn(response.data.body.token))
      setAxiosDefaultAuthHeader(`Bearer ${response.data.body.token}`)
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
