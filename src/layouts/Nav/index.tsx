import { Logo } from '../../components/Logo'
import { SignOut } from '../../components/SignOut'
import { SignIn } from '../../components/SignIn'
import { selectAuth } from '../../features/auth'
import { useAppSelector } from '../../utils/hooks'
import { Profile } from '../../components/Profile'

export function Nav() {
  const auth = useAppSelector(selectAuth)
  const userConnected = auth.token !== ''

  return (
    <nav className="main-nav">
      <Logo />
      {userConnected ? (
        <div>
          <Profile />
          <SignOut />
        </div>
      ) : (
        <div>
          <SignIn />
        </div>
      )}
    </nav>
  )
}
