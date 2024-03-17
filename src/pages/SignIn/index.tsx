import { useAppDispatch } from '../../utils/hooks'
import { logIn } from '../../features/auth'

export function SignIn() {
  const dispatch = useAppDispatch()
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const emailInput = document.getElementById('username') as HTMLInputElement
    const email = emailInput.value
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement
    const password = passwordInput.value
    dispatch(logIn({ email, password }))
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
