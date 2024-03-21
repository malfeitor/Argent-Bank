import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../utils/hooks'
import { logOut } from '../../features/auth'
import { cleanProfile } from '../../features/profile'

export function SignOut() {
  const dispatch = useAppDispatch()

  function handleSignOut() {
    dispatch(logOut())
    dispatch(cleanProfile())
  }
  return (
    <Link className="main-nav-item" to="/" onClick={() => handleSignOut()}>
      <i className="fa fa-sign-out"></i>
      Sign Out
    </Link>
  )
}
