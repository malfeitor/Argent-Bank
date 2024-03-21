import {
  createSlice,
  Dispatch,
  Middleware,
  PayloadAction,
} from '@reduxjs/toolkit'
import { persistor, RootState } from '../utils/store'
import axios from 'axios'
import { REHYDRATE } from 'redux-persist'

type LogInPayload = string
type Credentials = {
  dispatch: Dispatch
  email: string
  password: string
  rememberToken: boolean
}

const initialState = {
  token: '',
}

export function setAxiosDefaultAuthHeader(token: string) {
  axios.defaults.headers.common['Authorization'] = token
}

export const axiosAuthMiddleware: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store) => (next) => (action) => {
    if (action.type === REHYDRATE) {
      setAxiosDefaultAuthHeader(`Bearer ${action.payload.token}`)
    }
    if (action.type === logIn.type) {
      setAxiosDefaultAuthHeader(`Bearer ${action.payload}`)
    }
    if (action.type === logOut) {
      setAxiosDefaultAuthHeader('')
    }
    return next(action)
  }

export async function authenticate(credentials: Credentials) {
  const { email, password, rememberToken, dispatch } = credentials
  await axios
    .post('http://localhost:3001/api/v1/user/login', {
      email,
      password,
    })
    .then((response) => {
      if (!rememberToken) {
        persistor.pause()
      }
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
