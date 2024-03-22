import { selectProfile } from '../../features/profile'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { setProfileNames, stopEditing } from '../../features/profile'

export function EditName() {
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  function saveProfile() {
    dispatch(setProfileNames({ firstName: 'Tony', lastName: 'Stark' }))
    dispatch(stopEditing())
  }

  return (
    <div>
      {`${profile.firstName} ${profile.lastName}!`}
      <button
        className="edit-button"
        onClick={() => {
          saveProfile()
        }}
      >
        Save
      </button>
      <button className="edit-button">Cancel</button>
    </div>
  )
}
