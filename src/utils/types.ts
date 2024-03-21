import { Action } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'

export function isHydrateAction(action: Action): action is Action<
  typeof REHYDRATE
> & {
  key: string
  payload: { token: string }
  err: unknown
} {
  return action.type === REHYDRATE
}
