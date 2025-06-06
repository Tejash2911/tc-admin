import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/redux-hooks'
import { errorActions } from '@/redux/slices/errorSlice'
import { changeOrderStatus } from '@/redux/slices/orderSlice'
import { GetOrderI } from '@/types/api-payload-types'
import { ColumnI } from '@/types/table-props'
import { Table } from '@/components/table'

interface IProps {
  orders: GetOrderI[]
  getData: () => void
  loading?: boolean
}

const OrderListView = ({ orders, getData, loading = false }: IProps) => {
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

  // Convert orders to flattened format
  const flattenedOrders = orders.map(order => ({
    ...order,
    address: `${order.userInfo.address?.city}, ${order.userInfo.address?.state}`,
    phone: order.userInfo.address?.mobile,
    status: order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)
  }))

  const columns: ColumnI[] = [
    {
      key: '_id',
      label: '#',
      type: 'copy'
    },
    {
      key: 'createdAt',
      label: 'Order Date',
      type: 'date'
    },
    {
      key: 'address',
      label: 'Shipping Address',
      type: 'text'
    },
    {
      key: 'phone',
      label: 'Phone',
      type: 'text'
    },
    {
      key: 'price',
      label: 'Amount',
      type: 'text'
    },
    {
      key: 'status',
      label: 'Status',
      type: 'text'
    },
    {
      key: 'orderStatus',
      label: 'Change Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Delivered', value: 'delivered' }
      ]
    },
    {
      key: 'invoice',
      label: 'Invoice',
      type: 'action'
    }
  ]

  return (
    <Table
      data={flattenedOrders}
      columns={columns}
      onView={(item: GetOrderI) => router.push(`/order/${item._id}`)}
      loading={loading}
      onChange={(item: GetOrderI, newValue: string) => {
        handle.onStatusChange(item._id, { target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>)
      }}
    />
  )
}

export default OrderListView
