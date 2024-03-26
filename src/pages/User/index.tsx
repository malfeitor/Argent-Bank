import { useAppSelector } from '../../utils/hooks'
import { selectAuth } from '../../features/auth'
import { Navigate } from 'react-router-dom'
import { Greeter } from '../../layouts/Greeter'
import Account from '../../components/Account'

export function UserPage() {
  const auth = useAppSelector(selectAuth)

  if (auth.token === '') {
    return <Navigate to="/sign-in" />
  }

  return (
    <main className="main bg-dark">
      <Greeter />
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  )
}
