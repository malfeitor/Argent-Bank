import { Link } from 'react-router-dom'
import { selectAuth } from '../../features/auth'
import { useAppSelector } from '../../utils/hooks'

export function Nav() {
  const auth = useAppSelector(selectAuth)
  const userConnected = auth.token !== ''
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
            Tony
          </Link>
          <Link className="main-nav-item" to="/">
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
