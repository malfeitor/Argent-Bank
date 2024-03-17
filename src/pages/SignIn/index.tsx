import { useAppSelector } from '../../utils/hooks'
import { selectAuth, authenticate } from '../../features/auth'

import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export function SignIn() {
  const dispatch = useDispatch()
  const auth = useAppSelector(selectAuth)
  if (auth.token !== '') {
    return <Navigate to="/user" />
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const email = (document.getElementById('username') as HTMLInputElement)
      .value
    const password = (document.getElementById('password') as HTMLInputElement)
      .value
    authenticate({ email, password, dispatch })
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button" onClick={(e) => handleSubmit(e)}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}
