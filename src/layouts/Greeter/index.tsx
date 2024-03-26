import './index.scss'
import {
  selectProfile,
  startEditing,
  stopEditing,
} from '../../features/profile'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { EditName } from '../../components/EditName'
import { useEffect } from 'react'

export function Greeter() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)

  /* We dispatch stop editing on component mount because 
  if not we stay in editing mode when leaving and coming back */
  useEffect(() => {
    dispatch(stopEditing())
  }, [dispatch])

  function showEditForm() {
    dispatch(startEditing())
  }

  return (
    <div className="greeter header">
      <h1 className="greeter__welcome">Welcome back</h1>
      {!profile.editing ? (
        <>
          <div className="greeter__name">
            {`${profile.firstName} ${profile.lastName}!`}
          </div>
          <button className="edit-button" onClick={() => showEditForm()}>
            Edit Name
          </button>
        </>
      ) : (
        <EditName />
      )}
    </div>
  )
}
