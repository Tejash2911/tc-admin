import { useRouter } from 'next/navigation'
import type { GetProductI } from '@/types/api-payload-types'
import type { ColumnI } from '@/types/table-props'
import useModal from '@/hooks/use-modal'
import { useDeleteProduct } from '@/hooks/useProductQuery'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'
import ProductDialog from '@/components/dialogs/productDialog'
import { Table } from '@/components/table'

interface IProps {
  products: GetProductI[]
  loading?: boolean
}

const ProductListView = ({ products, loading = false }: IProps) => {
  const { mutate: deleteProduct } = useDeleteProduct()
  const router = useRouter()
  const productDialog = useModal()
  const isDelete = useModal()

  const handle = {
    confirmDelete: () => {
      const { selectedRow } = isDelete
      deleteProduct(selectedRow.id, {
        onSuccess: () => {
          isDelete.onClose()
        }
      })
    }
  }

  const columns: ColumnI[] = [
    {
      key: '_id',
      label: '#',
      type: 'copy'
    },
    {
      key: 'img',
      label: 'Image',
      type: 'image'
    },
    {
      key: 'title',
      label: 'Product Name',
      type: 'text'
    },
    {
      key: 'categories',
      label: 'Category',
      type: 'text'
    },
    {
      key: 'price',
      label: 'Price',
      type: 'text'
    },
    {
      key: 'quantity',
      label: 'Stock',
      type: 'text'
    },
    {
      key: 'purchasedCount',
      label: 'Purchased',
      type: 'text'
    },
    {
      key: 'actions',
      label: 'Actions',
      type: 'action'
    }
  ]

  return (
    <>
      <Table
        data={products}
        columns={columns}
        onView={item => router.push(`/product/${item._id}`)}
        onEdit={item => productDialog.onOpen({ ...item, isEdit: true })}
        onDelete={item => isDelete.onOpen({ id: item._id })}
        loading={loading}
      />
      <ProductDialog open={productDialog.isOpen} setOpen={productDialog.onClose} data={productDialog.selectedRow} />
      <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
    </>
  )
}

export default ProductListView
