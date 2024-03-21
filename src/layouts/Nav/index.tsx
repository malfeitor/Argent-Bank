import { Logo } from '../../components/Logo'
import { SignOut } from '../../components/SignOut'
import { SignIn } from '../../components/SignIn'
import { selectAuth } from '../../features/auth'
import { useAppSelector } from '../../utils/hooks'
import { ProfileLink } from '../../components/ProfileLink'

export function Nav() {
  const auth = useAppSelector(selectAuth)
  const userConnected = auth.token !== ''

  return (
    <nav className="main-nav">
      <Logo />
      {userConnected ? (
        <div>
          <ProfileLink />
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
