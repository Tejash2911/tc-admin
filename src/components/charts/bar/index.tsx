import { useEffect, useState } from 'react'
import ReusableChart from '@/components/chart'

interface IProps {
  data: { _id: string; count: number }[]
  title: string
}

const BarChart = ({ data, title }: IProps) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    if (!data || data.length === 0) return

    setChartData({
      labels: data.map(d => d._id),
      datasets: [
        {
          label: 'Purchase Count',
          data: data.map(d => d.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ],
          hoverBorderWidth: 1,
          hoverBorderColor: '#000'
        }
      ]
    })
  }, [data])

  const options = {
    maintainAspectRatio: false
  }

  return (
    <div className='rounded-lg border border-gray-300 bg-white p-4'>
      <h2 className='mb-2 text-base font-medium'>{title}</h2>
      <ReusableChart type='bar' data={chartData} options={options} height={200} />
    </div>
  )
}

export default BarChart
