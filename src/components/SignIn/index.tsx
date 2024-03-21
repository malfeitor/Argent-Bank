import { Link } from 'react-router-dom'

export function SignIn() {
  return (
    <div>
      <Link className="main-nav-item" to="/sign-in">
        <i className="fa fa-user-circle"></i>
        Sign In
      </Link>
    </div>
  )
}
