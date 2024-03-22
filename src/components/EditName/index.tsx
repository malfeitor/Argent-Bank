import { selectProfile } from '../../features/profile'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { setProfileNames, stopEditing } from '../../features/profile'
import { useRef } from 'react'
import './index.scss'

export function EditName() {
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)

  function saveProfile() {
    const firstName = firstNameRef!.current!.value
    const lastName = lastNameRef!.current!.value
    dispatch(
      setProfileNames({
        firstName: firstName !== '' ? firstName : profile.firstName,
        lastName: lastName !== '' ? lastName : profile.lastName,
      })
    )
    dispatch(stopEditing())
  }

  function cancel() {
    dispatch(stopEditing())
  }

  return (
    <div className="edit-name">
      <input
        className="edit-name__input"
        type="text"
        ref={firstNameRef}
        placeholder={profile.firstName}
      />
      <input
        className="edit-name__input"
        type="text"
        ref={lastNameRef}
        placeholder={profile.lastName}
      />
      <button
        className="edit-button edit-name__button"
        onClick={() => {
          saveProfile()
        }}
      >
        Save
      </button>
      <button
        className="edit-button edit-name__button"
        onClick={() => cancel()}
      >
        Cancel
      </button>
    </div>
  )
}
