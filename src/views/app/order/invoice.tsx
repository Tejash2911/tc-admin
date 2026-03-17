'use client'

import { useOrderById } from '@/hooks/useOrderQuery'
import { Button } from '@/components/button'
import ContentLayout from '@/components/content-layout'
import NotFound from '@/components/not-found'

interface IProps {
  id: string
}
const Invoice = ({ id }: IProps) => {
  const { data: order, isPending, error } = useOrderById(id)

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

  if (isPending) {
    return (
      <ContentLayout title='Invoice'>
        <div className='mt-6 flex items-center justify-center'>
          <div className='text-gray-500'>Loading invoice...</div>
        </div>
      </ContentLayout>
    )
  }

  if (error || !order) {
    return <NotFound message='Order Not Found' description='The order you are looking for does not exist.' />
  }

  return (
    <ContentLayout title='Invoice'>
      <div id='invoice-container'>
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #invoice-container,
            #invoice-container * {
              visibility: visible;
            }
            #invoice-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            #invoice-container table {
              page-break-inside: avoid;
            }
          }
        `}</style>
        <div className='flex justify-center'>
          <div className='w-full max-w-sm border border-gray-300 bg-white shadow-sm'>
            {/* Thermal Receipt Header */}
            <div className='border-b-1 border-dashed border-gray-400 py-4 text-center'>
              <h1 className='text-lg font-bold text-gray-900'>TejashCreation Pvt. Ltd.</h1>
              <p className='text-xs text-gray-600'>Damka, Surat, Gujarat - 394510.</p>
              <p className='text-xs text-gray-600'>India</p>
            </div>

            {/* Order Information */}
            <div className='space-y-1 px-4 py-3 font-mono text-xs'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Invoice #:</span>
                <span className='text-gray-900'>{order?.paymentInfo?.razorpay_order_id || 'N/A'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Date:</span>
                <span className='text-gray-900'>{new Date(order?.createdAt).toLocaleDateString()}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Customer:</span>
                <span className='text-gray-900'>{order?.userInfo?.name || 'N/A'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Status:</span>
                <span
                  className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                    statusColors[order.orderStatus as OrderStatus] || ''
                  }`}
                >
                  {order?.orderStatus}
                </span>
              </div>
            </div>

            {/* Customer Address */}
            <div className='border-t border-gray-200 px-4 py-2'>
              <p className='mb-1 text-xs text-gray-600'>Bill To:</p>
              <p className='text-xs text-gray-900'>{order?.userInfo?.name}</p>
              <p className='text-xs text-gray-900'>{order?.userInfo?.address.mobile}</p>
              <p className='text-xs text-gray-900'>
                {`${order?.userInfo?.address?.street}, ${order?.userInfo?.address?.city} - ${order?.userInfo?.address?.zip}, ${order?.userInfo?.address?.state}`}
              </p>
            </div>

            {/* Items Table */}
            <div className='border-t border-gray-200'>
              <div className='border-b border-gray-300 px-4 py-2'>
                <div className='grid grid-cols-12 text-xs font-bold text-gray-900'>
                  <div className='col-span-6'>Item</div>
                  <div className='col-span-2 text-center'>Qty</div>
                  <div className='col-span-4 text-right'>Price</div>
                </div>
              </div>
              <div className='space-y-1 px-4 py-2'>
                {order.products &&
                  order?.products?.map((o: any, index: number) => (
                    <div key={index} className='grid grid-cols-12 font-mono text-xs'>
                      <div className='col-span-6 text-gray-900'>{o?.title}</div>
                      <div className='col-span-2 text-center text-gray-900'>{o?.quantity}</div>
                      <div className='col-span-4 text-right text-gray-900'>{o?.price * o?.quantity}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Totals Section */}
            <div className='space-y-1 border-t-1 border-dashed border-gray-400 px-4 py-3 font-mono text-xs'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Subtotal:</span>
                <span className='text-gray-900'>{order.price ? order.price.toFixed(2) : '0.00'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Transaction (2%):</span>
                <span className='text-gray-900'>{order.price ? (order.price * 0.02).toFixed(2) : '0.00'}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Discount:</span>
                <span className='text-gray-900'>0.00</span>
              </div>
              <div className='flex justify-between border-t border-gray-300 pt-2'>
                <span className='font-bold text-gray-900'>TOTAL:</span>
                <span className='font-bold text-gray-900'>
                  {order.price ? Math.ceil(order.price + order.price * 0.02) : '0'}.00
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className='border-t-1 border-dashed border-gray-400 py-4 text-center'>
              <p className='mb-1 text-xs text-gray-600'>Thank you for your business!</p>
              <p className='text-xs text-gray-500'>{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Print Button */}
        <div className='mt-6 flex justify-center'>
          <Button onClick={handle.handlePrint}>Print Invoice</Button>
        </div>
      </div>
    </ContentLayout>
  )
}

export default Invoice
