'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getOrderById, orderActions } from '@/redux/slices/orderSlice'
import { MdLocalPrintshop } from 'react-icons/md'

interface IProps {
  id: string
}
const Invoice = ({ id }: IProps) => {
  const { order } = useAppSelector(({ order }) => order)
  const dispatch = useAppDispatch()

  useEffect(() => {
    handle.getOrderDetails()
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(orderActions.resetOrder())
    }
  }, [])

  const handle = {
    getOrderDetails: () => {
      dispatch(getOrderById(id))
    },
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

  return (
    <div className='bg-gray-100 min-h-screen pb-8 flex justify-center'>
      {order && (
        <div className='w-[1200px] max-w-[90%]'>
          <h2 className='text-2xl font-semibold mt-6 mb-4'>Invoice</h2>
          <div id='invoice-container'>
            <div className='bg-white p-8 rounded-2xl flex flex-col gap-8'>
              {/* First Section */}
              <div className='flex justify-between flex-wrap'>
                <div>
                  <h1 className='text-xl font-bold mb-2'>INVOICE</h1>
                  <div className='text-sm font-semibold text-gray-600'>
                    STATUS:{' '}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        statusColors[order.orderStatus as OrderStatus] || ''
                      }`}
                    >
                      {order?.orderStatus}
                    </span>
                  </div>
                </div>
                <div className='text-right mt-4 md:mt-0'>
                  <h2 className='text-lg font-semibold mb-2'>{process.env.NEXT_PUBLIC_COMPANY_NAME}</h2>
                  <p className='text-sm'>
                    {process.env.NEXT_PUBLIC_COMPANY_ADDRESS}
                    <br />
                    {process.env.NEXT_PUBLIC_COMPANY_ADDRESS_COUNTRY}
                  </p>
                </div>
              </div>

              {/* Second Section */}
              <div className='flex justify-between flex-wrap gap-4'>
                <div className='text-left'>
                  <p className='text-base font-semibold mb-1'>DATE</p>
                  <p className='text-gray-600'>{new Date(order?.createdAt).toLocaleString()}</p>
                </div>
                <div className='text-left'>
                  <p className='text-base font-semibold mb-1'>ORDER ID</p>
                  <p className='text-gray-600'>{order?.paymentInfo?.razorpay_order_id}</p>
                </div>
                <div className='text-right md:text-left'>
                  <p className='text-base font-semibold mb-1'>INVOICE TO.</p>
                  <p className='text-gray-600'>{order?.userInfo?.name}</p>
                  <p className='text-gray-600'>{order?.userInfo?.address.mobile}</p>
                  <p className='text-gray-600'>
                    {`${order?.userInfo?.address?.street}, ${order?.userInfo?.address?.city} - ${order?.userInfo?.address?.zip}, ${order?.userInfo?.address?.state}`}
                  </p>
                </div>
              </div>

              {/* Third Section: Table */}
              <div className='mt-6 overflow-x-auto border border-gray-300 rounded-lg'>
                <table className='w-full min-w-[500px] border-collapse'>
                  <thead className='bg-teal-700 text-white'>
                    <tr>
                      <th className='py-3 px-4 text-left'>SR.</th>
                      <th className='py-3 px-4 text-left'>PRODUCT NAME</th>
                      <th className='py-3 px-4 text-left'>QUANTITY</th>
                      <th className='py-3 px-4 text-left'>ITEM PRICE</th>
                      <th className='py-3 px-4 text-left'>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products &&
                      order?.products?.map((o: any, index: number) => (
                        <tr key={index}>
                          <td className='py-3 px-4'>{index + 1}</td>
                          <td className='py-3 px-4'>{o?.title}</td>
                          <td className='py-3 px-4 font-bold'>{o?.quantity}</td>
                          <td className='py-3 px-4 font-bold'>{o?.price}</td>
                          <td className='py-3 px-4 font-bold text-red-600'>{o?.price * o?.quantity}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Fourth Section */}
              <div className='flex flex-wrap gap-4 justify-between bg-gray-100 p-6 rounded-2xl'>
                <div className='flex flex-col gap-1'>
                  <p className='text-base font-semibold'>ORDER TYPE</p>
                  <span className='text-gray-700'>{order?.type}</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-base font-semibold'>TRANSACTION COST</p>
                  <span className='text-gray-700'>{order.price ? (order.price * 0.02).toFixed(2) : '0.00'}</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-base font-semibold'>DISCOUNT</p>
                  <span className='text-gray-700'>0</span>
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-base font-semibold'>TOTAL AMOUNT</p>
                  <span className='text-gray-700'>
                    {order.price ? Math.ceil(order.price + order.price * 0.02) : '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <button
            onClick={handle.handlePrint}
            className='flex items-center gap-2 bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl mt-4 ml-auto font-semibold'
          >
            Print Invoice <MdLocalPrintshop />
          </button>
        </div>
      )}
    </div>
  )
}

export default Invoice
