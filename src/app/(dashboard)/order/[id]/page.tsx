import Invoice from '@/views/app/order/invoice'
import { PagePropsI } from '@/types/page-props'

export default function Page({ params }: PagePropsI) {
  return <Invoice id={params.id} />
}
