'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { getPopularSizeColor, getTopCategories, getTopProducts } from '@/redux/slices/analyticsSlice'
import BarChart from './bar'
import PieChart from './pie'
import '@/utils/chartSetup'

const ChartsComponent = () => {
  const { popularSizeColor, topCategories, topProducts } = useAppSelector(({ analytics }) => analytics)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTopCategories())
    dispatch(getPopularSizeColor())
    dispatch(getTopProducts({ for: 'chart' }))
  }, [])

  return (
    <>
      {popularSizeColor && (
        <div className='box-border flex gap-4 my-8 flex-col md:flex-row'>
          <BarChart data={popularSizeColor?.sizes} color={false} title='Top Size' />
          <BarChart data={popularSizeColor?.colors} color={true} title='Top Color' />
        </div>
      )}

      {popularSizeColor && topCategories && (
        <div className='box-border flex gap-4 my-8 flex-col md:flex-row'>
          <PieChart data={topProducts} title='Top Products' />
          <PieChart data={topCategories} title='Top categories' />
        </div>
      )}
    </>
  )
}

export default ChartsComponent
