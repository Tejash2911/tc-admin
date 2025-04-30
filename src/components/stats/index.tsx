'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getOrderAnalytics, getOrderPriceAnalytics } from '@/redux/slices/analyticsSlice'
import { MdAccountBalance, MdAutorenew, MdCheck, MdLocalShipping, MdShoppingCart, MdToday } from 'react-icons/md'

const Stats = () => {
  const { orderStats, orderPriceStats } = useAppSelector(({ analytics }) => analytics)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getOrderAnalytics())
    dispatch(getOrderPriceAnalytics())
  }, [])

  return (
    <div className='flex flex-col gap-8'>
      {orderPriceStats && (
        <div className='flex flex-col sm:flex-row gap-4 w-full'>
          <div className='flex-1 h-[150px] p-8 rounded-lg text-white bg-[#0694A2] flex flex-col justify-center items-center gap-2'>
            <MdToday className='text-2xl' />
            <p>Today&apos;s Orders</p>
            <p className='text-xl font-medium'>{orderPriceStats?.today}</p>
          </div>
          <div className='flex-1 h-[150px] p-8 rounded-lg text-white bg-[#3F83F8] flex flex-col justify-center items-center gap-2'>
            <MdLocalShipping className='text-2xl' />
            <p>Monthly Orders</p>
            <p className='text-xl font-medium'>{orderPriceStats?.month}</p>
          </div>
          <div className='flex-1 h-[150px] p-8 rounded-lg text-white bg-[#0E9F6E] flex flex-col justify-center items-center gap-2'>
            <MdAccountBalance className='text-2xl' />
            <p>Total Orders</p>
            <p className='text-xl font-medium'>{orderPriceStats?.allTime}</p>
          </div>
        </div>
      )}

      {orderStats && (
        <div className='flex flex-wrap gap-4'>
          <div className='flex-1 min-w-[250px] h-[100px] p-4 border border-gray-200 bg-white rounded-lg flex'>
            <div className='flex justify-center items-center w-1/3'>
              <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#FEECDC]'>
                <MdShoppingCart className='text-[#D03801]' />
              </div>
            </div>
            <div className='flex flex-col justify-center w-2/3'>
              <p>Total</p>
              <p className='text-xl'>{orderStats?.pending + orderStats?.processing + orderStats?.delivered}</p>
            </div>
          </div>

          <div className='flex-1 min-w-[250px] h-[100px] p-4 border border-gray-200 bg-white rounded-lg flex'>
            <div className='flex justify-center items-center w-1/3'>
              <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#E1EFFE]'>
                <MdAutorenew className='text-[#1C64F2]' />
              </div>
            </div>
            <div className='flex flex-col justify-center w-2/3'>
              <p>Order Pending</p>
              <p className='text-xl'>{orderStats?.pending}</p>
            </div>
          </div>

          <div className='flex-1 min-w-[250px] h-[100px] p-4 border border-gray-200 bg-white rounded-lg flex'>
            <div className='flex justify-center items-center w-1/3'>
              <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#D5F5F6]'>
                <MdLocalShipping className='text-[#117C88]' />
              </div>
            </div>
            <div className='flex flex-col justify-center w-2/3'>
              <p>Order Processing</p>
              <p className='text-xl'>{orderStats?.processing}</p>
            </div>
          </div>

          <div className='flex-1 min-w-[250px] h-[100px] p-4 border border-gray-200 bg-white rounded-lg flex'>
            <div className='flex justify-center items-center w-1/3'>
              <div className='w-[50px] h-[50px] flex justify-center items-center rounded-full bg-[#DEF7EC]'>
                <MdCheck className='text-[#057A55]' />
              </div>
            </div>
            <div className='flex flex-col justify-center w-2/3'>
              <p>Order Delivered</p>
              <p className='text-xl'>{orderStats?.delivered}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stats
