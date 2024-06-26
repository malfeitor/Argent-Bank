import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../utils/store'
import axios from 'axios'

type FetchResolved = {
  id: string
  email: string
  firstName: string
  lastName: string
  editing: boolean
}

type SetProfileNames = {
  firstName: string
  lastName: string
}

const initialState = {
  status: 'void',
  error: '',
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  editing: false,
}

const { actions, reducer } = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetching: (draft) => {
      if (draft.status === 'void') {
        draft.status = 'pending'
      }
      if (draft.status === 'rejected') {
        draft.status = 'pending'
        draft.error = ''
      }
      if (draft.status === 'resolved') {
        draft.status = 'updating'
      }
    },
    resolved: (draft, action: PayloadAction<FetchResolved>) => {
      draft.status = 'resolved'
      draft.id = action.payload.id
      draft.email = action.payload.email
      draft.firstName = action.payload.firstName
      draft.lastName = action.payload.lastName
    },
    rejected: (draft, action: PayloadAction<string>) => {
      draft.status = 'rejected'
      draft.error = action.payload
    },
    cleanProfile: () => {
      return initialState
    },
    startEditing: (draft) => {
      draft.editing = true
    },
    stopEditing: (draft) => {
      draft.editing = false
    },
  },
})

export const fetchProfile = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const status = selectProfile(getState()).status
    if (status !== 'pending' && status !== 'updating') {
      dispatch(actions.fetching())
      axios
        .post('http://localhost:3001/api/v1/user/profile')
        .then((response) => {
          dispatch(actions.resolved(response.data.body))
        })
        .catch((error) => {
          dispatch(actions.rejected(error.message))
        })
    }
  }
}

export const setProfileNames = ({ firstName, lastName }: SetProfileNames) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const status = selectProfile(getState()).status
    if (status !== 'pending' && status !== 'updating') {
      dispatch(actions.fetching())
      axios
        .put('http://localhost:3001/api/v1/user/profile', {
          firstName,
          lastName,
        })
        .then((response) => {
          dispatch(actions.resolved(response.data.body))
        })
        .catch((error) => {
          dispatch(actions.rejected(error.message))
        })
    }
  }
}

export const { cleanProfile, startEditing, stopEditing } = actions
export const selectProfile = (state: RootState) => state.profile
export default reducer
