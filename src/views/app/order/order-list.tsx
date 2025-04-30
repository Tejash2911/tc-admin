import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { changeOrderStatus } from '@/redux/slices/orderSlice'
import { MdContentCopy, MdRemoveRedEye } from 'react-icons/md'
import { GetOrderI } from '@/types/api-payload-types'

interface IProps {
  orders: GetOrderI[]
  getData: () => void
}

const OrderListView = ({ orders, getData }: IProps) => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const handle = {
    onStatusChange: (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const payload = { status: e.target.value }

      dispatch(changeOrderStatus({ id, payload }))
        .unwrap()
        .then((res: any) => {
          dispatch(errorActions.setErrorMessage(res?.message))
          getData()
        })
        .catch(err => dispatch(errorActions.setErrorMessage(err?.message)))
    }
  }

  const statusColors = {
    pending: { background: 'bg-yellow-100', text: 'text-orange-700' },
    processing: { background: 'bg-green-100', text: 'text-green-700' },
    delivered: { background: 'bg-blue-100', text: 'text-blue-700' }
  }

  return (
    <div className='mt-5 overflow-auto border border-gray-300 rounded-md'>
      <table className='w-full min-w-[1000px] border-collapse'>
        <thead className='bg-teal-700 text-white'>
          <tr>
            <th className='p-3 text-left'>Order Id</th>
            <th className='p-3 text-left'>Order Date</th>
            <th className='p-3 text-left'>Shipping Address</th>
            <th className='p-3 text-left'>Phone</th>
            <th className='p-3 text-left'>Amount</th>
            <th className='p-3 text-left'>Status</th>
            <th className='p-3 text-left'>Action</th>
            <th className='p-3 text-left'>Invoice</th>
          </tr>
        </thead>

        <tbody className='bg-white'>
          {orders?.map(o => (
            <tr key={o._id} className='border-b border-gray-300'>
              <td className='p-3'>
                <MdContentCopy
                  className='text-gray-400 cursor-pointer hover:text-gray-600'
                  onClick={() => navigator.clipboard.writeText(o._id)}
                />
              </td>
              <td className='p-3'>{new Date(o.createdAt).toDateString()}</td>
              <td className='p-3'>{`${o.userInfo.address?.city}, ${o.userInfo.address?.state}`}</td>
              <td className='p-3'>{o.userInfo.address?.mobile}</td>
              <td className='p-3'>{o.price}</td>
              <td className='p-3'>
                <p
                  className={`font-medium text-center rounded-full ${statusColors[o.orderStatus]?.background} ${statusColors[o.orderStatus]?.text}`}
                >
                  {o.orderStatus.charAt(0).toUpperCase() + o.orderStatus.slice(1)}
                </p>
              </td>
              <td className='p-3'>
                <select
                  value={o.orderStatus}
                  onChange={e => handle.onStatusChange(o._id, e)}
                  className='h-8 rounded-md border border-gray-300 bg-gray-100 p-1 outline-none'
                >
                  <option value='pending'>Pending</option>
                  <option value='processing'>Processing</option>
                  <option value='delivered'>Delivered</option>
                </select>
              </td>
              <td className='p-3'>
                <MdRemoveRedEye
                  onClick={() => router.push(`/order/${o._id}`)}
                  className='text-gray-400 cursor-pointer hover:text-gray-600'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderListView
