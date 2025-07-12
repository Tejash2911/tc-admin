import UserDetailsPage from '@/views/app/user/user-details'
import type { PagePropsI } from '@/types/page-props'

export default async function Page({ params }: PagePropsI) {
  const { id } = await params
  return <UserDetailsPage id={id} />
}
