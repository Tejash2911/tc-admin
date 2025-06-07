import ProductDetails from '@/views/app/product/product-details'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProductDetails id={id} />
}
