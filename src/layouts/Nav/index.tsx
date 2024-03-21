import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../utils/hooks'
import {
  selectAuth,
  logOut,
  setAxiosDefaultAuthHeader,
} from '../../features/auth'
import { selectProfile, cleanProfile } from '../../features/profile'

export function Nav() {
  const dispatch = useDispatch()
  const auth = useAppSelector(selectAuth)
  const profile = useAppSelector(selectProfile)
  const userConnected = auth.token !== ''
  function handleSignOut() {
    dispatch(logOut())
    setAxiosDefaultAuthHeader('')
    dispatch(cleanProfile())
  }
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {userConnected ? (
        <div>
          <Link className="main-nav-item" to="/user">
            <i className="fa fa-user-circle"></i>
            {profile.firstName}
          </Link>
          <Link
            className="main-nav-item"
            to="/"
            onClick={() => handleSignOut()}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  )
}
