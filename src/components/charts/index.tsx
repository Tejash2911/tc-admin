import { usePopularSizeColor, useTopCategories, useTopProducts } from '@/hooks/useAnalyticsQuery'
import BarChart from './bar'
import PieChart from './pie'

const ChartsComponent = () => {
  const { data: popularSizeColor } = usePopularSizeColor()
  const { data: topCategories } = useTopCategories()
  const { data: topProducts } = useTopProducts({ for: 'chart' })

  return (
    <>
      {popularSizeColor && (
        <div className='my-4 box-border grid grid-cols-1 gap-4 sm:my-8 sm:grid-cols-2'>
          <BarChart data={popularSizeColor?.sizes} title='Top Size' />
          <BarChart data={popularSizeColor?.colors} title='Top Color' />
        </div>
      )}

      {popularSizeColor && topCategories && (
        <div className='my-4 box-border grid grid-cols-1 gap-4 sm:my-8 sm:grid-cols-2'>
          <PieChart data={topProducts} title='Top Products' />
          <PieChart data={topCategories} title='Top categories' />
        </div>
      )}
    </>
  )
}

export default ChartsComponent
