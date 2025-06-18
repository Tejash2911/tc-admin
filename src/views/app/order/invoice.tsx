'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getOrderById, orderActions } from '@/redux/slices/orderSlice'
import { Button } from '@/components/button'
import ContentLayout from '@/components/content-layout'
import NotFound from '@/components/not-found'

interface IProps {
  id: string
}
const Invoice = ({ id }: IProps) => {
  const { order, orderNotFound } = useAppSelector(({ order }) => order)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id))
    }
    return () => {
      dispatch(orderActions.resetOrder())
    }
  }, [id])

  const handle = {
    handlePrint: () => {
      const printContents = document.getElementById('invoice-container')?.innerHTML
      const originalContents = document.body.innerHTML
      document.body.innerHTML = printContents || ''
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }
  }

  type OrderStatus = 'pending' | 'processing' | 'delivered'

  const statusColors: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-green-100 text-green-700',
    delivered: 'bg-blue-100 text-blue-700'
  }

  if (orderNotFound) {
    return <NotFound message='Order Not Found' description='The order you are looking for does not exist.' />
  }

  return (
    <ContentLayout title='Invoice'>
      {order && (
        <>
          <div id='invoice-container'>
            <div className='flex flex-col gap-8 rounded-lg border border-gray-300 bg-white p-8'>
              {/* First Section */}
              <div className='flex flex-wrap justify-between'>
                <div>
                  <h1 className='mb-2 text-xl font-bold'>Invoice</h1>
                  <div className='text-gray-600'>
                    Status:{' '}
                    <span
                      className={`rounded-full px-3 py-1 font-medium ${
                        statusColors[order.orderStatus as OrderStatus] || ''
                      }`}
                    >
                      {order?.orderStatus}
                    </span>
                  </div>
                </div>
                <div className='mt-4 text-right md:mt-0'>
                  <h2 className='mb-2 text-lg'>{process.env.NEXT_PUBLIC_COMPANY_NAME}</h2>
                  <p>
                    {process.env.NEXT_PUBLIC_COMPANY_ADDRESS}
                    <br />
                    {process.env.NEXT_PUBLIC_COMPANY_ADDRESS_COUNTRY}
                  </p>
                </div>
              </div>

              {/* Second Section */}
              <div className='flex flex-wrap justify-between gap-4'>
                <div className='text-left'>
                  <p className='mb-1'>Date</p>
                  <p className='text-gray-600'>{new Date(order?.createdAt).toLocaleString()}</p>
                </div>
                <div className='text-left'>
                  <p className='mb-1'>Order ID</p>
                  <p className='text-gray-600'>{order?.paymentInfo?.razorpay_order_id}</p>
                </div>
                <div className='text-right md:text-left'>
                  <p className='mb-1'>Invoice To.</p>
                  <p className='text-gray-600'>{order?.userInfo?.name}</p>
                  <p className='text-gray-600'>{order?.userInfo?.address.mobile}</p>
                  <p className='text-gray-600'>
                    {`${order?.userInfo?.address?.street}, ${order?.userInfo?.address?.city} - ${order?.userInfo?.address?.zip}, ${order?.userInfo?.address?.state}`}
                  </p>
                </div>
              </div>

              {/* Third Section: Table */}
              <div className='mt-6 overflow-x-auto rounded-lg border border-gray-300'>
                <table className='w-full border-collapse'>
                  <thead className='bg-teal-700 text-white'>
                    <tr>
                      <td className='px-4 py-3 text-left'>#</td>
                      <td className='px-4 py-3 text-left'>Product Name</td>
                      <td className='px-4 py-3 text-left'>Quantity</td>
                      <td className='px-4 py-3 text-left'>Item Price</td>
                      <td className='px-4 py-3 text-left'>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products &&
                      order?.products?.map((o: any, index: number) => (
                        <tr key={index}>
                          <td className='px-4 py-3'>{index + 1}</td>
                          <td className='px-4 py-3'>{o?.title}</td>
                          <td className='px-4 py-3'>{o?.quantity}</td>
                          <td className='px-4 py-3'>{o?.price}</td>
                          <td className='px-4 py-3 text-red-600'>{o?.price * o?.quantity}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Fourth Section */}
              <div className='flex flex-wrap justify-between gap-4 rounded-lg bg-gray-100 p-6'>
                <div className='flex flex-col gap-1'>
                  <p>Order Type</p>
                  <span className='text-gray-700'>{order?.type}</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <p>Transaction Cost</p>
                  <span className='text-gray-700'>{order.price ? (order.price * 0.02).toFixed(2) : '0.00'}</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <p>Discount</p>
                  <span className='text-gray-700'>0</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <p>Total Amount</p>
                  <span className='text-gray-700'>
                    {order.price ? Math.ceil(order.price + order.price * 0.02) : '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className='mt-4 flex justify-end'>
            <Button onClick={handle.handlePrint} icon='print'>
              Print Invoice
            </Button>
          </div>
        </>
      )}
    </ContentLayout>
  )
}

export default Invoice
