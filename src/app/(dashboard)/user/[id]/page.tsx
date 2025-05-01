import UserDetailsPage from '@/views/app/user/user-details'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <UserDetailsPage id={id} />
}
