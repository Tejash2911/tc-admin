import ProductDetails from '@/views/app/product/product-details'
import type { PagePropsI } from '@/types/page-props'

export default async function Page({ params }: PagePropsI) {
  const { id } = await params
  return <ProductDetails id={id} />
}
