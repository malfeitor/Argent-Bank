import { selectProfile } from '../../features/profile'
import { useAppSelector } from '../../utils/hooks'

export function EditName() {
  const profile = useAppSelector(selectProfile)

  return <div>{`${profile.firstName} ${profile.lastName}!`}</div>
}
