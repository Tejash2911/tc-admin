import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/redux-hooks'
import { deleteProduct } from '@/redux/slices/productSlice'
import type { GetProductI } from '@/types/api-payload-types'
import type { ColumnI } from '@/types/table-props'
import useModal from '@/hooks/use-modal'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'
import ProductDialog from '@/components/dialogs/productDialog'
import { Table } from '@/components/table'

interface IProps {
  products: GetProductI[]
  getData: () => void
  loading?: boolean
}

const ProductListView = ({ products, getData, loading = false }: IProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const productDialog = useModal()
  const isDelete = useModal()

  const handle = {
    confirmDelete: () => {
      const { selectedRow } = isDelete
      dispatch(deleteProduct(selectedRow.id)).then(() => {
        isDelete.onClose()
        getData()
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
      {productDialog.isOpen && (
        <ProductDialog
          open={productDialog.isOpen}
          setOpen={productDialog.onClose}
          data={productDialog.selectedRow}
          getData={getData}
        />
      )}
      {isDelete.isOpen && (
        <ConfirmDeleteDialog open={isDelete.isOpen} onClose={isDelete.onClose} onDelete={handle.confirmDelete} />
      )}
    </>
  )
}

export default ProductListView
