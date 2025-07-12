import Invoice from '@/views/app/order/invoice'
import type { PagePropsI } from '@/types/page-props'

export default async function Page({ params }: PagePropsI) {
  const { id } = await params
  return <Invoice id={id} />
}
