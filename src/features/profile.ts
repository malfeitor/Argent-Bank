import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../utils/store'
import axios from 'axios'

type Payload = {
  id: string
  email: string
  firstName: string
  lastName: string
}

const initialState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
}

export function fetchProfile(dispatch: Dispatch) {
  axios
    .post('http://localhost:3001/api/v1/user/profile')
    .then((response) => {
      dispatch(set(response.data.body))
    })
    .catch((error) => {
      console.log(error)
    })
}

const { actions, reducer } = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    set: (draft, action: PayloadAction<Payload>) => {
      draft.id = action.payload.id
      draft.email = action.payload.email
      draft.firstName = action.payload.firstName
      draft.lastName = action.payload.lastName
    },
    unset: (draft) => {
      draft.id = initialState.id
      draft.email = initialState.email
      draft.firstName = initialState.firstName
      draft.lastName = initialState.lastName
    },
  },
})

export const { set } = actions
export const selectProfile = (state: RootState) => state.profile
export default reducer
