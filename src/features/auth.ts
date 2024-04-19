import {
  createSlice,
  Dispatch,
  isAction,
  Middleware,
  PayloadAction,
} from '@reduxjs/toolkit'
import { persistor, RootState } from '../utils/store'
import axios from 'axios'
import { isHydrateAction } from '../utils/types'

type Credentials = {
  dispatch: Dispatch
  email: string
  password: string
  rememberToken: boolean
}

const initialState = {
  token: '',
  loginFailed: false,
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
      dispatch(showError())
      console.log(error)
    })
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (draft, action: PayloadAction<string>) => {
      draft.loginFailed = false
      draft.token = action.payload
    },
    logOut: (draft) => {
      draft.token = ''
    },
    showError: (draft) => {
      draft.loginFailed = true
    },
  },
})

export const axiosAuthMiddleware: Middleware = () => (next) => (action) => {
  if (isAction(action) && isHydrateAction(action)) {
    if (action.payload && action.payload.token) {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`
    }
  }
  if (logIn.match(action)) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`
  }
  if (logOut.match(action)) {
    axios.defaults.headers.common['Authorization'] = ''
  }
  return next(action)
}

export const { logIn, logOut, showError } = actions
export const selectAuth = (state: RootState) => state.auth
export default reducer
