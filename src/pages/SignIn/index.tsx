import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { logIn, selectAuth } from '../../features/auth'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export function SignIn() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(selectAuth)
  if (auth.token !== '') {
    return <Navigate to="/user" />
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    const emailInput = document.getElementById('username') as HTMLInputElement
    const email = emailInput.value
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement
    const password = passwordInput.value
    axios
      .post('http://localhost:3001/api/v1/user/login', {
        email,
        password,
      })
      .then((response) => {
        dispatch(logIn(response.data.body.token))
      })
      .catch((error) => {
        console.log(error)
      })
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
