import Invoice from '@/views/app/order/invoice'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <Invoice id={id} />
}
