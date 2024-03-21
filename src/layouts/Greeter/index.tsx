import './index.scss'
import { selectProfile, startEditing } from '../../features/profile'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { EditName } from '../../components/EditName'

export function Greeter() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)

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
