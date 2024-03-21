import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link className="main-nav-logo" to="/">
      <img
        className="main-nav-logo-image"
        src="img/argentBankLogo.png"
        alt="Argent Bank Logo"
      />
      <h1 className="sr-only">Argent Bank</h1>
    </Link>
  )
}
