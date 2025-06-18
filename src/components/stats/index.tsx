import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getOrderAnalytics, getOrderPriceAnalytics } from '@/redux/slices/analyticsSlice'
import { Icon } from '@iconify/react'
import { PriceStatCard } from './PriceStatCard'
import { StatCard } from './StatCard'

const Stats = () => {
  const { orderStats, orderPriceStats } = useAppSelector(({ analytics }) => analytics)
  const dispatch = useAppDispatch()

  useEffect(() => {
    Promise.all([dispatch(getOrderAnalytics()), dispatch(getOrderPriceAnalytics())])
  }, [])

  return (
    <div className='flex flex-col gap-8'>
      {orderPriceStats && (
        <div className='flex w-full flex-col gap-4 sm:flex-row'>
          <PriceStatCard
            title="Today's Orders"
            value={orderPriceStats?.today}
            icon={<Icon icon='ri:calendar-event-line' />}
            bgColor='bg-[#0694A2]'
          />
          <PriceStatCard
            title='Monthly Orders'
            value={orderPriceStats?.month}
            icon={<Icon icon='ri:truck-line' />}
            bgColor='bg-[#3F83F8]'
          />
          <PriceStatCard
            title='Total Orders'
            value={orderPriceStats?.allTime}
            icon={<Icon icon='ri:bank-line' />}
            bgColor='bg-[#0E9F6E]'
          />
        </div>
      )}

      {orderStats && (
        <div className='flex flex-wrap gap-4'>
          <StatCard
            title='Total'
            value={orderStats?.pending + orderStats?.processing + orderStats?.delivered}
            icon={<Icon icon='ri:shopping-cart-line' />}
            iconBgColor='bg-[#FEECDC]'
            iconColor='#D03801'
          />
          <StatCard
            title='Order Pending'
            value={orderStats?.pending}
            icon={<Icon icon='ri:refresh-line' />}
            iconBgColor='bg-[#E1EFFE]'
            iconColor='#1C64F2'
          />
          <StatCard
            title='Order Processing'
            value={orderStats?.processing}
            icon={<Icon icon='ri:truck-fill' />}
            iconBgColor='bg-[#D5F5F6]'
            iconColor='#117C88'
          />
          <StatCard
            title='Order Delivered'
            value={orderStats?.delivered}
            icon={<Icon icon='ri:check-line' />}
            iconBgColor='bg-[#DEF7EC]'
            iconColor='#057A55'
          />
        </div>
      )}
    </div>
  )
}

export default Stats
