import UserDetailsPage from '@/views/app/user/user-details'
import { PagePropsI } from '@/types/page-props'

export default function ProductPage({ params }: PagePropsI) {
  return <UserDetailsPage id={params.id} />
}
