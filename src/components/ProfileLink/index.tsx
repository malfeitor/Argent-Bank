import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { fetchProfile, selectProfile } from '../../features/profile'
import { selectAuth } from '../../features/auth'
import { useEffect } from 'react'

export function ProfileLink() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const auth = useAppSelector(selectAuth)
  useEffect(() => {
    if (auth.token !== '') {
      dispatch(fetchProfile())
    }
  }, [auth.token, dispatch])

  return (
    <Link className="main-nav-item" to="/user">
      <i className="fa fa-user-circle"></i>
      {profile.firstName}
    </Link>
  )
}
