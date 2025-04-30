import Image from 'next/image'
import { useAppDispatch } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { deleteProduct } from '@/redux/slices/productSlice'
import { MdContentCopy, MdDelete, MdEdit, MdRemoveRedEye } from 'react-icons/md'
import { GetProductI } from '@/types/api-payload-types'
import useModal from '@/hooks/use-modal'
import ConfirmDeleteDialog from '@/components/dialogs/confirmDeleteDialog'
import ProductDialog from '@/components/dialogs/productDialog'

interface IProps {
  products: GetProductI[]
  getData: () => void
}

const ProductListView = ({ products, getData }: IProps) => {
  const dispatch = useAppDispatch()

  const productDialog = useModal()
  const isDelete = useModal()

  const handle = {
    confirmDelete: () => {
      const { selectedRow } = isDelete
      dispatch(deleteProduct(selectedRow.id))
        .unwrap()
        .then((res: any) => {
          dispatch(errorActions.setErrorMessage(res?.message))
          isDelete.onClose()
          getData()
        })
        .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
    }
  }

  return (
    <>
      <div className='mt-5 overflow-auto border border-gray-300 rounded-lg'>
        <table className='w-full min-w-[1000px] border-collapse'>
          <thead className='bg-teal-700 text-white'>
            <tr>
              <th className='p-3 text-left'>Product No.</th>
              <th className='p-3 text-left'>Product Name</th>
              <th className='p-3 text-left'>Category</th>
              <th className='p-3 text-left'>Price</th>
              <th className='p-3 text-left'>Stock</th>
              <th className='p-3 text-left'>Purchased</th>
              <th className='p-3text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {products?.map((p: any) => (
              <tr key={p?._id} className='border-b border-gray-300'>
                <td className='p-3 align-middle'>
                  <div className='flex items-center gap-2'>
                    <MdContentCopy
                      className='text-gray-400 hover:text-gray-500 cursor-pointer'
                      onClick={() => navigator.clipboard.writeText(p?._id)}
                    />
                    {p?.productNo}
                  </div>
                </td>
                <td className='p-3 align-middle'>
                  <div className='flex items-center gap-2'>
                    <Image
                      src={p.img}
                      alt='product'
                      height={100}
                      width={100}
                      className='w-8 h-8 rounded-full object-center'
                    />
                    {p?.title?.length > 50 ? `${p.title.slice(0, 50)}...` : p?.title}
                  </div>
                </td>
                <td className='p-3 align-middle'>{p?.categories ? p?.categories[0] : ''}</td>
                <td className='p-3 align-middle'>{p?.price}</td>
                <td className='p-3 align-middle'>{p?.quantity}</td>
                <td className='p-3 align-middle'>{p?.purchasedCount}</td>
                <td className='p-3 align-middle'>
                  <div className='flex items-center gap-3'>
                    <MdRemoveRedEye
                      className='text-gray-400 hover:text-gray-500 cursor-pointer'
                      onClick={() =>
                        window.open(`${process.env.NEXT_PUBLIC_MAIN_SITE_URL}/product/${p?._id}`, '_blank')
                      }
                    />
                    <MdEdit
                      className='text-gray-400 hover:text-gray-500 cursor-pointer'
                      onClick={() => productDialog.onOpen({ ...p, isEdit: true })}
                    />
                    <MdDelete
                      className='text-gray-400 hover:text-gray-500 cursor-pointer'
                      onClick={() => isDelete.onOpen({ id: p._id })}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
