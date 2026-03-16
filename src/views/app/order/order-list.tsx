import { useRouter } from 'next/navigation'
import type { GetOrderI } from '@/types/api-payload-types'
import type { ColumnI } from '@/types/table-props'
import { useChangeOrderStatus } from '@/hooks/useOrderQuery'
import { Table } from '@/components/table'

interface IProps {
  orders: GetOrderI[]
  loading?: boolean
}

const OrderListView = ({ orders, loading = false }: IProps) => {
  const { mutate: changeOrderStatus } = useChangeOrderStatus()
  const router = useRouter()

  const handle = {
    onStatusChange: (item: GetOrderI, newValue: string) => {
      const payload = { status: newValue }

      changeOrderStatus({ id: item._id, payload })
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
      onView={item => router.push(`/order/${item._id}`)}
      onChange={handle.onStatusChange}
      loading={loading}
    />
  )
}

export default OrderListView
